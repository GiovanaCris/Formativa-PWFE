//Cadastro e exlusão dos ambientes (reservas)
import { useForm } from 'react-hook-form';
import estilos from './Visualizar.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const schemaReservaAmbiente = z.object({
    data_inicio: z
        .string()
        .min(1, 'Informe a data e hora de início.')
        .refine(val => !isNaN(Date.parse(val)), {
            message: 'Data de início inválida.'
        }),
    data_termino: z
        .string()
        .min(1, 'Informe a data e hora de término.')
        .refine(val => !isNaN(Date.parse(val)), {
            message: 'Data de término inválida.'
        }),
    periodo: z.enum(['M', 'T', 'N'], {
        errorMap: () => ({ message: 'Selecione um período válido (Manhã, Tarde ou Noite).' })
    }),
    sala_reservada: z.number({
        required_error: 'Selecione uma sala.',
        invalid_type_error: 'ID da sala inválido.'
    }).min(1, 'Selecione uma sala.'),
    professor: z.number({
        required_error: 'Selecione um professor.',
        invalid_type_error: 'ID do professor inválido.'
    }).min(1, 'Selecione um professor.'),
    disciplina: z.number({
        required_error: 'Selecione uma disciplina.',
        invalid_type_error: 'ID da disciplina inválido.'
    }).min(1, 'Selecione uma disciplina.')
});

export function AmbienteCadastrar() {
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [salas, setSalas] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaReservaAmbiente)
    });

    useEffect(() => {
        async function carregarDados() {
            try {
                const token = localStorage.getItem('access_token');
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                const [resProf, resDisc, resSala] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/usuario/', { headers }),
                    axios.get('http://127.0.0.1:8000/api/disciplinas/', { headers }),
                    axios.get('http://127.0.0.1:8000/api/salalistcreate/', { headers })
                ]);

                setProfessores(resProf.data);
                setDisciplinas(resDisc.data);
                setSalas(resSala.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                alert("Erro ao carregar professores, disciplinas ou salas.");
            }
        }

        carregarDados();
    }, []);

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Você não está autenticado. Faça login.");
                return;
            }

            await axios.post(
                'http://127.0.0.1:8000/api/reservas/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            alert("Reserva cadastrada com sucesso!");
            reset();
            navigate('/ambiente');
        } catch (error) {
            console.error("Erro ao reservar:", error);
            alert("Erro ao reservar o ambiente. Verifique os dados ou tente novamente.");
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.tituloedit}>RESERVAR AMBIENTE</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.Formeditcriar}>
                <div className={estilos.formGroup}>
                    <input
                        type="datetime-local"
                        placeholder='Data Início:'
                        id="data_inicio"
                        {...register('data_inicio')}
                        className={estilos.inputField}
                    />
                    {errors.data_inicio && <p className={estilos.error}>{errors.data_inicio.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input
                        type="datetime-local"
                        placeholder='Data Término:'
                        id="data_termino"
                        {...register('data_termino')}
                        className={estilos.inputField}
                    />
                    {errors.data_termino && <p className={estilos.error}>{errors.data_termino.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <select {...register('periodo')} className={estilos.inputField}>
                        <option value="">Selecione o período</option>
                        <option value="M">Manhã</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                    </select>
                    {errors.periodo && <p className={estilos.error}>{errors.periodo.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <select {...register('sala_reservada', { valueAsNumber: true })} className={estilos.inputField}>
                        <option value="">Selecione uma sala</option>
                        {salas.map(sala => (
                            <option key={sala.id} value={sala.id}>
                                {sala.nome}
                            </option>
                        ))}
                    </select>
                    {errors.sala_reservada && <p className={estilos.error}>{errors.sala_reservada.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <select {...register('professor', { valueAsNumber: true })} className={estilos.inputField}>
                        <option value="">Selecione um professor</option>
                        {professores.map(prof => (
                            <option key={prof.id} value={prof.id}>
                                {prof.username || `${prof.first_name} ${prof.last_name}` || prof.email}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <select {...register('disciplina', { valueAsNumber: true })} className={estilos.inputField}>
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map(disc => (
                            <option key={disc.id} value={disc.id}>
                                {disc.nome}
                            </option>
                        ))}
                    </select>
                    {errors.disciplina && <p className={estilos.error}>{errors.disciplina.message}</p>}
                </div>

                <button type="submit" className={estilos.submitButton}>
                    RESERVAR
                </button>
            </form>
        </div>
    );
}