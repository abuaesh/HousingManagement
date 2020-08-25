// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier = artifacts.require("Verifier");
var SampleProof = require('../../zokrates/code/square/proof');

contract('TestSquareVerifier', async() => {

  describe('match square verifier spec', function () {
    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    it('should return true for correct proof', async function () { 
        var result = await SquareVerifier.verifyTx(SampleProof.proof.a, SampleProof.proof.b, SampleProof.proof.c, SampleProof.inputs);
        assert.equal(result, true, "Failed to verify a true proof");
    }) 
        
    // Test verification with incorrect proof
    it('should return false for incorrect proof', async function () { 
      let FalseSample =
      {
        "proof": {
          "a": [
            "0x0",
            "0x04a81e18c8c57362b000213bce6d533055ba4f830dc76abf9c5bf37907ffbdd0"
          ],
          "b": [
            [
              "0x272c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e9560",
              "0x1"
            ],
            [
              "0x26e8a26d9bd754c038c42bb9b5b32b91a0c1463aba53b03eb8e224f1230f853a",
              "0x2c080f65faca972f26229da56b338fc12d62261f8626ec42659bc1090e7a983d"
            ]
          ],
          "c": [
            "0x08c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f",
            "0x2f85944aef8c9f217463077e0d8f85fdf5546b3b570820ade0cf9c95a3feb440"
          ]
        },
        "inputs": [
          "0x0000000000000000000000000000000000000000000000000000000000000009",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
        ],
        "raw": "1ba0df5159c4c75da8a30d34e28b0a2242b9634aed77c9b41b979e6081ed5033a72c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e95601535e1e6c5cb4d685ef68595487910d68d8813765f422b977b53e32f8c53fc9488c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f"
      };
      var result = await SquareVerifier.verifyTx(FalseSample.proof.a, FalseSample.proof.b, FalseSample.proof.c, FalseSample.inputs);
      assert.equal(result, false, "Failed to reject a false proof");
    }) 
    // Test verification with incorrect proof
    it('should return false for repeated proof', async function () { 
      var result = await SquareVerifier.verifyTx(SampleProof.proof.a, SampleProof.proof.b, SampleProof.proof.c, SampleProof.inputs);
      assert.equal(result, false, "Failed to reject a repeated proof");
    }) 
  }) 
})