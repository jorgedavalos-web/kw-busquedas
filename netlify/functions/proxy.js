const https = require('https');

exports.handler = async function(event) {
  const WEBHOOK = 'https://script.google.com/macros/s/AKfycbyttoZkToP2_XPcZdppjmm8cZ2AxPzv4NmWEy5RUodpvFHGYWNVWw88Cve__DJ2XiqV/exec';
  
  const qs = event.queryStringParameters || {};
  const url = qs.data ? WEBHOOK + '?data=' + encodeURIComponent(qs.data) : WEBHOOK;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: data
        });
      });
    }).on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({status:'error', message: e.message}) });
    });
  });
};