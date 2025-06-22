//Salas cadastradas no sistema para o professor ver
import axios from 'axios'; 
import React, { useState, useEffect } from 'react'; 
import estilos from './Visualizar.module.css'

export function SalasProfessor() {
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/salalist/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setSalas(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar salas:", error);
        });
    }, []);

    return (
        <main className={estilos.containerDiscProf}>
            <div className={estilos.content_container}>
                <h2 className={estilos.title}>SALAS CADASTRADAS</h2>
                <div className={estilos.listaCard}>
                    <table className={estilos.tabeladados}>
                        <thead>
                            <tr className={estilos.cabecalho}>
                                <th>Nome</th>
                                <th>Capacidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salas.map(sala => (
                                <tr key={sala.id}>
                                    <td>{sala.nome}</td>
                                    <td>{sala.capacidade_alunos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}