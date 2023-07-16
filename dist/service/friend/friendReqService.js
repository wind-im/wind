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
exports.__esModule = true;
exports.newFriendRequest = exports.refuseFriendReq = exports.passFriendReq = exports.getFriendReqById = exports.getPendingFriendReqList = void 0;
var friend_enums_1 = require("../../utils/friend-enums");
var prismaHolder_1 = require("../../utils/prismaHolder");
var Boom = __importStar(require("@hapi/boom"));
var friendService_1 = require("./friendService");
function getPendingFriendReqList(uid) {
    return __awaiter(this, void 0, void 0, function () {
        var friendReqList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.friendRequest.findMany({
                        where: {
                            toUid: uid,
                            status: friend_enums_1.statusPending
                        },
                        include: {
                            fromUidRel: {
                                select: {
                                    email: true,
                                    username: true,
                                    tag: true
                                }
                            }
                        }
                    })];
                case 1:
                    friendReqList = _a.sent();
                    return [2 /*return*/, { code: 0, data: friendReqList }];
            }
        });
    });
}
exports.getPendingFriendReqList = getPendingFriendReqList;
function getFriendReqById(reqId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!reqId) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.friendRequest.findUnique({
                            where: {
                                id: reqId
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getFriendReqById = getFriendReqById;
function passFriendReq(reqId, uid) {
    return __awaiter(this, void 0, void 0, function () {
        var friendReq, friendId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFriendReqById(reqId)];
                case 1:
                    friendReq = _a.sent();
                    if (!friendReq) {
                        return [2 /*return*/, Boom.badRequest('Invalid reqId.')];
                    }
                    friendId = friendReq.fromUid;
                    if (friendReq.status != friend_enums_1.statusPending) {
                        return [2 /*return*/, Boom.badRequest('Handled already.')];
                    }
                    if (friendReq.toUid != uid) {
                        return [2 /*return*/, Boom.badRequest('Not your request.')];
                    }
                    return [4 /*yield*/, (0, friendService_1.makeFriends)(reqId, uid, friendId)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.passFriendReq = passFriendReq;
function refuseFriendReq(reqId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!reqId) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.friendRequest.updateMany({
                            where: {
                                id: reqId,
                                status: friend_enums_1.statusPending
                            },
                            data: {
                                status: friend_enums_1.statusRefuse
                            }
                        })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, { code: 0 }];
            }
        });
    });
}
exports.refuseFriendReq = refuseFriendReq;
function newFriendRequest(fromUid, toUid, content) {
    return __awaiter(this, void 0, void 0, function () {
        var friendUser, findReqFromRemote, findReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fromUid || !toUid) {
                        return [2 /*return*/, { error: 'Invalid params' }];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.user.findUnique({
                            where: {
                                id: toUid
                            }
                        })];
                case 1:
                    friendUser = _a.sent();
                    if (!friendUser) {
                        return [2 /*return*/, { error: 'No such remote user' }];
                    }
                    return [4 /*yield*/, (0, friendService_1.checkIsFriends)(fromUid, toUid)];
                case 2:
                    // todo 加锁
                    // find existed friend realtion.
                    if (_a.sent()) {
                        console.log('checkIsFriends checkIsFriends');
                        throw Boom.badRequest('Already friends....');
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.friendRequest.findUnique({
                            where: {
                                fromUidAndtoUidIdx: {
                                    fromUid: toUid,
                                    toUid: fromUid
                                }
                            }
                        })];
                case 3:
                    findReqFromRemote = _a.sent();
                    if ((findReqFromRemote === null || findReqFromRemote === void 0 ? void 0 : findReqFromRemote.status) == friend_enums_1.statusPending) {
                        throw Boom.badRequest('Got a pending request from remote.');
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.friendRequest.findUnique({
                            where: {
                                fromUidAndtoUidIdx: {
                                    fromUid: fromUid,
                                    toUid: toUid
                                }
                            }
                        })
                        // if there is an refused a req, update it.
                    ];
                case 4:
                    findReq = _a.sent();
                    if (!findReq) return [3 /*break*/, 6];
                    if (findReq.status == friend_enums_1.statusPass) {
                        return [2 /*return*/, { error: 'You two are friends already.' }];
                    }
                    if (findReq.status == friend_enums_1.statusPending) {
                        return [2 /*return*/, { error: 'Please wait for reply.' }];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.friendRequest.update({
                            where: {
                                fromUidAndtoUidIdx: {
                                    fromUid: fromUid,
                                    toUid: toUid
                                }
                            },
                            data: {
                                status: friend_enums_1.statusPending,
                                content: content
                            }
                        })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: 
                // there is no existed req, create one.
                return [4 /*yield*/, prismaHolder_1.prisma.friendRequest.create({
                        data: {
                            fromUid: fromUid,
                            toUid: toUid,
                            status: friend_enums_1.statusPending,
                            content: content
                        }
                    })];
                case 7:
                    // there is no existed req, create one.
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/, { code: 0 }];
            }
        });
    });
}
exports.newFriendRequest = newFriendRequest;
