import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

const LoginPage = () => {
  const [address, setAddress] = useState(null);
  const [token, setToken] = useState(null);

  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    setAddress(addr);
    login();
  };

  const login = async () => {
    console.log("Logging");

    try {
      // 1. Get nonce
      //   const {
      //     data: { nonce },
      //   } = await axios.post("http://localhost:5000/api/auth/nonce", { address });
      const nonce = "test";

      // 2. Sign nonce
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(nonce);

      // 3. Verify and get token
      //   const {
      //     data: { token },
      //   } = await axios.post("http://localhost:5000/api/auth/verify", {
      //     address,
      //     signature,
      //   });
      //   setToken(token);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  if (!window.ethereum) return <div>MetaMask not found</div>;

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {token && <p>JWT Token: {token}</p>}
    </div>
  );
};

export default LoginPage;
