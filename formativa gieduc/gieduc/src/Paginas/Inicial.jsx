import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Content } from "../Componentes/Content";
import { Outlet } from "react-router-dom"

export function Incial(){
    return(
        <>
        <BarraNavegacao/>
        <Content/>
        <Outlet/>
        </>
    )
}