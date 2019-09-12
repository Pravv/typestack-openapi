// @ts-ignore
export default {
  controllers: [
    {
      type: 'json',
      target: 'AdminCrateController',
      route: '/admin/crate'
    },
    {
      type: 'json',
      target: 'AdminSupportController',
      route: '/admin/support'
    },
    { type: 'json', target: 'AdminController', route: '/admin' },
    { type: 'json', target: 'AuthController', route: '/auth' },
    {
      type: 'json',
      target: 'CaseCreatorController',
      route: '/case-creator'
    },
    { type: 'json', target: 'ChatController', route: '/chat' },
    { type: 'json', target: 'CrateController', route: '/crate' },
    {
      type: 'json',
      target: 'LeaderbordController',
      route: '/leaderboard'
    },
    {
      type: 'json',
      target: 'ReferralController',
      route: '/referral'
    },
    {
      type: 'json',
      target: 'StatisticsController',
      route: '/statistics'
    },
    { type: 'json', target: 'SupportController', route: '/support' },
    { type: 'json', target: 'TaskController', route: '/task' },
    { type: 'json', target: 'UserController', route: '/user' }
  ],
  middlewares: [],
  interceptors: [],
  uses: [
    {
      target: 'CrateController',
      method: 'listCrates',
      middleware: '',
      afterAction: false
    },
    {
      target: 'CrateController',
      method: 'getCrate',
      middleware: '',
      afterAction: false
    },
    {
      target: 'CrateController',
      method: 'openFreeCrate',
      middleware: 'verifyCaptcha',
      afterAction: false
    }
  ],
  useInterceptors: [],
  actions: [
    {
      type: 'get',
      target: 'AdminCrateController',
      method: 'getCrates',
      route: '/'
    },
    {
      type: 'get',
      target: 'AdminCrateController',
      method: 'getCrate',
      route: '/details/:crateId'
    },
    {
      type: 'get',
      target: 'AdminSupportController',
      method: 'find',
      route: '/'
    },
    {
      type: 'post',
      target: 'AdminSupportController',
      method: 'respond',
      route: '/:ticketId'
    },
    {
      type: 'patch',
      target: 'AdminSupportController',
      method: 'update',
      route: '/:ticketId'
    },
    {
      type: 'get',
      target: 'AdminController',
      method: 'getSettings',
      route: '/setting'
    },
    {
      type: 'post',
      target: 'AdminController',
      method: 'setSetting',
      route: '/setting/:key'
    },
    {
      type: 'post',
      target: 'AuthController',
      method: 'register',
      route: '/register'
    },
    {
      type: 'post',
      target: 'AuthController',
      method: 'login',
      route: '/login'
    },
    {
      type: 'post',
      target: 'AuthController',
      method: 'logout',
      route: '/logout'
    },
    {
      type: 'get',
      target: 'AuthController',
      method: 'socialRedirect',
      route: '/social/:provider'
    },
    {
      type: 'post',
      target: 'AuthController',
      method: 'socialLogin',
      route: '/social/:provider'
    },
    {
      type: 'get',
      target: 'CaseCreatorController',
      method: 'getAvailableItems',
      route: '/items'
    },
    {
      type: 'post',
      target: 'CaseCreatorController',
      method: 'create',
      route: '/create'
    },
    {
      type: 'patch',
      target: 'CaseCreatorController',
      method: 'update',
      route: '/:crateId'
    },
    {
      type: 'get',
      target: 'ChatController',
      method: 'getChannels',
      route: '/channels'
    },
    {
      type: 'get',
      target: 'ChatController',
      method: 'getMessages',
      route: '/message/:channel'
    },
    {
      type: 'post',
      target: 'ChatController',
      method: 'addChannel',
      route: '/new-channel'
    },
    {
      type: 'post',
      target: 'ChatController',
      method: 'send',
      route: '/message/:channel'
    },
    {
      type: 'delete',
      target: 'ChatController',
      method: 'remove',
      route: '/message/:channel'
    },
    {
      type: 'get',
      target: 'CrateController',
      method: 'listCrates',
      route: '/'
    },
    {
      type: 'get',
      target: 'CrateController',
      method: 'getCratesRequirements',
      route: '/requirements'
    },
    {
      type: 'get',
      target: 'CrateController',
      method: 'getCrateRequirements',
      route: '/requirements/:crateId'
    },
    {
      type: 'get',
      target: 'CrateController',
      method: 'getCrate',
      route: '/details/:crateSlug'
    },
    {
      type: 'post',
      target: 'CrateController',
      method: 'openCrate',
      route: '/:crateId'
    },
    {
      type: 'post',
      target: 'CrateController',
      method: 'openFreeCrate',
      route: '/free/:crateId'
    },
    {
      type: 'post',
      target: 'CrateController',
      method: 'testSpin',
      route: '/test/:crateId'
    },
    {
      type: 'get',
      target: 'LeaderbordController',
      method: 'getWeek',
      route: '/week'
    },
    {
      type: 'get',
      target: 'LeaderbordController',
      method: 'getDay',
      route: '/day'
    },
    {
      type: 'get',
      target: 'LeaderbordController',
      method: 'getAllTime',
      route: '/all-time'
    },
    {
      type: 'get',
      target: 'ReferralController',
      method: 'getReferral',
      route: '/'
    },
    {
      type: 'post',
      target: 'ReferralController',
      method: 'createReferral',
      route: '/'
    },
    {
      type: 'post',
      target: 'ReferralController',
      method: 'useReferral',
      route: '/use/:referralCode'
    },
    {
      type: 'post',
      target: 'ReferralController',
      method: 'addClick',
      route: '/click/:referralCode'
    },
    {
      type: 'post',
      target: 'ReferralController',
      method: 'claimReferralFunds',
      route: '/collect'
    },
    {
      type: 'get',
      target: 'StatisticsController',
      method: 'loadStatistics',
      route: '/'
    },
    {
      type: 'get',
      target: 'StatisticsController',
      method: 'loadLatestOpenings',
      route: '/latest-openings'
    },
    {
      type: 'get',
      target: 'SupportController',
      method: 'find',
      route: '/'
    },
    {
      type: 'post',
      target: 'SupportController',
      method: 'create',
      route: '/'
    },
    {
      type: 'post',
      target: 'SupportController',
      method: 'respond',
      route: '/:ticketId'
    },
    {
      type: 'post',
      target: 'SupportController',
      method: 'close',
      route: '/:ticketId/close'
    },
    {
      type: 'get',
      target: 'TaskController',
      method: 'gatherStatistics',
      route: '/statistics/global'
    },
    {
      type: 'get',
      target: 'TaskController',
      method: 'collectLandingStatistics',
      route: '/statistics/landing'
    },
    {
      type: 'get',
      target: 'UserController',
      method: 'getUser',
      route: '/'
    },
    {
      type: 'patch',
      target: 'UserController',
      method: 'patchUser',
      route: '/'
    },
    {
      type: 'get',
      target: 'UserController',
      method: 'getServerHash',
      route: '/hash'
    },
    {
      type: 'get',
      target: 'UserController',
      method: 'getUserInventory',
      route: '/inventory'
    },
    {
      type: 'post',
      target: 'UserController',
      method: 'sellInventoryItem',
      route: '/inventory/:itemId/sell'
    },
    {
      type: 'get',
      target: 'UserController',
      method: 'getTransactions',
      route: '/transactions'
    },
    {
      type: 'get',
      target: 'UserController',
      method: 'getOpenings',
      route: '/openings'
    }
  ],
  params: [
    {
      type: 'param',
      object: 'AdminCrateController',
      method: 'getCrate',
      index: 0,
      name: 'crateId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'body-param',
      object: 'AdminSupportController',
      method: 'respond',
      index: 2,
      name: 'message',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'AdminSupportController',
      method: 'respond',
      index: 1,
      name: 'ticketId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'AdminSupportController',
      method: 'respond',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body',
      object: 'AdminSupportController',
      method: 'update',
      index: 1,
      parse: false,
      required: undefined,
      classTransform: undefined,
      validate: undefined,
      explicitType: undefined,
      extraOptions: undefined
    },
    {
      type: 'param',
      object: 'AdminSupportController',
      method: 'update',
      index: 0,
      name: 'ticketId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'body-param',
      object: 'AdminController',
      method: 'setSetting',
      index: 1,
      name: 'value',
      parse: false,
      required: undefined,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'AdminController',
      method: 'setSetting',
      index: 0,
      name: 'key',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'body',
      object: 'AuthController',
      method: 'register',
      index: 1,
      parse: false,
      required: undefined,
      classTransform: undefined,
      validate: undefined,
      explicitType: undefined,
      extraOptions: undefined
    },
    {
      type: 'session',
      object: 'AuthController',
      method: 'register',
      index: 0,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'body-param',
      object: 'AuthController',
      method: 'login',
      index: 2,
      name: 'password',
      parse: false,
      required: undefined,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'body-param',
      object: 'AuthController',
      method: 'login',
      index: 1,
      name: 'email',
      parse: false,
      required: undefined,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'session',
      object: 'AuthController',
      method: 'login',
      index: 0,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'session',
      object: 'AuthController',
      method: 'logout',
      index: 0,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'param',
      object: 'AuthController',
      method: 'socialRedirect',
      index: 0,
      name: 'provider',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'context',
      object: 'AuthController',
      method: 'socialLogin',
      index: 2,
      parse: false,
      required: false
    },
    {
      type: 'session',
      object: 'AuthController',
      method: 'socialLogin',
      index: 1,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'param',
      object: 'AuthController',
      method: 'socialLogin',
      index: 0,
      name: 'provider',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'body',
      object: 'CaseCreatorController',
      method: 'create',
      index: 1,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: { whitelist: true },
      explicitType: undefined,
      extraOptions: undefined
    },
    {
      type: 'current-user',
      object: 'CaseCreatorController',
      method: 'create',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body',
      object: 'CaseCreatorController',
      method: 'update',
      index: 2,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: { whitelist: true },
      explicitType: undefined,
      extraOptions: undefined
    },
    {
      type: 'param',
      object: 'CaseCreatorController',
      method: 'update',
      index: 1,
      name: 'crateId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'CaseCreatorController',
      method: 'update',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'param',
      object: 'ChatController',
      method: 'getMessages',
      index: 0,
      name: 'channel',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'body-param',
      object: 'ChatController',
      method: 'addChannel',
      index: 0,
      name: 'channel',
      parse: false,
      required: undefined,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'body-param',
      object: 'ChatController',
      method: 'send',
      index: 2,
      name: 'message',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'ChatController',
      method: 'send',
      index: 1,
      name: 'channel',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'ChatController',
      method: 'send',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body-param',
      object: 'ChatController',
      method: 'remove',
      index: 1,
      name: 'messageId',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'ChatController',
      method: 'remove',
      index: 0,
      name: 'channel',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'CrateController',
      method: 'getCratesRequirements',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'param',
      object: 'CrateController',
      method: 'getCrateRequirements',
      index: 1,
      name: 'crateId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'CrateController',
      method: 'getCrateRequirements',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'param',
      object: 'CrateController',
      method: 'getCrate',
      index: 0,
      name: 'crateSlug',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'body-param',
      object: 'CrateController',
      method: 'openCrate',
      index: 3,
      name: 'clientSeed',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'CrateController',
      method: 'openCrate',
      index: 2,
      name: 'crateId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'session',
      object: 'CrateController',
      method: 'openCrate',
      index: 1,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'current-user',
      object: 'CrateController',
      method: 'openCrate',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body-param',
      object: 'CrateController',
      method: 'openFreeCrate',
      index: 3,
      name: 'clientSeed',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'CrateController',
      method: 'openFreeCrate',
      index: 2,
      name: 'crateId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'session',
      object: 'CrateController',
      method: 'openFreeCrate',
      index: 1,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'current-user',
      object: 'CrateController',
      method: 'openFreeCrate',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body-param',
      object: 'CrateController',
      method: 'testSpin',
      index: 3,
      name: 'clientSeed',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'CrateController',
      method: 'testSpin',
      index: 2,
      name: 'crateId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'session',
      object: 'CrateController',
      method: 'testSpin',
      index: 1,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'current-user',
      object: 'CrateController',
      method: 'testSpin',
      index: 0,
      parse: false,
      required: undefined
    },
    {
      type: 'current-user',
      object: 'LeaderbordController',
      method: 'getWeek',
      index: 0,
      parse: false,
      required: undefined
    },
    {
      type: 'current-user',
      object: 'LeaderbordController',
      method: 'getDay',
      index: 0,
      parse: false,
      required: undefined
    },
    {
      type: 'current-user',
      object: 'LeaderbordController',
      method: 'getAllTime',
      index: 0,
      parse: false,
      required: undefined
    },
    {
      type: 'current-user',
      object: 'ReferralController',
      method: 'getReferral',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'current-user',
      object: 'ReferralController',
      method: 'createReferral',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'param',
      object: 'ReferralController',
      method: 'useReferral',
      index: 1,
      name: 'referralCode',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'ReferralController',
      method: 'useReferral',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'session',
      object: 'ReferralController',
      method: 'addClick',
      index: 1,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'param',
      object: 'ReferralController',
      method: 'addClick',
      index: 0,
      name: 'referralCode',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'ReferralController',
      method: 'claimReferralFunds',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'current-user',
      object: 'SupportController',
      method: 'find',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body-param',
      object: 'SupportController',
      method: 'create',
      index: 2,
      name: 'message',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'body-param',
      object: 'SupportController',
      method: 'create',
      index: 1,
      name: 'title',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'current-user',
      object: 'SupportController',
      method: 'create',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body-param',
      object: 'SupportController',
      method: 'respond',
      index: 2,
      name: 'message',
      parse: undefined,
      required: true,
      explicitType: undefined,
      classTransform: undefined,
      validate: undefined
    },
    {
      type: 'param',
      object: 'SupportController',
      method: 'respond',
      index: 1,
      name: 'ticketId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'SupportController',
      method: 'respond',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'param',
      object: 'SupportController',
      method: 'close',
      index: 1,
      name: 'ticketId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'SupportController',
      method: 'close',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'current-user',
      object: 'UserController',
      method: 'getUser',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'body',
      object: 'UserController',
      method: 'patchUser',
      index: 1,
      parse: false,
      required: undefined,
      classTransform: undefined,
      validate: undefined,
      explicitType: undefined,
      extraOptions: undefined
    },
    {
      type: 'current-user',
      object: 'UserController',
      method: 'patchUser',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'session',
      object: 'UserController',
      method: 'getServerHash',
      index: 0,
      name: undefined,
      parse: false,
      required: true,
      classTransform: undefined,
      validate: false
    },
    {
      type: 'current-user',
      object: 'UserController',
      method: 'getUserInventory',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'param',
      object: 'UserController',
      method: 'sellInventoryItem',
      index: 1,
      name: 'itemId',
      parse: false,
      required: true,
      classTransform: undefined
    },
    {
      type: 'current-user',
      object: 'UserController',
      method: 'sellInventoryItem',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'current-user',
      object: 'UserController',
      method: 'getTransactions',
      index: 0,
      parse: false,
      required: true
    },
    {
      type: 'current-user',
      object: 'UserController',
      method: 'getOpenings',
      index: 0,
      parse: false,
      required: true
    }
  ],
  responseHandlers: [
    {
      type: 'response-class-transform-options',
      value: { groups: ['admin'] },
      target: 'AdminCrateController',
      method: 'getCrates'
    },
    {
      type: 'authorized',
      target: 'AdminCrateController',
      method: 'getCrates',
      value: [2]
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['admin'] },
      target: 'AdminCrateController',
      method: 'getCrate'
    },
    {
      type: 'authorized',
      target: 'AdminCrateController',
      method: 'getCrate',
      value: [2]
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['admin'] },
      target: 'AdminSupportController',
      method: 'find'
    },
    {
      type: 'authorized',
      target: 'AdminSupportController',
      method: 'find',
      value: [2]
    },
    {
      type: 'authorized',
      target: 'AdminSupportController',
      method: 'respond',
      value: [2]
    },
    {
      type: 'authorized',
      target: 'AdminSupportController',
      method: 'update',
      value: [2]
    },
    {
      type: 'authorized',
      target: 'AdminController',
      method: 'getSettings',
      value: [2]
    },
    {
      type: 'on-undefined',
      target: 'AdminController',
      method: 'setSetting',
      value: 200
    },
    {
      type: 'authorized',
      target: 'AdminController',
      method: 'setSetting',
      value: [2]
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'AuthController',
      method: 'register'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'AuthController',
      method: 'login'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['admin'] },
      target: 'CaseCreatorController',
      method: 'getAvailableItems'
    },
    {
      type: 'authorized',
      target: 'CaseCreatorController',
      method: 'update',
      value: [2]
    },
    {
      type: 'authorized',
      target: 'ChatController',
      method: 'addChannel',
      value: [2]
    },
    {
      type: 'authorized',
      target: 'ChatController',
      method: 'remove',
      value: [2]
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['crate-items'] },
      target: 'CrateController',
      method: 'getCrate'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['opening'] },
      target: 'CrateController',
      method: 'openCrate'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'CrateController',
      method: 'openFreeCrate'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['opening'] },
      target: 'CrateController',
      method: 'testSpin'
    },
    {
      type: 'on-undefined',
      target: 'TaskController',
      method: 'collectLandingStatistics',
      value: 204
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'UserController',
      method: 'getUser'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'UserController',
      method: 'patchUser'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'UserController',
      method: 'getUserInventory'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'UserController',
      method: 'sellInventoryItem'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'UserController',
      method: 'getTransactions'
    },
    {
      type: 'response-class-transform-options',
      value: { groups: ['self'] },
      target: 'UserController',
      method: 'getOpenings'
    }
  ]
};
