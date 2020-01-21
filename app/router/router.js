const verifySignUpController = require('../api').verifySignUp;
const verifySignController = require('../api').verifySign;
const statusController = require('../api').status;
const verifyJwtTokenController = require('../api').verifyJwtToken;

module.exports = function (app) {

	//User Auth
	app.post('/api/auth/signup',
		[verifySignUpController.checkDuplicateUserNameOrEmail,
			verifySignUpController.checkRolesExisted
		],
		verifySignController.signup);

	app.post('/api/auth/signin', verifySignController.signin);

	//Status
	app.get('/api/status',
		statusController.list);
	app.get('/api/statususer',
		[verifyJwtTokenController.verifyToken],
		statusController.listStatusUser);
	app.get('/api/status/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		statusController.getById);
	app.post('/api/status',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		statusController.add);
	app.put('/api/status/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		statusController.update);
	app.delete('/api/status/:id',
		[verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		statusController.delete);
}