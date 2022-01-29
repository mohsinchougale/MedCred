// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

library Reports{
    struct Report{
        //string patientId
        string name;
        uint256 age;
        // uint256 height;
        // uint256 weight;
        string gender;
        string phoneNumber;
        //string history;
        string diagnosis;
        string medicines;
    }
}

contract sendMessage{
    

    // Report public _report;

    function setX(TestContract _test, Reports.Report memory _report) external {
        _test.setX(_report);
    }

    function getX(TestContract _test) external view returns (Reports.Report memory){
        Reports.Report memory report = _test.getX();
        return report;
    }

    function setXandSendEther(TestContract _test, Reports.Report memory _report) external payable{
        _test.setXandReceiveEther{value:msg.value}(_report);
    }

    function getXandValue(TestContract _test) external view returns (Reports.Report memory,uint){
        (Reports.Report memory report,uint value) = _test.getXandValue();
        return (report,value);
    }

}

contract TestContract{
    Reports.Report public report;
    uint public value = 123;

    function setX(Reports.Report memory _report) external{
        report=_report;
    }

    function getX() external view returns (Reports.Report memory){
        return report;
    }

    function setXandReceiveEther(Reports.Report memory _report) external payable{
        report=_report;
        value=msg.value;
    }

    function getXandValue() external view returns (Reports.Report memory,uint){
        return (report,value);
    }
}