import {useLayoutEffect} from 'react'
import './App.css'
import Preloader from "./components/Preloader";
import { gsap } from "gsap";
import Home from "./views/Home";

function App() {

    let preLoaderRef: HTMLDivElement | null;

    const dismissLoader = () => {
        gsap.to(preLoaderRef, {y: "-100vh", duration: 1.25, ease: "power4.out"}).delay(1)
    }

    useLayoutEffect(() => {
        window.addEventListener("load", dismissLoader)
        return () => {
            window.document.body.style.overflow = "unset";
            window.removeEventListener('load', dismissLoader)
        };

    }, [])

    return (
        <div className="App">
            <Preloader ref={e => (preLoaderRef = e)}/>
            <Home/>
        </div>
    )
}

export default App
