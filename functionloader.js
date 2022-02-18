
const {promises:{readFile}} = require('fs')

if(process.argv.length == 3) {
    console.log(process.argv[2])
}

var child_process = require('child_process')

var child = undefined;
var run = undefined;

const functionLoader= function(key) {
    child = child_process.fork(`functionloader.js`)
    
    child.send({
        type:'init',
        name:key
    })

    setTimeout(function(){
        child.send({
            type:'call',
            name:{1:'123'}
        })
    }, 4000)

    child.on('message', m=>{
        console.log(m)
    })
    
    child.on('error', function(){
        console.log("error")
        process.exit(0);
    })
}

process.on('message', m => {
    if(m.type == 'init'){
        readFile('./' + m.name + '.js', "utf-8").then(data => {
            run = new Function(data +'\nreturn main')
        })
    }

    if(m.type == 'call') {
        let ret = run()(m.name);
        console.log("ret:" + ret);
    }
})

process.on('error', function() {
    console.log('error')
})

module.exports = {
    functionLoader:functionLoader
}