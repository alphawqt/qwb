var http = require("http");
var request = require("request");

qwbserver = {
    run:function() {
        var self = this;
        http.createServer(function(req, res){    
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
                // console.log(`data: ${chunk.toString()}`);
                body.push(chunk)
            })
        }).listen(5051);
    },

    functionDispatcher:function(data) {
        console.log(data);
        var functionName = data.name;
        var fjs = require("./" + functionName);
        var ret = {
            data:fjs.run()
        }
        return ret;
    }
}

qwbserver.run();