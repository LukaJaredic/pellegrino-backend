module.exports = {
  async afterCreate (event) {
    const result = event.result;
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'pellegrinots@gmail.com',
        subject: 'A new offer request has been received',
        html: `
        <h1>A new offer request has been received.</h1>
        <p>You can see it in the admin panel</p>
        <a href="${process.env["BACKEND_URL"]}/admin/content-manager/collectionType/api::offer-request.offer-request/${result.id}">Click here to get to admin panel</a>
`
      });
    }catch (e) {
      console.log(e.response.body)
    }
  }
}
