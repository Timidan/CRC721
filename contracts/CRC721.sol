//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "conflux-contracts/contracts/token/CRC721/extensions/CRC721Enumerable.sol";

contract CRC721 is CRC721Enumerable {
    uint256 tokenId = 0;

    constructor(string memory _globalURI) ERC721("Timidan", "TMT") {
        globalURI = _globalURI;
    }

    function mintToken(address _to, uint256 _amount) external {
        for (uint256 i; i < _amount; i++) {
            _mint(_to, tokenId);
            tokenId++;
        }
    }

    function totalSupply() public view override returns (uint256 tSupply_) {
        tSupply_ = tokenId;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return globalURI;
    }
}
