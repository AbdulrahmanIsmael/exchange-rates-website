// Requiring Modules
const fs = require('fs');
const http = require('http');
const url = require('url');
const { replacePlaceholders, replaceHome } = require('./helpers/functions');

// Reading files
const jsonData = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const rateTemplate = fs.readFileSync(
  `${__dirname}/website/exchango-rate.html`,
  'utf-8'
);
const homeTemplate = fs.readFileSync(
  `${__dirname}/website/exchango-home.html`,
  'utf-8'
);

// server configuration
const server = http.createServer((request, response) => {
  const { pathname } = url.parse(request.url, true);

  if (pathname === '/api') {
    response.writeHead(200, {
      'Content-type': 'application/json',
      Description: 'API data of some exchange rates in the world',
    });
    response.end(jsonData);
  } else if (pathname === '/home' || pathname === '/') {
    const data = JSON.parse(jsonData);
    response.writeHead(200, {
      'Content-Type': 'text/html',
      page: 'home',
    });
    const rates = replacePlaceholders(rateTemplate, data);
    const output = replaceHome(homeTemplate, rates);
    response.end(output);
  }
});

server.listen('8000', '127.0.0.1', () => {
  console.log('server started!');
});
