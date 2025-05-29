import estilos from './BarraNavegacao.module.css';

export function BarraNavegacao(){
    return(
        <nav className={estilos.conteiner}>
            <ul>
 
                <li>Sobre Nós</li>
                <li>Missão</li>
                <li>Visão</li>
                <li>Valores</li>
            </ul>
        </nav>

    )
}
