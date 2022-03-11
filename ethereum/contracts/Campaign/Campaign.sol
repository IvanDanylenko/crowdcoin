// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(address manager, uint minimumContribution) public {
        address campaignAddress = address(new Campaign(manager, minimumContribution));
        deployedCampaigns.push(campaignAddress);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}


contract Campaign {

    /**
    *  1. constructor to add manager, and minimum contribution
    *  2. contribute func to allow person send some amount of money
    *     mark this person as contributor, with rights to approve requests
    *  3. createRequest (can be only manager), accept description, address to send and amount
    *  4. approve (can be called contributor), to approve request with some index
    *  5. finalizeRequest (can be called by manager), to send money from this request
    *  
    */

    struct Request {
        string description;
        address payable recipient;
        uint amount;
        bool isCompleted;
        mapping(address => bool) approvals;
        uint approvalsCount;
    }

    address public manager;

    uint public minimumContribution;

    mapping(address => bool) public contributors;
    uint public contributorsCount;

    Request[] public requests;

    modifier isManager() {
        require(msg.sender == manager, "Caller is not a manager");
        _;
    }

    constructor(address managerAddress, uint minimum) {
        manager = managerAddress;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "Minimum contribution is required");
        // Check if person already is contributor
        if (!contributors[msg.sender]) {
            contributors[msg.sender] = true;
            contributorsCount++;
        }
    }

    function createRequest(string memory description, address recipient, uint amount) public isManager {
        Request storage r = requests.push();
        r.description = description;
        r.recipient = payable(recipient);
        r.amount = amount;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(contributors[msg.sender], "Caller is not a contributor");

        // Contributor can't approve request twice
        require(!request.approvals[msg.sender], "Request was already approved");

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint index) public isManager {
        Request storage request = requests[index];

        require(!request.isCompleted, "Request is completed");
        // Should be approved with more than half of contributors
        require(request.approvalsCount > contributorsCount / 2, "Request has not enought approvals");

        (bool sent,) = request.recipient.call{value: request.amount}("");
        require(sent, "Failure! Ether not sent");
        request.isCompleted = true;
    }
}
