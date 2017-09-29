var http =require('http');
var url="https://management.azure.com/subscriptions/b1256985-d559-406d-a0ca-f47d72fed1e2/providers/Microsoft.Commerce/";
var options = {
    host: url,
    port: 80,
    path: '/resource?id=foo&bar=baz',
    method: 'POST'
  };
  
  http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  }).end();
