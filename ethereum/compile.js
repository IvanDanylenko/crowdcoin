const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractName = 'Campaign.sol';

const buildPath = path.resolve(__dirname, 'build');

const campaignPath = path.resolve(__dirname, 'contracts', contractName);
const campaignSource = fs.readFileSync(campaignPath, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
    [contractName]: {
      content: campaignSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// Compile contracts source code
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[contractName];

// Create build directory
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

// Save compiled contracts in separate files
for (let key in output) {
  const filePath = path.resolve(buildPath, `${key}.json`);
  fs.writeFileSync(filePath, JSON.stringify(output[key], null, 2));
}
