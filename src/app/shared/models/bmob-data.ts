export class BmobData {
  /**
   * bmob object
   */
 public data: Bmob.Object;

  /**
   * bmob object id
   * @returns {string}
   */
 public get guid():string {
    if (this.data === null || this.data === undefined) {
      return null;
    } else {
      return this.data.id;
    }
  }
}
