const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
  const pathname = url.parse(req.url).pathname;
  if (/(jpg|jpeg|png)|(mp3)$/.test(pathname.substring(1))) {
    const isImage = /(jpg|jpeg|png)$/.test(pathname.substring(1));
    fs.readFile(
      path.join(__dirname, pathname.substring(1)),
      function (err, data) {
        if (err) {
          res.writeHead(500, {'content-type': 'text/html'});
          res.write('<div>Get Error</div>');
          res.end();
        } else {
          const filePath = path.resolve(__dirname, pathname.substring(1));
          const readStream = fs.createReadStream(filePath);

          // res.writeHead(200, isImage ? 'image/png' : 'audio/mp4');
          res.writeHead(200, 'ok', {
            'Content-Type': isImage ? 'image/png' : 'audio/mp3',
            // 'Content-Disposition': 'inline',
          });
          readStream.pipe(res);

          readStream.on('end', function () {
            res.end();
          });
        }
      },
    );
  } else {
    res.writeHead(404, {'Content-type': 'text/html'});
    res.write('<div>Not Found!</div>');
    res.end();
  }
});

server.listen(4000, () => {
  console.log('listen on 4000');
});
