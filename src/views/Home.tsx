import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import React, {useEffect, useState} from "react";
import {PuffLoader} from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
`

const Input = styled.input`
  padding: 15px;
  font-size: 13px;
  border: none;
  background-color: #1f1f1f;
  color: whitesmoke;
  border-radius: 15px;
`

const ResultCard = styled.div`
  padding: 20px;
  background-color: #1f1f1f;
  border-radius: 10px;
  border: whitesmoke 0.5px solid;
  text-align: center;
`

const Equals = styled.span`
  font-size: 30px;
`

const Button = styled.button`
  padding: 10px 30px 10px 30px;
  border-radius: 15px;
  background-image: linear-gradient(139deg, rgba(153,69,255,1) 0%, rgba(20,241,149,1) 100%);
  box-shadow: 0 4px 15px 0 rgba(153,69,255,0.3);
  background-size: 300% 100%;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  :hover {
    background-position: 100% 0;
    box-shadow: 0 -4px 15px 0 rgba(20,241,149,0.2);
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
`

const ErrorText = styled.p`
  color: red;
`

interface WalletData {
    sol: number | null
    usd: number | null
}

const Home = () => {

    //let myWallet = 'ABM7PKVXHDP7sXXV1SmiMGFyesgnJWymDzxQQWHHp5io'

    let [wallet, setWallet] = useState("")
    let [data, setData] = useState<WalletData>({sol: null, usd: null})
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")

    useEffect(() => {

    }, [])

    const getWalletInfo = async () => {
        let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
        try {
            let info = await connection.getBalance(new PublicKey(wallet))
            return info
        } catch {
            return null
        }

    }

    const handleClick = async () => {

        setLoading(true)
        setErr("")
        let walletInfo = await getWalletInfo()

        if (walletInfo) {
            let solValue = walletInfo/1000000000

            setData({
                sol: solValue,
                usd: 0.0
            })
        } else {
            setErr("Wallet doesnt exist")
        }

        setLoading(false)


    }

    const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setWallet(e.target.value);
    }



    return (
        <Wrapper>
            <h1>Wallet Look Up</h1>
            <Input placeholder={"Wallet Address"} value={wallet} onInput={handleInput}/>
            <Button className="text-white font-bold py-2 px-4 rounded-full" onClick={handleClick}>
                Go
            </Button>
            {loading ? <PuffLoader color={"#00FFA3"}/> : err !== "" ? <ErrorText>{err}</ErrorText> : !data.sol ? "" :
                <ResultCard>
                    <div>
                        <h2>Wallet</h2>
                        <div><code>{wallet}</code></div>
                        <h2>Balance</h2>
                        <h3>{data.sol} SOL</h3>
                        <Equals>=</Equals>
                        <h3>-- USD</h3>
                    </div>
                </ResultCard>
            }
        </Wrapper>
    )
}

export default Home