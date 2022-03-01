
// const {spawn} = require('child_process')

// const ls = spawn('dir') // ls -lh /user
// ls.stdout.on('data',data => {
//     console.log(`stdout: ${data}`)
// })
// ls.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`)
// })
// ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`)
// })

var child_process = require('child_process')

var child = child_process.fork("./test_child.js");

setInterval(function(){
    child.send("from parent:123444")
}, 2000);

child.on('message', m=>{
    console.log(m)
})

child.on('error', function(){
    console.log("error")
    process.exit(0);
})