const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async afterCreate(event) {
    const { params } = event;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      persons,
      date,
      additionalInfo,
      createdAt,
      tour,
    } = params.data;

    const id = tour?.connect?.[0]?.id || tour;

    try {
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: "A new offer request has been received",
        html: `
          <h1>A new offer request has been received at ${createdAt}</h1>
          <p>
            Tour:
            <a href="https://pellegrinotravel.com/tours/${id}">
              https://pellegrinotravel.com/tours/${id}
            </a>
          </p>
          <p>For date: ${date}</p>
          <p>Persons: ${persons}</p>
          <p>Additional info: ${additionalInfo || "-"}</p>
          <p>Customer name: ${firstName} ${lastName}</p>
          <p>Customer email: ${email}</p>
          <p>Phone number: ${phoneNumber}</p>
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
