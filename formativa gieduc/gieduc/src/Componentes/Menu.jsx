import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplinas.png';
import professor from '../assets/professor.png';
import gestor from '../assets/gestor.png';
import { Link } from 'react-router-dom';

/* TR = Linhas TD = Colunas Da tabela*/
export function Menu(){
    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? '/discprofessor' : '/disciplina';// if else
    const LinkAmbiente = tipo == 'P' ? '/ambienteprofessor' : '/ambiente';

    return(
        <div>
            <table>
                <tbody>
                    <tr> 
                        <td>
                            <Link to={linkDisciplina}>
                                <img src={disciplina} alt="Disciplinas" />
                                <label>Disciplinas</label>
                            </Link>
                        </td>
                        <td>
                            <Link to={LinkAmbiente}>
                                <img src={ambiente}/>
                                <label>Ambientes</label>
                            </Link>
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