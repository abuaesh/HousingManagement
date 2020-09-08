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
        let _id = 3456;
        let SampleProof = 
        {
          "proof": {
            "a": [
              "0x09f461edaf17851d52e7f52f871c5e62c47d8e4f6876088612e480e6f3763701",
              "0x0a4511d868b094be873ea339482bf17bdd3b80d704944101372cfa71a24fdfb9"
            ],
            "b": [
              [
                "0x18b754e9665ee861740aa1ccb4def4ed4eb945d0f26be1dced2656004ea59111",
                "0x099a674ea974d7421b96a617635ac38939775ce47916487edaf5d384ddd401bf"
              ],
              [
                "0x22450d6b21830786c87e94131fbaaf9f6eaa93e6d526a827b42b706bee7654ff",
                "0x022b35cca41f73cee44819184e9c0054e1553f3a31310e53581d90e526c93073"
              ]
            ],
            "c": [
              "0x1b4280395bd40fda07d22d768d033219e982e9e26844fd4fc8b7a0af278119fc",
              "0x1dfdd81ca4b3545fdb5a0c6ff7bfaa3c1ca1a3107b62e608b8ef8bfc68943370"
            ]
          },
          "inputs": [
            "0x0000000000000000000000000000000000000000000000000000000000000001"
          ],
          "raw": "09f461edaf17851d52e7f52f871c5e62c47d8e4f6876088612e480e6f376370198b754e9665ee861740aa1ccb4def4ed4eb945d0f26be1dced2656004ea59111099a674ea974d7421b96a617635ac38939775ce47916487edaf5d384ddd401bf9b4280395bd40fda07d22d768d033219e982e9e26844fd4fc8b7a0af278119fc"
        };

        var result = await this.solnSV.mintTokens.call(_id, SampleProof.proof.a, SampleProof.proof.b, SampleProof.proof.c, SampleProof.inputs);
        assert.equal(result, true, "Failed to mint a new token"); 
    })
  })
})
