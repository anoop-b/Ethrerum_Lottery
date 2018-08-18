pragma solidity ^ 0.4 .17;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender; // msg is a global variable, no declaration is required
    }

    function register() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint) {
        return uint(keccak256(block.difficulty, now, players)); //making use of globalvariables to generate a random(pseudo) interger
    }

    function winner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance); //entire balance of the contract
        players = new address[](0); //creat new dynamic address array with value = 0
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }
}