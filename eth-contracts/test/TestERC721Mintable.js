var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            var result1 = await this.contract.mint().send(account_one, 123, {from: account_one});
            var result2 = await this.contract.mint().send(account_two, 456, {from: account_one});
            var result3 = await this.contract.mint().send(account_three, 789, {from: account_one});
        })

        it('should return total supply', async function () { 
            var totalSupply = await this.contract.totalSupply().call();
            console.log("Total supply of tokens is: " + totalSupply);
            assert.equal(totalSupply, 3);
        })

        it('should get token balance', async function () { 
            var account_one_balance = await this.contract.balanceOf().call(account_one, {from: account_one});
            assert.equal(account_one_balance, 1);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            var known_uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/123";
            var retrieved_uri = await this.contract.tokenURI().call(123)
            assert.equal(known_uri, retrieved_uri);
        })

        it('should transfer token from one owner to another', async function () { 
            await transferFrom(account_one, account_two, 123).send({from: account_one});
            var new_owner = await ownerOf(123).call();

            assert.equal(new_owner, account_two);
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})