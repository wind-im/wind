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
exports.testPromiseWithTs = exports.batchCheckUserOnline = exports.getChannelOnlineInfo = exports.buildChannelOnlineUserskey = exports.becomeOfflineInChannel = exports.becomeOnlineInChannel = exports.onlineHeartbeat = exports.signup = exports.queryUserById = void 0;
var prismaHolder_1 = require("../../utils/prismaHolder");
var bcrypt_1 = __importDefault(require("bcrypt"));
var Boom = __importStar(require("@hapi/boom"));
var redisHolder_1 = require("../../utils/redisHolder");
var userOnlineRedisVal = 'true';
function queryUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.user.findUnique({
                        where: {
                            id: id
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.queryUserById = queryUserById;
function signup(email, username, pwd) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checkSignupParam(email, username, pwd);
                    return [4 /*yield*/, generateUserTag(username)];
                case 1:
                    tag = _a.sent();
                    if (!tag) {
                        throw Boom.badRequest('Failed to generate a tag for username:' + username);
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.user.create({
                            data: {
                                username: username,
                                tag: tag,
                                email: email,
                                pwd: bcrypt_1["default"].hashSync(pwd, 10)
                            },
                            select: {
                                username: true,
                                tag: true
                            }
                        })];
                case 2:
                    created = _a.sent();
                    return [2 /*return*/, created];
            }
        });
    });
}
exports.signup = signup;
function checkSignupParam(email, username, pwd) {
    if (!email ||
        !username ||
        !pwd ||
        !email.trim() ||
        !username.trim() ||
        !pwd.trim()) {
        throw Boom.badRequest('Invalid signup params.');
    }
    if (username.length > 12 || pwd.length > 16 || email.length > 50) {
        throw Boom.badRequest('Invalid legnth of signup params.');
    }
    // const emailReg = /'^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$'/
    // const emailIsValid = emailReg.test(email)
    // if (!emailIsValid) {
    //   throw Boom.badRequest('Invalid email' + email)
    // }
}
// tag format: 0000-9999
function generateUserTag(username) {
    return __awaiter(this, void 0, void 0, function () {
        var retryTimes, tag, userExisted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username) {
                        return [2 /*return*/];
                    }
                    retryTimes = 5;
                    _a.label = 1;
                case 1:
                    if (!(retryTimes > 0)) return [3 /*break*/, 3];
                    tag = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                    return [4 /*yield*/, prismaHolder_1.prisma.user.findUnique({
                            where: {
                                usernameAndTagIdx: {
                                    username: username,
                                    tag: tag
                                }
                            }
                        })];
                case 2:
                    userExisted = _a.sent();
                    if (!userExisted) {
                        return [2 /*return*/, tag];
                    }
                    retryTimes--;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// become online status（global）
function onlineHeartbeat(id) {
    return __awaiter(this, void 0, void 0, function () {
        var userOnlineKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userOnlineKey = buildUserOnlineKey(id);
                    return [4 /*yield*/, redisHolder_1.redis.set(userOnlineKey, userOnlineRedisVal, 'EX', 30)]; // after 30s, become offline automatically
                case 1:
                    _a.sent(); // after 30s, become offline automatically
                    return [2 /*return*/];
            }
        });
    });
}
exports.onlineHeartbeat = onlineHeartbeat;
function buildUserOnlineKey(id) {
    return "user-".concat(id, "-online");
}
// become online status in a channel
function becomeOnlineInChannel(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channelOnlineUsersKey;
        return __generator(this, function (_a) {
            channelOnlineUsersKey = buildChannelOnlineUserskey(channelId);
            redisHolder_1.redis.sadd(channelOnlineUsersKey, uid);
            return [2 /*return*/];
        });
    });
}
exports.becomeOnlineInChannel = becomeOnlineInChannel;
// become offline status in a channel
function becomeOfflineInChannel(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channelOnlineUsersKey;
        return __generator(this, function (_a) {
            channelOnlineUsersKey = buildChannelOnlineUserskey(channelId);
            redisHolder_1.redis.srem(channelOnlineUsersKey, uid);
            return [2 /*return*/];
        });
    });
}
exports.becomeOfflineInChannel = becomeOfflineInChannel;
function buildChannelOnlineUserskey(channelId) {
    return "channel-".concat(channelId, "-onlineUsers");
}
exports.buildChannelOnlineUserskey = buildChannelOnlineUserskey;
// get channel online info
function getChannelOnlineInfo(channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channelOnlineUsersKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    channelOnlineUsersKey = buildChannelOnlineUserskey(channelId);
                    return [4 /*yield*/, redisHolder_1.redis.smembers(channelOnlineUsersKey)];
                case 1: 
                // const onlineUserCnt = await redis.scard(channelOnlineUsersKey) // get element count of a set
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getChannelOnlineInfo = getChannelOnlineInfo;
// batch check if user is online
function batchCheckUserOnline(uidList) {
    return __awaiter(this, void 0, void 0, function () {
        var pipeline, result, onlineUidList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pipeline = redisHolder_1.redis.pipeline();
                    uidList.forEach(function (uid) {
                        var userOnlineKey = buildUserOnlineKey(uid);
                        pipeline.get(userOnlineKey);
                    });
                    return [4 /*yield*/, pipeline.exec()];
                case 1:
                    result = _a.sent();
                    onlineUidList = [];
                    result.forEach(function (item, index) {
                        if (item[1] === userOnlineRedisVal) {
                            onlineUidList.push(uidList[index]);
                        }
                    });
                    return [2 /*return*/, onlineUidList];
            }
        });
    });
}
exports.batchCheckUserOnline = batchCheckUserOnline;
function testPromiseWithTs() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    name: "sawyer",
                    age: 11
                }];
        });
    });
}
exports.testPromiseWithTs = testPromiseWithTs;
