import estilos from './Header.module.css';
import logo from '../assets/logo.svg'

export function Header(){
    return(
        // Colocar os links da nav bar do dorivis
        <header className={estilos.container}>
            <img className={estilos.logo} src={logo}/>
        </header>
    )
}