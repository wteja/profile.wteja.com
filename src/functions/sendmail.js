const nodemailer = require("nodemailer");

exports.handler = function (event, context, callback) {
  const from = `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`;

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const { name, email, message } = JSON.parse(event.body);

  const recipients = process.env.RECIPIENT_EMAILS
    ? process.env.RECIPIENT_EMAILS.split(",").map((it) => it.trim())
    : null;

  if (!recipients) {
    return callback(new Error("Recipients are empty."));
  }

  const promises = recipients.map((to) => {
    return new Promise((resolve, reject) => {
      const mailBody = `
                <table style="width: 100%">
                    <tr>
                        <td style="width: 150px; font-weight: bold;">From</td>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <td style="width: 150px; font-weight: bold;">Email</td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td style="width: 150px; font-weight: bold;">Message</td>
                        <td>${message}</td>
                    </tr>
                </table>
                `;

      transporter.sendMail(
        {
          from,
          to,
          replyTo: email,
          subject: `New Message from ${name} (${email})`,
          html: mailBody,
        },
        function (error, info) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  });

  Promise.all(promises)
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: "OK",
      });
    })
    .catch(callback);
};
