declare namespace Bmob {
  /**
   * 初始化时需要调用这个函数。可以从bmob中获取所需的key
   *
   * @param {String} applicationId 你的 Application ID.
   * @param {String} applicationKey 你的 restful api Key.
   * @param {String} masterKey (optional) 你的 bmob Master Key.
   */
  function initialize(appId: string, restfulApiKey: string, masterKey?: string);

  /**
   * 错误信息反馈模型
   */
  class Error {
    code: number;
    message: string;
    // description: string;
  }

  interface IObject {
    new(): Object;
  }

  /**
   * Bmob 文档对象模型
   */
  class Object {
    /**
     * 对象 objectId 值
     */
    id: string;
    /**
     * 对象创建时间
     */
    createdAt: string;
    /**
     * 对象上次修改时间
     */
    updatedAt: string;

    /**
     * 初始化 Bmob 文档对象
     */
    constructor();

    /**
     * 使用指定的集合名声明一个集合结构
     */
    static extend(collection: string): IObject;
    static extend(className: string, protoProps: Object, classProps: Object): IObject;

    /**
     * 设置一列数据，重复调用可设置多列
     */
    set(field: string, value: any): void;

    /**
     * 保存新增或修改数据
     */
    save(data?: any,
         options?: {
           success?: (data: Object) => void,
           error?: (data: Object, error: Error) => void
         }): Promise<Object>;

    /**
     * 获取某条数据的字段值
     */
    get(field: string): any;

    /**
     * 删除当前文档对象
     */
    destroy(options: {
      success?: (data: Object) => void,
      error?: (data: Object, error: Error) => void
    }): Promise<void>;

    /**
     * 删除当前文档的指定字段
     */
    unset(field: string): any;

    /**
     * 创建关系
     * @param {string} attr
     * @returns {Bmob.Relation}
     */
    relation(attr: string): Relation;
  }

  /**
   * Bmob 文档查询操作对象
   */
  class Query {
    constructor(classType: IObject);

    /**
     * 查询所有数据
     */
    find(options?: {
      success?: (results: Array<Object>) => void,
      error?: (error: Error) => void
    }): Promise<Array<Object>>;

    /**
     * 返回第一条数据
     */
    first(options: {
      success?: (data: Object) => void,
      error?: (error: Error) => void
    }): Promise<Object>;

    /**
     * 查询指定 objectId 的某文档数据
     */
    get(objectId: string, options: {
      success?: (data: Object) => void,
      error?: (error: Error) => void
    }): Promise<Object>;

    /**
     * 在查询前设置等于条件（值为数组相当于包含）
     */
    equalTo(field: string, value: any): void;

    /**
     * 在查询前设置不等于条件
     */
    notEqualTo(field: string, value: any): void;

    /**
     * 在查询前设置小于条件
     */
    lessThan(field: string, value: any): void;

    /**
     * 在查询前设置小于等于条件
     */
    lessThanOrEqualTo(field: string, value: any): void;

    /**
     * 在查询前设置大于条件
     */
    greaterThan(field: string, value: any): void;

    /**
     * 在查询前设置大于等于条件
     */
    greaterThanOrEqualTo(field: string, value: any): void;

    /**
     * 在查询前设置返回指定的数据条数
     */
    limit(limit: number): void;

    /**
     * 在查询前设置跳过指定的数据条数
     */
    skip(start: number): void;

    /**
     * 在查询前设置升序排列
     */
    ascending(field: string): void;

    /**
     * 在查询前设置降序排列
     */
    descending(field: string): void;

    /**
     * 获取文档数量
     */
    count(options: {
      success?: (count: number) => void,
      error?: (error: Error) => void
    }): Promise<number>;

    /**
     * 在查询前设置包含数组中指定数据的文档记录
     */
    containedIn(field: string, values: Array<any>): void;

    /**
     * 在查询前设置不包含数组中指定数据的文档记录
     */
    notContainedIn(field: string, values: Array<any>): void;

    /**
     * 在查询前设置存在指定列名的文档对象
     */
    exists(field: string): void;

    /**
     * 在查询前设置不存在指定列名的文档对象
     */
    doesNotExist(field: string): void;

    /**
     * 在查询前设置关联匹配键的查询
     */
    matchesKeyInQuery(field1: string, field2: string, query: Query): void;

    /**
     * 在查询前设置关联不匹配键的查询
     */
    doesNotMatchKeyInQuery(field1: string, field2: string, query: Query): void;

    /**
     * 在查询前设置选择指定列进行查询(返回值将包含特殊字段)
     */
    select(...field: Array<string>): void;

    /**
     * 在查询前设置查询以某列指定字符串开头的文档集合数据
     */
    startsWith(field: string, value: string): void;

    /**
     * 在查询前设置合并两个条件进行或查询
     */
    static or(q1: Query, q2: Query): void;

    /**
     * 在查询前设置指定字段包含某些值的文档集合
     */
    containsAll(field: string, values: Array<any>): void;
  }

  /**
   * Bmob 文件对象
   */
  class File {
    /**
     * 使用给定的文件名和内容创建一个文件操作对象
     * @param filename 文件名
     * @param content 文件内容
     */
    constructor(filename: string, content: any);

    /**
     * 上传当前文件对象
     */
    save(): Promise<File>;

    /**
     * 通过异步调用返回文件的 url 地址
     */
    url(): string;

    /**
     * 删除当前文件
     */
    destroy(): void;
  }

  class User extends Object {
    username: string;
    password: string;
    email: string;
    emailVerified: boolean;

    /**
     * 注册一个新用户
     * @param data 新用户数据，在已设置当前对象的情况下为 null
     * @param options 注册反馈信息
     */
    signUp(data: any, options: {
      success: (user: User) => void,
      error?: (user: User, error: Error) => void
    }): Promise<User>;

    /**
     * 通过指定的用户名和密码进行登录尝试
     * @param username 用户名
     * @param password 密码
     * @param options 登录尝试反馈信息
     */
    static logIn(username: string, password: string, options?: {
      success: (user: User) => void,
      error?: (user: User, error: Error) => void
    }): Promise<User>;

    /**
     * 使用当前用户对象进行登录尝试
     * @param options 登录尝试反馈信息
     */
    logIn(options?: {
      success: (user: User) => void,
      error?: (user: User, error: Error) => void
    }): Promise<User>;

    /**
     * 获取当前登录用户信息
     */
    static current(): User;

    /**
     * 注销当前登录用户
     */
    static logOut(): void;

    /**
     * 检查这个用户是否当前用户并且已经登录。
     */
    authenticated(): boolean;

    /**
     * 发起重置密码请求
     * @param email 重置密码请求的邮箱
     * @param options 请求反馈
     */
    static requestPasswordReset(email: string, options: {
      success?: () => void,
      error?: (error: Error) => void
    }): Promise<void>;

    /**
     * 请求邮箱验证
     * @param email 邮箱地址
     * @param options 请求反馈
     */
    static requestEmailVerify(email: string, options: {
      success?: () => void,
      error?: (error: Error) => void
    }): Promise<void>;
  }

  /**
   * 角色管理对象
   */
  class Role extends Object {
    /**
     * 使用指定的角色名和访问控制列表对象初始化角色管理对象
     * @param roleName 角色名称
     * @param acl 访问控制对象
     */
    constructor(roleName: string, acl: ACL);

    /**
     * 获取角色的name。同时可以使用role.get("name")
     */
    getName(): string;

    /**
     * 设置角色的名称。这个值必须要在保存前设置，而且只能设置一次
     * <p>
     *   角色的名称只能包含数字，字母， _, -。
     * </p>
     *
     * <p>等同于使用 role.set("name", name)</p>
     * @param name 角色的名称
     * @param options 函数反馈
     */
    setName(name: string, options?: {
      success?: () => void,
      error?: (error: Error) => void
    }): Promise<void>;

    /**
     * 获取这个角色对应的用户Bmob.Users。这些用户已经被分配了权限（例如读写的权限）。
     * 你能通过relation添加和移除这些用户
     * <p>这等同于使用 role.relation("users")</p>
     */
    getUsers(): Relation;

    /**
     * 获取这个角色对应的角色Bmob.Roles。这些用户已经被分配了权限（例如读写的权限）。
     * 你能通过relation添加和移除这些用户
     * <p>这等同于使用 role.relation("roles")</p>
     */
    getRoles(): Relation;
  }

  /**
   * 访问控制列表管理对象
   */
  class ACL {
    constructor();

    /**
     * 设置所有用户有读的权限。
     * @param allowed 是否允许
     */
    setPublicReadAccess(allowed: boolean): void;

    /**
     * 设置用户所属的角色有写的权限
     * @param role 角色名称，或者 Bmob.Role。
     * @param allowed 允许角色写这个对象
     * @throws {String} role不是Bmob.Role或字符串。
     */
    setRoleWriteAccess(role: string | Role, allowed: boolean): void;

    /**
     * 用户所属的角色是否允许写这个对象。就算返回false，这个角色或许有写的权限，如果他的父角色有写的权限。
     * @param role 角色名称，或者 Bmob.Role。
     * @throws {String} role不是Bmob.Role或字符串。
     */
    getRoleWriteAccess(role: string | Role): boolean;

    /**
     * 用户所属的角色是否允许读这个对象。就算返回false，这个角色或许有读的权限，如果他的父角色有读的权限。
     * @param role 角色名称，或者 Bmob.Role。
     */
    getRoleReadAccess(role: string | Role): boolean;

    /**
     * 是否所有用户有写的权限
     */
    getPublicWriteAccess(): boolean;

    /**
     * 是否所有用户有读的权限。
     */
    getPublicReadAccess(): boolean;

    /**
     * 设置所有用户有写的权限。
     * @param allowed 是否允许
     */
    setPublicWriteAccess(allowed: boolean): void;

    /**
     * 用户是否有写的权限。
     * 就算是返回false，用户或许可以访问对象，如果getPublicReadAccess返回ture，或者用户的角色有写的权限。
     * @param userId 用户id或对象id，或Bmob.Role
     */
    getWriteAccess(userId: string | Role): boolean;

    /**
     * 设置是否允许用户有写的权限
     * @param userId 用户id或对象id，或Bmob.Role
     * @param allowed 用户是否有写的权限
     */
    setWriteAccess(userId: string | Role, allowed: boolean): void;

    /**
     * 用户是否有读的权限。
     * 就算是返回false，用户或许可以访问对象，如果getPublicReadAccess返回ture，或者用户的角色有写的权限。
     * @param userId 用户id或对象id, 或者Bmob.Role.
     */
    getReadAccess(userId: string | Role): boolean;

    /**
     * 设置是否允许用户读取这个对象
     * @param userId 用户id或对象id，或Bmob.Role
     * @param allowed 用户是否有读的权限
     */
    setReadAccess(userId: string | Role, allowed: boolean): void;
  }

  class Relation {
    parent: Bmob.Object;
    key: string;
    targetClassName: string;

    constructor(parent: Bmob.Object, key: string);

    static reverseQuery(parentClass: string, relationKey: string, child: Bmob.Object): Query;

    add(objects: Bmob.Object | Array<Object>);

    remove(objects: Bmob.Object | Array<Object>);

    toJson(): Bmob.Object;

    query(): Query;
  }
}
