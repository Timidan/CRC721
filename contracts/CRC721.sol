//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CRC721 is ERC721 {
  uint256 tokenId = 0;

  constructor(string memory _globalURI) ERC721("Conflux Token", "CFXT") {
    globalURI = _globalURI;
  }

  function mintToken(address _to) external {
    _mint(_to, tokenId);
    tokenId++;
  }

  function totalSupply() public view returns (uint256 tSupply_) {
    tSupply_ = tokenId;
  }
}
