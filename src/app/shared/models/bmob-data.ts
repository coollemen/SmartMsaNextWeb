export class BmobData {
  /**
   * bmob object
   */
  data: Bmob.Object;

  /**
   * bmob object id
   * @returns {string}
   */
  get guid():string {
    if (this.data === null || this.data === undefined) {
      return null;
    } else {
      return this.data.id;
    }
  }
}
