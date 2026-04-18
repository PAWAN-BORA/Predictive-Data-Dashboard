import { aiCache } from "../cache/cache.js";
import { QUERY_SYSTEM_PROMPT } from "../config/prompts.js";
import { AIQuerySchema } from "../schemas/zodSchema.js";
import { normalizeQuery } from "../utils/normalize.js";
import { callOllama } from "./ollamaService.js";
const TTL = 1000 * 60 * 60 * 24; 

class AIServices {

  async parseQuery(query:string){

    const key = normalizeQuery(query);
    const cached = aiCache.get(key);
    if (cached) {
      return { ...cached, source: "cache" };
    }
    const fullPrompt = `
${QUERY_SYSTEM_PROMPT}
User Query:
"${query}"
JSON:
`;

    const raw = await callOllama(fullPrompt);
    try {
      const parsed =  JSON.parse(raw);
      const result = AIQuerySchema.safeParse(parsed);
      if (!result.success) {
        return {
          queryType: "invalid",
          metric: null,
          category: null,
          timeRange: null,
          source:"error"
        };
      }

      const finalResult = result.data;
      if (!(
        finalResult.queryType === "invalid" &&
          finalResult.category === null &&
          finalResult.metric === null &&
          finalResult.year === null &&
          finalResult.quarter === null
      )){
        aiCache.set(key, finalResult, TTL);
      }
      return {...finalResult, source:"ai"}

    } catch {
      return {
        queryType: "invalid",
        metric: null,
        category: null,
        timeRange: null,
        source:"error"
      };
    }
  }


}
export default new AIServices()
