const cluster = require('cluster')
const http = require("http");
// import { cpus } from 'os';
const os  = require("os")
const process = require('process');

const numCPUs = os.cpus().length;

const callFunction = require('./cloudfunction')

qwbserver = {
    run:function() {
        var self = this;
        var server = http.createServer(function(req, res){    
            const {headers, url} = req;
            let body = [];
            req.on("end", ()=> {

                body = Buffer.concat(body).toString();
                var returnData = {};
                if(url.indexOf("/function") != -1) {
                    returnData = self.functionDispatcher(JSON.parse(body))
                }
                res.write(JSON.stringify(returnData));
                res.end()
        
            });
        
            req.on("error", (error) => {
                console.log(error);
            });
        
            req.on("data", (chunk) => {
                body.push(chunk)
            })
        });
        server.listen(5051);
    },

    functionDispatcher:function(req) {
        // console.log(req);
        // var functionName = req.name;
        // var fjs = require("./" + functionName);
        // var ret = {
        //     data:fjs.main(req.data)
        // }
        // return ret;
        return callFunction.functionDispatcher(req)
    }
}

// qwbserver.run();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      //重新fork
      cluster.fork();
    });
  } else {
    qwbserver.run();  
    console.log(`Worker ${process.pid} started`);
  }

