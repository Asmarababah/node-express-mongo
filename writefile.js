const fs = require("fs");
fs.writeFile ("./files/hello1.txt ", "new content" , ()=>{
    console.log("updated");
})