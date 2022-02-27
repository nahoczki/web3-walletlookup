import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import React, {useEffect, useState} from "react";
import {PuffLoader, BarLoader} from "react-spinners";
import {getParsedNftAccountsByOwner} from "../helpers/getParsedNFTAccountsByOwner";
import styled from "styled-components";

const Wrapper = styled.form`
  display: flex;
  padding-top: 50px;
  padding-bottom: 50px;
  height: 100%;
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

const NFTDisplay = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px 10px;
  justify-content: center;
  align-items: center;
`

const NFTImage = styled.img`
  border-radius: 10px;
  width: 250px;
  height: 250px;
  -o-transition: all .2s ease-in-out;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
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
    wallet: string | null
    nfts: string[] | null
}

const Home = () => {

    const SOL_CONVERSION_API = "https://api.coinbase.com/v2/exchange-rates?currency=SOL"

    //let myWallet = 'ABM7PKVXHDP7sXXV1SmiMGFyesgnJWymDzxQQWHHp5io'
    //
    // const programId = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"

    let [wallet, setWallet] = useState("")
    let [data, setData] = useState<WalletData>({sol: null, usd: null, wallet: null, nfts: null})
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")

    const getWalletInfo = async () => {
        let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
        try {
            let info = await connection.getBalance(new PublicKey(wallet))
            let nfts = await getParsedNftAccountsByOwner({publicAddress: wallet, connection: connection})
            return {info: info, nfts: nfts}
        } catch (e) {
            console.log(e)
            return null
        }

    }

    const parseThroughNFTs = async (nfts: any) => {
        let imageArray : string[] = [];
        await Promise.all(nfts.map(async (nft : any) => {
            let dataURI = nft.data.uri;
            let data = await fetch(dataURI)
            let json = await data.json()
            imageArray.push(json.image)
        }));
        return imageArray
    }

    const convertSOLtoUSD = async (sol: number) => {
        let data = await fetch(SOL_CONVERSION_API)
        let json = await data.json()
        return sol * json.data.rates.USD
    }

    const handleClick = async (e: any) => {
        e.preventDefault()
        setData({sol: null, usd: null, wallet: null, nfts: null})
        setLoading(true)
        setErr("")
        let walletInfo = await getWalletInfo()

        if (walletInfo) {
            let solValue = walletInfo.info/1000000000;
            let usdValue = await convertSOLtoUSD(solValue);
            parseThroughNFTs(walletInfo.nfts).then(imageArray => {
                setData({
                    sol: solValue,
                    usd: usdValue,
                    wallet: wallet,
                    nfts: imageArray
                })
            })
            setWallet("")
        } else {
            setErr("Wallet doesnt exist")
        }
        setLoading(false)
    }

    const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setWallet(e.target.value);
    }



    return (
        <Wrapper onSubmit={handleClick}>
            <h1>Wallet Look Up</h1>
            <Input type={"text"} placeholder={"Wallet Address"} value={wallet} onInput={handleInput}/>
            <Button type={"submit"}>
                Go
            </Button>
            {loading ? <PuffLoader color={"#00FFA3"}/> : err !== "" ? <ErrorText>{err}</ErrorText> : !data.sol ? "" :
                <ResultCard>
                    <div>
                        <h2>Wallet</h2>
                        <div><code>{data.wallet}</code></div>
                        <h2>Balance</h2>
                        <h3>{data.sol} SOL</h3>
                        <Equals>=</Equals>
                        <h3>${data.usd} USD</h3>
                    </div>
                </ResultCard>
            }

            {loading ? "" : err !== "" ? "" : !data.sol ? "" :
                <NFTDisplay>
                    {data.nfts!.map((nft, i) => {
                        return <NFTImage src={nft} key={i}/>
                    })}
                </NFTDisplay>
            }
        </Wrapper>
    )
}

export default Home