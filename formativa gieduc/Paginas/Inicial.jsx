import { BarraNavegacao } from "../gieduc/src/Componentes/BarraNavegacao";
import { Content } from "../gieduc/src/Componentes/Content";
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