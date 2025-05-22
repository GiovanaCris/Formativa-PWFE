import { BarraNavegacao } from "../gieduc/src/Componentes/BarraNavegacao";
import { Content } from "../gieduc/src/Componentes/Content";
import { Outlet } from "reavt-router-dom"

export function Incial(){
    return(
        <>
        <BarraNavegacao/>
        <Content/>
        <Outlet/>
        </>
    )
}