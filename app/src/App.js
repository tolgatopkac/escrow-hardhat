import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Escrow from "./Escrow";

// Deploy edilmiş contract adresini kullan
const CONTRACT_ADDRESS = "0x95493c6311D1B5788E6C0189123B9c5972fD3Fb7";
const ESCROW_ABI = [
  "function arbiter() view returns (address)",
  "function beneficiary() view returns (address)",
  "function depositor() view returns (address)",
  "function isApproved() view returns (bool)",
  "function approve() external",
  "event Approved(uint256)",
];

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  const [escrow, setEscrow] = useState(null);
  const [contractInfo, setContractInfo] = useState({
    arbiter: "",
    beneficiary: "",
    depositor: "",
    balance: "0",
    isApproved: false,
  });

  useEffect(() => {
    async function init() {
      if (typeof window !== "undefined" && window.ethereum) {
        // Ethers v6 provider
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);

        try {
          // Request accounts
          const accounts = await browserProvider.send(
            "eth_requestAccounts",
            []
          );
          setAccount(accounts[0]);

          // Get signer
          const walletSigner = await browserProvider.getSigner();
          setSigner(walletSigner);

          // Load deployed contract
          const escrowContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ESCROW_ABI,
            walletSigner
          );
          setEscrow(escrowContract);

          // Load contract info
          await loadContractInfo(escrowContract, browserProvider);
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      }
    }

    init();
  }, []);

  async function loadContractInfo(contract, provider) {
    try {
      console.log("Loading contract info..."); // Debug log

      const [arbiter, beneficiary, depositor, isApproved] = await Promise.all([
        contract.arbiter(),
        contract.beneficiary(),
        contract.depositor(),
        contract.isApproved(),
      ]);

      const balance = await provider.getBalance(CONTRACT_ADDRESS);

      console.log("Contract data:", {
        arbiter,
        beneficiary,
        depositor,
        isApproved,
      }); // Debug log

      setContractInfo({
        arbiter, // ✅ Arbiter set et
        beneficiary, // ✅ Beneficiary set et
        depositor, // ✅ Depositor set et
        isApproved, // ✅ IsApproved set et
        balance: ethers.formatEther(balance), // ✅ Balance set et
      });
    } catch (error) {
      console.error("Error loading contract info:", error);
    }
  }

  async function handleApprove() {
    if (!escrow || !signer) return;

    try {
      // Listen for Approved event
      escrow.on("Approved", async (amount) => {
        console.log("Approved event:", ethers.formatEther(amount), "ETH");
        await loadContractInfo(escrow, provider);
      });

      await approve(escrow, signer);
    } catch (error) {
      console.error("Error approving:", error);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Escrow DApp</h1>

        {account ? (
          <div>
            <p>Connected: {account}</p>

            <div className="contract-info">
              <h2>Contract Info</h2>
              <p>
                <strong>Address:</strong> {CONTRACT_ADDRESS}
              </p>
              <p>
                <strong>Arbiter:</strong> {contractInfo.arbiter}
              </p>
              <p>
                <strong>Beneficiary:</strong> {contractInfo.beneficiary}
              </p>
              <p>
                <strong>Depositor:</strong> {contractInfo.depositor}
              </p>
              <p>
                <strong>Balance:</strong> {contractInfo.balance} ETH
              </p>
              <p>
                <strong>Approved:</strong>{" "}
                {contractInfo.isApproved ? "Yes" : "No"}
              </p>
            </div>

            {contractInfo.isApproved ? (
              <div className="approved">
                <h3>✅ Escrow has been approved!</h3>
                <p>Funds have been transferred to the beneficiary.</p>
              </div>
            ) : (
              <div className="actions">
                {account.toLowerCase() ===
                contractInfo.arbiter.toLowerCase() ? (
                  <button onClick={handleApprove} className="approve-button">
                    Approve Escrow
                  </button>
                ) : (
                  <p>Only the arbiter can approve this escrow.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Please connect your wallet to continue.</p>
            <button onClick={() => window.location.reload()}>
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
