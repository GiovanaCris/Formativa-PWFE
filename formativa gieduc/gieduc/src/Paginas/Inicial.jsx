import { Header } from "../Componentes/Header";
import { Content } from "../Componentes/Content";
import { Outlet } from "react-router-dom"

export function Incial(){
    return(
        <>
        <Header/>
        <Content/>
        <Outlet/>
        </>
    )
}