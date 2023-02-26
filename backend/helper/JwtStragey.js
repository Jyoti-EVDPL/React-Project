require("dotenv").config();
const password =require('passport');
const User = require("../models/UserModel");
var jwtStragey = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// var Employees = require("../models/UserModel");
var keys={};
keys.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
keys.secretOrKey = process.env.PRIVATE_KEY,

module.exports = function (passport) {
    passport.use(
        new jwtStragey(keys, function (jwt_payload, done) {
            if(!User.twoFSverified){
                done(null,jwt_payload);
            }
        })
    );
};

module.exports = function (passport) {
    passport.use(
        new jwtStragey(keys, function (jwt_payload, done) {
            done(null, jwt_payload);
        })
    );
};

// module.exports = function(passport){
//     new jwtStragey(
//         {
//             secretOrKey:process.env.PRIVATE_KEY,
//             jwtFromRequest: fromAuthHeaderAsBearerToken()
//         },
//         function(jwt_payload,cb){
//             cb(null,false);
//         }
//     )
// }