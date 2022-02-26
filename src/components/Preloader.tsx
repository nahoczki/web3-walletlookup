import {forwardRef} from 'react'
import styled from 'styled-components';
import {ClimbingBoxLoader} from "react-spinners";

const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgb(153,69,255);
  background: linear-gradient(139deg, rgba(153,69,255,1) -10%, rgba(20,241,149,1) 110%);
  z-index: 1000;
`;

const Inner = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Preloader = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <Wrapper ref={ref}>
            <Inner>
                <ClimbingBoxLoader size={10} color={"white"}/>
            </Inner>
        </Wrapper>
    )
})

export default Preloader