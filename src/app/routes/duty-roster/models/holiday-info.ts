import { BmobObject } from '@shared/decorators/bmob-object';
import { BmobField } from '@shared/decorators/bmob-field';
import { BmobData } from '@shared/models/bmob-data';

/**
 * 节假日信息
 */
@BmobObject('HolidayInfo')
export class HolidayInfo extends BmobData{
  /**
   * 日期
   */
  @BmobField('date')
  public date:Date;
  /**
   * 是否为节假日
   */
  @BmobField('holiday')
  public holiday:string;
  /**
   * 节假日名称
   */
  @BmobField('name')
  public name:string;
  constructor(){
    super();
  }
}
