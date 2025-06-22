//Listagem das disciplinas para o professor logado
import axios from 'axios'; //axios é o que permite que chamemos uma API (pagina http(s))
import React, { useState, useEffect } from 'react'; //state guarda o estado atual da variável e o effecr mostra isso em tela
import estilos from './Visualizar.module.css'

export function DisciplinasProfessor() {
    //Crio variável disciplina que recebe os dados da AP e é controlada pelo state
    const [disciplinas, setDisciplina] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/', { //ProfessorDisciplina => minha url do urls.py
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDisciplina(response.data); //se der certo
            })
            .catch(error => {
                console.error("Erro", error);
            }); //se der ruim
    }, []); //para mostrar o que ta na tela
    // useEffect(()=>{},[]) estrutura do useEffect ()parametros, {}script, []dependencias, aqui mostro o que vou chamar

    //Campos do models
    return (
        <main className={estilos.containerDiscProf}>
            <div className={estilos.content_container}>
                <h2 className={estilos.title}>MINHAS DISCIPLINAS</h2>
                <div className={estilos.listaCard}>
                    <table className={estilos.tabeladados}>
                        <thead>
                            <tr className={estilos.cabecalho}>
                                <th>Nome</th>
                                <th>Curso</th>
                                <th>Descrição</th>
                                <th>Carga Horária</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disciplinas.map(disciplina => (
                                <tr key={disciplina.id}>
                                    <td>{disciplina.nome}</td>
                                    <td>{disciplina.curso}</td>
                                    <td>{disciplina.descricao}</td>
                                    <td>{disciplina.carga_horaria}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
