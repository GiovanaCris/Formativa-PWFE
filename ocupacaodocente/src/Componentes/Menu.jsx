import estilos from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import professor from '../assets/professor.png'; 
import gestor from '../assets/gestor.png';
import { Link } from 'react-router-dom';
import { Disciplina } from '../Paginas/Disciplina';
import { DisplinaProfessor } from '../Paginas/DisciplinasProfessor';

export function Menu(){
    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? 'discprofessor' : 'disciplina' //if else
    return(
        <div className={estilos.conteiner}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Link to={linkDisciplina}>
                                <img src={disciplina}/>
                                <label alt='Disciplinas do professor'>Disciplinas</label>
                            </Link>
                        </td>
                        <td>
                            <img src={ambiente}/>
                            <label>Ambiente</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={professor}/>
                            <label>Professores</label>
                        </td>
                        <td>
                            <img src={gestor}/>
                            <label>Gestores</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}