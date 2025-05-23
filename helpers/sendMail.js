const nodeMailer = require("nodemailer")

const sendForgotPasswordEmail = async (email, token) => {
  console.log(process.env.EMAIL_PASSWORD)
  try {
    let mailTransport = nodeMailer.createTransport({
      //put in login details and service to send email(gmail, outlook etc)
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      }
    })
    
    //Mail details
    const mailDetails = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${email}`,
      subject: "RESET PASSWORD",
      html: `
      <div>
        <h1>Here is the reset password token: ${token}. please click on link below</h1>
        <a href="https://yourcareerex.com/reset-password?token=${token}">Reset Password</a>
        <p>if the button does not work for any reason, please click the link below</p> <br/>
        https://yourcareerex.com/reset-password?token=${token}
      </div>
      `
    }
  
    await mailTransport.sendMail(mailDetails)
  } catch (error) {
    console.log(error)
  }
}

const sendOrderConfirmationEmail = async (email, firstName, orderId) => {
  try {
    let mailTransport = nodeMailer.createTransport({
      //put in login details and service to send email(gmail, outlook etc)
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      }
    })
    //Mail details
    const mailDetails = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${email}`,
      subject: "ORDER CONFIRMATION",
      html: `
      <div>
        <h1>Hi, ${firstName}, <br/> Your order (${orderId}) has been confirmed.</h1>
        <p>Thank you for choosing us </p>
      </div>
      `
    }
    await mailTransport.sendMail(mailDetails)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendForgotPasswordEmail,
  sendOrderConfirmationEmail,
}
