#!/usr/bin/env node

var program = require('commander');
var request = require('request');
var fileExists = require('file-exists');
var webuild = require('./webuild') || undefined;

program
  .version('1.0.0')
  .option('-e, --events [type]', 'get list of events')
  .option('-r, --repos [num]', 'get list of repos')
  .parse(process.argv);

if (process.argv.length < 3) {
  if (!fileExists('./webuild.js')) {
    console.log('Please create a file webuild.js. Sample file is available!')
  }
  program.help();
}

if (program.events) {
  if (!fileExists('./webuild.js')) {
    console.log('Please create a file webuild.js. Sample file is available!')
  } else {
    request(webuild.apiUrl + 'events', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body));
      }
    })
  }
}

if (program.repos) {
  if (!fileExists('./webuild.js')) {
    console.log('Please create a file webuild.js. Sample file is available!')
  } else {
    request(webuild.apiUrl + 'repos', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body));
      }
    })
  }
}
