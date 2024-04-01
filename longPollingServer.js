const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 5201;
const FILE_PATH = 'uploads/datasheet.csv';

// Function to get the last modified time of the file
function convertToIST(date) {
    const istOffset = 330; // Offset in minutes for Indian Standard Time (IST)
    const istTime = new Date(date.getTime() + istOffset * 60000); // Add the IST offset in minutes to the date
    return istTime;
}
function getLastModifiedTime() {
  return new Promise((resolve, reject) => {
    fs.stat(FILE_PATH, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        let istTime = convertToIST(stats.mtime)
        resolve(istTime);
      }
    });
  });
}

// HTTP server to handle requests
const server = http.createServer(async (req, res) => {
  if (req.url === '/last-modified-time' && req.method === 'GET') {
    try {
      // Get the last modified time of the file
      const lastModifiedTime = await getLastModifiedTime();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ lastModifiedTime }));
    } catch (err) {
      console.error('Error reading file stats:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error reading file stats');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Long Polling HTTP Server is running on port ${PORT}`);
});
