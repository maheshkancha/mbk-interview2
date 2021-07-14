const path = require("path");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const https = require('https');
const { MongoClient } = require('mongodb');

const app = express();

// Database Connectivity
const dbUrl = "mongodb://localhost:27017/commentsdb"
const mongoClient = new MongoClient(dbUrl);

async function main() {
  await mongoClient.connect();
  const db = mongoClient.db('commentsdb');
  const collection = db.collection('comments');

  const dataUrl = "https://jsonplaceholder.typicode.com/comments";
  https.get(dataUrl, res => {
    let jsonData = '';

    res.on('data', chunk => {
      jsonData += chunk;
    });

    res.on('end', () => {
      collection.insertMany(JSON.parse(jsonData));
      console.log('Bulk Insert completed...');
    });
  }).on('error', err => {
    console.log('Error while fetching data:', err);
  })
}

if(process.env.loadData === "true") {
  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoClient.close())
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


/** ======================================================================== */
/** CANDIDATE: INSERT ROUTES HERE! ========================================= */
/** ======================================================================== */

app.use("/", require("./routes/index"));
app.use("/comments", require("./routes/comments"));
// Error Handling

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: "error",
    error: err.message,
  });
});

module.exports = app;
