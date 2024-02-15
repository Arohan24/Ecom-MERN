//Nodemailer Setup to send the user  an email with a link to reset their password
const nodemailer=require("nodemailer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const sendEmail=catchAsyncErrors(async (options)=>{
    const transporter=nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });
    const mailOptions={
        from :process.env.SMTP_MAIL || 'coool.aro24@gmail.com',
        to : options.email,
        subject : options.subject,
        text : options.message,
    }

    await transporter.sendMail(mailOptions)
})

module.exports=sendEmail;
