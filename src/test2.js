const qwb = require("./qwb");

qwb.cloud.callFunction({
    name:"functionTest",
    data:{
        param1:"param1",
        param2:"param2"
    }
}).then(res => {
    // console.log(res.data);
})


// const ft = require('./functionTest')
//  ft.main1()

let a =['1', '2']
console.log(a.length)
console.log(a['length'])
console['log'](a.length)