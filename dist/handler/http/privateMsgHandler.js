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
exports.getPrivateMsgByOffset = exports.privateMsgInfoGet = exports.privateMsgInfoPost = exports.privateMsgInfoListGet = void 0;
var friendService_1 = require("../../service/friend/friendService");
var msgService_1 = require("../../service/msg/msgService");
var Boom = __importStar(require("@hapi/boom"));
// get private msg list
function privateMsgInfoListGet(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, wrappedData, _a, _b, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    _a = wrapPrivateMsg;
                    _b = [user.id];
                    return [4 /*yield*/, (0, msgService_1.selectAllPrivateMsgInfoByUid)(user.id)];
                case 1:
                    wrappedData = _a.apply(void 0, _b.concat([_c.sent()]));
                    res.json({ data: wrappedData });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _c.sent();
                    next(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.privateMsgInfoListGet = privateMsgInfoListGet;
// create private msg
function privateMsgInfoPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, fromUid, toUsernameAndTag, username, tag, remoteUser, toUid, _a, _b, e_2;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    user = req.windImUser;
                    fromUid = user.id;
                    toUsernameAndTag = req.body.usernameAndTag;
                    username = toUsernameAndTag.split('#')[0];
                    tag = toUsernameAndTag.split('#')[1];
                    return [4 /*yield*/, (0, friendService_1.getUserByUsernameAndTag)(username, tag)];
                case 1:
                    remoteUser = _d.sent();
                    if (!(remoteUser === null || remoteUser === void 0 ? void 0 : remoteUser.id)) {
                        throw Boom.badRequest('No such user.');
                    }
                    toUid = remoteUser.id;
                    _b = (_a = res).json;
                    _c = {};
                    return [4 /*yield*/, (0, msgService_1.createPrivateMsgInfo)(fromUid, toUid)];
                case 2:
                    _b.apply(_a, [(_c.data = _d.sent(), _c)]);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _d.sent();
                    next(e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.privateMsgInfoPost = privateMsgInfoPost;
// get private msg by Id
function privateMsgInfoGet(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, msgId, msgInfo, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    msgId = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.id);
                    return [4 /*yield*/, (0, msgService_1.getPrivateMsgInfoById)(msgId)];
                case 1:
                    msgInfo = _b.sent();
                    if (!msgInfo) {
                        throw Boom.badRequest('No such msg.');
                    }
                    // just ignore this stupid warning
                    if (msgInfo.fromUid == user.id) {
                        msgInfo.msgTitle = msgInfo.toUidRel.username + '#' + msgInfo.toUidRel.tag;
                    }
                    else {
                        msgInfo.msgTitle = msgInfo.fromUidRel.username + '#' + msgInfo.fromUidRel.tag;
                    }
                    res.json({ data: msgInfo });
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _b.sent();
                    next(e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.privateMsgInfoGet = privateMsgInfoGet;
function wrapPrivateMsg(uid, allPrivateMsg) {
    return allPrivateMsg.map(function (m) {
        if (m.fromUid == uid) {
            m.msgTitle = m.toUidRel.username + '#' + m.toUidRel.tag;
        }
        else {
            m.msgTitle = m.fromUidRel.username + '#' + m.fromUidRel.tag;
        }
        return m;
    });
}
function getPrivateMsgByOffset(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var msgId, offset, privateMsg, e_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    msgId = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.id);
                    offset = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.offset);
                    if (msgId == null || offset == null) {
                        throw Boom.badRequest("misId or offset == null");
                    }
                    return [4 /*yield*/, (0, msgService_1.fetchPrivateMsgsByOffset)(msgId, offset)];
                case 1:
                    privateMsg = _c.sent();
                    console.log("#privateMsgByOffset msg:", JSON.stringify(privateMsg));
                    res.json({ data: privateMsg });
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _c.sent();
                    next(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPrivateMsgByOffset = getPrivateMsgByOffset;
