
import styled from "styled-components";
import WalletButton from "./wallet/WalletButton";
import {StyledNavButton} from "./wallet/custom-styles/StyledNavButton"
import {useMemo} from "react";
import {useWallet} from "@solana/wallet-adapter-react";

const NavWrapper = styled.div`
  padding: 10px;
  height: 80px;
  display: flex;
  align-items: center;
`

const NavBar = (props: any) => {

    const { wallet, connecting, disconnecting } = useWallet();

    const content = useMemo(() => {
        if (wallet) return wallet.adapter.publicKey?.toBase58();
        return undefined;
    }, [wallet, connecting, disconnecting]);

    return (
        <NavWrapper>
            {!content ? <StyledNavButton onClick={() => {props.setModal(true)}}>Connect Wallet</StyledNavButton> : <WalletButton content={content}/>}
        </NavWrapper>
    )
}

export default NavBar