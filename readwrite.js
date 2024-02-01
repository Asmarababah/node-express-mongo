const fs = require("fs");

let filecontent;
fs.readFile('./files/hello.txt', (error, data) => {
    if (error) {
        console.log("the data couldnot read");
    }
    else {
        filecontent = data.toString();
        fs.writeFile("./files/hello.txt", filecontent + "Hi", () => {
            console.log("updated");
        })

    }
});