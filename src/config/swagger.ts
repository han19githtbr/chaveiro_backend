// eslint-disable-next-line linebreak-style
// eslint-disable-next-line linebreak-style
export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'O chaveiro REST API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        //url: 'https://ochaveiro.netlify.app',
        description: 'Development environment',
      },
      {
        url: `${process.env.URL}:${process.env.PORT}`,
        description: 'Testing environment',
      },
    ],
  },
  apis: ['docs/**/*.yml'],
};
