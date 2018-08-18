const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');

const web3 = new Web3(provider);
const {
    interface,
    bytecode
} = require('../compile');


let accounts;
let lottery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
    lottery.setProvider(provider);
});

//testing each funtionality of contract using mocha framework

describe('Lottery contract', () => {
    it('deployed contract', () => {
        assert.ok(lottery.options.address);
    });

    it('register function', async () => {
        await lottery.methods.register().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('multiple register function', async () => {
        await lottery.methods.register().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.register().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.register().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('miminmum ether required', async () => {
        try {
            await lottery.methods.register.send({
                from: acoounts[0],
                value: 0
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
});