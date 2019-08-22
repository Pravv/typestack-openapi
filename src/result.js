const x = {
  'components': {
    'schemas': {
      'CrateUpdate': { 'properties': { 'crate': { 'minLength': 1, 'type': 'string' }, 'items': { '$ref': '#/components/schemas/Array', 'minLength': 1, 'type': 'string' } }, 'type': 'object', 'required': ['crate', 'items'] },
      'UserRegisterPayload': { 'properties': { 'email': { 'format': 'email', 'type': 'string' }, 'name': { 'minLength': 1, 'type': 'string' }, 'password': { 'minLength': 1, 'type': 'string' } }, 'type': 'object', 'required': ['email', 'name', 'password'] },
      'UserPatchPayload': { 'properties': { 'tradeToken': { 'minLength': 1, 'type': 'string' } }, 'type': 'object', 'required': ['tradeToken'] },
    }, 'securitySchemes': { 'basicAuth': { 'scheme': 'basic', 'type': 'http' } },
  }, 'info': { 'title': 'A sample API', 'version': '1.0.0', 'description': 'Generated with `routing-controllers-openapi`' }, 'openapi': '3.0.0', 'paths': {
    '/admin/crate/': { 'get': { 'operationId': 'AdminCrateController.getCrates', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get crates', 'tags': ['Admin Crate'] } },
    '/admin/crate/details/{crateId}': { 'get': { 'operationId': 'AdminCrateController.getCrate', 'parameters': [{ 'in': 'path', 'name': 'crateId', 'required': true, 'schema': { 'type': 'number' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get crate', 'tags': ['Admin Crate'] } },
    '/admin/support/': { 'get': { 'operationId': 'AdminSupportController.find', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Find', 'tags': ['Admin Support'] } },
    '/admin/support/{ticketId}': {
      'post': { 'operationId': 'AdminSupportController.respond', 'parameters': [{ 'in': 'path', 'name': 'ticketId', 'required': true, 'schema': { 'type': 'number' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'message': { 'type': 'string' } }, 'required': ['message'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Respond', 'tags': ['Admin Support'] },
      'patch': { 'operationId': 'AdminSupportController.update', 'parameters': [{ 'in': 'path', 'name': 'ticketId', 'required': true, 'schema': { 'type': 'number' } }], 'requestBody': { 'content': { 'application/json': { 'schema': {} } }, 'description': '', 'required': false }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Update', 'tags': ['Admin Support'] },
    },
    '/admin/setting': { 'get': { 'operationId': 'AdminController.getSettings', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get settings', 'tags': ['Admin'] } },
    '/admin/setting/{key}': { 'post': { 'operationId': 'AdminController.setSetting', 'parameters': [{ 'in': 'path', 'name': 'key', 'required': true, 'schema': { 'type': 'string' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'value': {} }, 'required': [], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Set setting', 'tags': ['Admin'] } },
    '/auth/register': { 'post': { 'operationId': 'AuthController.register', 'requestBody': { 'content': { 'application/json': { 'schema': { '$ref': '#/components/schemas/UserRegisterPayload' } } }, 'description': 'UserRegisterPayload', 'required': false }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Register', 'tags': ['Auth'] } },
    '/auth/login': { 'post': { 'operationId': 'AuthController.login', 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'email': { 'type': 'string' }, 'password': { 'type': 'string' } }, 'required': [], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Login', 'tags': ['Auth'] } },
    '/auth/logout': { 'post': { 'operationId': 'AuthController.logout', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Logout', 'tags': ['Auth'] } },
    '/auth/social/{provider}': {
      'get': { 'operationId': 'AuthController.socialRedirect', 'parameters': [{ 'in': 'path', 'name': 'provider', 'required': true, 'schema': { 'type': 'string' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Social redirect', 'tags': ['Auth'] },
      'post': { 'operationId': 'AuthController.socialLogin', 'parameters': [{ 'in': 'path', 'name': 'provider', 'required': true, 'schema': { 'type': 'string' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Social login', 'tags': ['Auth'] },
    },
    '/case-creator/items': { 'get': { 'operationId': 'CaseCreatorController.getAvailableItems', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get available items', 'tags': ['Case Creator'] } },
    '/case-creator/create': { 'post': { 'operationId': 'CaseCreatorController.create', 'requestBody': { 'content': { 'application/json': { 'schema': { '$ref': '#/components/schemas/CrateUpdate' } } }, 'description': 'CrateUpdate', 'required': true }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Create', 'tags': ['Case Creator'] } },
    '/case-creator/{crateId}': { 'patch': { 'operationId': 'CaseCreatorController.update', 'parameters': [{ 'in': 'path', 'name': 'crateId', 'required': true, 'schema': { 'type': 'number' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { '$ref': '#/components/schemas/CrateUpdate' } } }, 'description': 'CrateUpdate', 'required': true }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Update', 'tags': ['Case Creator'] } },
    '/chat/channels': { 'get': { 'operationId': 'ChatController.getChannels', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get channels', 'tags': ['Chat'] } },
    '/chat/message/{channel}': {
      'get': { 'operationId': 'ChatController.getMessages', 'parameters': [{ 'in': 'path', 'name': 'channel', 'required': true, 'schema': { 'type': 'string' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get messages', 'tags': ['Chat'] },
      'post': { 'operationId': 'ChatController.send', 'parameters': [{ 'in': 'path', 'name': 'channel', 'required': true, 'schema': { 'type': 'string' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'message': { 'type': 'string' } }, 'required': ['message'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Send', 'tags': ['Chat'] },
      'delete': { 'operationId': 'ChatController.remove', 'parameters': [{ 'in': 'path', 'name': 'channel', 'required': true, 'schema': { 'type': 'string' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'messageId': { 'type': 'string' } }, 'required': ['messageId'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Remove', 'tags': ['Chat'] },
    },
    '/chat/new-channel': { 'post': { 'operationId': 'ChatController.addChannel', 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'channel': { 'type': 'string' } }, 'required': [], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Add channel', 'tags': ['Chat'] } },
    '/crate/': { 'get': { 'operationId': 'CrateController.listCrates', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'List crates', 'tags': ['Crate'] } },
    '/crate/requirements': { 'get': { 'operationId': 'CrateController.getCratesRequirements', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get crates requirements', 'tags': ['Crate'] } },
    '/crate/requirements/{crateId}': { 'get': { 'operationId': 'CrateController.getCrateRequirements', 'parameters': [{ 'in': 'path', 'name': 'crateId', 'required': true, 'schema': { 'type': 'number' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get crate requirements', 'tags': ['Crate'] } },
    '/crate/details/{crateSlug}': { 'get': { 'operationId': 'CrateController.getCrate', 'parameters': [{ 'in': 'path', 'name': 'crateSlug', 'required': true, 'schema': { 'type': 'string' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get crate', 'tags': ['Crate'] } },
    '/crate/{crateId}': { 'post': { 'operationId': 'CrateController.openCrate', 'parameters': [{ 'in': 'path', 'name': 'crateId', 'required': true, 'schema': { 'type': 'number' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'clientSeed': { 'type': 'string' } }, 'required': ['clientSeed'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Open crate', 'tags': ['Crate'] } },
    '/crate/free/{crateId}': { 'post': { 'operationId': 'CrateController.openFreeCrate', 'parameters': [{ 'in': 'path', 'name': 'crateId', 'required': true, 'schema': { 'type': 'number' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'clientSeed': { 'type': 'string' } }, 'required': ['clientSeed'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Open free crate', 'tags': ['Crate'] } },
    '/crate/test/{crateId}': { 'post': { 'operationId': 'CrateController.testSpin', 'parameters': [{ 'in': 'path', 'name': 'crateId', 'required': true, 'schema': { 'type': 'number' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'clientSeed': { 'type': 'string' } }, 'required': ['clientSeed'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Test spin', 'tags': ['Crate'] } },
    '/leaderboard/week': { 'get': { 'operationId': 'LeaderbordController.getWeek', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get week', 'tags': ['Leaderbord'] } },
    '/leaderboard/day': { 'get': { 'operationId': 'LeaderbordController.getDay', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get day', 'tags': ['Leaderbord'] } },
    '/leaderboard/all-time': { 'get': { 'operationId': 'LeaderbordController.getAllTime', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get all time', 'tags': ['Leaderbord'] } },
    '/referral/': { 'get': { 'operationId': 'ReferralController.getReferral', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get referral', 'tags': ['Referral'] }, 'post': { 'operationId': 'ReferralController.createReferral', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Create referral', 'tags': ['Referral'] } },
    '/referral/use/{referralCode}': { 'post': { 'operationId': 'ReferralController.useReferral', 'parameters': [{ 'in': 'path', 'name': 'referralCode', 'required': true, 'schema': { 'type': 'string' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Use referral', 'tags': ['Referral'] } },
    '/referral/click/{referralCode}': { 'post': { 'operationId': 'ReferralController.addClick', 'parameters': [{ 'in': 'path', 'name': 'referralCode', 'required': true, 'schema': { 'type': 'string' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Add click', 'tags': ['Referral'] } },
    '/referral/collect': { 'post': { 'operationId': 'ReferralController.claimReferralFunds', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Claim referral funds', 'tags': ['Referral'] } },
    '/statistics/': { 'get': { 'operationId': 'StatisticsController.loadStatistics', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Load statistics', 'tags': ['Statistics'] } },
    '/statistics/latest-openings': { 'get': { 'operationId': 'StatisticsController.loadLatestOpenings', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Load latest openings', 'tags': ['Statistics'] } },
    '/support/': {
      'get': { 'operationId': 'SupportController.find', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Find', 'tags': ['Support'] },
      'post': { 'operationId': 'SupportController.create', 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'title': { 'type': 'string' }, 'message': { 'type': 'string' } }, 'required': ['title', 'message'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Create', 'tags': ['Support'] },
    },
    '/support/{ticketId}': { 'post': { 'operationId': 'SupportController.respond', 'parameters': [{ 'in': 'path', 'name': 'ticketId', 'required': true, 'schema': { 'type': 'number' } }], 'requestBody': { 'content': { 'application/json': { 'schema': { 'properties': { 'message': { 'type': 'string' } }, 'required': ['message'], 'type': 'object' } } } }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Respond', 'tags': ['Support'] } },
    '/support/{ticketId}/close': { 'post': { 'operationId': 'SupportController.close', 'parameters': [{ 'in': 'path', 'name': 'ticketId', 'required': true, 'schema': { 'type': 'number' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Close', 'tags': ['Support'] } },
    '/task/statistics/global': { 'get': { 'operationId': 'TaskController.gatherStatistics', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Gather statistics', 'tags': ['Task'] } },
    '/task/statistics/landing': { 'get': { 'operationId': 'TaskController.collectLandingStatistics', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Collect landing statistics', 'tags': ['Task'] } },
    '/user/': { 'get': { 'operationId': 'UserController.getUser', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get user', 'tags': ['User'] }, 'patch': { 'operationId': 'UserController.patchUser', 'requestBody': { 'content': { 'application/json': { 'schema': { '$ref': '#/components/schemas/UserPatchPayload' } } }, 'description': 'UserPatchPayload', 'required': false }, 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Patch user', 'tags': ['User'] } },
    '/user/hash': { 'get': { 'operationId': 'UserController.getServerHash', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get server hash', 'tags': ['User'] } },
    '/user/inventory': { 'get': { 'operationId': 'UserController.getUserInventory', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get user inventory', 'tags': ['User'] } },
    '/user/inventory/{itemId}/sell': { 'post': { 'operationId': 'UserController.sellInventoryItem', 'parameters': [{ 'in': 'path', 'name': 'itemId', 'required': true, 'schema': { 'type': 'number' } }], 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Sell inventory item', 'tags': ['User'] } },
    '/user/transactions': { 'get': { 'operationId': 'UserController.getTransactions', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get transactions', 'tags': ['User'] } },
    '/user/openings': { 'get': { 'operationId': 'UserController.getOpenings', 'responses': { '200': { 'content': { 'application/json': {} }, 'description': 'Successful response' } }, 'summary': 'Get openings', 'tags': ['User'] } },
  },
};