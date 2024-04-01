# test-project
Installation Steps:
1) git clone https://github.com/Rohan766/test-project.git
2) userName: Rohan766
3) Password as token: Shared On mail
4) cd test-project
   
   
Tasks UT Report

1. CSV Upload API with Worker Threads:
 - Define an '/upload' endpoint in server.js for file uploads.
 - Utilize multer middleware to parse CSV files.
 - Trigger a worker thread to handle CSV data processing.
 - The worker.js thread reads and inserts CSV data into MongoDB.

Execution command: 
 a) npm start
 b) curl --location 'localhost:4200/upload' \
--form 'datasheet=@"/home/vvdn/test-project/datasheet.csv"'

2. Plain JavaScript Template Parser:
 - Create a TemplateEngine function with a template string and data object.
- Replace placeholders in the template with actual data using regex or string manipulation.
- Return the processed template string.
Execution command:
 a) node TemplateEngine.js
3. Long Polling HTTP Server in Node.js:
 - Set up an HTTP server to handle client requests.
 - Implement a route to fetch the last modified time of a text file.
 - Use long polling to continuously monitor file modification and respond to client requests accordingly.
Execution command:
 a) node longPollingServer.js
 b) curl --location 'localhost:5201/last-modified-time'
