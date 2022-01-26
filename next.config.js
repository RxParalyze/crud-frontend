module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'Semper Supra'
  },
  publicRuntimeConfig: {
      localUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'https://rxparalyze-crud-frontend-app.herokuapp.com/api', // production api
      PORT: process.env.PORT,
      apiUrl: process.env.API,
  },

}
