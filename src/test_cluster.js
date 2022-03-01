const cluster = require('cluster')
const http = require("http");
// import { cpus } from 'os';
const os  = require("os")
const process = require('process');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  console.log(`Worker ${process.pid} started`);
}