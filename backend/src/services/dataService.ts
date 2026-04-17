import dataModel from "../models/dataModel.js";
import type { dataset } from "../utils/dataset.js";

export type QueryParams = {
  year:number|undefined,
  quarter:string|undefined,
  category:string|undefined,
}
type CategoryWiseParams = {
  year:number|undefined,
  quarter:string|undefined,
}
type TrendParams = {
  year:number|undefined,
  category:string|undefined,
}
type ComparisionParams = {
  year:number|undefined,
  metric:"revenue"|"units"
  groupBy:string, 

}
type GrowthParams = {
  metric:"revenue"|"units"
  groupBy:string, 
  category:string|undefined,
}
type ForecastParams = {
  metric:"revenue"|"units"
  groupBy:string, 
  category:string|undefined,
}
type Row = typeof dataset[number];


class DataService {

  async getSummary(params:QueryParams){

    try {
      let data = await dataModel.getFilterData(params);
      let totalRevenue = 0;
      let totalProfit = 0;
      let totalUnits = 0;
      const categoryMap: Record<string, number> = {};
      const regionMap: Record<string, number> = {};
      for (const item of data) {
        totalRevenue += item.revenue;
        totalProfit += item.profit;
        totalUnits += item.units;

        categoryMap[item.category] =
          (categoryMap[item.category] || 0) + item.revenue;

        regionMap[item.region] =
          (regionMap[item.region] || 0) + item.revenue;
      }
      const avgOrderValue = totalUnits!=0 ? totalRevenue / totalUnits : 0;
      const topCategory = (Object.entries(categoryMap) as [string, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
      return {
        totalRevenue,
        totalProfit,
        totalUnits,
        avgOrderValue,
        topCategory,
      }

    } catch(err) {
      const errMsg = err instanceof Error?err.message:err;
      console.error("error in DataService.getSummary:", errMsg);
      throw err;

    }
  

  }
  async categoryWiseData(params:CategoryWiseParams){
    let data = await dataModel.getFilterData({
      year:params.year,
      quarter:params.quarter,
      category:undefined,
    });
    const categoryMap: Record<string, { revenue: number; units: number }> = {};
    for (const item of data) {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = { revenue: 0, units: 0 };
      }
      categoryMap[item.category]!.revenue += item.revenue;
      categoryMap[item.category]!.units += item.units;
    }
    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      revenue: value.revenue,
      units: value.units,
    }));

  }
  async getMonthlyTrend(params:TrendParams){
    const getKey = (item:Row)=>item.date.slice(0, 7)
    const data = await this.aggregateTrend(getKey, params)
    return data;
  }

  async getQuartrlyTrend(params:TrendParams){
    const getKey = (item:Row)=>{
      const year = item.date.slice(0, 4);
      return `${year}-${item.quarter}`;
    }
    const data = this.aggregateTrend(getKey, params)
    return data;
  }

  async getComparisonData(params:ComparisionParams){

    const data = await dataModel.getYearlyData(params.year);

    const labelSet = new Set<string>();
    const splitBy = "category";
    const metric = params.metric;
    data.forEach((d) => {
      labelSet.add(this.getGroupKey(d, params.groupBy));
    });
    const labels = Array.from(labelSet).sort();
    // 4. collect unique split values (series names)
    const splitSet = new Set<string>();
    data.forEach((d) => {
      splitSet.add(d[splitBy]);
    });


    const splits = Array.from(splitSet);
    const map: Record<string, Record<string, number>> = {};
    labels.forEach((label) => {
    map[label] = {};
    splits.forEach((s) => {
      map[label]![s] = 0;
    });
  });

    // 6. aggregate
    data.forEach((d) => {
      const label = this.getGroupKey(d, params.groupBy);
      const split = d[splitBy];
      map[label]![split]! += d[metric];
    });

    // 7. build series
    const series = splits.map((split) => ({
      name: split,
      data: labels.map((label) => map[label]![split] || 0),
    }));

    return {
      labels,
      series,
    };

  }
  async getGrowthData(params:GrowthParams){
    const data = await dataModel.getCategoryData(params.category)
    const map: Record<string, number> = {};

    const metric = params.metric;
    data.forEach((d) => {
      const key = this.getGroupKey(d, params.groupBy);
      if (!map[key]) map[key] = 0;
      map[key] += d[metric];
    });

    // 4. sort labels (important for correct growth)
    const labels = Object.keys(map).sort();

    const values = labels.map((l) => map[l]);

    // 5. growth calc
    const growth: number[] = [];

    for (let i = 0; i < values.length; i++) {
      if (i === 0) {
        growth.push(0);
      } else {
        const prev = values[i - 1];
        const curr = values[i];
        const g = prev === 0 ? 0 : ((curr! - prev!) / prev!) * 100;
        growth.push(Number(g.toFixed(2)));
      }
    }

    return {
      data: {
        labels,
        values,
        growth,
      },
    };

  }

  async getForecastData(params:ForecastParams){
    const data = await dataModel.getCategoryData(params.category)

    const map: Record<string, number> = {};
    const metric = params.metric;
    const forecastPoints = 3;
    const groupBy = params.groupBy;
    data.forEach((d) => {
      const key = this.getGroupKey(d, params.groupBy);
      if (!map[key]) map[key] = 0;
      map[key] += d[metric];
    });

    const labels = Object.keys(map).sort();
    const values = labels.map((l) => map[l]);

    // 3. linear regression
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a! + b!, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * values[i]!, 0);
    const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);

    const slope =
      (n * sumXY - sumX * sumY!) / (n * sumXX - sumX * sumX);

    const intercept = (sumY! - slope * sumX) / n;

    // 4. forecast
    const predictedValues: number[] = [];

    for (let i = 0; i < forecastPoints; i++) {
      const xi = n + i;
      const yi = slope * xi + intercept;
      predictedValues.push(Math.round(yi));
    }

    const futureLabels: string[] = [];
    if (groupBy === "year") {
      let lastYear = Number(labels[labels.length - 1]);
      for (let i = 1; i <= forecastPoints; i++) {
        futureLabels.push(`${lastYear + i}`);
      }
    }

    else if (groupBy === "quarter") {
      const [yearStr, qStr] = labels[labels.length - 1]!.split("-");
      let year = Number(yearStr);
      let q = Number(qStr!.replace("Q", ""));

      for (let i = 0; i < forecastPoints; i++) {
        q++;
        if (q > 4) {
          q = 1;
          year++;
        }
        futureLabels.push(`${year}-Q${q}`);
      }
    }

    else if (groupBy === "month") {
      const [yearStr, monthStr] = labels[labels.length - 1]!.split("-");
      let date = new Date(`${monthStr} 1, ${yearStr}`);

      for (let i = 0; i < forecastPoints; i++) {
        date.setMonth(date.getMonth() + 1);
        const m = date.toLocaleString("en-US", { month: "short" });
        const y = date.getFullYear();
        futureLabels.push(`${y}-${m}`);
      }
    }
    // // 5. future labels (quarter increment)
    // const lastLabel = labels[labels.length - 1];
    // const [yearStr, qStr] = lastLabel?lastLabel.split("-"):["", ""];
    // console.log(lastLabel, 'this is last lable')
    // let year = Number(yearStr);
    // let q = Number(qStr!.replace("Q", ""));
    //
    // const futureLabels: string[] = [];
    //
    // for (let i = 0; i < forecastPoints; i++) {
    //   q++;
    //   if (q > 4) {
    //     q = 1;
    //     year++;
    //   }
    //   futureLabels.push(`${year}-Q${q}`);
    // }

    return {
      data: {
        labels: [...labels, ...futureLabels],
        actual: [...values, ...Array(forecastPoints).fill(null)],
        predicted: [
          ...Array(values.length).fill(null),
          ...predictedValues,
        ],
      },
    };
  }
  private async aggregateTrend(getkey:(item:Row)=>string, params:TrendParams){
    const map = new Map<string, { revenue: number; units: number; profit: number }>();
    const data = await dataModel.getFilterData({
      year:params.year,
      category:params.category,
      quarter:undefined
    })
    for (const item of data) {
      const key = getkey(item); 
      if (!map.has(key)) {
        map.set(key, { revenue: 0, units: 0, profit: 0 });
      }

      const agg = map.get(key)!;
      agg.revenue += item.revenue;
      agg.units += item.units;
      agg.profit += item.profit;
    }
    const labels = Array.from(map.keys()).sort();
    return {
      labels,
      series: [
        {
          name: "Revenue",
          data: labels.map(l => map.get(l)!.revenue)
        },
        {
          name: "Units",
          data: labels.map(l => map.get(l)!.units)
        },
        {
          name: "Profit",
          data: labels.map(l => map.get(l)!.profit)
        }
      ]
    };
  }
  private getGroupKey(item:Row, groupBy:string){
    const date = new Date(item.date);

    if (groupBy === "year") return `${date.getFullYear()}`;

    if (groupBy === "quarter")
      return `${date.getFullYear()}-${item.quarter}`;

    if (groupBy === "month") {
      const month = date.toLocaleString("en-US", { month: "short" });
      return `${date.getFullYear()}-${month}`;
    }

    return "";
  }

}
export default new DataService()
