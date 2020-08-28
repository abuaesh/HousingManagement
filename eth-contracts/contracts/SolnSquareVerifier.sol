pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './verifier.sol';
import './ERC721Mintable.sol';


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete{

// TODO define a solutions struct that can hold an index & an address
struct Solution{
    uint _index;
    address _address;
    bool isValue;
}

// TODO define an array of the above struct
//Solution[] solutions;

// TODO define a mapping to store unique solutions submitted
mapping (uint => Solution) uniqueSolutions;

// Define an interface to the verifier contract generated by zokrates--to use it for verification before minting new tokens
Verifier public squareVerifier; //to access the method in there: verifyTx


// TODO Create an event to emit when a solution is added
event SolutionAdded(uint _index, address _address);

//Constructor
constructor(address verifierAddress) public
{
    squareVerifier = Verifier(verifierAddress);
}


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(Solution memory sol) public{
    //solutions.push(sol);
    uniqueSolutions[sol._index] = sol;
    emit SolutionAdded(sol._index, sol._address);
}

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSupply
function mintTokens(
    uint Id,
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c, uint[2] memory input) public
{
    Solution memory sol = uniqueSolutions[Id];
    require(!sol.isValue, "Solution is not unique.");
    require(squareVerifier.verifyTx(a, b, c, input), "Cannot mint a new token- Verification failed");
    sol = Solution(Id, msg.sender, true);
    addSolution(sol);
    super.mint(msg.sender, Id);
}

}//end contract
/*
//Interface to verifier contract generated by zokrates:
contract Verifier{
    //function verifyingKey() pure internal returns (VerifyingKey memory vk);
    //function verify(uint[] memory input, Proof memory proof) internal view returns (uint);
    function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c, 
            uint[2] memory input
        ) public view returns (bool r);
}
*/