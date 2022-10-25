/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const nodemailer = require('nodemailer');

const mailHandler=async (req, res, next) => {
  const {name, email, content}= req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'pridesupplements@outlook.com', // generated ethereal user
        pass: 'prideProject', // generated ethereal password
      },
    });

    const date = new Date();

    // eslint-disable-next-line max-len
    const contents = `New feedback for Pride on ${date}
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b> ${content}</p>
  `;

    const message = {
      from: 'pridesupplements@outlook.com',
      to: 'pridesupplements1@gmail.com',
      subject: 'Feed  back on products!',
      html: contents,
    };

    // message
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
    next();
  } catch (error) {
    console.log('error', error);
  }
};

module.exports= mailHandler;