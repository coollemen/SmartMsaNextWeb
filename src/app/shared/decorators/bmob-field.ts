export const bmobFieldMetadataKey=Symbol.for("bmob-field");
export class BmobFieldMetadata {
  public fieldName:string;
  public propertyName:string;
  constructor(setFieldName:string,setPropertyName:string){
    this.fieldName=setFieldName;
    this.propertyName=setPropertyName;
  }
}
/**
 * 属性装饰器，用于定义装饰的属性在Bmob表中的字段名
 * @param {string} name 字段名
 * @returns {(target: Object, propertyKey: string) => void}
 * @constructor
 */
export function BmobField(name?: string) {
  return function (target: Object, propertyKey: string) {
    let fields:BmobFieldMetadata[]=Reflect.getMetadata(bmobFieldMetadataKey,target);
    if(fields===null||fields===undefined){
      fields=[];
    }
    if(name===null ||name===undefined){
      console.log("field name is null or undine!!!");
      fields.push(new BmobFieldMetadata(propertyKey,propertyKey));
    }else{
      fields.push(new BmobFieldMetadata(name,propertyKey));
    }
    Reflect.defineMetadata(bmobFieldMetadataKey, fields, target);
  };
}
