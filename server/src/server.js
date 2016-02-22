/**
 * Created by subramaniams on 13/2/16.
 */
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var config = require('config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 8081;
const apiToken = config.get('apiToken');
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

app.get('/', function (req, res) {
  res.end('Slack Server API');
});

app.post('/create-channel', function (req, res) {
  var requestData = {
    'token': apiToken,
    'name': req.body.channelName
  };
  var responseData = {
    "ok": false,
    "data": null,
    "err": ""
  };
  request({
    url: 'https://slack.com/api/channels.join',
    method: 'POST',
    headers: headers,
    body: dataSerializer(requestData, '&')
  }, function (error, response, body) {
    if (error) {
      res.status(500).end(JSON.stringify(responseData));
      return
    }
    var bodyObj = JSON.parse(body);
    if (bodyObj.channel && bodyObj.channel.id) {
      var channelData = {
        'id': bodyObj.channel.id
      };
      responseData.ok = true;
      responseData.data = channelData;
    }

    res.end(JSON.stringify(responseData));
  });
});

function dataSerializer(data, delimiter) {
  var query = "";
  for (var key in data) {
    query += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + delimiter;
  }
  return query;
}

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Slack server API listening at http://%s:%s', host, port);
});