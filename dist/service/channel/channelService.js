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
exports.parseInviteCode = exports.generateInviteUrl = exports.createChannel = exports.deleteChannel = exports.checkUserJoinChannelStatus = exports.checkUserInChannel = exports.joinChannel = exports.getChannelListByUid = exports.leaveChannel = exports.isUserOnChannel = exports.getChannelMembers = exports.selectChannelById = void 0;
var prismaHolder_1 = require("../../utils/prismaHolder");
var Boom = __importStar(require("@hapi/boom"));
var roomService_1 = require("../room/roomService");
var redisHolder_1 = require("../../utils/redisHolder");
var crypto_1 = __importDefault(require("crypto"));
var channelStatus = {
    normal: 0,
    deleted: 1
};
var channelJoinStatus = {
    notJoin: 0,
    joined: 1,
    leave: 2
};
// 查询channel
function selectChannelById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.channel.findUnique({
                        where: {
                            id: id
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectChannelById = selectChannelById;
// 获取Channel的所有成员
function getChannelMembers(channelId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.findMany({
                        where: {
                            channelId: channelId,
                            status: channelStatus.normal
                        },
                        include: {
                            userRel: {
                                select: {
                                    username: true
                                }
                            }
                        }
                    })];
                case 1: 
                // todo 添加查询权限控制 & 校验参数
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getChannelMembers = getChannelMembers;
function isUserOnChannel(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.findUnique({
                        where: {
                            uid_channelId: {
                                uid: uid,
                                channelId: channelId
                            }
                        }
                    })];
                case 1:
                    channel = _a.sent();
                    if (!channel) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, channel.status == channelStatus.normal];
            }
        });
    });
}
exports.isUserOnChannel = isUserOnChannel;
// 离开channel
function leaveChannel(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channel, deleteRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.findUnique({
                        where: {
                            uid_channelId: {
                                uid: uid,
                                channelId: channelId
                            }
                        },
                        include: {
                            channelRel: true
                        }
                    })];
                case 1:
                    channel = _a.sent();
                    if (!channel) {
                        throw Boom.badRequest('Not in channel.');
                    }
                    if (channel.status == channelStatus.deleted) {
                        throw Boom.badRequest('Channel already deleted.');
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.update({
                            where: {
                                uid_channelId: {
                                    uid: uid,
                                    channelId: channelId
                                }
                            },
                            data: {
                                status: channelStatus.deleted
                            }
                        })];
                case 2:
                    deleteRes = _a.sent();
                    return [2 /*return*/, deleteRes];
            }
        });
    });
}
exports.leaveChannel = leaveChannel;
// 获取用户所在的channel列表
function getChannelListByUid(uid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.findMany({
                        where: {
                            uid: uid,
                            channelRel: {
                                status: channelStatus.normal,
                                roomsRel: {
                                    every: {
                                        status: roomService_1.roomStatus.normal
                                    }
                                }
                            }
                        },
                        select: {
                            uid: true,
                            channelId: true,
                            channelRel: {
                                select: {
                                    id: true,
                                    name: true,
                                    roomsRel: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getChannelListByUid = getChannelListByUid;
// join a channel
// todo add lock
function joinChannel(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channel, joinStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!uid || !channelId) {
                        throw Boom.badRequest('Illegal params.');
                    }
                    if (!Number.isInteger(channelId)) {
                        throw Boom.badRequest('Illegal channelId.');
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.channel.findUnique({
                            where: {
                                id: channelId
                            }
                        })];
                case 1:
                    channel = _a.sent();
                    if (channel == null || channel.status != channelStatus.normal) {
                        throw Boom.badRequest('No such channel.');
                    }
                    return [4 /*yield*/, checkUserJoinChannelStatus(uid, channelId)];
                case 2:
                    joinStatus = _a.sent();
                    if (!(joinStatus == channelJoinStatus.notJoin)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.create({
                            data: {
                                userRel: {
                                    connect: { id: uid }
                                },
                                channelRel: {
                                    connect: { id: channelId }
                                },
                                status: channelStatus.normal
                            }
                        })];
                case 3: 
                // first join
                return [2 /*return*/, _a.sent()];
                case 4:
                    if (!(joinStatus == channelJoinStatus.joined)) return [3 /*break*/, 5];
                    // already joined
                    throw Boom.badRequest('Already joined this channel.');
                case 5:
                    if (!(joinStatus == channelJoinStatus.leave)) return [3 /*break*/, 7];
                    return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.update({
                            where: {
                                uid_channelId: {
                                    uid: uid,
                                    channelId: channelId
                                }
                            },
                            data: {
                                status: channelStatus.normal
                            }
                        })];
                case 6: 
                // join this channel again
                return [2 /*return*/, _a.sent()];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.joinChannel = joinChannel;
// check if a user is in a channel
function checkUserInChannel(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isNaN(channelId) || isNaN(uid)) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, checkUserJoinChannelStatus(uid, channelId)];
                case 1:
                    status = _a.sent();
                    return [2 /*return*/, status == channelJoinStatus.joined];
            }
        });
    });
}
exports.checkUserInChannel = checkUserInChannel;
// check user's join status of a channel
function checkUserJoinChannelStatus(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var usersOnChannels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isNaN(channelId) || isNaN(uid)) {
                        return [2 /*return*/, channelJoinStatus];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.usersOnChannels.findUnique({
                            where: {
                                uid_channelId: {
                                    uid: uid,
                                    channelId: channelId
                                }
                            },
                            include: {
                                channelRel: true
                            }
                        })];
                case 1:
                    usersOnChannels = _a.sent();
                    if (usersOnChannels == null) {
                        // haven't join status
                        return [2 /*return*/, channelJoinStatus.notJoin];
                    }
                    else {
                        if (usersOnChannels.status == channelStatus.normal) {
                            // joined status
                            return [2 /*return*/, channelJoinStatus.joined];
                        }
                        else if (usersOnChannels.status == channelStatus.deleted) {
                            // leave status
                            return [2 /*return*/, channelJoinStatus.leave];
                        }
                        else {
                            // unknown status
                            return [2 /*return*/, channelJoinStatus.notJoin];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkUserJoinChannelStatus = checkUserJoinChannelStatus;
// delete channel
function deleteChannel(channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    channel = selectChannelById(channelId);
                    if (!channel) {
                        throw Boom.badRequest('Channel not exist.');
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.channel.update({
                            where: {
                                id: channelId
                            },
                            data: {
                                status: channelStatus.deleted
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteChannel = deleteChannel;
// create a channel, join thi channel, and then create a default room associated with it
function createChannel(uid, name, desc) {
    return __awaiter(this, void 0, void 0, function () {
        var channel, joinChannelResult, createDefaultRoomResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!uid || !name || !name.trim()) {
                        throw Boom.badRequest('Illegal params.');
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.channel.create({
                            data: {
                                name: name,
                                desc: desc,
                                ownerUidRel: {
                                    connect: { id: uid }
                                },
                                status: channelStatus.normal
                            },
                            select: {
                                id: true
                            }
                        })];
                case 1:
                    channel = _a.sent();
                    return [4 /*yield*/, joinChannel(uid, channel.id)];
                case 2:
                    joinChannelResult = _a.sent();
                    if (!joinChannelResult) {
                        console.error('joinChannel failed, but channel created. channel id: ' + channel.id);
                    }
                    return [4 /*yield*/, (0, roomService_1.createDefaultRoom)({ creatorId: uid, channelId: channel.id })];
                case 3:
                    createDefaultRoomResult = _a.sent();
                    if (!createDefaultRoomResult) {
                        console.error('createDefaultRoom failed, but channel created. channel id: ' + channel.id);
                    }
                    return [2 /*return*/, channel];
            }
        });
    });
}
exports.createChannel = createChannel;
function generateInviteUrl(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var isUserInChannel, code, FRONTEND_HOST;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkUserInChannel(uid, channelId)];
                case 1:
                    isUserInChannel = _a.sent();
                    if (!isUserInChannel) {
                        throw Boom.badRequest('User not in channel.');
                    }
                    return [4 /*yield*/, generateInviteCode(uid, channelId)];
                case 2:
                    code = _a.sent();
                    console.log('code:' + code);
                    if (code == null) {
                        throw Boom.badRequest('Generate invite code failed.');
                    }
                    FRONTEND_HOST = process.env.FRONTEND_HOST;
                    return [2 /*return*/, "".concat(FRONTEND_HOST, "/invite/").concat(code)];
            }
        });
    });
}
exports.generateInviteUrl = generateInviteUrl;
// generate a invite code
function generateInviteCode(uid, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var inviteInfo, code, expireSec;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (uid == null || channelId == null) {
                        return [2 /*return*/, null];
                    }
                    inviteInfo = {
                        invitorId: uid,
                        channelId: channelId
                    };
                    code = crypto_1["default"].randomUUID().split('-')[0];
                    expireSec = 60 * 60 * 24;
                    return [4 /*yield*/, redisHolder_1.redis.setex(code, expireSec, JSON.stringify(inviteInfo))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, code];
            }
        });
    });
}
function parseInviteCode(code) {
    return __awaiter(this, void 0, void 0, function () {
        var inviteInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, redisHolder_1.redis.get(buildInviteInfoKey(code))];
                case 1:
                    inviteInfo = _a.sent();
                    if (inviteInfo == null) {
                        return [2 /*return*/, {}];
                    }
                    return [2 /*return*/, JSON.parse(inviteInfo)];
            }
        });
    });
}
exports.parseInviteCode = parseInviteCode;
function buildInviteInfoKey(code) {
    return "invite_info_".concat(code);
}
