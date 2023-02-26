const Joi = require('joi')

const SignInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const SignIn2FASchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const SignUpSchema = Joi.object({
    fullname: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(5).max(20).required(),
    emailid: Joi.string().email().required(),
    phnumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    DOB: Joi.date().raw().required(),
    // DOB: Joi.date().max('01-01-2099').iso().messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `Age must be 18+` }).required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    // pincode: Joi.number().length(6).required(),
    pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(3).max(15).required(),
    cnfpassword: Joi.string().equal(Joi.ref('password')).required(),
    // confpassword: Joi.string().valid(Joi.ref('password')),
    // cnfPassword:Joi.string().required().valid(Joi.ref('password')),
})

const SignUpSchema2 = Joi.object({
    fullname: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(5).max(20).required(),
    emailid: Joi.string().email().required(),
    phnumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    DOB: Joi.date().raw(),
    // DOB: Joi.date().max('01-01-2099').iso().messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `Age must be 18+` }).required(),
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    // pincode: Joi.number().length(6).required(),
    pincode: Joi.string().length(6).pattern(/^[0-9]+$/),
    password: Joi.string().min(3).max(15).required(),
    cnfpassword: Joi.string().equal(Joi.ref('password')).required(),
    // confpassword: Joi.string().valid(Joi.ref('password')),
    // cnfPassword:Joi.string().required().valid(Joi.ref('password')),
})

const UpdateProfPicSchema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    inputimage: Joi.string().min(3).max(30),
})

const UpdateSchema = Joi.object({
    fullname: Joi.string().min(3).max(30),
    emailid: Joi.string().email(),
    phnumber: Joi.string().length(10).pattern(/^[0-9]+$/),
    DOB: Joi.date().raw().required(),
    // DOB: Joi.date().max('01-01-2003').iso().messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `Age must be 18+` }),
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    pincode: Joi.string().length(6).pattern(/^[0-9]+$/),
})

//FOR RESET PASSWORDS
const ResetPassSchema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
});
const SubmtOtpPassSchema = Joi.object({
    otp: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    newpassword: Joi.string().min(3).max(15).required(),
    cnfnewpassword: Joi.string().equal(Joi.ref('newpassword')),
});
    

//for testing
const querySchema = Joi.object({
    name: Joi.string().required()
})

const testSchema = Joi.object({
    name: Joi.string(),
    title: Joi.string(),
})

module.exports = {
    SignInSchema,
    SignIn2FASchema,
    SignUpSchema,
    SignUpSchema2,
    UpdateSchema,
    ResetPassSchema,
    SubmtOtpPassSchema,
    querySchema,
    testSchema,
}