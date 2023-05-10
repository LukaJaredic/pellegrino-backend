module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'pellegrino.travel.robot@gmail.com',
        defaultReplyTo: 'pellegrino.travel.robot@gmail.com',
      },
    },
  },
});
