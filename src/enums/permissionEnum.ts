export enum PERMISSION_ENUM {
  /** 充值方案 */
  // 销售方案详情
  CHARGE_DETAIL = '2300',
  // 销售方案列表
  CHARGE_LIST = '2301',
  // 添加销售方案
  ADD_CHARGE = '2302',
  // 修改销售方案
  EDIT_CHARGE = '2303',
  // 删除销售方案
  DELETE_CHARGE = '2304',

  /** 提现核销 */
  // 核销列表
  WITHDRAW_LIST = '3200',
  // 提现详情
  WITHDRAW_DETAIL = '3201',
  // 提现记录修改
  WITHDRAW_EDIT = '3202',
  // 提现
  WITHDRAW = '3203',
  // 提现记录列表
  WITHDRAW_RECORD = '3204',

  /** 首页管理 */
  // 首页详情
  HOME_DETAIL = '2200',
  // 首页列表
  HOME_LIST = '2201',
  // 首页增加
  HOME_ADD = '2202',
  // 首页修改
  HOME_EDIT = '2203',
  // 首页详情
  HOME_DELETE = '2204',

  /** 投流管理 */
  // 投流详情
  INVEST_DETAIL = '3100',
  // 投流列表
  INVEST_LIST = '3101',
  // 新增投流
  INVEST_ADD = '3102',
  // 修改投流
  INVEST_EDIT = '3103',
  // 删除投流
  INVEST_DELETE = '3104',

  /** 数据看板 */
  // 数据看板 DataView
  DATA_VIEW = '4000',
  // 订单查询
  ORDER_SEARCH = '4001',
  // 订单统计
  ORDER_STATICS = '4002',
  // 用户数据
  USER_DATA = '4003',

  /** 标签管理 */
  // 标签列表
  TAG_LIST = '2100',
  // 标签分类列表
  TAG_CATEGORY = '2101',
  // 添加标签
  TAG_ADD = '2102',
  // 标签修改
  TAG_EDIT = '2103',
  // 标签删除
  TAG_DELETE = '2104',

  /** 分销商管理 */
  // 分销商搜索
  SALES_LIST = '3000',
  // 下级分销商分页
  SALES_NEXT = '3001',
  // 分销商详情
  SALES_DETAIL = '3002',
  // 添加分销商
  SALES_ADD = '3003',
  // 修改分销商
  SALES_EDIT = '3004',
  // 片方搜索
  SALES_SEARCH = '3005',
  // 添加物品或剧集方案
  SALES_ITEM_ADD = '3006',
  // 修改方案
  SALES_ITEM_EDIT = '3007',
  // 删除方案
  SALES_ITEM_DELETE = '3008',

  /** 短剧管理 */
  // 获取上传路径
  SERIES_UPLOAD_URL = '2000',
  // 新增剧集
  SERIES_ADD = '2001',
  // 初始化剧集
  SERIES_INIT = '2002',
  // 搜索剧集
  SERIES_SEARCH = '2003',
  // 剧集详情
  SERIES_DETAIL = '2004',
  // 剧集修改
  SERIES_UPDATE = '2005',
  // 剧集推荐状态
  SERIES_STATE = '2006',
  // 剧集顺序
  SERIES_SORT = '2008',
  // 短剧删除
  SERIES_DELETE = '2009',

  TEST = '0000',
}
