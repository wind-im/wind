"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.makeFriends = exports.breakFriends = exports.checkIsFriends = exports.getOnlineFriendList = exports.getFriendList = exports.selectFriendList = exports.getAllOnlineFriend = exports.getUserByEmail = exports.getUserByUsernameAndTag = exports.isReqStatusValid = void 0;
var friend_enums_1 = require("../../utils/friend-enums");
var Boom = __importStar(require("@hapi/boom"));
var prismaHolder_1 = require("../../utils/prismaHolder");
var userService_1 = require("../user/userService");
function isReqStatusValid(status) {
    return status == friend_enums_1.statusPass || status == friend_enums_1.statusRefuse;
}
exports.isReqStatusValid = isReqStatusValid;
function getUserByUsernameAndTag(username, tag) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username || !tag) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.user.findUnique({
                            select: {
                                id: true,
                                username: true,
                                tag: true
                            },
                            where: {
                                usernameAndTagIdx: {
                                    username: username,
                                    tag: tag
                                }
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUserByUsernameAndTag = getUserByUsernameAndTag;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (email == null || email == undefined) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.user.findUnique({
                            select: {
                                id: true,
                                email: true
                            },
                            where: {
                                email: email
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUserByEmail = getUserByEmail;
function getAllOnlineFriend(uid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // todo db获取好友列表
            // todo redis获取在线好友
            console.log('Not supported');
            return [2 /*return*/];
        });
    });
}
exports.getAllOnlineFriend = getAllOnlineFriend;
function selectFriendList(uid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.friend.findMany({
                        where: {
                            uid: uid
                        },
                        include: {
                            friendRel: {
                                select: {
                                    id: true,
                                    email: true,
                                    bio: true,
                                    username: true,
                                    tag: true
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectFriendList = selectFriendList;
function getFriendList(uid) {
    return __awaiter(this, void 0, void 0, function () {
        var result, friendListData, friendIdList, onlineFriendIdList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    if (uid == null) {
                        return [2 /*return*/, result];
                    }
                    return [4 /*yield*/, selectFriendList(uid)];
                case 1:
                    friendListData = _a.sent();
                    friendIdList = friendListData.map(function (friend) { return friend.friendId; });
                    return [4 /*yield*/, (0, userService_1.batchCheckUserOnline)(friendIdList)];
                case 2:
                    onlineFriendIdList = _a.sent();
                    friendListData.forEach(function (item) {
                        var isFriendOnline = onlineFriendIdList.includes(item.friendId);
                        var resultItem = __assign({}, item);
                        resultItem.friendRel.online = isFriendOnline;
                        result.push(resultItem);
                    });
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getFriendList = getFriendList;
function getOnlineFriendList(uid) {
    return __awaiter(this, void 0, void 0, function () {
        var result, friendList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    if (uid == null) {
                        return [2 /*return*/, result];
                    }
                    return [4 /*yield*/, getFriendList(uid)];
                case 1:
                    friendList = _a.sent();
                    if (friendList == null || friendList.length == 0) {
                        return [2 /*return*/, result];
                    }
                    return [2 /*return*/, friendList.filter(function (item) { return item.friendRel.online; })];
            }
        });
    });
}
exports.getOnlineFriendList = getOnlineFriendList;
function checkIsFriends(uid, friendId) {
    return __awaiter(this, void 0, void 0, function () {
        var relationOfUser, relationOfFriend, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prismaHolder_1.prisma.friend.findUnique({
                            where: {
                                uid_friendId: {
                                    uid: uid,
                                    friendId: friendId
                                }
                            }
                        })];
                case 1:
                    relationOfUser = _a.sent();
                    return [4 /*yield*/, prismaHolder_1.prisma.friend.findUnique({
                            where: {
                                uid_friendId: {
                                    uid: friendId,
                                    friendId: uid
                                }
                            }
                        })];
                case 2:
                    relationOfFriend = _a.sent();
                    if (relationOfUser && relationOfFriend && relationOfUser.status == friend_enums_1.statusPass && relationOfFriend.status == friend_enums_1.statusPass) {
                        return [2 /*return*/, true];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, false];
            }
        });
    });
}
exports.checkIsFriends = checkIsFriends;
// 删除好友
function breakFriends(uid, friendId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!uid || !friendId || friendId == uid) {
                return [2 /*return*/, Boom.badRequest('Illegal params.')];
            }
            return [2 /*return*/, Boom.badRequest('Unsupported fn.')];
        });
    });
}
exports.breakFriends = breakFriends;
// 添加好友
function makeFriends(reqId, uid, friendId) {
    return __awaiter(this, void 0, void 0, function () {
        var createFriendForUser, createFriendForFriend, updateFriendReq, txn, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!reqId || !uid || !friendId || friendId == uid) {
                        throw Boom.badRequest('Illegal params.');
                    }
                    return [4 /*yield*/, checkIsFriends(uid, friendId)];
                case 1:
                    // check if you were friends.
                    if (_a.sent()) {
                        throw Boom.badRequest('Already friends.');
                    }
                    createFriendForUser = prismaHolder_1.prisma.friend.create({
                        data: {
                            userRel: {
                                connect: { id: uid }
                            },
                            friendRel: {
                                connect: { id: friendId }
                            }
                        }
                    });
                    createFriendForFriend = prismaHolder_1.prisma.friend.create({
                        data: {
                            userRel: {
                                connect: { id: friendId }
                            },
                            friendRel: {
                                connect: { id: uid }
                            }
                        }
                    });
                    updateFriendReq = prismaHolder_1.prisma.friendRequest.update({
                        where: {
                            id: reqId
                        },
                        data: {
                            status: friend_enums_1.statusPass
                        }
                    });
                    if (!(createFriendForUser && createFriendForFriend && updateFriendReq)) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prismaHolder_1.prisma.$transaction([
                            createFriendForUser,
                            createFriendForFriend,
                            updateFriendReq
                        ])];
                case 3:
                    txn = _a.sent();
                    return [2 /*return*/, { code: 0 }];
                case 4:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, { error: e_2 }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.makeFriends = makeFriends;
