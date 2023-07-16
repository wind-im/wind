"use strict";
exports.__esModule = true;
exports.batchCheckUserOnlineGet = exports.onlineHeartbeatGet = exports.whoami = void 0;
var response_1 = require("./../../types/response");
var userService_1 = require("../../service/user/userService");
function whoami(req, res, next) {
    try {
        if (req.windImUser) {
            res.json({
                code: 0,
                data: req.windImUser
            });
        }
        else {
            res.json({
                code: 1,
                data: 'Please login in first.'
            });
        }
    }
    catch (e) {
        next(e);
    }
}
exports.whoami = whoami;
function onlineHeartbeatGet(req, res, next) {
    try {
        var resp = void 0;
        if (!req.windImUser) {
            resp = {
                code: response_1.respCode.sysError
            };
        }
        else {
            (0, userService_1.onlineHeartbeat)(req.windImUser.id);
            resp = { code: response_1.respCode.successCode };
        }
        res.json(resp);
    }
    catch (e) {
        next(e);
    }
}
exports.onlineHeartbeatGet = onlineHeartbeatGet;
function batchCheckUserOnlineGet(req, res, next) {
    try {
        res.json({});
    }
    catch (e) {
        next(e);
    }
}
exports.batchCheckUserOnlineGet = batchCheckUserOnlineGet;
