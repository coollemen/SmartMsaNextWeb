import { BmobData } from '@shared/models/bmob-data';
import { BmobObject } from '@shared/decorators/bmob-object';
import { BmobField } from '@shared/decorators/bmob-field';

@BmobObject('DutyItems')
export class DutyItem extends BmobData{
  /**
   * 日期
   */
  @BmobField('date')
  public date: Date;
  /**
   * 当天的类型，工作日或节假日
   */
  @BmobField('type')
  public type: '工作日' | '节假日';
  /**
   * 节假日的名称，如果是节假日的话
   */
  @BmobField('holiday')
  public holiday: string;
  /**
   * 领导名称
   */
  @BmobField('leader')
  public leader: string;
  /**
   * 指挥长名称
   */
  @BmobField('commander')
  public commander: string;
  /**
   * 海事人员名称
   */
  @BmobField('msa')
  public msa: string;
  /**
   * 协管员名称
   */
  @BmobField('assistant')
  public assistant: string;
}
