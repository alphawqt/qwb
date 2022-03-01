function main(data) {
    console.log("funtionTest called");
    var data = {
        name:"functionTest1",
        value:"functionTest1 test",
        value1:1
    }
    return data;
}

// exports.main1 = function(data) {
//     console.log("111")
// }

var fun1 = function(){
    console.log("111")
}


exports = {
    main1:fun1
}


console.log(exports)