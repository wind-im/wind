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
exports.__esModule = true;
exports.errorHandler = void 0;
var Boom = __importStar(require("@hapi/boom"));
var loginErrorCode = 403;
var loginErrorMsg = 'Please login first.';
function errorHandler(err, req, res, next) {
    console.error("#errorHandler, e=", err);
    if (Boom.isBoom(err)) {
        // boom login error
        if (err.output.payload.statusCode == loginErrorCode) {
            res.status(loginErrorCode);
            res.json({
                error: loginErrorCode,
                message: loginErrorMsg
            });
        }
        else {
            // other boom error
            res.status(err.output.payload.statusCode);
            res.json({
                error: err.output.payload.error,
                message: err.output.payload.message
            });
        }
    }
    else {
        // not boom error
        res.status(500);
        res.json({
            error: err,
            message: 'Unexpected error'
        });
    }
}
exports.errorHandler = errorHandler;
