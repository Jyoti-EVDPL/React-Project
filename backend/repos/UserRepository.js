//DATABASE LAYER
//insted of reepeting model everywhere we declared it here
//IMP:no error handling will be done here also in controller
const bcrypt = require("bcrypt");
const fs = require("fs");
const { where, Sequelize } = require("sequelize");
const User = require("./../models/UserModel");
const fOtps = require("../models/FpassOtpModel");
const uImage = require("../models/UserImage");
const EmailTemp = require("../models/EmailTempModel");
const ConfigTbl = require("../models/ConfigTable");
const LocationTbl = require("../models/LocationData");
const role_table = require("../models/role_table");
const claim_table = require("../models/claim_table");
const module_table = require("../models/module_table");
const User_Role = require("../models/User_Role");
const Role_Claims = require("../models/role_claims");

//for login
const SignIn = async (username, password) => {
    // console.log(username,password);
    const data = await User.findOne({ where: { username: username } });
    // console.log(data);
    // console.log(password);
    // console.log(data.dataValues.password);
    // const result = await bcrypt.compare(password, data.dataValues.password)
    // console.log("Is passsword match");
    // console.log(result);
    // let params = {
    //     emailid:data.email_id,username:data.username
    //   };
    //   console.log(params);
    // return result;
    return data;
};

//for signup
const SignUp = async (fullname, username, emailid, phnumber, DOB, country, state, city, pincode, password) => {
    // await User()
    // await bcrypt.hash(password, 10).then(function (hash) {
    //     password = hash;
    // console.log(hash);
    //     console.log(password);
    //     console.log(phnumber);
    // });
    await User.create({
        full_name: fullname,
        username: username,
        email_id: emailid,
        phnumber: phnumber,
        DOB: DOB,
        country: country,
        state: state,
        city: city,
        pincode: pincode,
        password: password,
    });
};
// let username = req.body.username;
// let fullName = req.body.fullName;
// let emailid = req.body.emailid;
// let password;

// await bcrypt.hash(req.body.password, 10).then(function (hash) {
//     password = hash;
// });
// const data = await User.create({
//     full_name: fullName,
//     user_name: username,
//     password: password,
//     email_id: emailid,
// });
// message = "Data added successfully"

//User Profile View:
const Profile = async (username) => {

    const data = await User.findOne({

    }, {
        where: { username },
        attributes: { include: ["full_name", "email_id", "phnumber", "DOB", "country", "state", "city", "pincode", "profile_image"] },
    });
    console.log(data.dataValues);
    return data.dataValues;
};

const UpdProf = async (fullname, emailid, phnumber, DOB, country, state, city, pincode) => {
    // await User()
    // await bcrypt.hash(password, 10).then(function (hash) {
    //     password = hash;
    // console.log(hash);
    // console.log(password);
    // console.log(phnumber);
    // });
    const username = "amitpatra"
    await User.update({
        full_name: fullname,
        email_id: emailid,
        phnumber: phnumber,
        DOB: DOB,
        country: country,
        state: state,
        city: city,
        pincode: pincode
    }, { where: { username } });
};

const UpdProfPIC = async (username, file) => {
    await uImage.create({
        username: username,
        type: file.mimetype,
        name: file.filename,
        data: fs.readFileSync("resources/uploads/" + file.filename
        ),
    }).then((image) => {
        fs.writeFileSync("resources/tmp/" + image.name,
            image.data
        );
    });
    return true;
};

const DelProf = async (param) => {
    const username = "Evan.Pouros"
    // await User.destroy({
    //     full_name,
    //     email_id,
    //     phnumber,
    //     DOB,
    //     country,
    //     state,
    //     city,
    //     pincode
    // }, { where: { username: param } });
    await User.destroy({ where: { username: param } });
};

const DelUser = async (param) => {
    await User.destroy({ where: { username: param } });
};

const AddUse = async (username, hash_password) => {
    await User.create({
        username: username,
        password: hash_password
    });
};
//----------------------------------------------------------------------------------------------------------------------------------------------
//COMPLETE ADMIN PAGE---------------------------------------------------------------------------------------------------------------------------COMPLETE ADMIN PAGE
//..//User Management
//User List
const ViewUser = async (username) => {
    const data = await User.findAll({ where: { isAdmin: false } });
    return data;
};
//----------------------------------------------------------------------------------------------->
//..//Role Management
//Role List
const ViewRole = async (username) => {
    const data = await role_table.findAll({});
    return data;
};
//Role List
const ViewClaim = async (role_id) => {
    const data = await Role_Claims.findAll({
        where: { role_id: role_id },
        // include: {
        //     model: Role_Claims,
        //     attributes: ["roleclaim_name"]
        // },
    });
    const data1 = data.dataValues;
    console.log(data1)
    return data;
};
//Role Add(OLD METHOD)
// const AddRole = async (role_name, role_isactive, role_desc, claim) => {
//     const data = await role_table.create({
//         role_name: role_name,
//         role_isactive: role_isactive,
//         role_desc: role_desc,
//     });
//     if (data.dataValues.role_id) {
//         for (let i = 0; i < claim.length; i++) {
//             await role_table.create({
//                 role_id: data.dataValues.role_id,
//                 roleclaim_name: claim[i].name,
//             })
//         }
//     }
//     console.log(data);
//     return data;
// };
//Role Add NEW METHOD
const AddRole = async (role_name, role_isactive, role_desc, claim) => {
    const data = await role_table.create({
        role_name: role_name,
        role_isactive: role_isactive,
        role_desc: role_desc,
    });
    if (data) {
        const roleclaim = claim.map(el => {
            return {
                role_id: data.dataValues.role_id,
                roleclaim_name: el,
            }
        })
        console.log(roleclaim)
        const data2 = await Role_Claims.bulkCreate(roleclaim)
        return data2;
    } else {
        console.log("no data set in role claim data")
    }
};
//Role Add NEW METHOD
const EditRole = async (role_id, role_name, role_isactive, role_desc, claim) => {
    const data = await role_table.update({
        role_name: role_name,
        role_isactive: role_isactive,
        role_desc: role_desc
    },
        { where: { role_id: role_id } }
    );
    if (data) {
        const data2 = await Role_Claims.destroy({ where: { role_id: role_id } })
        if (data !== null) {
            const roleclaim = claim.map(el => {
                return {
                    role_id: role_id,
                    roleclaim_name: el,
                }
            })
            console.log(roleclaim)
            const data3 = await Role_Claims.bulkCreate(roleclaim)
            return data3;
        } else {
            console.log("no data set in role claim data")
        }
    } else return false;

};
//To Delete Role
const DeleteRole = async (username, role_id) => {
    const user_db = await User.findOne(
        { where: { username: username } }
    );
    console.log(user_db.dataValues.isAdmin)
    console.log(role_id)
    if (user_db.dataValues.isAdmin) {
        const data2 = await Role_Claims.destroy({ where: { role_id: role_id } })
        if (data2 != null) {
            const data1 = await role_table.destroy({ where: { role_id: role_id } });
            if (data1 != null) {
                console.log(data2)
                console.log(data1)
                return true;
            }
            return false;
        }
        return false;
    }
    return false;
};
//----------------------------------------------------------------------------------------------->
// For 2FA Store OTP process
const SendOtp2FA = async (username, otp) => {
    const data = await User.findOne({ where: { username: username } });
    if (data) {
        await fOtps.create({
            username: username,
            otp: otp,
            user_id: data.id,
            for_twoFA: true,
        })
        return data.dataValues;
    }
};
// For 2FA Verify OTP process
const VErifyOtp2FA = async (username, otp) => {
    console.log("First Line")
    const fiveMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);//only data saved within five minute taken(as of now changed to 10 minutes)
    const { Op } = require("sequelize");
    console.log(username)

    const data = await fOtps.findOne({
        where: {
            // user_id: username,
            for_twoFA: {
                [Op.eq]: true
            },
            isUsed: {
                [Op.eq]: false
            },
            timestamp: {
                [Op.gt]: fiveMinutesAgo
            },
            username: {
                [Op.eq]: username
            },
        },
        order: [['timestamp', 'DESC']]
    });
    console.log(data.dataValues.otp);
    console.log(data.dataValues.id)
    console.log("Last Line")
    //for table destruction
    if (data.dataValues.otp == otp) {
        console.log("Successfully")
        await fOtps.update({
            isUsed: true
        }, {
            where: {
                id: data.dataValues.id
            }
        })
        await fOtps.destroy({
            where: {
                for_twoFA: {
                    [Op.eq]: true
                },
                // isUsed: {
                //     [Op.eq]: true
                // },
                timestamp: {
                    [Op.lt]: fiveMinutesAgo
                },
                username: {
                    [Op.eq]: username
                },
            },
        })
    }
    else {
        console.log("Failure")
    }

    // if (data) {
    //     await fOtps.update({
    //         isUsed: 'TRUE',
    //     })
    // }
    // return data.dataValues.otp;
};
//----------------------------------------------------------------------------------------------->
//Forgot Password
const ForgPass = async (username, otp) => {
    const data = await User.findOne({ where: { username: username } });
    if (data) {
        await fOtps.create({
            username: username,
            otp: otp,
            user_id: data.id,
            for_fpass: true,
        })
    }
    return data.dataValues.email_id;
};

// const VerifyOTP = async (data) => {
//     const data = await User.update(
//         { password: data.newpassword},
//         { where: { username: username } }
//     );
//     await fOtps.create({
//         user_id: data.id,
//         otp: otp
//     })
//     return data.dataValues.email_id;
// };

const ResetPass = async (data) => {
    const dbOtp = await fOtps.findOne(
        { otp: otp },
        { where: { user_id: username } }
    );
    if (data.otp == dbOtp.otp) {
        const data1 = await User.update(
            { password: data.newpassword },
            { where: { username: username } }
        );
        await fOtps.update({
            isUsed: 'TRUE',
        })
    }
    return data.dataValues.email_id;
};

//-------------------------------------------------------------------------------------------
//To Add Template
const AddETemp = async (name, title, description) => {
    const data = await EmailTemp.create({
        templatename: name,
        title: title,
        body: description
    });
    return data;
};
//To View Template
const ViewETemp = async (name, title, description) => {
    const data = await EmailTemp.findAll({
    });
    // console.log(data.dataValues)
    // console.log("hello")
    return data;
};
//To Delete Template
const DeleETemp = async (username, id) => {
    const user_db = await User.findOne(
        { where: { username: username } }
    );
    if (user_db.dataValues.isAdmin) {
        const data1 = await EmailTemp.destroy(
            { where: { id: id } }
        );
        return true;
    } else {
        return false;
    }
};

//-------------------------------------------------------------------------------------------
//To Add Config
const AddEConfig = async (name, title, description) => {
    const data = await ConfigTbl.create({
        configname: name,
        title: title,
        description: description
    });
    return data;
};
//To View Config
const ViewEConfig = async (name, title, description) => {
    const data = await ConfigTbl.findAll({
    });
    // console.log(data.dataValues)
    // console.log("hello")
    return data;
};
//To Update Config
const UpdateEConfig = async (name, title, description, config_id) => {
    const data = await ConfigTbl.update({
        configname: name,
        title: title,
        description: description
    }, { where: { config_id: config_id } });
    if (data) {
        return true;
    } else {
        return false;
    }
};
//To Delete Config
const DeleEConfig = async (username, config_id) => {
    const user_db = await User.findOne(
        { where: { username: username } }
    );
    console.log(user_db.dataValues)
    console.log(config_id)
    if (user_db.dataValues.isAdmin) {
        const data1 = await ConfigTbl.destroy(
            { where: { config_id: config_id } }
        );
        return true;
    } else {
        return false;
    }
};

//---------------------------------------------------------------------------------------
//User Location Data
const AddELoc = async (businessName, businessWebsite, city, continent, country, countryCode, ipName, ipType, isp, lat, lon, org, query, region, status) => {
    const data = await LocationTbl.create({
        businessName: businessName,
        businessWebsite: businessWebsite,
        city: city,
        continent: continent,
        country: country,
        countryCode: countryCode,
        ipName: ipName,
        ipType: ipType,
        isp: isp,
        lat: lat,
        lon: lon,
        org: org,
        query: query,
        region: region,
        status: status
    });
    return data;
};
//---------------------------------------------------------------------------------------

//this is used to update password later
// const UpdtPass = async (username) => {
//     const data = await User.findOne({ where: { username: username } });
//     return data;
// };

module.exports = {
    SignIn,
    SignUp,
    Profile,
    UpdProf,
    UpdProfPIC,
    //----------------------------------------------------------------------------------------------------------------------------------------------
    //COMPLETE ADMIN PAGE
    //..//User Management
    ViewUser,
    DelProf,
    DelUser,
    AddUse,
    //..//Role Management
    ViewRole,
    ViewClaim,
    AddRole,
    EditRole,
    DeleteRole,

    SendOtp2FA,
    VErifyOtp2FA,
    ForgPass,
    // VerifyOTP,
    ResetPass,
    AddETemp,
    ViewETemp,
    DeleETemp,
    AddEConfig,
    ViewEConfig,
    UpdateEConfig,
    DeleEConfig,
    //----------------------------------------------------------------
    AddELoc
}