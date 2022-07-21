var mysql = require('mysql');

//var connection = mysql.createConnection({
  //host: 'mydbupskill.mariadb.database.azure.com',
  //user: 'myadmin', //userblog
  //password: 'jose.2022', //mypassword
  //database: 'upskill_2021_blog', 
 // port: 3306
//});

var connection = mysql.createConnection({host: "cloudmentprod.mysql.database.azure.com", user: "Cloudmentprod", password: "Passw0rd", database: "upskill", port: 3306});


connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

function query(sql) {

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
        console.log(result);
      }
    });
  });
};

function insert(sql, values) {

  console.log("ENTROU" + values);
  connection.query(sql,values, (err, result) => {
    if (err) throw err;
    console.log(result+ " INSERIDO");
  });
};

exports.query = query;
exports.insert = insert;

