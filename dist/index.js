"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var socket_io_1 = require("socket.io");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var Boom = __importStar(require("@hapi/boom"));
var cors_1 = __importDefault(require("cors"));
var msgHandler_1 = require("./handler/ws/msgHandler");
var authUtils_1 = require("./utils/authUtils");
var privateMsgHandler_1 = require("./handler/http/privateMsgHandler");
var userHandler_1 = require("./handler/http/userHandler");
var errorHandler_1 = require("./handler/http/errorHandler");
var loginHandler_1 = require("./handler/http/loginHandler");
var signupHandler_1 = require("./handler/http/signupHandler");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var logoutHandler_1 = require("./handler/http/logoutHandler");
var friendReqhandler_1 = require("./handler/http/friendReqhandler");
var friendHandler_1 = require("./handler/http/friendHandler");
var channelHandler_1 = require("./handler/http/channelHandler");
var roomMsgHandler_1 = require("./handler/http/roomMsgHandler");
dotenv_1["default"].config();
var FRONTEND_HOST = process.env.FRONTEND_HOST;
var app = (0, express_1["default"])();
var server = http_1["default"].createServer(app);
var corsOptions = {
    credentials: true,
    origin: FRONTEND_HOST,
    optionsSuccessStatus: 200
};
// http service
app.use((0, cookie_parser_1["default"])());
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use((0, cors_1["default"])(corsOptions))
    .get('/', function (req, res) {
    res.send('Hello Wind-IM.');
})
    .get('/r', function (req, res) {
    res.redirect('/api/whoami');
})
    .get('/error', function (req, res, next) {
    next(Boom.forbidden('hello Boom'));
})
    .get('/api/whoami', authUtils_1.loginValidator, userHandler_1.whoami)
    .get('/api/msg/privateMsgList', authUtils_1.loginValidator, privateMsgHandler_1.privateMsgListGet)
    .get('/api/msg/privateMsg', authUtils_1.loginValidator, privateMsgHandler_1.privateMsgGet)
    .post('/api/msg/privateMsg', authUtils_1.loginValidator, privateMsgHandler_1.privateMsgPost)
    .post('/api/login', loginHandler_1.loginPost)
    .post('/api/signup', signupHandler_1.signupPost)
    .post('/api/logout', authUtils_1.loginValidator, logoutHandler_1.logoutPost)
    .get('/api/friendRequest', authUtils_1.loginValidator, friendReqhandler_1.friendReqGet)
    .post('/api/friendRequest', authUtils_1.loginValidator, friendReqhandler_1.friendReqPost)
    .get('/api/friends', authUtils_1.loginValidator, friendHandler_1.friendGet)
    .get('/api/onlineFriends', authUtils_1.loginValidator, friendHandler_1.onlineFriendsGet)
    .post('/api/channel', authUtils_1.loginValidator, channelHandler_1.channelPost)
    .get('/api/channel', authUtils_1.loginValidator, channelHandler_1.channelGet)
    .get('/api/channelList', authUtils_1.loginValidator, channelHandler_1.channelListGet)
    .post('/api/channel/join', authUtils_1.loginValidator, channelHandler_1.channelJoinPost)
    .get('/api/channel/channelUserInfo', authUtils_1.loginValidator, channelHandler_1.channelUserInfo)
    .post('/api/channel/delete', authUtils_1.loginValidator, channelHandler_1.channelDelete)
    .get('/api/roomList', authUtils_1.loginValidator, roomMsgHandler_1.roomListGet)
    .get('/api/room', authUtils_1.loginValidator, roomMsgHandler_1.roomGet)
    .get('/api/leave', authUtils_1.loginValidator, function (req, res) {
    console.log('/api/leave');
    res.json({ code: 200 });
})
    .get('/api/beOnlineInChannel', authUtils_1.loginValidator, channelHandler_1.beOnlineInChannel)
    .get('/api/beOfflineInChannel', authUtils_1.loginValidator, channelHandler_1.beOfflineInChannel)
    // .get('/api/channelOnlineUsers', loginValidator, channelOnlineUsers)
    .get('/api/onlineHeartbeat', authUtils_1.loginValidator, userHandler_1.onlineHeartbeatGet)
    .get('/api/batchCheckUserOnline', authUtils_1.loginValidator, userHandler_1.batchCheckUserOnlineGet)
    .get('/api/channelInviteUrl', authUtils_1.loginValidator, channelHandler_1.channelInviteGet)
    .use(errorHandler_1.errorHandler); // for handling global error
// ws service
var io = new socket_io_1.Server(server, {
    cors: {
        origin: FRONTEND_HOST
    }
});
io.use(msgHandler_1.wsAuthMiddleware)
    .on('connection', msgHandler_1.wsOnConnect);
// start http & ws server
server.listen(2000, function () {
    console.log('listening on *:2000');
});
