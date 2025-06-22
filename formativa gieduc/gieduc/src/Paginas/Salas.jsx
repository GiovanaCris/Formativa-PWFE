// Listagem das salas
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Trash2, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';
import estilos from './Visualizar.module.css';

export function Salas() {
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        buscarSalas();
    }, []);

    function buscarSalas() {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/salalistcreate/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => setSalas(response.data))
            .catch(error => console.error('Erro ao buscar salas:', error));
    }

    async function excluirSala(id) {
        const token = localStorage.getItem('access_token');

        const confirmar = window.confirm(
            'Esta sala pode estar vinculada a reservas. Deseja excluir todas as reservas associadas e a sala?'
        );
        if (!confirmar) return;

        try {
            const reservas = await axios.get('http://127.0.0.1:8000/api/reservas/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const reservasAssociadas = reservas.data.filter(r => r.sala_reservada === id);

            for (const reserva of reservasAssociadas) {
                await axios.delete(`http://127.0.0.1:8000/api/reservas/${reserva.id}/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }

            await axios.delete(`http://127.0.0.1:8000/api/sala/${id}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setSalas(prev => prev.filter(sala => sala.id !== id));
            alert("Sala e reservas associadas excluídas com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir sala e reservas:", error.response?.data || error);
            alert("Erro ao excluir. Verifique se há problemas no servidor.");
        }
    }

    return (
        <main className={estilos.containerAmb}>
            <div className={estilos.content_container}>
                <h3 className={estilos.title}>SALAS</h3>
                <div className={estilos.topoAcoes}>
                    <Link to="/adicionarsala" className={estilos.botaoAdicionar}>
                        <span className={estilos.iconeAdd}>+</span>
                    </Link>
                </div>
                <div className={estilos.tabelaWrapper}>
                    <table className={estilos.tabeladados}>
                        <thead>
                            <tr className={estilos.cabecalho}>
                                <th>Nome</th>
                                <th>Capacidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salas.map(sala => (
                                <tr key={sala.id}>
                                    <td>{sala.nome}</td>
                                    <td>{sala.capacidade_alunos}</td>
                                    <td className={estilos.atualizacoes}>
                                        <button onClick={() => excluirSala(sala.id)}>
                                            <Trash2 className={estilos.excluir} />
                                        </button>
                                        <Link to={`/salas/editar/${sala.id}`}>
                                            <button className={estilos.meuBotaoComIcone}>
                                                <Brush className={estilos.editar} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}