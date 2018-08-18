import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';
import './App.css';

class App extends Component {
  state={
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager,players,balance})
  }
  onSubmit=async(event)=>{
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    this.setState({message:'waiting for transaction to complete'})
    await lottery.methods.register().send({
      from: accounts[0],
      value : web3.utils.toWei(this.state.value,'ether')
    }); 
    this.setState({message:'You have been entered'})
  };
  
  onClick = async()=>{
    const accounts =  await web3.eth.getAccounts();
    this.setState({message:'waiting for transaction to complete'})
    await lottery.methods.winner().send({
      from:accounts[0]
    });
    this.setState({message:'Winner has been picked!'})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Ethereum lottery</h1>
        </header>
        <h3 className="App-intro">
          This app is managed by {this.state.manager} <br/>
          Total Players:{this.state.players.length}<br/>
          Total reward to be won !: {web3.utils.fromWei(this.state.balance,'ether')} ether!<br/>
        </h3>
        <form onSubmit={this.onSubmit}>
          <h2>Ready to play?</h2>
          <div>
            <label>Amount of ether to register: </label>
            <input
              value = {this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button> Enter </button>
          </div>
        </form>
        <hr/>
        <h4> Lets Play! </h4>
        <button onClick={this.onClick}> Pick a winner! </button>
        <hr/>
        <h1>{this.state.message}</h1>
       


      </div>
    );
  }
}

export default App;
