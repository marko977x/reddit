import { NormalizedObjects } from "../store";

export default function normalize(json: any): any {
  let result: NormalizedObjects<any> = {
    byId: {},
    allIds: []
  }
  json.forEach((element: any, index: number) => {
    result.byId[element.id] = element;
    result.allIds[index] = element.id;
  });
  return result;
}