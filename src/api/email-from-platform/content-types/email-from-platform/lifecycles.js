const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async afterCreate(event) {
    const { name, email, phone, message, createdAt } = event.result;

    try {
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: "New message from website user",
        replyTo: email,
        html: `
          <h1>New message received from website at ${createdAt}</h1>
          <p>User's name: ${name}</p>
          <p>User's email: ${email}</p>
          <p>User's phone: ${phone || "Not entered"}</p>
          <p>User's message: ${message}</p>
        `,
      });

      if (error) {
        strapi.log.error("Resend error", error);
      } else {
        strapi.log.info(`Resend email sent: ${data?.id}`);
      }
    } catch (e) {
      strapi.log.error("Failed to send Resend email", e);
    }
  },
};
