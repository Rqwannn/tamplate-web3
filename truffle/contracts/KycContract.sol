// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable {
    mapping (address => bool) allowed;

    function setKycCompleted(address _addr) public onlyOwner{
        allowed[_addr] = true;
    }

    function setKycRevoked(address _addr) public onlyOwner{
        allowed[_addr] = false;
    }

    // Fungsi yang diberi label view atau pure tidak mengonsumsi gas saat dipanggil dari fungsi lain yang bukan transaksi.
    // untuk virtual digunakan untuk menandai fungsi sebagai fungsi yang dapat di-overwrite atau di-override oleh kontrak turunannya
    function KycCompleted(address _addr) public view returns(bool){
        return allowed[_addr];
    }

}