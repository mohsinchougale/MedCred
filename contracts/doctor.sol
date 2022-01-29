// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Doctors {
    int256 public id = 0;
    mapping(int256 => Doctor) public doctor;
    int256 timepass;

    struct Doctor {
        string name;
        string phoneNumber;
        string specialization;
        address walletAddress;
        string publicKey;
    }

    function addDoctor(
        string memory name,
        string memory phoneNumber,
        string memory specialization,
        string memory publicKey
    ) public {
        id += 1;
        doctor[id] = Doctor(
            name,
            phoneNumber,
            specialization,
            msg.sender,
            publicKey
        );
    }
}
