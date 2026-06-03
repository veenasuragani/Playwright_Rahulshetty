const https = require('https');
const { JSDOM } = require('jsdom');
https.get('https://rahulshettyacademy.com/seleniumPractise/', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    const dom = new JSDOM(body);
    const doc = dom.window.document;
    const inputs = Array.from(doc.querySelectorAll('input.search-keyword')).map(i=>i.outerHTML);
    console.log('inputs', inputs.length);
    console.log(body.slice(0, 1000));
  });
}).on('error', console.error);
