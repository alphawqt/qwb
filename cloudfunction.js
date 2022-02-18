// cloudfunction
const { default: cluster } = require("cluster");
const fl = require('./functionloader')


global.funList = {}

//分配所有的函数JS
var init =  function() {
    console.log(global.funList)
    for(let key in global.funList){
        fl.functionLoader(key);
    }
}





var functionRegister = function(name) {
     global.funList[name] = {1:1};
}

var functionDispatcher = function(req) {
    var functionName = req.name;
    var fjs = require("./" + functionName);
    var ret = {
        data:fjs.main(req.data)
    }
    return ret;
    
}

module.exports = {
    init:init,
    functionDispatcher:functionDispatcher,
    functionRegister:functionRegister,
}