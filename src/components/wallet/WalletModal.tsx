import {useMemo} from "react";
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal'
import styled from "styled-components";
import WalletSelection from "./WalletSelection";

const testImage = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTcwMiAxNy4yMDcxaC0yLjk5NjljMC02LjEwNzQtNC45NjgzLTExLjA1ODE3LTExLjA5NzUtMTEuMDU4MTctNi4wNTMyNSAwLTEwLjk3NDYzIDQuODI5NTctMTEuMDk1MDggMTAuODMyMzctLjEyNDYxIDYuMjA1IDUuNzE3NTIgMTEuNTkzMiAxMS45NDUzOCAxMS41OTMyaC43ODM0YzUuNDkwNiAwIDEyLjg0OTctNC4yODI5IDEzLjk5OTUtOS41MDEzLjIxMjMtLjk2MTktLjU1MDItMS44NjYxLTEuNTM4OC0xLjg2NjF6bS0xOC41NDc5LjI3MjFjMCAuODE2Ny0uNjcwMzggMS40ODQ3LTEuNDkwMDEgMS40ODQ3LS44MTk2NCAwLTEuNDg5OTgtLjY2ODMtMS40ODk5OC0xLjQ4NDd2LTIuNDAxOWMwLS44MTY3LjY3MDM0LTEuNDg0NyAxLjQ4OTk4LTEuNDg0Ny44MTk2MyAwIDEuNDkwMDEuNjY4IDEuNDkwMDEgMS40ODQ3em01LjE3MzggMGMwIC44MTY3LS42NzAzIDEuNDg0Ny0xLjQ4OTkgMS40ODQ3LS44MTk3IDAtMS40OS0uNjY4My0xLjQ5LTEuNDg0N3YtMi40MDE5YzAtLjgxNjcuNjcwNi0xLjQ4NDcgMS40OS0xLjQ4NDcuODE5NiAwIDEuNDg5OS42NjggMS40ODk5IDEuNDg0N3oiIGZpbGw9InVybCgjYikiLz48L3N2Zz4K"

const Backdrop = styled.div`
  position: fixed;
  margin: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
`

const ModalWrapper = styled.div`
  height: 100%;
  margin: auto;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalInner = styled.div`
  background-color: #111111;
  text-align: center;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const WalletModal = (props: any) => {

    const { wallets, select } = useWallet();

    const [installedWallets, otherWallets] = useMemo(() => {
        const installed: Wallet[] = [];
        const notDetected: Wallet[] = [];
        const loadable: Wallet[] = [];

        for (const wallet of wallets) {
            if (wallet.readyState === WalletReadyState.NotDetected) {
                notDetected.push(wallet);
            } else if (wallet.readyState === WalletReadyState.Loadable) {
                loadable.push(wallet);
            } else if (wallet.readyState === WalletReadyState.Installed) {
                installed.push(wallet);
            }
        }

        console.log([...loadable, ...notDetected])

        return [installed, [...loadable, ...notDetected]];
    }, [wallets]);

    const handleWalletClick = (wallet : WalletName) => {
        select(wallet)
        props.setModal(false)
    }

    return (
        <Modal open={props.open} onClose={() => {props.setModal(false)}}>
            <ModalWrapper>
                {installedWallets.length ? (
                    <ModalInner>
                        <h2>Connect Wallet</h2>
                        <div>
                            {installedWallets.map((wallet) => (
                                <WalletSelection wallet={wallet} onClick={() => {
                                    handleWalletClick(wallet.adapter.name)
                                }} />
                            ))}
                        </div>
                        <Accordion style={{backgroundColor: "#1f1f1f", color: "white", borderRadius: 10}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: "white"}}/>}
                            >
                                More Wallets
                            </AccordionSummary>
                            <AccordionDetails>
                                {otherWallets.map((wallet) => (
                                    <WalletSelection wallet={wallet} onClick={() => {
                                        handleWalletClick(wallet.adapter.name)
                                    }} other/>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </ModalInner>
                ) : (
                    <ModalInner>
                        {/*Add code for getStartedWallets*/}
                        <h2>You need a wallet to continue</h2>
                    </ModalInner>
                )}

            </ModalWrapper>
        </Modal>
    )
}

export default WalletModal