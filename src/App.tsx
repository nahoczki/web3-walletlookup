import {useLayoutEffect, useMemo} from 'react'
import './App.css'
import Preloader from "./components/Preloader";
import { gsap } from "gsap";
import Home from "./views/Home";
import NavBar from "./components/NavBar";
import { clusterApiUrl } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import WalletModal from "./components/WalletModal";

function App() {

    let preLoaderRef: HTMLDivElement | null;

    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    const dismissLoader = () => {
        gsap.to(preLoaderRef, {y: "-100vh", duration: 1.25, ease: "power4.out"}).delay(1)
    }

    useLayoutEffect(() => {
        window.addEventListener("load", dismissLoader)
        return () => {
            window.document.body.style.overflow = "unset";
            window.removeEventListener('load', dismissLoader)
        };

    }, [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <Preloader ref={e => (preLoaderRef = e)}/>
                <WalletModal open={true}/>
                <NavBar/>
                <Home/>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default App
