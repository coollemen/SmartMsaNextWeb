
export const bmobPropertyMetadataKey=Symbol.for("bmob-property");
export class BmobPropertyMetadata {
  public fieldName:string;
  public propertyName:string;
  constructor(setFieldName:string,setPropertyName:string){
    this.fieldName=setFieldName;
    this.propertyName=setPropertyName;
  }
}

/**
 * 访问器装饰器，用于定义装饰的属性在Bmob表中的字段名
 * @param {string} name 字段名
 * @returns {(target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export function BmobProperty(name?: string) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    let fields:BmobPropertyMetadata[]=Reflect.getMetadata(bmobPropertyMetadataKey,target);
    if(fields===null||fields===undefined){
      fields=[];
    }
    if(name===null ||name===undefined){
      fields.push(new BmobPropertyMetadata(propertyKey,propertyKey));
    }else{
      fields.push(new BmobPropertyMetadata(name,propertyKey));
    }
    Reflect.defineMetadata(bmobPropertyMetadataKey, fields, target);
  };
}

