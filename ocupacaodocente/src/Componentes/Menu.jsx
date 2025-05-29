import estilos from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import professor from '../assets/professor.png'; 
import gestor from '../assets/gestor.png';

export function Menu(){
    return(
        <div className={estilos.conteiner}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={disciplina}/>
                            <label alt='Disciplinas do professor'>Disciplinas</label>
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