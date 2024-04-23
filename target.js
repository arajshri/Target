var sql = require('mssql');
var async = require("async");
var moment = require('moment');
var express = require("express"),
  app = require("express")(),
  http = require("http").Server(app),
  io = require("socket.io")(http),
  util = require("util"),
  fs = require("fs");
// app.use(cors());
const { resolve } = require('path');  
const nrc = require('node-run-cmd');
const { log } = require('console');

 //////////prayag lapto connection start /////////
  // const sqlConfig = {
  //   user: "user_mis",
  //   password: "admin",
  //   database: "taco_treceability",
  //   server: "DESKTOP-FCCFFB0",// '192.168.0.139\\MSSQLSERVER',
    // server: '10.9.4.28\\MSSQLSERVER',
 //////////prayag lapto connection end /////////

//  const sqlConfig = {
//   user: "admin8",
//   password: "admin8",
//   database: "kion_treceability",
//   server: "DESKTOP-FKJATC0",
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 50000 
//   },
//   options: {
//     encrypt: false, // for Azure
//     trustServerCertificate: false // change to true for local dev / self-signed certs
//   }
// };



const sqlConfig = {
  user: "User1",
  password: "Pass", 
  database: "replus",
  server: "ORBITTL", 
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 3000000 
  },
  options: {
    encrypt: false, // for Azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
};

var dbConn = new sql.ConnectionPool(sqlConfig);
console.log("1111111111111111111111....");
dbConn.connect().then(function () {
  console.log("Connected to data....", sqlConfig);
});

http.listen(7000, "0.0.0.0", function () {
  console.log("Connected to :7000");
});  

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/target.html'));
});

io.sockets.on('connection', (socket) => {
  console.log('kkkkkkkkkkkk');

  socket.on('submitValues', function (line, packName, daily, weekly, monthly) {
    console.log("data.......", line, packName, daily, weekly, monthly);
       
    sql.connect(sqlConfig, function (err) {
      request = new sql.Request();

      const insertQuery = `
        INSERT INTO replus.dbo.andon_target (packName, line, daily, weekly, monthly)
        VALUES ('${packName}', '${line}', '${daily}', '${weekly}', '${monthly}');
      `;

      request.query(insertQuery, function (err, recordset) {
        if (err) {
          console.log("err", err);
          return;
        }
        console.log("Inserted successful::::::");
      });
    });
  });
});
