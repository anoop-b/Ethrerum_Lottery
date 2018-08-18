const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const {
    interface,
    bytecode
} = require('./compile.js');

const mnemonic = 'enter your 12 word mnemonic here'; // enter your mnemonic 
const provider = new HDWalletProvider(mnemonic,'https://rinkeby.infura.io/'+'enter your infura key here'); //enter your infura key
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('deployin contract from account:', accounts[0]); //selecting the first account
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:'0x' + bytecode })
        .send({
            gas: '1000000',
            from: accounts[0] //selecting the first account
        });

    console.log('contract deployed to address:', result.options.address);
    console.log(interface);
};

deploy();