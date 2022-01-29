// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Patients {
    int256 public id = 0;
    mapping(int256 => Patient) public patient;

    struct Patient {
        string name;
        uint256 age;
        uint256 height;
        uint256 weight;
        string gender;
        string phoneNumber;
        string homeAddress;
        address walletAddress;
        string publicKey;
    }

    function addPatient(
        string memory name,
        uint256 age,
        uint256 height,
        uint256 weight,
        string memory gender,
        string memory phoneNumber,
        string memory homeAddress,
        string memory publicKey
    ) public {
        id += 1;
        patient[id] = Patient(
            name,
            age,
            height,
            weight,
            gender,
            phoneNumber,
            homeAddress,
            msg.sender,
            publicKey
        );
    }
}
