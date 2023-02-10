import React from "react";
import "./App.css";
import AccountProvider from "./providers/AccountProvider";
import Header from "./components/Header";

function App() {
  // const [account, setAccount] = useState<string | undefined>();

  //   useEffect(() => {
  //   async function fetchAccounts() {
  //     const { ethereum } = window;
  //     if (!ethereum) {
  //       return;
  //     }
  //     const provider = new ethers.BrowserProvider(
  //       ethereum
  //     );

  //     try {
  //       await provider.send("eth_accounts", []).then((accounts) => {
  //         if (accounts.length > 0) {
  //           setAccount(accounts[0]);
  //         } else {
  //           setAccount(undefined);
  //         }
  //       });
  //     } catch (e) {
  //       console.error(e);
  //       setAccount(undefined);
  //     }

  //     ethereum.on('accountsChanged', (_accounts) => window.location.reload());
  //   }

  //   fetchAccounts();
  // }, []);

  // const handleClick = async () => {
  //   const { ethereum } = window;
  //   if (ethereum && ethereum.isMetaMask) {
  //     const provider = new ethers.BrowserProvider(ethereum);
  //     await provider
  //       .send("eth_requestAccounts", [])
  //       .then((accounts) => {
  //         if (accounts.length > 0) {
  //           setAccount(accounts[0]);
  //         }
  //       })
  //       .catch((e) => console.log(e));
  //     } else {
  //       alert("You need to install MetaMask to connect a wallet");
  //       window.open("https://metamask.io/", "_blank");
  //       return;
  //     }
  // }

  

  return (
    <AccountProvider>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
      </div>
    </AccountProvider>
  );
}

export default App;
