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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.wsOnConnect = exports.wsAuthMiddleware = exports.buildRoomMsgInitEvent = exports.buildInitPrivateMsgEvent = void 0;
var cookie_1 = __importDefault(require("cookie"));
var authUtils_1 = require("../../utils/authUtils");
var msgService_1 = require("../../service/msg/msgService");
var roomService_1 = require("../../service/room/roomService");
// private msg format
function buildPrivateMsgEvent(privateMsgId) {
    return 'privateMsgEvent_' + privateMsgId;
}
// init private msg event
function buildInitPrivateMsgEvent(privateMsgId) {
    return 'privateMsgInitEvent_' + privateMsgId;
}
exports.buildInitPrivateMsgEvent = buildInitPrivateMsgEvent;
// room msg format
function buildRoomMsgEvent(roomId) {
    return 'roomMsgEvent_' + roomId;
}
// init room msg event
function buildRoomMsgInitEvent(roomId) {
    return 'roomMsgInitEvent_' + roomId;
}
exports.buildRoomMsgInitEvent = buildRoomMsgInitEvent;
// Middleware to attach msgId and user info
function wsAuthMiddleware(socket, next) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var user, roomId, privateMsgId, privateMsgOffset, roomMsgOffset, toUserId, e_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetchUserFromSocket(socket)];
                case 1:
                    user = _g.sent();
                    if (!user) {
                        next(new Error('unknown user'));
                    }
                    roomId = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.roomId;
                    privateMsgId = (_b = socket.handshake.query) === null || _b === void 0 ? void 0 : _b.privateMsgId;
                    privateMsgOffset = (_d = (_c = socket.handshake.query) === null || _c === void 0 ? void 0 : _c.privateMsgOffset) !== null && _d !== void 0 ? _d : 0;
                    roomMsgOffset = (_f = (_e = socket.handshake.query) === null || _e === void 0 ? void 0 : _e.roomMsgOffset) !== null && _f !== void 0 ? _f : 0;
                    if (!privateMsgId && !roomId) {
                        next(new Error('unknown msgId'));
                    }
                    return [4 /*yield*/, (0, msgService_1.getDestUserOfPrivateMsg)(privateMsgId, user.id)];
                case 2:
                    toUserId = _g.sent();
                    socket.data = {
                        user: user,
                        privateMsgId: privateMsgId,
                        toUserId: toUserId,
                        privateMsgOffset: privateMsgOffset,
                        roomMsgOffset: roomMsgOffset,
                        roomId: roomId
                    };
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _g.sent();
                    next(new Error('unknown user'));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.wsAuthMiddleware = wsAuthMiddleware;
function wsOnConnect(socket) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var roomId, privateMsgId, user, toUid, privateMsgOffset, roomMsgOffset, email, privateMsgEvent, roomMsgEvent;
        var _this = this;
        return __generator(this, function (_g) {
            roomId = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.roomId;
            privateMsgId = (_b = socket.data) === null || _b === void 0 ? void 0 : _b.privateMsgId;
            user = (_c = socket.data) === null || _c === void 0 ? void 0 : _c.user;
            toUid = (_d = socket.data) === null || _d === void 0 ? void 0 : _d.toUserId;
            privateMsgOffset = (_e = socket.data) === null || _e === void 0 ? void 0 : _e.privateMsgOffset;
            roomMsgOffset = (_f = socket.data) === null || _f === void 0 ? void 0 : _f.roomMsgOffset;
            email = user === null || user === void 0 ? void 0 : user.email;
            console.log("email:\"".concat(email, "\" connected with privateMsgId:").concat(privateMsgId, " roomId:").concat(roomId));
            privateMsgEvent = buildPrivateMsgEvent(privateMsgId);
            roomMsgEvent = buildRoomMsgEvent(roomId);
            socket.on('disconnect', function (reason) {
                console.log(email + ' disconnected. for reason:' + reason);
            });
            // if it's private msg, then send all missed direct msg
            if (privateMsgId != null) {
                // asynchronously send all missed direct msg by offset
                sendAllMissedPrivateMsg(socket, privateMsgId, privateMsgOffset);
                // handle receiving new private msg
                socket.on(privateMsgEvent, function (msg, ackFn) { return __awaiter(_this, void 0, void 0, function () {
                    var msgModel, msg2Send;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, msgService_1.persistPrivateMsg)(parseInt(privateMsgId), user.id, toUid, msg.content)
                                // const senderUsername = await queryUserById(msgModel.fromUid)
                            ];
                            case 1:
                                msgModel = _a.sent();
                                msg2Send = {
                                    content: msgModel.content,
                                    senderUsername: msgModel.fromUidRel.username,
                                    createdAt: msgModel.createdAt,
                                    id: msgModel.id
                                };
                                // simulate server timeout, and ack to client
                                // setTimeout(() => ackFn({ code: 0 }), 1000)
                                ackFn({ code: 0, sentMsg: msg2Send });
                                // broadcast: exclude the sender ws
                                socket.broadcast.emit(privateMsgEvent, msg2Send);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else if (roomId != null) {
                // asynchronously send all missed room msg by offset
                sendAllMissedRoomMsg(socket, roomId, roomMsgOffset);
                // handle receiving new room msg
                socket.on(roomMsgEvent, function (msg, ackFn) { return __awaiter(_this, void 0, void 0, function () {
                    var msgModel, msg2Send;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, roomService_1.persistRoomMsg)(parseInt(roomId), user.id, msg.content)];
                            case 1:
                                msgModel = _a.sent();
                                msg2Send = {
                                    content: msgModel.content,
                                    senderUsername: msgModel.fromUidRel.username,
                                    createdAt: msgModel.createdAt,
                                    id: msgModel.id
                                };
                                console.log('on receive room msg:' + JSON.stringify(msg2Send));
                                // simulate server timeout, and ack to client
                                // setTimeout(() => ackFn({ code: 0 }), 1000)
                                ackFn({ code: 0, sentMsg: msg2Send });
                                // broadcast: exclude the sender ws
                                socket.broadcast.emit(roomMsgEvent, msg2Send);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            return [2 /*return*/];
        });
    });
}
exports.wsOnConnect = wsOnConnect;
function fetchUserFromSocket(socket) {
    return __awaiter(this, void 0, void 0, function () {
        var cookies, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        cookies = cookie_1["default"].parse(socket.handshake.headers.cookie);
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return [4 /*yield*/, (0, authUtils_1.getUserFromCookieToken)(cookies === null || cookies === void 0 ? void 0 : cookies.token)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
function sendAllMissedPrivateMsg(socket, privateMsgId, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var privateMsgInitEvent, allMissedMsg, allMissedMsgVO;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!offset) {
                        offset = 0;
                    }
                    privateMsgInitEvent = buildInitPrivateMsgEvent(privateMsgId);
                    return [4 /*yield*/, (0, msgService_1.fetchAllMissedPrivateMsg)(parseInt(privateMsgId), parseInt(offset))];
                case 1:
                    allMissedMsg = _a.sent();
                    if (!allMissedMsg) {
                        return [2 /*return*/];
                    }
                    allMissedMsgVO = allMissedMsg.map(function (m) {
                        var msg2Send = {
                            id: m.id,
                            content: m.content,
                            senderUsername: m.fromUidRel.username,
                            createdAt: m.createdAt
                        };
                        return msg2Send;
                    });
                    socket.emit(privateMsgInitEvent, allMissedMsgVO);
                    return [2 /*return*/];
            }
        });
    });
}
function sendAllMissedRoomMsg(socket, roomId, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var privateMsgInitEvent, allMissedMsg, allMissedMsgVO;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (offset == null) {
                        offset = 0;
                    }
                    console.log("room msg offset:", offset);
                    privateMsgInitEvent = buildRoomMsgInitEvent(roomId);
                    return [4 /*yield*/, (0, roomService_1.fetchAllMissedRoomMsg)(parseInt(roomId), parseInt(offset))];
                case 1:
                    allMissedMsg = _a.sent();
                    console.log("offset:", offset, " msg:", JSON.stringify(allMissedMsg));
                    if (!allMissedMsg) {
                        return [2 /*return*/];
                    }
                    allMissedMsgVO = allMissedMsg.map(function (m) {
                        var msg2Send = {
                            id: m.id,
                            content: m.content,
                            senderUsername: m.fromUidRel.username,
                            createdAt: m.createdAt
                        };
                        return msg2Send;
                    });
                    socket.emit(privateMsgInitEvent, allMissedMsgVO);
                    return [2 /*return*/];
            }
        });
    });
}
