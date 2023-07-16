"use strict";
exports.__esModule = true;
exports.redis = void 0;
var ioredis_1 = require("ioredis");
var redis;
exports.redis = redis;
var devRedisUrl = '';
var betaRedisUrl = 'redis://redis:6379';
var prodRedisUrl = '';
try {
    console.log('WINDIM_ENV: ' + process.env.WINDIM_ENV);
    var redisUrl = '';
    if (process.env.WINDIM_ENV === 'dev') {
        redisUrl = devRedisUrl;
    }
    else if (process.env.WINDIM_ENV === 'beta') {
        redisUrl = betaRedisUrl;
    }
    else if (process.env.WINDIM_ENV === 'prod') {
        redisUrl = prodRedisUrl;
    }
    else {
        redisUrl = devRedisUrl;
    }
    console.log("redis url:" + redisUrl);
    exports.redis = redis = new ioredis_1.Redis(redisUrl);
    console.log("new redis:" + redis);
}
catch (e) {
    console.error(e);
}
