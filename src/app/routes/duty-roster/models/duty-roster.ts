import {DutyItem} from './duty-item';
import { BmobObject } from '../../../shared/decorators/bmob-object';
import { BmobField } from '../../../shared/decorators/bmob-field';
/**
 * 值班表
 */
@BmobObject('值班表')
export class DutyRoster {
  /**
   * 年份
   */
  @BmobField('年份')
  public year: number;
  /**
   * 月份
   */
  @BmobField('月份')
  public month: number;
  /**
   * 值班项
   */
  @BmobField('内容')
  public items: DutyItem[] = [];
  /**
   * 是否锁定
   */
  @BmobField('是否锁定')
  public isLock: boolean;

}
