import {useMemo} from "react";
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import styled from "styled-components";

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

const Modal = styled.div`
  background-color: #111111;
  text-align: center;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const WalletSelection = styled.button`
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

    return (
        <Backdrop hidden={!props.open}>
            <ModalWrapper>
                {installedWallets.length ? (
                    <Modal>
                        <h2>Connect Wallet</h2>
                        <div>
                            {installedWallets.map(wallet => (
                                <WalletSelection>
                                    {wallet.adapter.name}
                                    <Section>
                                        {wallet.readyState === WalletReadyState.Installed && <DetectedText>Detected</DetectedText>}
                                        <WalletIcon src={wallet.adapter.icon}/>
                                    </Section>
                                </WalletSelection>
                            ))}
                            {otherWallets.map(wallet => (
                                <WalletSelection>
                                    {wallet.adapter.name}
                                    <Section>
                                        {wallet.readyState === WalletReadyState.Installed && <DetectedText>Detected</DetectedText>}
                                        <WalletIcon src={wallet.adapter.icon}/>
                                    </Section>
                                </WalletSelection>
                            ))}
                        </div>
                    </Modal>
                ) : (
                    <Modal>
                        {/*Add code for getStartedWallets*/}
                        <h2>You need a wallet to continue</h2>
                    </Modal>
                )}

            </ModalWrapper>
        </Backdrop>
    )
}

export default WalletModal