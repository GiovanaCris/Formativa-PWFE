//Listagem das ambientes para o professor logado
import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
import estilos from './Visualizar.module.css'

export function AmbienteProfessor() {
    const [ambientes, setAmbientes] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/professor/reservas/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setAmbientes(response.data); //se der certo
            })
            .catch(error => {
                console.error("Erro", error);
            }); 
    }, []);

    return (
        <main className={estilos.containerDiscProf}>
            <div className={estilos.content_container}>
                <h2 className={estilos.title}>MINHAS RESERVAS</h2>
                <div className={estilos.listaCard}>
                    <table className={estilos.tabeladados}>
                        <thead>
                            <tr className={estilos.cabecalho}>
                                <th>Periodo</th>
                                <th>Data de início</th>
                                <th>Data de término</th>
                                <th>Sala reservada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ambientes.map(ambientes => (
                                <tr key={ambientes.id}>
                                    <td>{ambientes.periodo}</td>
                                    <td>{ambientes.data_inicio}</td>
                                    <td>{ambientes.data_termino}</td>
                                    <td>{ambientes.sala_reservada}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
