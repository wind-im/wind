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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var userService_1 = require("./service/user/userService");
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
    .get('/api/ts', authUtils_1.loginValidator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _b = (_a = res).json;
                _c = {};
                return [4 /*yield*/, (0, userService_1.testPromiseWithTs)()];
            case 1:
                _b.apply(_a, [(_c.data = _d.sent(), _c)]);
                return [2 /*return*/];
        }
    });
}); })
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
