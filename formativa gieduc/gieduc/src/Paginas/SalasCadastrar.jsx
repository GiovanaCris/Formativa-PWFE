//Cadastro e exlusão das disciplinas
import { useForm } from 'react-hook-form';
import estilos from './Visualizar.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const schemaSalas = z.object({
    nome: z.string()
        .min(1, 'Informe o nome da sala.')
        .max(50, 'O nome deve ter no máximo 50 caracteres.'),

    capacidade_alunos: z.number({
        invalid_type_error: 'Informe a capacidade de alunos como um número.'
    })
        .int('A capacidade deve ser um número inteiro.')
        .min(1, 'A capacidade deve ser de pelo menos 1 aluno.')
});

export function SalasCadastrar() {
    const [salas, setSalas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaSalas)
    });

    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.error("Token de autenticação não encontrado.");
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setProfessores(response.data);
            } catch (error) {
                console.error("Erro ao buscar professores:", error);
                alert("Erro ao carregar a lista de professores. Verifique sua conexão ou token.");
            }
        }
        buscarProfessores();
    }, []);

    async function obterDadosFormulario(data) {
        console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Você não está autenticado. Por favor, faça login.");
                return;
            }

            const response = await axios.post(
                'http://127.0.0.1:8000/api/salalistcreate/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Sala cadastrada com sucesso!");
            reset();

            navigate('/salas');
        } catch (error) {
            console.error("Erro ao cadastrar sala:", error);
            if (error.response && error.response.data) {
                alert(`Erro ao cadastrar: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Erro ao cadastrar sala. Por favor, tente novamente.");
            }
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.titulo}>CADASTRAR SALA</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.Formeditcriar}>
                <div className={estilos.formGroup}>
                    <input
                        type="text"
                        placeholder='Nome da sala:'
                        id="nome"
                        {...register('nome')}
                        className={estilos.inputField}
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input
                        type="number"
                        placeholder='Capacidade:'
                        id="capacidade_alunos"
                        {...register('capacidade_alunos', { valueAsNumber: true })}
                        className={estilos.inputField}
                    />
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
                </div>

                <button
                    type="submit"
                    className={estilos.submitButton}>
                    CADASTRAR SALA
                </button>
            </form>
        </div>
    );
}