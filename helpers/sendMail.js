const nodeMailer = require("nodemailer")

const sendForgotPasswordEmail = async (email, token) => {
  try {
    const mailTransport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetUrl = `https://yourcareerex.com/reset-password?token=${token}`;

    const mailDetails = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Reset Your FreshMart Password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="text-align: center;">
              <img src="https://shoplive-sandy.vercel.app/freshmart-logo-2.png" alt="FreshMart Logo" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #2E7D32;">FreshMart</h2>
            <h3>Password Reset Requested</h3>
            <p>Hi there,</p>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <a href="${resetUrl}" style="background-color: #2E7D32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Password</a>
            <p style="margin-top: 20px;">If the button doesn’t work, copy and paste this link in your browser:</p>
            <p style="word-break: break-all;">${resetUrl}</p>
            <p style="margin-top: 30px;">— The FreshMart Team</p>
          </div>
        </div>
      `,
    };

    await mailTransport.sendMail(mailDetails);
  } catch (error) {
    console.error(error);
  }
};


const sendOrderConfirmationEmail = async (email, firstName, orderId) => {
  try {
    const mailTransport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "FreshMart Order Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="text-align: center;">
              <img src="https://shoplive-sandy.vercel.app/freshmart-logo-2.png" alt="FreshMart Logo" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #2E7D32;">FreshMart</h2>
            <h3>Order Confirmation</h3>
            <p>Hi ${firstName},</p>
            <p>Thanks for shopping with us! Your order <strong>#${orderId}</strong> has been confirmed and is now being processed.</p>
            <p>We’ll notify you once it ships!</p>
            <a href="https://shoplive-sandy.vercel.app/orders/${orderId}" style="background-color: #2E7D32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Order</a>
            <p style="margin-top: 30px;">— The FreshMart Team</p>
          </div>
        </div>
      `,
    };

    await mailTransport.sendMail(mailDetails);
  } catch (error) {
    console.error(error);
  }
};

const sendSignupEmail = async (email, firstName) => {
  try {
    const mailTransport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Welcome to FreshMart!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="text-align: center;">
              <img src="https://shoplive-sandy.vercel.app/freshmart-logo-2.png" alt="FreshMart Logo" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #2E7D32;">FreshMart</h2>
            <h3>Welcome, ${firstName}!</h3>
            <p>We're thrilled to have you join FreshMart.</p>
            <p>Start exploring fresh groceries and exciting deals today.</p>
            <a href="https://shoplive-sandy.vercel.app/" style="background-color: #2E7D32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Start Shopping</a>
            <p style="margin-top: 30px;">— The FreshMart Team</p>
          </div>
        </div>
      `,
    };

    await mailTransport.sendMail(mailDetails);
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  sendForgotPasswordEmail,
  sendOrderConfirmationEmail,
  sendSignupEmail,
}
