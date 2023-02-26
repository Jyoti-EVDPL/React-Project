const express = require("express");
const validator = require('express-joi-validation').createValidator({})
const router = express.Router();
const multer = require("multer");

const passport = require("passport");
require("../helper/JwtStragey")(passport);

const authSchema = require("./../validation/authenticationSchema");
const ctrl = require("./../controllers/AuthController");
const User = require("../models/UserModel")
const Role_Claims = require("../models/role_claims");


const claimsData = {
    emailtemplate: ["emailtemplate_view", "emailtemplate_edit", "emailtemplate_add", "emailtemplate_delete"],
    userlist: ["userlist_view", "userlist_edit", "userlist_add", "userlist_delete"],
    configuration: ["configuration_view", "configuration_edit", "configuration_add", "configuration_delete"],
    blog: ["blog_view", "blog_edit", "blog_add", "blog_delete"]
}
const claimsData2 = ["emailtemplate_view", "emailtemplate_edit", "emailtemplate_add", "emailtemplate_delete",
    "userlist_view", "userlist_edit", "userlist_add", "userlist_delete",
    "configuration_view", "configuration_edit", "configuration_add", "configuration_delete",
    "blog_view", "blog_edit", "blog_add", "blog_delete"]

const UserClaims = async (data) => {
    if (data == null)
        // return null;
        console.log("null data")
    else if (data.role_id == 1) {
        console.log(claimsData2)
        return claimsData2;
    } else {
        const role_name = await Role_Claims.findAll({ where: { role_id: data.role_id } })
        const array2 = ['emailtemplate_add', 'emailtemplate_delete', 'emailtemplate_view','configuration_view'];
        // role_name.forEach(role_name => {
        //     const data = role_name.dataValues.roleclaim_name;
        //     const array = [];
        //     const array2 = ['emailtemplate_add','emailtemplate_delete','emailtemplate_view'];
        //     array[array.length] = data;
        //     // array.push(data);
        //     console.log(array)
        //     // console.log(data)
        // });
        // return role_name;
        // console.log(role_name.datavalues.roleclaim_name);
        return array2;
    }
    console.log(data.role_id)
};

module.exports = {
    UserClaims,
};