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
      await strapi.plugins["email"].services.email.send({
        to: "projaredic@gmail.com",
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
        <p>Additional info: ${additionalInfo}</p>
        <p>Customers name: ${firstName} ${lastName}</p>
        <p>Customers email: ${email}</p>
        <p>Phone number: ${phoneNumber}</p>
        `,
      });
    } catch (e) {
      console.log(e.response.body);
    }
  },
};
