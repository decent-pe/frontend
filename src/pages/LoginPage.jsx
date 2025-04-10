import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { USER_SERVICE_URL } from "../utils/constants";

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
        try {
            const nonceData = await axios.post(
                USER_SERVICE_URL + "/get-nonce",
                {
                    address
                }
            );

            const nonce = nonceData.data.data.nonce;

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
