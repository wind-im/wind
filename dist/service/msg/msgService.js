"use strict";
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
exports.getPrivateMsgInfoById = exports.selectAllPrivateMsgInfoByUid = exports.getExistedPrivateMsg = exports.fetchPrivateMsgsByOffset = exports.persistPrivateMsg = exports.getDestUserOfPrivateMsg = exports.createPrivateMsgInfo = void 0;
var prismaHolder_1 = require("../../utils/prismaHolder");
var privateMsgType = 0;
function createPrivateMsgInfo(fromUid, toUid) {
    return __awaiter(this, void 0, void 0, function () {
        var privateMsgExisted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fromUid || !toUid || fromUid == toUid) {
                        return [2 /*return*/, { error: 'Invalid params' }];
                    }
                    return [4 /*yield*/, getExistedPrivateMsg(fromUid, toUid)];
                case 1:
                    privateMsgExisted = _a.sent();
                    if (privateMsgExisted && privateMsgExisted.length != 0) {
                        return [2 /*return*/, privateMsgExisted[0]];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.privateMsg.create({
                            data: {
                                fromUidRel: {
                                    connect: { id: fromUid }
                                },
                                toUidRel: {
                                    connect: { id: toUid }
                                }
                            }
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createPrivateMsgInfo = createPrivateMsgInfo;
function getDestUserOfPrivateMsg(privateMsgId, uid) {
    return __awaiter(this, void 0, void 0, function () {
        var privateMsg, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Number.isNaN(parseInt(privateMsgId))) {
                        return [2 /*return*/, null];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prismaHolder_1.prisma.privateMsg.findUnique({
                            where: {
                                id: parseInt(privateMsgId)
                            }
                        })];
                case 2:
                    privateMsg = _a.sent();
                    if (!privateMsg) {
                        return [2 /*return*/, null];
                    }
                    // choose peer id
                    if (privateMsg.toUid == uid) {
                        return [2 /*return*/, privateMsg.fromUid];
                    }
                    else if (privateMsg.fromUid == uid) {
                        return [2 /*return*/, privateMsg.toUid];
                    }
                    else {
                        console.error('Invalid privateMsgId and uid');
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log('#getDestUserOfPrivateMsg error');
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getDestUserOfPrivateMsg = getDestUserOfPrivateMsg;
function persistPrivateMsg(privateMsgId, fromUid, toUid, content) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prismaHolder_1.prisma.message.create({
                            data: {
                                fromUidRel: { connect: { id: fromUid } },
                                toUidRel: { connect: { id: toUid } },
                                privateMsgId: privateMsgId,
                                content: content,
                                msgType: privateMsgType,
                                pushed: true,
                                read: true
                            },
                            select: {
                                id: true,
                                fromUid: true,
                                content: true,
                                toUid: true,
                                createdAt: true,
                                fromUidRel: {
                                    select: {
                                        username: true
                                    }
                                }
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.persistPrivateMsg = persistPrivateMsg;
// paging by id, limit
function fetchPrivateMsgsByOffset(privateMsgId, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var pageSize, isFirstQuery, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pageSize = 20;
                    isFirstQuery = offset == -1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!isFirstQuery) return [3 /*break*/, 3];
                    return [4 /*yield*/, prismaHolder_1.prisma.message.findMany({
                            select: {
                                id: true,
                                fromUid: true,
                                fromUidRel: {
                                    select: {
                                        username: true
                                    }
                                },
                                createdAt: true,
                                toUid: true,
                                content: true
                            },
                            take: pageSize,
                            orderBy: {
                                id: 'desc'
                            },
                            where: {
                                privateMsgId: privateMsgId
                            }
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, prismaHolder_1.prisma.message.findMany({
                        select: {
                            id: true,
                            fromUid: true,
                            fromUidRel: {
                                select: {
                                    username: true
                                }
                            },
                            createdAt: true,
                            toUid: true,
                            content: true
                        },
                        take: pageSize,
                        skip: 1,
                        orderBy: {
                            id: 'desc'
                        },
                        cursor: {
                            id: offset
                        },
                        where: {
                            privateMsgId: privateMsgId
                        }
                    })];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.fetchPrivateMsgsByOffset = fetchPrivateMsgsByOffset;
function getExistedPrivateMsg(fromUid, toUid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.privateMsg.findMany({
                        where: {
                            OR: [
                                {
                                    fromUid: fromUid,
                                    toUid: toUid
                                },
                                {
                                    fromUid: toUid,
                                    toUid: fromUid
                                }
                            ]
                        },
                        include: {
                            fromUidRel: { select: { email: true } },
                            toUidRel: { select: { email: true } }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getExistedPrivateMsg = getExistedPrivateMsg;
function selectAllPrivateMsgInfoByUid(uid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.privateMsg.findMany({
                        where: {
                            OR: [
                                {
                                    fromUid: uid
                                },
                                {
                                    toUid: uid
                                }
                            ]
                        },
                        include: {
                            fromUidRel: { select: { email: true, username: true, tag: true } },
                            toUidRel: { select: { email: true, username: true, tag: true } }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectAllPrivateMsgInfoByUid = selectAllPrivateMsgInfoByUid;
function getPrivateMsgInfoById(msgId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Number.isNaN(parseInt(msgId))) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.privateMsg.findUnique({
                            where: {
                                id: parseInt(msgId)
                            },
                            include: {
                                fromUidRel: { select: { email: true, username: true, tag: true } },
                                toUidRel: { select: { email: true, username: true, tag: true } }
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPrivateMsgInfoById = getPrivateMsgInfoById;
