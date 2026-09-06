export type ResourceType="renewable"|"nonrenewable";
export type ResourceGrade="low"|"mid"|"high";

export function marketAction(resourceType:string,grade:string,unitsValue:string|number){
  return{type:"resource:buy" as const,resourceType:resourceType as ResourceType,grade:grade as ResourceGrade,units:Number(unitsValue)};
}
export function recoveryAction(grade:string,unitsValue:string|number){
  return{type:"resource:recover" as const,grade:grade as ResourceGrade,units:Number(unitsValue)};
}
export function supportAction(targetCharacterId:string,amountValue:string|number){
  return{type:"family:support" as const,targetCharacterId,amount:Number(amountValue)};
}
export function marriageAction(targetCharacterId:string){
  return{type:"marriage:propose" as const,targetCharacterId};
}
