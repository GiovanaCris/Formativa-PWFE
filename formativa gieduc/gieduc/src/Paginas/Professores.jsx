// Listagem dos professores
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Trash2, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';
import estilos from './Visualizar.module.css';

export function Professores() {
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        buscarProfessores();
    }, []);

    function buscarProfessores() {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/professores/', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setProfessores(response.data))
            .catch(error => console.error('Erro ao buscar professores:', error));
    }

    async function excluirProfessor(id) {
        const token = localStorage.getItem('access_token');
        const confirmar = window.confirm("Tem certeza que deseja excluir este professor?");
        if (!confirmar) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfessores(prev => prev.filter(p => p.id !== id));
            alert("Professor excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir professor:", error.response?.data || error);
            alert("Erro ao excluir. Verifique se há dependências.");
        }
    }

    return (
        <main className={estilos.containerDiscProf}>
            <div className={estilos.content_container}>
                <h3 className={estilos.title}>PROFESSORES</h3>
                <div className={estilos.topoAcoes}>
                    <Link to="/adicionarprofessor" className={estilos.botaoAdicionar}>
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
                            {professores.map(prof => (
                                <tr key={prof.id}>
                                    <td>{prof.username}</td>
                                    <td>{prof.email}</td>
                                    <td>{prof.ni}</td>
                                    <td>{prof.telefone}</td>
                                    <td className={estilos.atualizacoes}>
                                        <button onClick={() => excluirProfessor(prof.id)}>
                                            <Trash2 className={estilos.excluir} />
                                        </button>
                                        <Link to={`/professores/editar/${prof.id}`}>
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