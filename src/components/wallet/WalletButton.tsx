import { useWallet } from '@solana/wallet-adapter-react';
import React, {useState} from "react";
import {StyledMenu} from "./custom-styles/StyledMenu";
import {StyledNavButton} from "./custom-styles/StyledNavButton";
import styled from "styled-components";

const MenuSelection = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px;
  :hover {
    background-color: #1f1f1f;
  }
`




const WalletButton = (props: any) => {

    const { wallet, disconnect, disconnecting } = useWallet();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const disconnectClick = () => {
        disconnect().catch(() => {})
    }

    const truncate = (s : string) => {
        return s.slice(0, 9) + "...";
    }

    return (
        <>
            <StyledNavButton onClick={handleClick}>{truncate(props.content)}</StyledNavButton>
            <StyledMenu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <MenuSelection onClick={disconnectClick}>Disconnect</MenuSelection>
            </StyledMenu>
        </>
    )
}

export default WalletButton