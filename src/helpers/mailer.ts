// import User from '@/app/models/userModel'

// import bcrypt from 'bcryptjs'
// import nodemailer from 'nodemailer'

// export const sendemail=async({email,emailType,userId}:any)=>{
//     try{
// const hashed_token=await bcrypt.hash(userId.toString(),10);
// if(emailType==="VERIFY")
// await User.findByIdAndUpdate(userId,{verifyToken:hashed_token,verifyTokenExpiry:Date.now()+3600000,})
// else if(emailType==="RESET"){
//     await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashed_token,forgotPasswordTokenExpiry:Date.now()+3600000,})
// }

// const transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 3000,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//       user: "d2201537cddce8",
//       pass: "2b2764bbc8d339",
//     },
//   });
//     const mailoptions={
//         from:"gsaikat719@gmail.com",
//         to:"sinchang646@gmail.com",
//         subject:"verify your email"
       
//     }
// const mailreponse= await transporter.sendMail(mailoptions)
// return mailoptions;
//     }catch(error:any){
//         throw new Error(error.message)
//     }
// }
import User from '@/app/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashed_token = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashed_token,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashed_token,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525, // Use the correct Mailtrap port
            auth: {
                user: "d2201537cddce8", // Replace with your actual Mailtrap username
                pass: "2b2764bbc8d339", // Replace with your actual Mailtrap password
            },
        });

        const mailOptions = {
            from: "gsaikat719@gmail.com", // Use a verified sender email
            to: "sinchang646@gmail.com", // Dynamically send email to the user
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `Click the link below to ${
                emailType === "VERIFY" ? "verify your email" : "reset your password"
            }:\n\nhttps://yourwebsite.com/${
                emailType === "VERIFY" ? "verify" : "reset-password"
            }?token=${hashed_token}`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
