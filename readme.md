# Escrow DApp - Decentralized Escrow Application

A full-stack decentralized escrow application built with **Hardhat**, **React**, and **Ethers.js v6**. This project demonstrates a three-party escrow system with **depositor**, **arbiter**, and **beneficiary** roles.

## 🎯 Project Overview

This escrow smart contract enables secure peer-to-peer transactions with an intermediary (arbiter) who approves fund release to the beneficiary. The contract ensures funds are held safely until the arbiter validates the transaction conditions.

## ✅ Completed Features

### 🏗️ **Smart Contract**

- [x] **Escrow.sol** - Secure escrow contract with three-party system
- [x] **Solidity 0.8.28** - Latest compiler version
- [x] **Deployed on Sepolia** - Live testnet deployment
- [x] **Gas optimized** - Efficient contract design

### 🔧 **Backend Infrastructure**

- [x] **Hardhat Framework** - Professional development environment
- [x] **Google Cloud RPC** - Reliable blockchain connection
- [x] **Automated Tests** - Comprehensive test suite
- [x] **Deployment Scripts** - One-click deployment

### 🌐 **Frontend Application**

- [x] **React 18.3.1** - Modern React with hooks
- [x] **Ethers.js v6.15.0** - Latest web3 library
- [x] **MetaMask Integration** - Wallet connection
- [x] **Real-time Contract Data** - Live balance and status updates
- [x] **Responsive Design** - Mobile-friendly interface

### 🔐 **Security Features**

- [x] **Access Control** - Only arbiter can approve
- [x] **Event Logging** - Transaction transparency
- [x] **Failed Transfer Protection** - Secure fund transfers
- [x] **Sepolia Testnet** - Safe testing environment

## 📋 **Live Contract Details**

| **Parameter**        | **Value**                                    |
| -------------------- | -------------------------------------------- |
| **Contract Address** | `0x95493c6311D1B5788E6C0189123B9c5972fD3Fb7` |
| **Network**          | Sepolia Testnet                              |
| **Arbiter**          | `0x45eC7E6dff49d22D3713Ef0eA38cF49CdE75346c` |
| **Beneficiary**      | `0x45eC7E6dff49d22D3713Ef0eA38cF49CdE75346c` |
| **Deposit**          | 0.001 ETH                                    |
| **Status**           | Deployed & Active                            |

🔍 **View on Etherscan**: [https://sepolia.etherscan.io/address/0x95493c6311D1B5788E6C0189123B9c5972fD3Fb7](https://sepolia.etherscan.io/address/0x95493c6311D1B5788E6C0189123B9c5972fD3Fb7)

## 🚀 **Quick Start**

### Prerequisites

- Node.js v20.19+ or v22+
- MetaMask wallet with Sepolia ETH
- Git

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd escrow-hardhat
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Create .env file
cp .env.example .env

# Add your keys
GOOGLE_CLOUD_RPC_URL=your_google_cloud_rpc_url
PRIVATE_KEY=your_private_key
```

4. **Run tests**

```bash
npm test
```

5. **Start frontend**

```bash
cd app
npm install
npm start
```

## 📁 **Project Structure**

escrow-hardhat/
├── contracts/ # Smart contracts
│ └── Escrow.sol
├── scripts/ # Deployment scripts
│ └── deploy.js
├── test/ # Test files
│ └── test.js
├── app/ # React frontend
│ ├── src/
│ │ ├── App.js # Main application
│ │ ├── Escrow.js # Contract component
│ │ └── deploy.js # Deploy utility
│ └── public/
├── hardhat.config.js # Hardhat configuration
└── package.json

## 🔧 **Technical Implementation**

### Smart Contract Architecture

```solidity
contract Escrow {
    address public arbiter;     // Approves transactions
    address public beneficiary; // Receives funds
    address public depositor;   // Deposits funds
    bool public isApproved;     // Approval status

    function approve() external {
        require(msg.sender == arbiter);
        // Transfer funds to beneficiary
    }
}
```

### Frontend Integration

```javascript
// Ethers v6 Implementation
const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

// Real-time contract data
const balance = await provider.getBalance(contractAddress);
const isApproved = await contract.isApproved();
```

## 🧪 **Testing**

### Smart Contract Tests

```bash
# Run all tests
npx hardhat test

# Run with coverage
npx hardhat coverage

# Run specific test
npx hardhat test --grep "should transfer balance"
```

### Test Coverage

- ✅ Contract deployment
- ✅ Access control (arbiter only)
- ✅ Fund transfer mechanism
- ✅ Event emission
- ✅ Revert conditions

## 🌐 **Networks**

| **Network**   | **Status**    | **Contract**                                 |
| ------------- | ------------- | -------------------------------------------- |
| **Sepolia**   | ✅ Deployed   | `0x95493c6311D1B5788E6C0189123B9c5972fD3Fb7` |
| **Localhost** | ✅ Configured | Deploy locally                               |

## 📖 **Usage Guide**

### 1. **Connect Wallet**

- Open the application
- Connect MetaMask wallet
- Switch to Sepolia network

### 2. **View Contract Status**

- Check arbiter, beneficiary, depositor addresses
- View current balance
- Monitor approval status

### 3. **Approve Transaction** (Arbiter Only)

- Click "Approve Escrow" button
- Confirm transaction in MetaMask
- Funds automatically transfer to beneficiary

### 4. **Monitor Events**

- Real-time status updates
- Transaction confirmations
- Balance changes

## 🔐 **Security Considerations**

### Implemented

- ✅ **Access Control**: Only arbiter can approve
- ✅ **Reentrancy Protection**: Safe external calls
- ✅ **Event Logging**: Transparent operations
- ✅ **Input Validation**: Secure parameter handling

### Best Practices

- ✅ **Latest Solidity Version**: 0.8.28
- ✅ **Hardhat Toolbox**: Professional tools
- ✅ **Comprehensive Testing**: Edge case coverage
- ✅ **Gas Optimization**: Efficient operations

## 🛠️ **Available Scripts**

### Backend

```bash
npm run compile    # Compile contracts
npm run test       # Run tests
npm run deploy     # Deploy to network
npm run verify     # Verify on Etherscan
```

### Frontend

```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run React tests
```

## 🚧 **Known Limitations**

- **Single Use**: Contract approves once only
- **No Cancellation**: No refund mechanism
- **Fixed Parties**: Addresses set at deployment
- **No Dispute Resolution**: No arbitration process

## 🔮 **Future Enhancements**

### Potential Features

- [ ] **Wei to Ether Conversion**: User-friendly input
- [ ] **Persistence**: LocalStorage for contract history
- [ ] **Multiple Contracts**: Deploy multiple escrows
- [ ] **Timeout Mechanism**: Automatic refunds
- [ ] **Cancel Function**: Depositor refund option

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 **Links**

- **Live Contract**: [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x95493c6311D1B5788E6C0189123B9c5972fD3Fb7)
- **Hardhat Documentation**: [https://hardhat.org/](https://hardhat.org/)
- **Ethers.js v6**: [https://docs.ethers.org/v6/](https://docs.ethers.org/v6/)
- **React Documentation**: [https://reactjs.org/](https://reactjs.org/)
