//Listagem das disciplinas
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Trash2, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';
import estilos from './Visualizar.module.css';

export function Disciplina() {
    const [disciplinas, setDisciplina] = useState([]);
    const [professores, setProfessores] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        axios.get('http://127.0.0.1:8000/api/disciplinas/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => setDisciplina(response.data))
        .catch(error => console.error('Erro ao buscar disciplinas', error));

        axios.get('http://127.0.0.1:8000/api/usuario/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            const profPorId = {};
            response.data.forEach(prof => {
                profPorId[prof.id] = prof.username;
            });
            setProfessores(profPorId);
        })
        .catch(error => console.error("Erro ao buscar professores", error));
    }, []);

    function excluirDisciplina(id) {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta disciplina?');
        if (!confirmar) return;

        console.log("Tentando excluir disciplina com ID:", id);
        console.log("URL da requisição DELETE:", `http://127.0.0.1:8000/api/disciplinas/${id}/`);

        const token = localStorage.getItem('access_token');
        axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            setDisciplina(prev => prev.filter(d => d.id !== id));
            alert("Disciplina excluída com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao excluir disciplina", error);
            alert("Erro ao excluir disciplina.");
        });
    }

    return (
        <main className={estilos.containerDisc}>
            <div className={estilos.content_container}>
                <h3 className={estilos.title}>DISCIPLINAS</h3>
                <div className={estilos.topoAcoes}>
                <Link to="/adicionardisciplina" className={estilos.botaoAdicionar}>
                    <span className={estilos.iconeAdd}>+</span>
                </Link>
                </div>
                <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabeladados}>
                    <thead>
                    <tr className={estilos.cabecalho}>
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
                        <td>{disciplina.carga_horaria}</td>
                        <td>{professores[disciplina.professor] || '—'}</td>
                        <td className={estilos.atualizacoes}>
                            <button onClick={() => excluirDisciplina(disciplina.id)}>
                                <Trash2 className={estilos.excluir} />
                            </button>
                            <Link to={`/disciplinas/editar/${disciplina.id}`}>
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