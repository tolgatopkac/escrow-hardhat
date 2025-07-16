const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Escrow to Sepolia...");

  const network = await hre.ethers.provider.getNetwork();
  console.log(
    "📡 Network:",
    network.name,
    "Chain ID:",
    Number(network.chainId)
  );

  // Deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Constructor parametreleri
  const arbiterAddress = deployer.address; // Test için deployer = arbiter
  const beneficiaryAddress = "0x45eC7E6dff49d22D3713Ef0eA38cF49CdE75346c";
  const depositAmount = hre.ethers.parseEther("0.001"); // 0.001 ETH deposit

  console.log("\n📦 Deploy Parametreleri:");
  console.log("   Arbiter:", arbiterAddress);
  console.log("   Beneficiary:", beneficiaryAddress);
  console.log("   Deposit:", hre.ethers.formatEther(depositAmount), "ETH");

  // Contract factory
  const Escrow = await hre.ethers.getContractFactory("Escrow");

  // Deploy with parameters!
  const escrow = await Escrow.deploy(arbiterAddress, beneficiaryAddress, {
    value: depositAmount, // ETH deposit
  });

  console.log("⏳ Waiting for deployment...");
  await escrow.waitForDeployment();

  const contractAddress = await escrow.getAddress();

  console.log("\n🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("===============================");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 Arbiter:", arbiterAddress);
  console.log("🔗 Beneficiary:", beneficiaryAddress);
  console.log("💵 Deposited:", hre.ethers.formatEther(depositAmount), "ETH");
  console.log(
    "🔍 Etherscan:",
    `https://sepolia.etherscan.io/address/${contractAddress}`
  );
  console.log("===============================");

  // Contract balance doğrulama
  const contractBalance = await hre.ethers.provider.getBalance(contractAddress);
  console.log(
    "✅ Contract Balance:",
    hre.ethers.formatEther(contractBalance),
    "ETH"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deploy failed:", error);
    process.exit(1);
  });
