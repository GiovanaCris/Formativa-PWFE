// Listagem dos gestores
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Trash2, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';
import estilos from './Visualizar.module.css';

export function Gestores() {
    const [gestores, setGestores] = useState([]);

    useEffect(() => {
        buscarGestores();
    }, []);

    function buscarGestores() {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/gestores/', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setGestores(response.data))
            .catch(error => console.error('Erro ao buscar gestores:', error));
    }

    async function excluirGestor(id) {
        const token = localStorage.getItem('access_token');
        const confirmar = window.confirm("Tem certeza que deseja excluir este gestor?");
        if (!confirmar) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGestores(prev => prev.filter(g => g.id !== id));
            alert("Gestor excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir gestor:", error.response?.data || error);
            alert("Erro ao excluir. Verifique se há dependências.");
        }
    }

    return (
        <main className={estilos.containerDiscProf}>
            <div className={estilos.content_container}>
                <h3 className={estilos.title}>GESTORES</h3>
                <div className={estilos.topoAcoes}>
                    <Link to="/adicionargestor" className={estilos.botaoAdicionar}>
                        <span className={estilos.iconeAdd}>+</span>
                    </Link>
                </div>
                <div className={estilos.tabelaWrapper}>
                    <table className={estilos.tabeladados}>
                        <thead>
                            <tr className={estilos.cabecalho}>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>NI</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gestores.map(gestor => (
                                <tr key={gestor.id}>
                                    <td>{gestor.username}</td>
                                    <td>{gestor.email}</td>
                                    <td>{gestor.ni}</td>
                                    <td>{gestor.telefone}</td>
                                    <td className={estilos.atualizacoes}>
                                        <button onClick={() => excluirGestor(gestor.id)}>
                                            <Trash2 className={estilos.excluir} />
                                        </button>
                                        <Link to={`/gestores/editar/${gestor.id}`}>
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