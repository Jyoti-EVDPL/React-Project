const httpStatus = require("http-status");
var jwt = require("jsonwebtoken");
const UserRepository = require("../repos/UserRepository");
const ClaimedDetails = require("../utils/userRoles");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
// const ApiError = require("../utils/ApiError");

const check = async (password, secondValue) => {
    const result = await bcrypt.compare(password, secondValue);

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Invalid cewdential")
    }
    return result
};

// all the logic part we write here
const SignUpProcess = async (fullname, username, emailid, phnumber, DOB, country, state, city, pincode, password) => {
    const hash = await bcrypt.hash(password, 10);
    const message = await UserRepository.SignUp(fullname, username, emailid, phnumber, DOB, country, state, city, pincode, hash);
    if (message) {
        console.log("Data not added")
    } else {
        console.log("Data added successfully")
    }
};
//For Signing in
const SignInProcess = async (username, password) => {
    const data = await UserRepository.SignIn(username, password);
    if (!data) {
        // throw new ApiError(httpStatus.NOT_FOUND, "Invalid credential");
        console.log("Invalid credential");
    }
    const result = await bcrypt.compare(password, data.dataValues.password);
    if (!result) {
        // throw new ApiError(httpStatus.NOT_FOUND, "Invalid credential");
        console.log("Invalid password");
    } else if (data.dataValues.enabled2FA == true) {
        console.log("else if")
        let params = {
            id: data.dataValues.id,
            username: data.dataValues.username,
            twoFactorEnabled: data.dataValues.enabled2FA,
        }
        let token = jwt.sign(params, process.env.TWOFA_PRIVATE_KEY, {
            expiresIn: "1h"
        })
        return { twoFAtoken: token, enabled2FA: data.dataValues.enabled2FA };
        // return jwt.sign(params, process.env.TWOFA_PRIVATE_KEY, {
        //     expiresIn: "1h"
        // }), data.dataValues.enabled2FA;
    } else {
        console.log("else")
        const claimedData = await ClaimedDetails.UserClaims(data.dataValues);
        console.log(claimedData);
        //for passing another Token in the Token
        let params1 = {
            claim: claimedData
        }
        let claimtoken = jwt.sign(params1, process.env.PRIVATE_KEY)
        console.log(claimtoken)
        //for passing dirwct Token in the Token use "claimedData"
        let params = {
            id: data.dataValues.id,
            username: data.dataValues.username,
            twoFactorEnabled: data.dataValues.enabled2FA,
            claim: claimedData,
        }
        let token = jwt.sign(params, process.env.PRIVATE_KEY, {
            expiresIn: "24h"
        })
        return { logintoken: token };
    }
};
//----------------------------------------------------------------------------------------------->
//for 2FA GEn OTP
const verifyTwoFAUser = async (twoFAtoken) => {
    // jwt.verify(twoFAtoken, process.env.TWOFA_PRIVATE_KEY, function (err, decodedToken) {
    //     if (err) { /* handle token err */
    //         console.log("incalid token");
    //     } else {
    //         username = decodedToken.username;   // Add to req object
    //     }
    // })
    //OR
    let jwtData = jwt.decode(twoFAtoken);
    console.log({ jwtData });
    let username = jwtData.username;
    // console.log(username)
    // let username = "admin123";
    const otp = (Math.floor(Math.random() * 1000000));
    const message = await UserRepository.SendOtp2FA(username, otp);
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE_SENDER,//sender company:'gmail.com'
        auth: {
            user: process.env.COMP_MAIL_ID,//the sender email address
            pass: process.env.PASS_KEY//app password created by Google
        }
    });

    send();

    async function send() {
        const result = await transporter.sendMail({
            from: process.env.COMP_MAIL_ID,
            to: message.email_id,
            subject: 'Two Factor Authentication',
            // text: `Your OTP for password change is: ${otp} . OTP is valid for 5 minutes`
            html:
                `<div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
                <h2>Welcome to the TwoFactor OTP Mr./Mrs: ${username} </h2>
                <h4>You OTP for Two Factor Authentication is:</h4>
                <h1 style="color:red; font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
                <p style="margin-bottom: 30px;">Pleas enter the sent OTP within 10min to get started</p>
                <p style="margin-bottom: 30px;"><a href = "http://localhost:3300/reset-password">Reset using link</a></p>
            </div>`,
            link: `http://localhost:4000/auth/reset-password`
        });

        // console.log(JSON.stringify(result, null, 4));
        console.log("OTP sent to: " + JSON.stringify(result.accepted[0]));
        // const msg = "OTP sent to: " + JSON.stringify(result.accepted[0]);
    }
    params = {
        id: message.id,
        username: message.username,
        twoFactorEnabled: message.enabled2FA,
    };
    if (otp != null) {
        return jwt.sign(params, process.env.FPASS_PRIVATE_KEY, {
            expiresIn: "24h"
        });
    } else {
        return ("invalid username");
    }
    // return msg;

};
//for 2FA Verify OTP
// const verifyTwoFAProcess = async (username, password) => {
//     const data = await UserRepository.VErifyOtp2FA(username, password);
//     if (!data) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Invalid credential");
//     }
//     const result = await bcrypt.compare(password, data.password);
//     if (!result) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Invalid credential");
//     }
//     let params = {
//         id: data.dataValues.id,
//         username: data.dataValues.username,
//         twoFactorEnabled: data.dataValues.enabled2FA,
//     }
//     return jwt.sign(params, process.env.PRIVATE_KEY, {
//         expiresIn: "24h"
//     });
// };

const verifyTwoFAProcess = async (otp, twoFAtoken) => {
    let jwtData = jwt.decode(twoFAtoken);
    console.log({ jwtData });
    let username = jwtData.username;
    const data = await UserRepository.VErifyOtp2FA(username, otp);
    // if (!data) {
    //     throw new ApiError(httpStatus.NOT_FOUND, "Invalid credential");
    // }
    // const result = await bcrypt.compare(password, data.password);
    // if (!result) {
    //     throw new ApiError(httpStatus.NOT_FOUND, "Invalid credential");
    // }
    // let params = {
    //     id: data.dataValues.id,
    //     username: data.dataValues.username,
    //     twoFactorEnabled: data.dataValues.enabled2FA,
    // }
    // return jwt.sign(params, process.env.PRIVATE_KEY, {
    //     expiresIn: "24h"
    // });
};
//----------------------------------------------------------------------------------------------->

// const SignInProcess = async (username, password) => {
//     let token;
//     const data = await UserRepository.SignIn(username);
//     if (data.user != null) {
//         const result = await bcrypt.compare(password,data.user.password);
//         let user = {};
//         user.userId = data.user.user_id
//         user.name
//         return jwt.sign(data.dataValues, process.env.PRIVATE_KEY, {
//             expiresIn: "5m"
//         });
//     }
//     return false
// };

const ProfileProcess = async (username) => {
    const message = await UserRepository.Profile(username);
    if (!message) {
        console.log("Data not Fetched")
    } else {
        console.log("Data Fetched successfully")
    }
    return message;
    console.log(message)
};

const UpProfProcess = async (fullname, emailid, phnumber, DOB, country, state, city, pincode) => {
    const message = await UserRepository.UpdProf(fullname, emailid, phnumber, DOB, country, state, city, pincode);
    if (message) {
        console.log("Data not added")
    } else {
        console.log("Data updated successfully")
    }
    // return message;
};

const UpProfPic = async (username, file) => {
    const message = await UserRepository.UpdProfPIC(username, file);
    if (file == undefined) {
        console.log("You must select a file.")
    } else {
        console.log("Data updated successfully")
    }
    // return message;
};

const DelProfProcess = async (param) => {
    const message = await UserRepository.DelProf(param);
    if (message) {
        console.log("Data not added")
    } else {
        console.log("Data deleted successfully")
    }
    // return message;
};

const DelUserProcess = async (param) => {
    const message = await UserRepository.DelUser(param);
    if (message) {
        console.log("Data not added")
    } else {
        console.log("Data deleted successfully")
    }
    // return message;
};

const AddUserProcess = async (data) => {
    const hash_password = await bcrypt.hash(data.password, 10);
    const username = data.username;
    const message = await UserRepository.AddUse(username, hash_password);
    if (message) {
        console.log("Data not added")
    } else {
        console.log("New User Created successfully")
    }
    // return message;
};

//----------------------------------------------------------------------------------------------------------------------------------------------
//COMPLETE ADMIN PAGE---------------------------------------------------------------------------------------------------------------------------COMPLETE ADMIN PAGE
//..//User Management
//User List
const ViewUserProcess = async (username) => {
    const data = await UserRepository.ViewUser(username);
    // if (data) {
    //     console.log("Data not added")
    // } else {
    //     console.log("New User Created successfully")
    // }
    return data;
};


//----------------------------------------------------------------------
//..//Role Management
//Role List
const ViewRoleProcess = async () => {
    const data = await UserRepository.ViewRole();
    if (!data) {
        console.log("Data not found")
        return null;
    } else {
        console.log("data found successfully")
        return data;
    }
    // return data;
};
//Role List
const ViewClaimProcess = async (role_id) => {
    const data = await UserRepository.ViewClaim(role_id);
    if (!data) {
        console.log("Data not found")
        return null;
    } else {
        console.log("data found successfully")
        return data;
    }
    // return data;
};
//To Add Role
const AddRoleProcess = async (role_name, role_isactive, role_desc, claim) => {
    const data = await UserRepository.AddRole(role_name, role_isactive, role_desc, claim);
    if (!data) {
        console.log("Data not found")
        return null;
    } else {
        console.log("data found successfully")
        return data;
    }
    // return data;
};
//To Add Role
const EditRoleProcess = async (role_id, role_name, role_isactive, role_desc, claim) => {
    const data = await UserRepository.EditRole(role_id, role_name, role_isactive, role_desc, claim);
    if (!data) {
        console.log("Data not found")
        return null;
    } else {
        console.log("data found successfully")
        return data;
    }
    // return data;
};
//To Delete Role
const DeleRoleProcess = async (username, role_id) => {
    const message = await UserRepository.DeleteRole(username, role_id);
    if (message) {
        console.log("Deleted Successfully")
        return message;
    } else {
        console.log("User is not an administrator")
        return message;
    }
};
//----------------------------------------------------------------------
const HomepageProcess = async (fullname, username, email, password) => {
    const hash = await bcrypt.hash(password, 10);
    const message = await UserRepository.SignUp(fullname, username, email, hash);
    return message;

};
//---------------------------------forgot password process
const ForgPassProcess = async (username) => {
    const otp = (Math.floor(Math.random() * 1000000));
    const message = await UserRepository.ForgPass(username, otp);
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE_SENDER,//sender company:'gmail.com'
        auth: {
            user: process.env.COMP_MAIL_ID,//the sender email address
            pass: process.env.PASS_KEY//app password created by Google
        }
    });

    send();

    async function send() {
        const result = await transporter.sendMail({
            from: process.env.COMP_MAIL_ID,
            to: message,
            subject: 'Reset Password',
            // text: `Your OTP for password change is: ${otp} . OTP is valid for 5 minutes`
            html:
                `<div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
                <h2>Welcome to the reset window: ${username} </h2>
                <h4>You OTP for reset password is:</h4>
                <h1 style="color:red; font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
                <p style="margin-bottom: 30px;">Pleas enter the sent OTP within 10min to get started</p>
                <p style="margin-bottom: 30px;"><a href = "http://localhost:3300/reset-password">Reset using link</a></p>
            </div>`,
            link: `http://localhost:4000/auth/reset-password`
        });

        // console.log(JSON.stringify(result, null, 4));
        console.log("OTP sent to: " + JSON.stringify(result.accepted[0]));
        // const msg = "OTP sent to: " + JSON.stringify(result.accepted[0]);
    }
    params = {
        V_username: username,
        V_emailid: message,
        // V_otp: otp
    };
    if (otp != null) {
        return jwt.sign(params, process.env.FPASS_PRIVATE_KEY, {
            expiresIn: "10m"
        });
    } else {
        return ("invalid username");
    }
    // return msg;

};

const SubPassProcess = async (data) => {
    const message = await UserRepository.ResetPass(data);

    // const auth = jwt.verify(token,process.env.PRIVATE_KEY);
    // if (auth == true) {
    //     if(otp==data.V_otp){}

    // } else {
    //     return ("Request Timeout");
    // }
    // return msg;

};
//-------------------------------------------------------------------------------------------
//To Add Template
const AddTempProcess = async (name, title, description) => {
    const message = await UserRepository.AddETemp(name, title, description);
    if (!message) {
        console.log("Data not added")
    } else {
        console.log("Data added successfully")
        return message;
    }
};

const ViewTempProcess = async () => {
    const message = await UserRepository.ViewETemp();
    if (!message) {
        console.log("Templates not found")
    } else {
        console.log("Templates found successfully")
        return message;
    }
};

const DeleTempProcess = async (username, id) => {
    const message = await UserRepository.DeleETemp(username, id);
    if (message) {
        console.log("Deleted Successfully")
        return message;
    } else {
        console.log("User is not an administrator")
        return message;
    }
};
//-------------------------------------------------------------------------------------------
//To Add Configuration
const AddConfigProcess = async (name, title, description) => {
    const message = await UserRepository.AddEConfig(name, title, description);
    if (!message) {
        console.log("Data not added")
    } else {
        console.log("Data added successfully")
        return message;
    }
};
//To View Configuration
const ViewConfigProcess = async () => {
    const message = await UserRepository.ViewEConfig();
    if (!message) {
        console.log("Configuration not found")
    } else {
        console.log("Configuration found successfully")
        return message;
    }
};
//To Update Configuration
const UpdateConfigProcess = async (name, title, description, config_id) => {
    const message = await UserRepository.UpdateEConfig(name, title, description, config_id);
    if (!message) {
        console.log("Data not updated")
    } else {
        console.log("Data updated successfully")
        return message;
    }
};
//To Delete Configuration
const DeleConfigProcess = async (username, config_id) => {
    const message = await UserRepository.DeleEConfig(username, config_id);
    if (message) {
        console.log("Deleted Successfully")
        return message;
    } else {
        console.log("User is not an administrator")
        return message;
    }
};

//User Location Data
const AddLocationProcess = async (businessName, businessWebsite, city, continent, country, countryCode, ipName, ipType, isp, lat, lon, org, query, region, status) => {
    const message = await UserRepository.AddELoc(businessName, businessWebsite, city, continent, country, countryCode, ipName, ipType, isp, lat, lon, org, query, region, status);
    if (!message) {
        console.log("Data not added")
    } else {
        console.log("Location added successfully")
        return message;
    }
};

module.exports = {
    SignInProcess,
    verifyTwoFAProcess,
    verifyTwoFAUser,
    SignUpProcess,
    ProfileProcess,
    UpProfProcess,
    UpProfPic,
    DelProfProcess,
    DelUserProcess,
    //----------------------------------------------------------------------------------------------------------------------------------------------
    //COMPLETE ADMIN PAGE
    //..//User Management
    ViewUserProcess,
    AddUserProcess,
    DelUserProcess,
    //..//Role Management
    ViewRoleProcess,
    ViewClaimProcess,
    AddRoleProcess,
    EditRoleProcess,
    DeleRoleProcess,

    HomepageProcess,
    ForgPassProcess,
    SubPassProcess,
    AddTempProcess,
    ViewTempProcess,
    DeleTempProcess,
    AddConfigProcess,
    ViewConfigProcess,
    UpdateConfigProcess,
    DeleConfigProcess,
    AddLocationProcess,
}