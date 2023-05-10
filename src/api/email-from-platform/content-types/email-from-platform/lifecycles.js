module.exports = {
  async afterCreate (event) {
    const result = event.result;
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'luka.jaredic@yahoo.com',
        subject: 'New message from website user',
        replyTo: result.email,
        text: `New message received from website.
        User's name: ${result.name}
        User's email: ${result.email}
        User's phone: ${result.phone || "Not entered"}
        User's message: ${result.message}`,
      });
    }catch (e) {
      console.log(e.response.body)
    }
  }
}
