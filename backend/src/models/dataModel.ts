import type { QueryParams } from "../services/dataService.js";
import { dataset } from "../utils/dataset.js";


type DataRow = {
  id: number;
  date: string;
  quarter: string;
  category: string;
  revenue: number;
  units: number;
  profit: number;
  region: string;
}

class DataModel {

  private data:DataRow[] = []
  constructor(){
    this.data = dataset;
  }

  async getYearlyRevenue(){
    return this.data;
  }
  async getAllData(){
    return this.data
  }
  async getFilterData(params:QueryParams){
    const { year, quarter, category } = params;
    if(year == undefined && quarter == undefined && category == undefined){
      return this.getAllData()
    } 
    return this.data.filter((item) => {
    if (year && new Date(item.date).getFullYear() !== year) {
      return false;
    }

    if (quarter && item.quarter !== quarter) {
      return false;
    }

    if (category && item.category !== category) {
      return false;
    }

    return true;
  });

  }
  async getYearlyData(year:number|undefined){
    if(year==undefined) return this.getAllData()
    return this.data.filter((item)=>{
      return new Date(item.date).getFullYear() == year
    })
  }
  async getCategoryData(category:string|undefined){
    if(category==undefined) return this.getAllData()
    return this.data.filter((item)=>item.category==category)
  }
  async getQuarterlyData(quarter:string){
    return this.data.filter((item)=>item.quarter==quarter)
  }

}

export default new DataModel()
