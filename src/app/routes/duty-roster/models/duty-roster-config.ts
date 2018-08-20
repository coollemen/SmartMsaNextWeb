import { BmobObject } from '../../../shared/decorators/bmob-object';
import { BmobField } from '../../../shared/decorators/bmob-field';
/**
 * 值班模块配置信息
 */
@BmobObject('DutyRosterConfig')
export class DutyRosterConfig {
  /**
   * 协管员名单，24小时值班
   */
  @BmobField('assistantPeoples')
  public assistantPeoples: string[] = [];
  /**
   * 当前协管员索引，排到后自动下移一位，如果最后一位了自动移到第一位
   */
  @BmobField('assistantIndex')
  public assistantIndex: number;
  /**
   * 机关海事人员名单，节假日值班
   */
  @BmobField('msaPeoples')
  public msaPeoples: string[] = [];
  /**
   * 当前海事人员索引，排到后自动下移一位，如果最后一位了自动移到第一位
   */
  @BmobField('msaIndex')
  public msaIndex: number;
  /**
   * 指挥长人员名单，一周一轮
   */
  @BmobField('commanderPeoples')
  public commanderPeoples: string[] = [];
  /**
   * 当前指挥长索引，排到后自动下移一位，如果最后一位了自动移到第一位
   */
  @BmobField('commanderIndex')
  public commanderIndex: number;
  /**
   * 领导名单，节假日及节假日前一天值班
   */
  @BmobField('leaderPeoples')
  public leaderPeoples: string[] = [];
  /**
   * 当前领导索引，排到后自动下移一位，如果最后一位了自动移到第一位
   */
  @BmobField('leaderIndex')
  public leaderIndex: number;

  public constructor() {
    this.assistantIndex = 0;
    this.msaIndex = 0;
    this.leaderIndex = 0;
    this.commanderIndex = 0;
    this.leaderPeoples = ['陈焱军', '李敏', '陈德华', '张钰昌', '朱辉',];
    this.assistantPeoples = ['陈叶兵', '金三枝', '范君敏'];
    this.msaPeoples = [
      '陈焱军',
      '李敏',
      '陈德华',
      '许建明',
      '蔡胜华',
      '闫佳瑶',
      '吕惠忠',
      '杜萍燕',
      '桓椿茹',
      '周善春',
      '方青',
      '王海滨',
      '倪泳',
      '吴志刚',
      '刘畅',
      '陆瑜青',
      '范雪军',
      '魏丹丹',
      '陆雨宛',
      '朱辉',
      '夏叶斐',
      '唐桂超',
      '易娟',
      '朱德龙',
      '于杨',
      '魏筱雯',
      '王海燕',
      '徐显明',
      '唐琼',
      '张钰昌',
      '陈曙光',
      '杨禾',
      '曹颖琦',
      '奚海军',
      '莫丽凤',
      '高云翔',
      '倪志华',
    ];
    this.commanderPeoples = ['倪泳', '高云翔', '倪志华'];
  }
}
