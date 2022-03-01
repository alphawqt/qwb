process.on('message', m => {
    console.log(m);
})

process.on('error', function() {
    console.log('error')
})

console.log(process.pid)

process.send({from: 'child'})