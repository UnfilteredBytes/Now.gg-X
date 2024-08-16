const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const nggUrl = 'https://mathsspot.com';

const proxy = createProxyMiddleware({
  target: nggurl,
  changeOrigin: true,
  secure: true,
  logLevel: 'info', // Adjust the log level as needed
});

// Remove unnecessary headers
proxy.on('proxyReq', (proxyReq, req) => {
  if (req.headers.host === 'mathsspot.com') {
    proxyReq.removeHeader('X-Forwarded-For');
    proxyReq.removeHeader('X-Real-IP');
    proxyReq.removeHeader('Via');
  }
});

app.use('/', proxy);

const port = process.env.PORT || 443;
app.listen(port, () => {
  console.log(`CybriaGG is running on port ${port}`);
});
