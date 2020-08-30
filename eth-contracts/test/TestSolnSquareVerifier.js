var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
//var SampleProof = require('../../zokrates/code/square/proof1_1');
//var FalseSample = require('../../zokrates/code/square/notproof3_5');
const truffleAssert = require('truffle-assertions');

contract('TestSolnSquareVerifier', async(accounts) => {
  before('setup test environment', async function () { 
    this.verifier = await SquareVerifier.new(accounts);         
    this.solnSV = await SolnSquareVerifier.new(this.verifier.address);         
  })

  describe('match soln square verifier spec', function () {
    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('should add a new solution for contract SolnSquareVerifier', async function () { 
        let _id = 123;
        let _owner = accounts[0];
        let result = await this.solnSV.addSolution(_id, _owner);
        //Listen to SolutionAdded event emitted by SolnSquareVerifier contract
        truffleAssert.eventEmitted(result, 'SolutionAdded', (ev)=>{
            //The id and owner emitted with the event should equal _id and _owner
            return ev._index == _id && ev._address == _owner;
        });
    })

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('should mint new token by ERC721', async function () { 
    })
  })
})
