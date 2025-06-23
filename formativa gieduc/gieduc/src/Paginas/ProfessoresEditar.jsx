// Atualizar informações dos professores
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import estilos from './Visualizar.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const schemaProfessor = z.object({
    username: z.string().min(1, 'Informe um nome de usuário.'),
    email: z.string().email('Email inválido'),
    ni: z.number({ invalid_type_error: 'Informe um NI válido.' }).int().positive(),
    telefone: z.string().min(8, 'Informe o telefone'),
    data_nascimento: z.string().min(1, 'Informe a data de nascimento.'),
    data_contratacao: z.string().min(1, 'Informe a data de contratação.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.')
});

export function ProfessoresEditar() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: zodResolver(schemaProfessor)
    });

    useEffect(() => {
        async function carregarDadosProfessor() {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    alert("Sua sessão expirou. Faça login novamente.");
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const professor = response.data;
                setValue('username', professor.username);
                setValue('email', professor.email);
                setValue('ni', professor.ni);
                setValue('telefone', professor.telefone);
                setValue('data_nascimento', professor.data_nascimento);
                setValue('data_contratacao', professor.data_contratacao);
                setValue('password', ''); // não exibe a senha, só se quiser alterar

            } catch (error) {
                console.error("Erro ao carregar professor:", error);
                alert("Erro ao carregar professor. Verifique sua autenticação.");
                navigate('/professores');
            }
        }

        carregarDadosProfessor();
    }, [id, navigate, setValue]);

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Você não está autenticado. Faça login.");
                navigate('/login');
                return;
            }

            const payload = { ...data, tipo: 'P' };

            await axios.put(`http://127.0.0.1:8000/api/usuario/${id}/`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("Professor atualizado com sucesso!");
            navigate('/professores');
        } catch (error) {
            console.error("Erro ao atualizar professor:", error.response?.data || error);
            alert("Erro ao atualizar. Verifique os campos ou tente novamente.");
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.tituloedit}>EDITAR PROFESSOR</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.Formeditcriar}>
                <div className={estilos.formGroup}>
                    <input type="text" placeholder="Nome do professor:" {...register("username")} className={estilos.inputField} />
                    {errors.username && <p className={estilos.error}>{errors.username.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input type="email" placeholder="Email" {...register("email")} className={estilos.inputField} />
                    {errors.email && <p className={estilos.error}>{errors.email.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input type="number" placeholder="NI (Número de identificação)" {...register("ni", { valueAsNumber: true })} className={estilos.inputField} />
                    {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input type="text" placeholder="Telefone" {...register("telefone")} className={estilos.inputField} />
                    {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <label className={estilos.label}>Data de nascimento:</label>
                    <input type="date" {...register("data_nascimento")} className={estilos.inputField} />
                    {errors.data_nascimento && <p className={estilos.error}>{errors.data_nascimento.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <label className={estilos.label}>Data de contratação:</label>
                    <input type="date" {...register("data_contratacao")} className={estilos.inputField} />
                    {errors.data_contratacao && <p className={estilos.error}>{errors.data_contratacao.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input type="password" placeholder="Nova senha (opcional)" {...register("password")} className={estilos.inputField} />
                    {errors.password && <p className={estilos.error}>{errors.password.message}</p>}
                </div>

                <button type="submit" className={estilos.submitButton}>
                    SALVAR ALTERAÇÕES
                </button>
            </form>
        </div>
    );
}