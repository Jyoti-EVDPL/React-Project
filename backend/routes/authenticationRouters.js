const express = require("express");
const validator = require('express-joi-validation').createValidator({})
const router = express.Router();
const multer = require("multer");

const passport = require("passport");
require("../helper/JwtStragey")(passport);

const authSchema = require("./../validation/authenticationSchema");
const ctrl = require("./../controllers/AuthController");
//Module Data

//passport

//middleware-1
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "resources/uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  })
}).single("profile_pic")

//middleware-2

//Login/Signup
router.post("/signup2", validator.query(authSchema.SignUpSchema), ctrl.SignUp);
router.post("/signup", validator.body(authSchema.SignUpSchema2), ctrl.SignUp);
router.post("/login", validator.body(authSchema.SignInSchema), ctrl.SignIn);
//forgot password
router.post("/forgotpassword", validator.body(authSchema.ResetPassSchema), ctrl.ForgotPassword);//done with React
router.post("/submitpassword", validator.body(authSchema.SubmtOtpPassSchema),//done with React
  passport.authenticate("jwt", { session: false }), ctrl.SubmitPassword);
//2FA
router.post("/twoFAverified", passport.authenticate("jwt", { session: false }));
// router.post("/login/twoFAgenerateOTP", validator.query(authSchema.SignIn2FASchema), ctrl.SignIn2FAgen);
// router.post("/login/twoFAsubmitOTP", validator.query(authSchema.SignIn2FASchema), ctrl.SignIn2FAsub);
router.post("/login/twoFAgenerateOTP", ctrl.SignIn2FAgen);
router.post("/login/twoFAsubmitOTP", ctrl.SignIn2FAsub);
//Home page
router.get("/home", ctrl.Homepage);
router.get("/home/profile", ctrl.Profile);
router.post("/home/profile/updateprofilepic", upload, ctrl.UploadProfilePic);
// router.post("/home/profile/updateprofilepic", upload.array("profile_pic",5), ctrl.UploadProfilePic);
// router.post("/home/profile/updateprofilepic", upload.none(), ctrl.UploadProfilePic);
// router.post("/home/profile/photo", upload, ctrl.ProfilePic);
router.patch("/home/updateprofile", validator.body(authSchema.UpdateSchema), ctrl.UpdateProfile);
router.delete("/home/deleteprofile", ctrl.DeleteProf);
//Admin routes ------------------------------------------------------------------------------------Admin routes
//..//-------------------------------------------->MANAGE_USERS
router.get("/home/admin/view_user", ctrl.ViewUser);
router.post("/home/admin/add_user", ctrl.AddUser);
router.delete("/home/admin/delete_user", ctrl.DeleteUser);
router.post("/home/admin/edit_user", ctrl.AddUser);
router.post("/home/admin/add_user", ctrl.SignUp);
//Email Template
router.post("/home/emailtemp/add", ctrl.AddTemp);
router.get("/home/emailtemp/view", ctrl.ViewTemp);
router.post("/home/emailtemp/delete", ctrl.DeleTemp);
//Config Management
router.post("/home/config/add", ctrl.AddConfig);
router.get("/home/config/view", ctrl.ViewConfig);
router.post("/home/config/update", ctrl.UpdateConfig);
router.post("/home/config/delete", ctrl.DeleConfig);
//..//-------------------------------------------->MANAGE_ROLES
router.get("/home/admin/modules", ctrl.ViewModule);
router.get("/home/admin/view_roles", ctrl.ViewRole);
router.post("/home/admin/view_claims", ctrl.ViewClaim);
router.post("/home/admin/add_roles", ctrl.AddRole);
router.post("/home/admin/edit_roles", ctrl.EditRole);
router.post("/home/admin/delete_roles", ctrl.DeleteRole);

router.get("/loginview", ctrl.SignInView);
//user complete location data
router.post("/locationData", ctrl.LocationData);

//for test the query
router.get('/orders', validator.query(authSchema.querySchema), (req, res) => {
  // If we're in here then the query was valid!  
  res.end(req.query.name)
});
router.post('/test', validator.body(authSchema.testSchema),)

module.exports = router;