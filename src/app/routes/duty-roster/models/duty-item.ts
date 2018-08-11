export class DutyItem {
  /**
   * 日期
   */
  public date: Date;
  /**
   * 当天的类型，工作日或节假日
   */
  public type: '工作日' | '节假日';
  /**
   * 节假日的名称，如果是节假日的话
   */
  public holidayName: string;
  /**
   * 领导名称
   */
  public leaderName: string;
  /**
   * 指挥长名称
   */
  public commanderName: string;
  /**
   * 海事人员名称
   */
  public msaName: string;
  /**
   * 协管员名称
   */
  public assistantName: string;
}
