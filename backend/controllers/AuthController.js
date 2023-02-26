//business layer
const { CREATED } = require("http-status");
const authServices = require("../services/authenticationService");

// const SignUp = async (res, req) => {
//     const { fullname, username, emailid, phnumber, DOB, country, state, city, pincode, password } = res.query;
//     const token = await authServices.SignUpProcess(fullname, username, emailid, phnumber, DOB, country, state, city, pincode, password)
//     req.send('Table CREATED');
// };
//SignUp Process
const SignUp = async (res, req) => {
    const { fullname, username, emailid, phnumber, DOB, country, state, city, pincode, password } = res.body;
    const token = await authServices.SignUpProcess(fullname, username, emailid, phnumber, DOB, country, state, city, pincode, password)
    req.status(200);
    req.send({ message: 'User Registered' });
};
//SignIn Process
const SignIn = async (res, req) => {
    const { username, password } = res.body;
    const signin_data = await authServices.SignInProcess(username, password) //for manual testing
    req.send({ signin_data });
    console.log(signin_data);
};
//forgot password
const ForgotPassword = async (res, req) => {
    const { username } = res.body;
    const token = await authServices.ForgPassProcess(username)
    req.send({ token });
    console.log("kindly check your Email");
};
//submit password
const SubmitPassword = async (res, req) => {
    const { data } = res.body;
    var authorization = req.headers.authorization.split(' ')[1], decoded;
    decoded = jwt.verify(authorization, process.env.FPASS_PRIVATE_KEY);
    console.log(decoded.V_username);
    const token = await authServices.SubPassProcess(data)
    req.send("Password changed successfully");
};
//----------------------------------------------------------------------------------------------->
//2 factor generate otp
const SignIn2FAgen = async (res, req) => {
    console.log(res.body)
    const twoFAtoken = res.body.token;
    console.log(twoFAtoken)
    const token = await authServices.verifyTwoFAUser(twoFAtoken) //for manual testing
    req.send({ token });
    console.log(token);
};
//2 factor submit otp
const SignIn2FAsub = async (res, req) => {
    const otp = res.body.otp;
    const twoFAtoken = res.body.token;
    const token = await authServices.verifyTwoFAProcess(otp, twoFAtoken) //for manual testing
    req.send({ token });
    console.log(token);
};
//----------------------------------------------------------------------------------------------->
const Profile = async (res, req) => {
    const { username } = res.body;//for now i am not using any token here
    // console.log(username);
    // console.log(body)
    // const file = res.file;
    // console.log(file);
    // const token = await authServices.UpProfProcess(username, file)
    const data = await authServices.ProfileProcess(username)
    req.send(data);
    // req.send({message:'Profile'});
};

const UpdateProfile = async (res, req) => {
    const { fullname, emailid, phnumber, DOB, country, state, city, pincode, password } = res.body;
    // console.log(username);
    // console.log(body)
    // const file = res.file;
    // console.log(file);
    // const token = await authServices.UpProfProcess(username, file)
    await authServices.UpProfProcess(fullname, emailid, phnumber, DOB, country, state, city, pincode, password)
    // res.send({ token });
    req.send('Profile updated');
};

const UploadProfilePic = async (res, req) => {
    console.log(res.file);
    console.log(res.file.filename);
    console.log(res.body.username);
    const username = res.body.username;
    // const file = res.file.filename;
    const file = res.file;
    await authServices.UpProfPic(username, file)
    // const { fullname, emailid, phnumber, DOB, country, state, city, pincode } = res.body;
    // const token = await authServices.UpProfPic(fullname, emailid, phnumber, DOB, country, state, city, pincode)
    // res.send({ token });
    req.send('Profile Pic uploaded');
};

const ProfilePic = async (res, req) => {
    console.log(res.file);
    console.log(res.file.filename);
    console.log(res.body.username);
    const username = res.body.username;
    // const file = res.file.filename;
    const file = res.file;
    await authServices.UpProfPic(username, file)
    // const { fullname, emailid, phnumber, DOB, country, state, city, pincode } = res.body;
    // const token = await authServices.UpProfPic(fullname, emailid, phnumber, DOB, country, state, city, pincode)
    // res.send({ token });
    req.send('Profile Pic ');
};

const DeleteProf = async (res, req) => {
    const param = "Cortney_Nolan";
    // const { fullname, emailid, phnumber, DOB, country, state, city, pincode} = res.body;
    await authServices.DelProfProcess(param)
    // res.send({ token });
    req.send('Profile Deleted');
};

const DeleteUser = async (res, req) => {
    const param = "Hyman.Greenholt";//later take from the pages which user must be deleted
    await authServices.DelUserProcess(param)
    req.send('Profile Deleted');
};

const AddUser = async (res, req) => {
    const data = res.body;
    console.log(data);
    await authServices.AddUserProcess(data)
    // res.send({ token });
    req.send('User Created');
};

//----------------------------------------------------------------------------------------------------------------------------------------------
//COMPLETE ADMIN PAGE---------------------------------------------------------------------------------------------------------------------------
//..//User Management
//User List
const ViewUser = async (res, req) => {
    const { username } = res.body;
    console.log(username);
    const data = await authServices.ViewUserProcess(username)
    req.send({ data });
    // req.send('User Created');
};
//----------------------------------------------------------------------------------------------------------------------------------------------
//USER ROLE MANAGEMENT TABLE
const claimsData = [{
    emailtemplate: [
        { name: "emailtemplate_view", active: true },
        { name: "emailtemplate_edit", active: true },
        { name: "emailtemplate_add", active: true },
        { name: "emailtemplate_delete", active: true },
    ],
    userlist: [
        { name: "userlist_view", active: true },
        { name: "userlist_edit", active: true },
        { name: "userlist_add", active: true },
        { name: "userlist_delete", active: true },
    ],
    configuration: [
        { name: "configuration_view", active: true },
        { name: "configuration_edit", active: true },
        { name: "configuration_add", active: true },
        { name: "configuration_delete", active: true },
    ],
    blog: [
        { name: "blog_view", active: true },
        { name: "blog_edit", active: true },
        { name: "blog_add", active: true },
        { name: "blog_delete", active: true },
    ],
}
]
const claimsDataOther = [
    "emailtemplate",
    "userlist",
    "configuration",
    "blog",
]
const claimsData2 = {
    emailtemplate: ["emailtemplate_view", "emailtemplate_edit", "emailtemplate_add", "emailtemplate_delete"],
    userlist: ["userlist_view", "userlist_edit", "userlist_add", "userlist_delete"],
    configuration: ["configuration_view", "configuration_edit", "configuration_add", "configuration_delete"],
    blog: ["blog_view", "blog_edit", "blog_add", "blog_delete"]
}
CLAIMS = [
    "EmailTemplate_View",
    "EmailTemplate_Add",
    "EmailTemplate_Delete",
    "EmailTemplate_Update",
    "Place_View",
    "Place_Add",
    "Place_Delete",
    "Place_Update",
    "UserList_View",
    "UserList_Add",
    "UserList_Delete",
    "UserList_Update",
    "Config_View",
    "Config_Add",
    "Config_Delete",
    "Config_Update",
]
//..//Role Management
//Role Data
const ViewModule = async (res, req) => {
    // const { username } = res.body;
    // console.log(username);
    // const data = await authServices.ViewRoleProcess()
    req.send(claimsData2);
    req.status(200);
    // req.send('User Created');
};
//Claim List
const ViewClaim = async (res, req) => {
    const { role_id } = res.body;
    // console.log(username);
    const data = await authServices.ViewClaimProcess(role_id)
    req.send(data);
    req.status(200);
    // req.send('User Created');
};
//Role List
const ViewRole = async (res, req) => {
    const { username } = res.body;
    // console.log(username);
    const data = await authServices.ViewRoleProcess()
    req.send(data);
    req.status(200);
    // req.send('User Created');
};
//Role Add
const AddRole = async (res, req) => {
    const { role_name, role_isactive, role_desc, claim } = res.body;
    console.log(role_name, role_isactive, role_desc, claim);
    const data = await authServices.AddRoleProcess(role_name, role_isactive, role_desc, claim)
    // req.send(data);
    req.status(200);
    req.send({ message: "Role Created" });
};
//Role Edit
const EditRole = async (res, req) => {
    const { role_id, role_name, role_isactive, role_desc, claim } = res.body;
    console.log(role_id, role_name, role_isactive, role_desc, claim);
    const data = await authServices.EditRoleProcess(role_id, role_name, role_isactive, role_desc, claim)
    req.send(data);
    req.status(200);
    // req.send('User Created');
};
//Role Delete
const DeleteRole = async (res, req) => {
    const { username, role_id } = res.body;
    const data = await authServices.DeleRoleProcess(username, role_id)
    req.status(200);
    // req.send({ message: 'Template Created' });
    req.send(data);
};
//----------------------------------------------------------------------------------------------------------------------------------------------
const SignInView = async (res, req) => {
    req.render('pages/signin', {})
    req.session.user = req.body.emailid;
    if (!null) {
        res.redirect('/route/homepage')
    } else {
        console.log(err)
    }
};

const Homepage = async (res, req) => {
    const { fullname, username, emailid, password } = req.body;
    const token = await authServices.HomepageProcess(fullname, username, emailid, password)
    res.send({ token });
};
//-------------------------------------------------------------------------------------------
//To Add Template
const AddTemp = async (res, req) => {
    const { name, title, description } = res.body;
    const data = await authServices.AddTempProcess(name, title, description)
    req.status(200);
    req.send({ message: 'Template Created' });
    // req.send({ data });
};
//To view Template
const ViewTemp = async (res, req) => {
    const token = await authServices.ViewTempProcess();
    // console.log(token)
    req.send(token);
    req.status(200);
    // req.send({ message: 'Template Found SuccessFfully' });
};
const DeleTemp = async (res, req) => {
    const { username, id } = res.body;
    const data = await authServices.DeleTempProcess(username, id)
    req.status(200);
    // req.send({ message: 'Template Created' });
    req.send(data);
};
//-------------------------------------------------------------------------------------------
//Configuration (Add)
const AddConfig = async (res, req) => {
    const { name, title, description } = res.body;
    const data = await authServices.AddConfigProcess(name, title, description)
    req.status(200);
    req.send({ message: 'Configuration Created' });
    // req.send({ data });
};
//Configuration (View)
const ViewConfig = async (res, req) => {
    const token = await authServices.ViewConfigProcess();
    // console.log(token)
    req.send(token);
    req.status(200);
    // req.send({ message: 'Template Found SuccessFfully' });
};
//Configuration (Update)
const UpdateConfig = async (res, req) => {
    const { name, title, description, config_id } = res.body;
    const data = await authServices.UpdateConfigProcess(name, title, description, config_id)
    req.status(200);
    // req.send({ message: 'Template Created' });
    req.send(data);
};
//Configuration (Delete)
const DeleConfig = async (res, req) => {
    const { username, config_id } = res.body;
    const data = await authServices.DeleConfigProcess(username, config_id)
    req.status(200);
    // req.send({ message: 'Template Created' });
    req.send(data);
};
//-------------------------------------------------------------------------------------------


//DEMO-------------------
const SignIn2 = async (res, req, next) => {
    console.log("hyy");
};
const LocationData = async (res, req) => {
    const { businessName, businessWebsite, city, continent, country, countryCode, ipName, ipType, isp, lat, lon, org, query, region, status } = res.body;
    // const ldata = res.body;
    console.log(businessName);
    const data = await authServices.AddLocationProcess(businessName, businessWebsite, city, continent, country, countryCode, ipName, ipType, isp, lat, lon, org, query, region, status)
    req.status(200);
    req.send({ message: 'data saved' });
    // req.send({ data });
};

module.exports = {
    SignIn,
    SignUp,
    SignIn2FAgen,
    SignIn2FAsub,
    Profile,
    UpdateProfile,
    UploadProfilePic,
    DeleteProf,
    DeleteUser,
    AddUser,
    //----------------------------------------------------------------------------------------------------------------------------------------------
    //COMPLETE ADMIN PAGE
    //..//User Management
    ViewUser,
    //..//User Management
    ViewModule,
    ViewRole,
    ViewClaim,
    AddRole,
    EditRole,
    DeleteRole,

    SignInView,
    Homepage,
    ForgotPassword,
    SignIn2,
    SubmitPassword,
    AddTemp,
    ViewTemp,
    DeleTemp,
    AddConfig,
    ViewConfig,
    UpdateConfig,
    DeleConfig,
    LocationData,
}
//old ones not working yet
// const ForgotPassword2 = async (res, req) => {
//     let mailTransport = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             type: 'jyotishankar.evince.demo@gmail.com',
//             password: 'remmsxmewjnmzzzw'
//         }
//     });
//     let details = {
//         from: 'jyotishankar.evince.demo@gmail.com',
//         to: 'jyotishankarpanda55@gmail.com',
//         subject: 'Reset Password',
//         text: 'Please reset your password'
//     }
//     mailTransport.sendMail(details, (err, info) => {
//         if (err) {
//             console.log("it has an error", err);
//         } else {
//             console.log("it has an info", info);
//         }
//     })
// };