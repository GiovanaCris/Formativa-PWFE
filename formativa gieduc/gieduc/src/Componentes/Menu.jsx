import estilos from './Menu.module.css';
import ambientes from '../assets/ambientes.png';
import disciplinas from '../assets/disciplinas.png';
import professores from '../assets/professores.png';
import gestores from '../assets/gestores.png';
import salas from '../assets/salas.png';
import { Link } from 'react-router-dom';

/* TR = Linhas TD = Colunas Da tabela*/
export function Menu() {
    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? '/discprofessor' : '/disciplina';// if else
    const linkAmbiente = tipo === 'P' ? '/ambienteprofessor' : '/ambiente';
    const linkSalas = tipo === 'P' ? '/salasprofessor' : '/salas';
    console.log('Tipo logado:', tipo);

    return (
        <div className={estilos.container}>
            <div className={estilos.grid}>
                <Link to={linkDisciplina} className={estilos.card}>
                    <img src={disciplinas} alt="Disciplinas" />
                    <label>VER DISCIPLINAS</label>
                </Link>

                <Link to={linkAmbiente} className={estilos.card}>
                    <img src={ambientes} alt="Ambientes" />
                    <label>VER RESERVAS</label>
                </Link>

                <Link to={linkSalas} className={estilos.card}>
                    <img src={salas} alt="Salas" />
                    <label>VER SALAS</label>
                </Link>

            {tipo === 'G'&&(
                <>
                <Link to="/professores" className={estilos.card}>
                    <img src={professores} alt="Professores" />
                    <label>VER PROFESSORES</label>
                </Link>

                <Link to="/gestores" className={estilos.card}>
                    <img src={gestores} alt="Gestores" />
                    <label>VER GESTORES</label>
                </Link>
                </>
            )}
        </div>
    </div>


                //<Link to="/cadastro" className={estilos.card}>
                //     <img src={cadastro} alt="Cadastro" />
                //     <label>CADASTRAR USUÁRIOS</label>
                // </Link> 
            
      
        
        // <div className={estilos.container}>
        //     <table>
        //         <tbody>
        //             <tr> 
        //                 <td>
        //                     <Link to={linkDisciplina}>
        //                         <img src={disciplina} alt="Disciplinas" />
        //                         <label>VER DISCIPLINAS</label>
        //                     </Link>
        //                 </td>
        //                 <td>
        //                     <Link to={LinkAmbiente}>
        //                         <img src={ambiente}/>
        //                         <label>VER AMBIENTES</label>
        //                     </Link>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <td>
        //                     <img src={professor}/>
        //                     <label>VER PROFESSORES</label>
        //                 </td>
        //                 <td>
        //                     <img src={gestor}/>
        //                     <label>VER GESTORES</label>
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
    )
}