//Listagem das disciplinas para o professor logado
import axios from 'axios'; //axios é o que permite que chamemos uma API (pagina http(s))
import React,{useState, useEffect} from 'react'; //state guarda o estado atual da variável e o effecr mostra isso em tela
import estilos from './Visualizar.module.css'

export function DisciplinasProfessor(){
    //Crio variável disciplina que recebe os dados da AP e é controlada pelo state
    const [disciplinas, setDisciplina] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/',{ //ProfessorDisciplina => minha url do urls.py
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>{
            setDisciplina(response.data); //se der certo
        })
        .catch(error => {
            console.error("Erro", error);
        }); //se der ruim
    },[]); //para mostrar o que ta na tela
    // useEffect(()=>{},[]) estrutura do useEffect ()parametros, {}script, []dependencias, aqui mostro o que vou chamar
    
    //Campos do models
    return(
        <div className={estilos.containerCard}>
            <h2 className={estilos.tituloCard}>Minhas Disciplinas</h2>
            <div className={estilos.listaCard}>
                {disciplinas.map(disciplina=>(
                    <div className={estilos.card} key={disciplina.id}>
                        <h3 className={estilos.nome}>{disciplina.nome}</h3>
                        <p><strong>Curso:</strong>{disciplina.curso}</p>
                        <p><strong>Descrição:</strong>{disciplina.descricao}</p>
                        <p><strong>Carga horário:</strong>{disciplina.cargaHoraria}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}