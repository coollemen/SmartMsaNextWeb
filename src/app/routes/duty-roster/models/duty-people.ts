import { BmobObject } from '@shared/decorators/bmob-object';
import { BmobField } from '@shared/decorators/bmob-field';
import { BmobData } from '@shared/models/bmob-data';

/**
 * 值班人员
 */
@BmobObject('DutyPeople')
export class DutyPeople extends BmobData{
  /**
   * 职责类型
   */
  @BmobField('type')
  public type:'领导'|'值班长'|'海事人员'|'协管员';
  /**
   * 姓名
   */
  @BmobField('peoples')
  public peoples:string[];

  /**
   * 索引
   */
  @BmobField('index')
  public index:number;
  constructor(){
    super();
    this.index=0;
  }
}
