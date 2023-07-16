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
exports.friendReqGet = exports.friendReqPost = void 0;
var friendService_1 = require("../../service/friend/friendService");
var friendReqService_1 = require("../../service/friend/friendReqService");
var friend_enums_1 = require("../../utils/friend-enums");
var Boom = __importStar(require("@hapi/boom"));
function friendReqPost(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var opType, resultJson, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    opType = (_a = req.body) === null || _a === void 0 ? void 0 : _a.opType;
                    resultJson = void 0;
                    if (!(opType == 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, createNewFriendReq(req)];
                case 1:
                    resultJson = _b.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(opType == 1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleFriendReq(req)];
                case 3:
                    resultJson = _b.sent();
                    return [3 /*break*/, 5];
                case 4: throw Boom.badRequest('Invalid opType');
                case 5:
                    res.json(resultJson);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _b.sent();
                    next(e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.friendReqPost = friendReqPost;
function friendReqGet(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, _b, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    if (!user) {
                        throw Boom.badRequest('Please login first.');
                    }
                    _b = (_a = res).json;
                    return [4 /*yield*/, (0, friendReqService_1.getPendingFriendReqList)(user.id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _c.sent();
                    next(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.friendReqGet = friendReqGet;
/**
 * @param {Object} req.body
 * @param {Int} body.opType = 0
 * @param {Int} body.toUid
 * @returns {code, data, err}
*/
function createNewFriendReq(req) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fromUid, usernameAndTag, username, tag, toUser, toUid, content;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    fromUid = (_a = req.windImUser) === null || _a === void 0 ? void 0 : _a.id;
                    usernameAndTag = (_b = req.body) === null || _b === void 0 ? void 0 : _b.usernameAndTag;
                    if (!usernameAndTag || !usernameAndTag.trim()) {
                        throw Boom.badRequest('User not found.');
                    }
                    username = usernameAndTag.split('#')[0];
                    tag = usernameAndTag.split('#')[1];
                    if (!username || !tag) {
                        throw Boom.badRequest('User not found.');
                    }
                    return [4 /*yield*/, (0, friendService_1.getUserByUsernameAndTag)(username, tag)]; // todo use cache instead of requesting db directly.
                case 1:
                    toUser = _d.sent() // todo use cache instead of requesting db directly.
                    ;
                    if (!toUser) {
                        throw Boom.badRequest('User not found.');
                    }
                    toUid = toUser.id;
                    content = (_c = req.body) === null || _c === void 0 ? void 0 : _c.content;
                    if (!fromUid || !toUid || toUid == fromUid) {
                        throw Boom.badRequest('Invalid params error');
                    }
                    return [4 /*yield*/, (0, friendReqService_1.newFriendRequest)(fromUid, toUid, content)];
                case 2: return [2 /*return*/, _d.sent()];
            }
        });
    });
}
/**
 * @param {Object} req.body
 * @param {Int} body.reqId
 * @param {Int} body.opType = 1
 * @param {Int} body.status
 *
 * @returns {code, data, err}
 */
function handleFriendReq(req) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var user, reqId, status;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = req.windImUser;
                    reqId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.reqId;
                    status = (_b = req.body) === null || _b === void 0 ? void 0 : _b.status;
                    if (!reqId || !(0, friendService_1.isReqStatusValid)(status) || !user) {
                        return [2 /*return*/, Boom.badRequest('Invalid params.')];
                    }
                    if (!(status == friend_enums_1.statusPass)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, friendReqService_1.passFriendReq)(reqId, user.id)];
                case 1: 
                // pass new friend request
                return [2 /*return*/, _c.sent()];
                case 2: return [4 /*yield*/, (0, friendReqService_1.refuseFriendReq)(reqId)];
                case 3: 
                // refuse new friend request
                return [2 /*return*/, _c.sent()];
            }
        });
    });
}
function getFriendReq(uid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, friendReqService_1.getPendingFriendReqList)(uid)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
