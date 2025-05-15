import estilos from './BarraNavegacao.module.css'

export function BarraNavegacao(){
    return(
        // Colocar os links da nav bar do dorivis
        <header className={estilos.container}>
            <nav className={estilos.links}>
                <ul>
                    <li>Historia</li>
                    <li>Sobre nós</li>
                    <li>Missão</li>
                    <li>Visão</li>
                    <li>Valores</li>
                </ul>
                <div className={estilos.logo}>
                    <h1>LOGO</h1>
                </div>
            </nav>
        </header>
    )
}