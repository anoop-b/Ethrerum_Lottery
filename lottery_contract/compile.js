const path = require('path');
const fs = require('fs');
const solc = require('solc');

const mypath = path.resolve(__dirname,'contracts','Lottery.sol');
const code = fs.readFileSync(mypath,'utf8');

module.exports = solc.compile(code,1).contracts[':Lottery']; // using solc to compile our contract