// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Reports{
    int256 public id = 0;
    mapping(int256 => Report) public report;

    struct Report {
        string report;
        address doctor;
        string patient;
    }

    function addPatient(
        string memory _report,
        string memory _to
    ) public {
        id += 1;
        report[id] = Report(
            _report,
            msg.sender,
            _to
        );
    }

    // function getReports() external view returns(report memory){
    //     return report;
    // } 



}