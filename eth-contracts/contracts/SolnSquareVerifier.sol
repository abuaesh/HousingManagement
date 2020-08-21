pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import '../../zokrates/code/square/verifier.sol';


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable{

// TODO define a solutions struct that can hold an index & an address
struct Solution{
    int256 _index;
    address _address;
}

// TODO define an array of the above struct
Solution[] solutions;

// TODO define a mapping to store unique solutions submitted
mapping (int256 => Solution) solutions;


// TODO Create an event to emit when a solution is added
event SolutionAdded(int256 _index, address _address);


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(Solution sol) public{
    solutions.push(sol);
    emit SolutionAdded(sol._index, sol._address);
}

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSupply
function mintNFT()returns()
{
    require(!solutions(i), "Solution is not unique.");
    ????
}


}//end contract