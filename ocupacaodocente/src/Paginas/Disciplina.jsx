/*Disciplinas do gestor*/
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import edit from '../assets/edit.png';
import del from '../assets/delete.png';
import estilos from './Visualizar.module.css';

export function Disciplina(){
const [disciplinas, setDisciplinas] = useState([]);
const [professores, setProfessores] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        axios.get('http://127.0.0.1:8000/api/disciplinas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //Se der bom (200) quero popular a minha variavel disciplina com dados da api
        .then(response =>{
            setDisciplinas(response.data);
        })
        //Se der ruim 
        .catch(error => {
            console.error("Erro: ", error);
        });

        //Busca dos professores
        axios.get('http://127.0.0.1:8000/api/usuario/', {
            headerr: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>{
            const professorPorId = {};
            response.data.forEach(prof =>{
                professorPorId[prof.id] = `${prof.first_name} ${prof.last_name}`;
            });
            setProfessores(professorPorId);
        })
        .catch(error =>{
            console.error("Erro o buscar profs", error);
        });
    }, [])

    return(
        <main className={estilos.container}>
            <h3 className={estilos.titulo}>Disciplinas</h3>
            <div className={estilos.topoAcoes}>
                <img className={estilos.iconeAdd} src={add} alt='adicionar disciplina'/>
            </div>
            <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabelaDados}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>Descrição</th>
                            <th>Carga Horária</th>
                            <th>Professor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map(disciplina => (
                            <tr key={disciplina.id}>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.curso}</td>
                                <td>{disciplina.descricao}</td>
                                <td>{disciplina. carga_horaria}</td>
                                <td>{disciplina[professores.professor]}</td>
                                <td>
                                    <img className={estilos} src={edit}/>
                                    <img src={del}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}