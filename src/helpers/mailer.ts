/* eslint-disable @typescript-eslint/no-var-requires */
const nodemailer = require("nodemailer");

interface UserInterface {
  email: string;
  userId: string;
  emailType: string;
  token: string;
}
export const sendEmail = async ({ email, emailType, token }: UserInterface) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process?.env?.USERID,
        pass: process?.env?.PASSWORD,
      },
    });

    const details = {
      from: "sriya.dev.test@gmail.com",
      to: email,
      subject: "Test",
      text: "Testing",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${token}
            </p>`,
    };

    // @ts-ignore: catch error message can be any
    mailTransporter.sendMail(details, (error) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("successfully sent mail");
      }
    });
  } catch (error) {
    // @ts-ignore: catch error message can be any
    throw new Error(error.message);
  }
};
