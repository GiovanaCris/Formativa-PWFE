// Atualizar informações da disciplina
import { useForm } from 'react-hook-form';
import estilos from './Visualizar.module.css'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 

const schemaDisciplinas = z.object({
    nome: z.string()
        .min(1, 'Informe um nome por favor.')
        .max(100, 'Informe no máximo 100 caracteres.'),
    curso: z.string()
        .min(1, 'Informe o curso, moço(a).')
        .max(100, 'Informe no máximo 100 caracteres.'),
    carga_horaria: z.number({
        invalid_type_error: 'Insira uma carga horária válida.'
    })
        .int("Digite um valor inteiro para a carga horária.")
        .min(1, 'Informe um valor para a carga horária.')
        .max(260, 'A carga horária máxima é 260h.'),
    descricao: z.string()
        .min(1, 'Informe a descrição.')
        .max(255, 'Informe no máximo 255 caracteres.'),
    professor: z.number({
        invalid_type_error: 'Selecione um professor.'
    })
        .min(1, 'Selecione um professor.')
});

export function DisciplinasEditar() {
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
        resolver: zodResolver(schemaDisciplinas)
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
            async function carregarDadosDisciplina() {
                try {
                    const token = localStorage.getItem('access_token');
                    if (!token) {
                        alert("Sua sessão expirou ou você não está logado. Por favor, faça login novamente.");
                        navigate('/login');
                        return;
                    }

                    const response = await axios.get(`http://127.0.0.1:8000/api/disciplinas/${id}/`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const disciplinaData = response.data;

                    setValue('nome', disciplinaData.nome);
                    setValue('curso', disciplinaData.curso);
                    setValue('carga_horaria', disciplinaData.carga_horaria);
                    setValue('descricao', disciplinaData.descricao);
                    setValue('professor', disciplinaData.professor);

                } catch (error) {
                    console.error("Erro ao carregar dados da disciplina para edição:", error);
                    alert("Não foi possível carregar os dados da disciplina para edição. Verifique o ID ou suas permissões.");
                    navigate('/disciplinas');
                }
            }
            carregarDadosDisciplina();
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
                `http://127.0.0.1:8000/api/disciplinas/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Disciplina atualizada com sucesso!");
            navigate('/disciplina');
        } catch (error) {
            console.error("Erro ao atualizar disciplina:", error);
            if (error.response && error.response.data) {
                alert(`Erro ao atualizar: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Erro ao atualizar disciplina. Por favor, tente novamente.");
            }
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.tituloedit}>EDITAR DISCIPLINA</h2>
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
                    <label htmlFor="curso" className={estilos.labelform}>Curso:</label>
                    <input
                        type="text"
                        id="curso"
                        {...register('curso')}
                        className={estilos.inputField}
                    />
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <label htmlFor="carga_horaria" className={estilos.labelform}>Carga Horária:</label>
                    <input
                        type="number"
                        id="carga_horaria"
                        {...register('carga_horaria', { valueAsNumber: true })}
                        className={estilos.inputField}
                    />
                    {errors.carga_horaria && <p className={estilos.error}>{errors.carga_horaria.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <label htmlFor="descricao" className={estilos.labelform}>Descrição:</label>
                    <textarea
                        id="descricao"
                        {...register('descricao')}
                        rows="3"
                        className={estilos.inputField}
                    ></textarea>
                    {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <label htmlFor="professor" className={estilos.labelform}>Professor:</label>
                    <select
                        id="professor"
                        {...register('professor', { valueAsNumber: true })}
                        className={estilos.inputField}
                    >
                        <option value="">Selecione um professor</option>
                        {professores.map(professor => (
                            <option key={professor.id} value={professor.id}>
                                {professor.username || professor.first_name + ' ' + professor.last_name || professor.email}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
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