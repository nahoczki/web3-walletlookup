import {forwardRef} from 'react'
import styled from 'styled-components';
import {ClimbingBoxLoader} from "react-spinners";

const Wrapper = styled.div`
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100vh;
      background: rgb(2,0,36);
      background: linear-gradient(139deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%);
      z-index: 1000;
    `;

const Inner = styled.div`
      position: fixed;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
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