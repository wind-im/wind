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
exports.channelInviteGet = exports.beOfflineInChannel = exports.beOnlineInChannel = exports.channelDelete = exports.channelUserInfoGet = exports.channelListGet = exports.channelJoinPost = exports.channelPost = exports.channelGet = void 0;
var channelService_1 = require("../../service/channel/channelService");
var userService_1 = require("../../service/user/userService");
var Boom = __importStar(require("@hapi/boom"));
// get channel info
function channelGet(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, channel, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    return [4 /*yield*/, (0, channelService_1.selectChannelById)(parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.channelId))];
                case 1:
                    channel = _b.sent();
                    res.json({ code: 0, message: 'succeed', data: channel });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    next(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.channelGet = channelGet;
// create channel
function channelPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, body, channel, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    body = req.body;
                    return [4 /*yield*/, (0, channelService_1.createChannel)(user.id, body.name, body.desc)];
                case 1:
                    channel = _a.sent();
                    if (channel) {
                        res.json({ code: 0, message: 'succeed', data: { channelId: channel.id } });
                    }
                    else {
                        res.json({ code: 1, message: 'error' });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    next(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.channelPost = channelPost;
function channelJoinPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, body, channel, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    body = req.body;
                    return [4 /*yield*/, (0, channelService_1.joinChannel)(user.id, parseInt(body.channelId))];
                case 1:
                    channel = _a.sent();
                    if (channel) {
                        res.json({ code: 0, message: 'succeed' });
                    }
                    else {
                        res.json({ code: 1, message: 'error' });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    next(e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.channelJoinPost = channelJoinPost;
// get all channel I joined info
function channelListGet(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, body, result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    body = req.body;
                    return [4 /*yield*/, (0, channelService_1.getChannelListByUid)(user.id)];
                case 1:
                    result = _a.sent();
                    console.log('#channelListGet channelList' + JSON.stringify(result));
                    res.json({ data: result });
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    next(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.channelListGet = channelListGet;
// get all crew by channelId
function channelUserInfoGet(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, channelId, isUserInChannel, members, onlineMembers_1, membersResult_1, onlineUserCnt, offlineUserCnt, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    console.log('channelMembersGet req:' + JSON.stringify(req.query));
                    user = req.windImUser;
                    channelId = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.id);
                    return [4 /*yield*/, (0, channelService_1.checkUserInChannel)(user.id, channelId)];
                case 1:
                    isUserInChannel = _b.sent();
                    if (!isUserInChannel) {
                        throw Boom.badRequest('You are not in this channel.');
                    }
                    if (isNaN(channelId)) {
                        throw Boom.badRequest('Invalid params error');
                    }
                    return [4 /*yield*/, (0, channelService_1.getChannelMembers)(channelId)];
                case 2:
                    members = _b.sent();
                    return [4 /*yield*/, (0, userService_1.getChannelOnlineInfo)(channelId)];
                case 3:
                    onlineMembers_1 = _b.sent();
                    membersResult_1 = [];
                    members.map(function (member) {
                        var online = onlineMembers_1.includes(member.uid.toString());
                        membersResult_1.push(__assign(__assign({}, member), { online: online }));
                        return member;
                    });
                    onlineUserCnt = onlineMembers_1.length;
                    offlineUserCnt = members.length - onlineUserCnt;
                    res.json({ code: 0, data: { members: membersResult_1, onlineUserCnt: onlineUserCnt, offlineUserCnt: offlineUserCnt } });
                    return [3 /*break*/, 5];
                case 4:
                    e_5 = _b.sent();
                    next(e_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.channelUserInfoGet = channelUserInfoGet;
// delete channel
function channelDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, body, channel, channelDeleted, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = req.windImUser;
                    body = req.body;
                    return [4 /*yield*/, (0, channelService_1.selectChannelById)(parseInt(body.channelId))];
                case 1:
                    channel = _a.sent();
                    if (!channel) {
                        throw Boom.badRequest('Channel not exist.');
                    }
                    if (channel.ownerUid != user.id) {
                        throw Boom.badRequest('You are not the owner of this channel.');
                    }
                    return [4 /*yield*/, (0, channelService_1.deleteChannel)(parseInt(body.channelId))];
                case 2:
                    channelDeleted = _a.sent();
                    console.log('#channelDelete deleted channelId:' + body.channelId);
                    if (channelDeleted) {
                        res.json({ code: 0, message: 'succeed' });
                    }
                    else {
                        res.json({ code: 1, message: 'error' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    next(e_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.channelDelete = channelDelete;
function beOnlineInChannel(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var channelId, user;
        return __generator(this, function (_b) {
            try {
                channelId = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.channelId);
                if (!channelId) {
                    throw Boom.badRequest('Invalid params error');
                }
                user = req.windImUser;
                if (!(0, channelService_1.isUserOnChannel)(user.id, channelId)) {
                    throw Boom.badRequest('You have not joined this channel yet');
                }
                (0, userService_1.becomeOnlineInChannel)(user.id, channelId);
                res.json({ code: 0, data: 'beOnlineInChannel' });
            }
            catch (e) {
                next(e);
            }
            return [2 /*return*/];
        });
    });
}
exports.beOnlineInChannel = beOnlineInChannel;
function beOfflineInChannel(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var channelId, user;
        return __generator(this, function (_b) {
            try {
                channelId = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.channelId);
                if (!channelId) {
                    throw Boom.badRequest('Invalid params error');
                }
                user = req.windImUser;
                (0, userService_1.becomeOfflineInChannel)(user.id, channelId);
                res.json({ code: 0, data: 'beOfflineInChannel' });
            }
            catch (e) {
                next(e);
            }
            return [2 /*return*/];
        });
    });
}
exports.beOfflineInChannel = beOfflineInChannel;
function channelInviteGet(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, channelId, inviteUrl, e_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    user = req.windImUser;
                    channelId = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.channelId);
                    return [4 /*yield*/, (0, channelService_1.generateInviteUrl)(user.id, channelId)];
                case 1:
                    inviteUrl = _b.sent();
                    res.json({ code: 0, data: { inviteUrl: inviteUrl } });
                    return [3 /*break*/, 3];
                case 2:
                    e_7 = _b.sent();
                    next(e_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.channelInviteGet = channelInviteGet;
