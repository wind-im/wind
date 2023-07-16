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
exports.fetchAllMissedRoomMsg = exports.persistRoomMsg = exports.deleteRoom = exports.createDefaultRoom = exports.findRoomsByChannelId = exports.findRoom = exports.createRoom = exports.joinRoom = exports.roomStatus = void 0;
var prismaHolder_1 = require("../../utils/prismaHolder");
var redisHolder_1 = require("../../utils/redisHolder");
exports.roomStatus = {
    normal: 0,
    deleted: 1
};
var roomMsgType = 1;
// Room is a notion of volatile group of users, which online status can be stored in some cache such as Redis.
// Text room only currently.
// join a room, use redis set to store who is in the room
// todo add lock
function joinRoom(uid, roomId) {
    return __awaiter(this, void 0, void 0, function () {
        var room, roomMembers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findRoom(roomId)];
                case 1:
                    room = _a.sent();
                    if (!room) {
                        throw new Error('Room not found');
                    }
                    return [4 /*yield*/, getRoomMembers(roomId)];
                case 2:
                    roomMembers = _a.sent();
                    roomMembers.push(uid);
                    redisHolder_1.redis.sadd(buildRoomMemberKey(roomId), roomMembers);
                    return [2 /*return*/];
            }
        });
    });
}
exports.joinRoom = joinRoom;
function getRoomMembers(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, redisHolder_1.redis.smembers(buildRoomMemberKey(roomId))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function buildRoomMemberKey(roomId) {
    return "room_member_".concat(roomId);
}
// create a room
function createRoom(_a) {
    var name = _a.name, desc = _a.desc, creatorId = _a.creatorId, channelId = _a.channelId;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.room.create({
                        data: {
                            name: name,
                            desc: desc,
                            status: exports.roomStatus.normal,
                            creatorUidRel: {
                                connect: { id: creatorId }
                            },
                            channelRel: {
                                connect: { id: channelId }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.createRoom = createRoom;
// find room by roomId
function findRoom(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.room.findUnique({
                        where: {
                            id: roomId
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findRoom = findRoom;
// find rooms by channelId
function findRoomsByChannelId(channelId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Number.isFinite(channelId)) {
                        throw new Error('Illegal channelId.');
                    }
                    return [4 /*yield*/, prismaHolder_1.prisma.room.findMany({
                            where: {
                                channelId: channelId,
                                status: exports.roomStatus.normal
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findRoomsByChannelId = findRoomsByChannelId;
// create a default room
function createDefaultRoom(_a) {
    var creatorId = _a.creatorId, channelId = _a.channelId;
    var name = 'Default Room';
    var desc = 'A Default Text Room';
    return createRoom({ name: name, desc: desc, creatorId: creatorId, channelId: channelId });
}
exports.createDefaultRoom = createDefaultRoom;
// delete a room
function deleteRoom(roomId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismaHolder_1.prisma.room.update({
                        where: {
                            id: roomId
                        },
                        data: {
                            status: exports.roomStatus.deleted
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteRoom = deleteRoom;
// persist room msg
function persistRoomMsg(roomId, fromUid, content) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prismaHolder_1.prisma.message.create({
                            data: {
                                fromUidRel: { connect: { id: fromUid } },
                                roomId: roomId,
                                content: content,
                                msgType: roomMsgType,
                                pushed: true,
                                read: true
                            },
                            select: {
                                id: true,
                                fromUid: true,
                                content: true,
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
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.persistRoomMsg = persistRoomMsg;
// fetch all missed room msg
function fetchAllMissedRoomMsg(roomId, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
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
                                roomId: true,
                                content: true
                            },
                            where: {
                                id: {
                                    gt: offset
                                },
                                roomId: roomId
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchAllMissedRoomMsg = fetchAllMissedRoomMsg;
