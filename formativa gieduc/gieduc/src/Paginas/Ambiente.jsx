/*Ambientes do gestor*/
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import edit from '../assets/edit.png';
import del from '../assets/delete.png';
import estilos from './Visualizar.module.css';

export function Ambiente(){
const [ambientes, setAmbientes] = useState([]);
const [professores, setProfessores] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('access_token');
        axios.get('http://127.0.0.1:8000/api/reservas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //Se der bom (200) quero popular a minha variavel disciplina com dados da api
        .then(response =>{
            setAmbientes(response.data);
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
            <h3 className={estilos.titulo}>Reservas de Ambiente</h3>
            <div className={estilos.topoAcoes}>
                <img className={estilos.iconeAdd} src={add} alt='adicionar ambiente'/>
            </div>
            <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabelaDados}>
                    <thead>
                        <tr>
                            <th>Data Início</th>
                            <th>Data término</th>
                            <th>Periodo</th>
                            <th>Sala Reservada</th>
                            <th>Professor</th>
                            <th>Disciplina</th>
                        </tr>
                    </thead>
                    <tbody className={estilos.infoDisc}>
                        {ambientes.map(ambientes => (
                            <tr key={ambientes.id}>
                                <td>{ambientes.data_inicio}</td>
                                <td>{ambientes.data_termino}</td>
                                <td>{ambientes.periodo}</td>
                                <td>{ambientes.sala_reservada}</td>
                                <td>{ambientes.disciplina}</td>
                                <td>{ambientes[professores.professor]}</td> {/*ARRUMARRR*/}
                                <td>
                                    <img className={estilos.iconeEdit} src={edit}/>
                                    <img className={estilos.iconeDel} src={del}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}