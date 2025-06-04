import estilos from './Inicio.module.css';
import decoracao1 from '../assets/decoracao1.png'
import decoracao2 from '../assets/decoracao2.png'

export function Inicio(){
    return(
        <>
        <main className={estilos.container}>
            <img className={estilos.decoracao1} src={decoracao1} />
            <h1 className={estilos.contenth1}><strong>SEJA BEM VINDO</strong><br></br>Ao GiEduc!</h1>
            <a href='/login'>
                <button type="submit" className={estilos.clickhere}>VAMOS LÁ</button>
            </a>
            <img className={estilos.decoracao2} src={decoracao2} />
        </main>
        </>
    )
}
