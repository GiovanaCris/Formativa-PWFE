import estilos from './Header.module.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

export function Header(){
    return(
        // Colocar os links da nav bar do dorivis
        <header className={estilos.container}>
        <div className={estilos.content_header}>
            <img className={estilos.logo} src={logo} />
            <nav className={estilos.navegacao_header}>
                <ul className={estilos.lista}>
                    <li>
                        <Link to="home" className={estilos.link}>HOME</Link>
                    </li>
                    <li>
                        <Link to="login" className={estilos.link}>LOGIN</Link>
                    </li>
                    <li>
                        <Link to="sobre_nos" className={estilos.link}>SOBRE NÓS</Link>
                    </li>
                </ul>
            </nav>
        </div>
</header>

    )
}