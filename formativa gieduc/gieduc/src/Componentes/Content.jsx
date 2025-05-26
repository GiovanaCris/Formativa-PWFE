import estilos from './Content.module.css';
import decoracao1 from '../assets/decoracao1.png'
import decoracao2 from '../assets/decoracao2.png'

export function Content(){
    return(
        <><main className={estilos.container}>
            <img className={estilos.decoracao1} src={decoracao1} />
            <h1 className={estilos.contenth1}><strong>SEJA BEM VINDO</strong><br></br>Ao GiEduc!</h1>
            <a href='#'>
                <button className={estilos.clickhere}>VAMOS LÁ</button>
            </a>
        </main>
        <footer className={estilos.footer}>
            <h1 className={estilos.footerh1}>HELLO WORLD</h1>
        </footer></>
    )
}

// import { Menu } from './Menu';

// export function Content(){
//     return(
//         <main className={estilos.container}>
//             <Menu/>
//         </main>
//     )
// }