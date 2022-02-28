import {WalletReadyState} from "@solana/wallet-adapter-base";
import styled from "styled-components";
import {Wallet} from "@solana/wallet-adapter-react";
import { FC, MouseEventHandler } from 'react';

const Wrapper = styled.button`
  width: 100%;
  border-radius: 10px;
  text-align: left;
  margin: 5px 0px 5px 0px;
  padding: 10px;
  background-color: #1f1f1f;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
`

const Section = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
`

const DetectedText = styled.span`
  display: table-cell;
  color: green;
  font-size: 12px;
  vertical-align: middle;
`

const WalletIcon = styled.img`
  width: 25px;
  height: 100%;
  margin-right: 10px;
`


export interface WalletSelectionProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    wallet: Wallet;
    other?: boolean;
}


const WalletSelection : FC<WalletSelectionProps> = ({ onClick, wallet, other }) => {
    return (
        <Wrapper style={other ? {backgroundColor: "#111111"} : {}} onClick={onClick}>
            {wallet.adapter.name}
            <Section>
                {wallet.readyState === WalletReadyState.Installed && <DetectedText>Detected</DetectedText>}
                <WalletIcon src={wallet.adapter.icon}/>
            </Section>
        </Wrapper>
    )
}

export default WalletSelection