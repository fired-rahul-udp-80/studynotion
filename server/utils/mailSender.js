const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
   // console.log("email", email, title, body);
    console.log("step1");
    try{
             
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                port: 587, // or 465 for secure
                secure: false,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false, // allow self-signed certificate
                },
            });
            console.log(transporter);
            console.log("step2");
            let info = await transporter.sendMail({
                from: 'StudyNotion || CodeHelp - by Babbar',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`, 
            })
            console.log("step3");
            console.log("info data",info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;