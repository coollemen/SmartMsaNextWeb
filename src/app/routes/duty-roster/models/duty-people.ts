import { BmobObject } from '@shared/decorators/bmob-object';
import { BmobField } from '@shared/decorators/bmob-field';
import { BmobData } from '@shared/models/bmob-data';

/**
 * 值班人员
 */
@BmobObject('DutyPeople')
export class DutyPeople extends BmobData{
  /**
   * 姓名
   */
  @BmobField('name')
  public name:string;
  /**
   * 职责类型
   */
  @BmobField('type')
  public type:'领导'|'值班长'|'海事人员'|'协管员';
  /**
   * 上一个人员姓名
   */
  @BmobField('last')
  public last:string;
  /**
   * 下一个人员姓名
   */
  @BmobField('next')
  public next:string;
  /**
   * 是否是第一个
   */
  @BmobField('isFirst')
  public isFirst:boolean;
  constructor(){
    super();
  }
}
