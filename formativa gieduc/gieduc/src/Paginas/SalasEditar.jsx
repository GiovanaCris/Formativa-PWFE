// Atualizar informações da sala
import { useForm } from 'react-hook-form';
import estilos from './Visualizar.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

export function SalasEditar() {
    const [salas, setSalas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
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
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProfessores(response.data);
            } catch (error) {
                console.error("Erro ao buscar professores:", error);
                alert("Erro ao carregar a lista de professores. Verifique sua conexão ou token.");
            }
        }
        buscarProfessores();
    }, [navigate]);

    useEffect(() => {
        if (id) {
            async function carregarDadosSalas() {
                try {
                    const token = localStorage.getItem('access_token');
                    if (!token) {
                        alert("Sua sessão expirou ou você não está logado. Por favor, faça login novamente.");
                        navigate('/login');
                        return;
                    }

                    const response = await axios.get(`http://127.0.0.1:8000/api/sala/${id}/`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const SalaData = response.data;

                    setValue('nome', SalaData.nome);
                    setValue('capacidade_alunos', SalaData.capacidade_alunos);

                } catch (error) {
                    console.error("Erro ao carregar dados da sala para edição:", error);
                    alert("Não foi possível carregar os dados da sala para edição. Verifique o ID ou suas permissões.");
                    navigate('/salas');
                }
            }
            carregarDadosSalas();
        }
    }, [id, setValue, navigate]);

    async function obterDadosFormulario(data) {
        console.log("Dados do formulário para atualização:", data);
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Você não está autenticado. Por favor, faça login.");
                navigate('/login');
                return;
            }

            const response = await axios.put(
                `http://127.0.0.1:8000/api/sala/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Sala atualizada com sucesso!");
            navigate('/salas');
        } catch (error) {
            console.error("Erro ao atualizar sala:", error);
            if (error.response && error.response.data) {
                alert(`Erro ao atualizar: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Erro ao atualizar sala. Por favor, tente novamente.");
            }
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.tituloedit}>EDITAR SALA</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.Formeditcriar}>
                <div className={estilos.formGroup}>
                    <label htmlFor="nome" className={estilos.labelform}>Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        {...register('nome')}
                        className={estilos.inputField}
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <label htmlFor="capacidade" className={estilos.labelform}>Capacidade</label>
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
                    SALVAR ALTERAÇÕES
                </button>
            </form>
        </div>
    );
}