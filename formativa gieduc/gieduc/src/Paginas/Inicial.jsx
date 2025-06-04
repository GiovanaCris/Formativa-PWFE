import { Header } from "../Componentes/Header";
// import { Content } from "../Componentes/Content";
import { Outlet } from "react-router-dom";
import { Footer } from "../Componentes/Footer";

export function Inicial(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

