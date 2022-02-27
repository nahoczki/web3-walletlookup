import styled from "styled-components";

const NavWrapper = styled.div`
  padding: 10px;
  height: 80px;
  display: flex;
  align-items: center;
`

const ConnectButton = styled.button`
  padding: 10px 30px 10px 30px;
  margin-left: auto;
  margin-right: 30px;
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
  }
`

const NavBar = () => {

    return (
        <NavWrapper>
            <ConnectButton>Connect Wallet</ConnectButton>
        </NavWrapper>
    )
}

export default NavBar