import 'reflect-metadata';
export const bmobObjectMetadataKey=Symbol.for('bomb-object');
export class BmobObjectMetadata {
  public name:string;
  public type:Bmob.IObject;
  constructor(setName:string,setType:Bmob.IObject){
    this.name=setName;
    this.type=setType
  }
}

/**
 * 定义一个类为Bmob Object，可以通过Bmob接口保存和读取数据
 * @param {string} name 需要的表名
 * @returns {(constructor) => any}
 * @constructor 构造函数
 */
export function BmobObject(name: string) {
  return function (constructor) {
    let BmobType = Bmob.Object.extend(name);
    Reflect.defineMetadata(bmobObjectMetadataKey, new BmobObjectMetadata(name,BmobType), constructor);
  };
}
