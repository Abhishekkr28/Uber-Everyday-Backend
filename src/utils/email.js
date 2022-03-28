const sgMail = require("@sendgrid/mail");

// const sendGridAPIKey =
//   "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";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  await sgMail.send({
    to: email,
    from: "dhruvtiwari110058@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelEmail = async (email, name) => {
  await sgMail.send({
    to: email,
    from: "dhruvtiwari110058@gmail.com",
    subject: "Sad to see you go!",
    text: `Sad to say bye, ${name}. Have a nice day.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
