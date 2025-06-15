import { Menu } from '../Componentes/Menu';
import estilo from "./Home.module.css";
import BannerHome from '../assets/BannerHome.jpg';
import estilos from "./Inicio.module.css";
import { MenuNav } from '../Componentes/MenuNav';

export function Home() {
    const username = localStorage.getItem("username");
    return (
        <>
            <div className={estilo.container}>
                <div className={estilo.content_home}>
                    <MenuNav />
                    <h1><strong>Olá</strong>, {username}!</h1>
                    <div className={estilo.info_home}>
                        <img className={estilo.imgBanner} src={BannerHome} alt="Banner da Home" />
                        <h2>O QUE DESEJA REALIZAR?</h2>
                    </div>
                </div>
                <Menu />
                <section>
                    <h2>NOSSO OBJETIVO</h2>
                    <div className={estilo.content_objetivo}>
                        <h3>O QUE BUSCAMOS?</h3>
                        <p>Buscamos facilitar o gerenciamento escolar, oferecendo uma solução completa e intuitiva para instituições de ensino.
                            Com ela, é possível administrar reservas de ambientes, professores, gestores e disciplinas de forma prática e organizada.
                            Através de um sistema que realiza todas as operações de CRUD (criação, leitura, atualização e exclusão),
                            a GiEduc permite que escolas tenham controle total sobre seus dados, otimizando processos internos e promovendo mais eficiência no dia a dia
                            escolar.
                            Nosso objetivo  principal é simplificar a gestão educacional, oferecendo tecnologia a favor da organização, da transparência e da qualidade do ensino.
                        </p>
                    </div>
                    <a href='/sobre_nos' className={estilo.buttonHome}>
                        <button type="submit" className={estilos.clickhere}>SAIBA MAIS</button>
                    </a>
                </section>
            </div>
        </>
    )
}