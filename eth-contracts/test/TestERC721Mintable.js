var Test = require('../config/testConfig.js');

contract('TestERC721Mintable', async(accounts) => {

    var config;
    before('setup contract', async () => {
        config = await Test.Config(accounts);
      });

    describe('match erc721 spec', function () {

        it('should return total supply', async function () { 
            var totalSupply = await config.contract.totalSupply().call();
            console.log("Total supply of tokens is: " + totalSupply);
            assert.equal(totalSupply, 3, "Total supply of tokens does not match expected supply");
        })

        it('should get token balance', async function () { 
            var account_one_balance = await config.contract.balanceOf(config.account_one).call({from: config.account_one});
            assert.equal(account_one_balance, 1, "Balance token does not match expected balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            var known_uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/456";
            var retrieved_uri = await config.contract.tokenURI(456).call();
            assert.equal(known_uri, retrieved_uri, "Retrieved URI does not match expected URI");
        })

       /* it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 123).send({from: account_one});
            var new_owner = await config.contract.ownerOf(123).call();

            assert.equal(new_owner, account_two, "Token was not transferred to new owner");
            
        })*/
    });

    describe('have ownership properties', function () {

        it('should fail when minting when address is not contract owner', async function () { 
            var result = await config.contract.mint(config.account_two, 123).send({from: config.owner});

            assert.equal(result, false, "Only contract owner can mint new tokens");
        })

        it('should return contract owner', async function () { 
            
        })

    });
})