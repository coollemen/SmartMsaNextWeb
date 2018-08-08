import {Injectable} from '@angular/core';
import {BmobData} from '../models/bmob-data';
import {BmobObjectMetadata, bmobObjectMetadataKey} from "../decorators/bmob-object";
import {BmobFieldMetadata, bmobFieldMetadataKey} from "../decorators/bmob-field";
import {BmobPropertyMetadata, bmobPropertyMetadataKey} from "../decorators/bmob-property";

@Injectable({
  providedIn: 'root'
})
/**
 * Bmob服务
 */
export class BmobService {

  constructor() {
    Bmob.initialize('921d1bd493411db02d8bcf1a8562b843', 'a2171a5687d9e98ca75443ddc431d43c');
  }

  /**
   * 根据构造函数创建相应的Bmob Query类
   * @param {Function} constructor 构造函数
   * @returns {Bmob.Query} 查询类
   */
  public createQuery(constructor: Function): Bmob.Query {
    let metadata: BmobObjectMetadata = Reflect.getMetadata(bmobObjectMetadataKey, constructor);
    let query = new Bmob.Query(metadata.type);
    return query;
  }
  /**
   * 查找第一个匹配到的数据
   * @param {Bmob.Query} query
   * @returns {Promise<T extends BmobData>}
   */
  public first<T extends BmobData>(query: Bmob.Query): Promise<T>{
    let promise:Promise<T>;
    query.first(null).then(result => {
      let TType:new()=>T;
      let d: T=new TType();
        d.data = result;
        //设置字段数据
        let fields: BmobFieldMetadata[] = Reflect.getMetadata(bmobFieldMetadataKey, d) as BmobFieldMetadata[];
        for (let f of fields) {
          d[f.propertyName] = d.data.get(f.fieldName);
        }
        //保存属性数据
        let properties: BmobPropertyMetadata[] = Reflect.getMetadata(bmobPropertyMetadataKey, d) as BmobPropertyMetadata[];
        for (let p of properties) {
          d[p.propertyName]=d.data.get(p.fieldName);
        }
      promise= new Promise(function(resolve, reject){        //做一些异步操作
        resolve(d);
      })
    }, error => {
      alert("查询失败: " + error.code + " " + error.message);
      promise= new Promise(function(resolve, reject){        //做一些异步操作
        reject(error);
      })
    });
    return promise;
  }

  /**
   * 查找所有匹配数据
   * @param {Bmob.Query} query
   * @returns {Promise<T[]>}
   */
  public find<T extends BmobData>(query: Bmob.Query): Promise<T[]> {
    let promise:Promise<T[]>;
    query.find(null).then(results => {
      let TType:new()=>T;
      let datas: T[] = [];
      for (let i = 0; i < results.length; i++) {
        let d: T = new TType();
        d.data = results[i];
        //设置字段数据
        let fields: BmobFieldMetadata[] = Reflect.getMetadata(bmobFieldMetadataKey, d) as BmobFieldMetadata[];
        for (let f of fields) {
          d[f.propertyName] = d.data.get(f.fieldName);
        }
        //保存属性数据
        let properties: BmobPropertyMetadata[] = Reflect.getMetadata(bmobPropertyMetadataKey, d) as BmobPropertyMetadata[];
        for (let p of properties) {
          d[p.propertyName]=d.data.get(p.fieldName);
        }
        //添加入数组
        datas.push(d);
      }
      promise= new Promise(function(resolve, reject){        //做一些异步操作
          resolve(datas);
      })
    }, error => {
      alert("查询失败: " + error.code + " " + error.message);
      promise= new Promise(function(resolve, reject){        //做一些异步操作
        reject(error);
      })
    });
    return promise;
  }

  public saveAll(bmobObjs: BmobData[]): any {

  }

  /**
   * 保存数据
   * @param {BmobData} bmobObj
   * @returns {any}
   */
  public save(bmobObj: BmobData): any {
    if(bmobObj.data===null ||bmobObj.data===undefined){
      let metadata: BmobObjectMetadata = Reflect.getMetadata(bmobObjectMetadataKey, bmobObj.constructor);
      bmobObj.data=new metadata.type();
    }
    //保存字段数据
    let fields: BmobFieldMetadata[] = Reflect.getMetadata(bmobFieldMetadataKey, bmobObj) as BmobFieldMetadata[];
    for (let f of fields) {
      let value = bmobObj[f.propertyName];
      if (value !== null && value !== undefined) {
        bmobObj.data.set(f.fieldName, value);
      }

    }
    //保存属性数据
    let properties: BmobPropertyMetadata[] = Reflect.getMetadata(bmobPropertyMetadataKey, bmobObj) as BmobPropertyMetadata[];
    for (let p of properties) {
      let value = bmobObj[p.propertyName];
      if (value !== null && value !== undefined) {
        bmobObj.data.set(p.fieldName, value);
      }
    }
    //保存到Bmob数据库
    return bmobObj.data.save(null, null);
  }
}
