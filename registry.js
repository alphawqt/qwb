// 注册函数
const fs = require("fs")


try {
    fs.readFile("registry.js", "utf-8", (err, data)=> {
        console.log(data)
    })

} catch(error) {
    console.log(error.message);
}