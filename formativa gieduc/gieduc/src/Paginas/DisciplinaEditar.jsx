// Atualizar informações da disciplina
import { useForm } from 'react-hook-form';
import estilos from './Visualizar.module.css'; // Mantenha se estiver usando, mas pode ser redundante com Tailwind/classes inline
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // <-- Importe useParams aqui!

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
    // const [disciplinaNome, setDisciplinaNome] = useState('');
    const { id } = useParams(); // <-- Obtém o ID da URL de edição

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // <-- Essencial para preencher os campos do formulário para edição
        reset // Para limpar o formulário (pode ser usado, mas setValue é mais comum em edições)
    } = useForm({
        resolver: zodResolver(schemaDisciplinas)
    });

    // useEffect para buscar a lista de professores (isso continua igual)
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.error("Token de autenticação não encontrado.");
                    navigate('/login'); // Redireciona para o login se não houver token
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
    }, [navigate]); // Adicione navigate às dependências, pois ele é usado dentro do useEffect

    // NOVO useEffect: Para carregar os dados da disciplina a ser editada
    useEffect(() => {
        // Só carrega os dados se um ID estiver presente na URL (ou seja, modo de edição)
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
                    navigate('/disciplinas'); // Redireciona de volta se houver erro ao carregar
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
            navigate('/disciplina'); //Redireciona para a lista de disciplinas
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
        <div className={estilos.container_criarambiente}>
            <h2 className={estilos.title}>Editar Disciplina:</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className="space-y-4">
                <div>
                    <label htmlFor="nome" className={estilos.formCriarAmbiente}>Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        {...register('nome')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
                </div>

                <div>
                    <label htmlFor="curso" className="block text-sm font-medium text-gray-700">Curso:</label>
                    <input
                        type="text"
                        id="curso"
                        {...register('curso')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {errors.curso && <p className="mt-1 text-sm text-red-600">{errors.curso.message}</p>}
                </div>

                <div>
                    <label htmlFor="carga_horaria" className="block text-sm font-medium text-gray-700">Carga Horária:</label>
                    <input
                        type="number"
                        id="carga_horaria"
                        {...register('carga_horaria', { valueAsNumber: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {errors.carga_horaria && <p className="mt-1 text-sm text-red-600">{errors.carga_horaria.message}</p>}
                </div>

                <div>
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <textarea
                        id="descricao"
                        {...register('descricao')}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                    {errors.descricao && <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>}
                </div>

                <div>
                    <label htmlFor="professor" className="block text-sm font-medium text-gray-700">Professor:</label>
                    <select
                        id="professor"
                        {...register('professor', { valueAsNumber: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">Selecione um professor</option>
                        {professores.map(professor => (
                            <option key={professor.id} value={professor.id}>
                                {professor.username || professor.first_name + ' ' + professor.last_name || professor.email}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className="mt-1 text-sm text-red-600">{errors.professor.message}</p>}
                </div>

                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}