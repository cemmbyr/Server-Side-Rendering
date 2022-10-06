import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../client/components/index';

const app = express();

app.get('/', (_, res) => {
  const reactRender = ReactDOMServer.renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width">
        <title>SSR</title>
        <script defer src="http://localhost:6060/client.js"></script>
        <link rel="stylesheet" href="http://localhost:6060/main.css">
      </head>
      <body>
        <div id='ssr'>${reactRender}</div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log(`http://localhost:${3000}`);
});
