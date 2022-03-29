console.log("Start of the program");
const child_process = require("child_process");
const new_process = child_process.spawn("node", ["fibonacci.js"], {stdio: "inherit"});
console.log("End of the program");
