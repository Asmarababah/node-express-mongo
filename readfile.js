const fs = require("fs");
fs.readFile('files/hello.txt', (error, data) => {
    if (error) {
        console.log("the data couldnot read");
    }
    if (data) {
        console.log(data.toString());
    }
});