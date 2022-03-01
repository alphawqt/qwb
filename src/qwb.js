const { openSync } = require("fs");
var http = require("http");
var request = require("request")

cloud = {
    callFunction:function(object) {
        var options = {
            url:"http://127.0.0.1:5051/function",
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            json:true,
            body:object
        }
        return new Promise(function(resolve, reject) {
            request(options, (error, res, body) => {
                resolve(body)
            })
        });

    },
}



module.exports = {
    cloud:cloud
}