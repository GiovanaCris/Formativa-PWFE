import estilos from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplinas.png';
import professor from '../assets/professor.png';
import gestor from '../assets/gestor.png';

/* TR = Linhas TD = Colunas Da tabela*/
export function Menu(){
    return(
        <div>
            <table>
                <tbody>
                    <tr> 
                        <td>
                            <img src={disciplina}/>
                            <label alt = 'Disciplinas do professor'>Disciplinas</label>
                        </td>
                        <td>
                            <img src={ambiente}/>
                            <label>Ambientes</label>
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