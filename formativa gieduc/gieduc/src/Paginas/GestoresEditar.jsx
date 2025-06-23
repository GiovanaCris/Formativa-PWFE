// Atualizar informações dos gestores
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import estilos from './Visualizar.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const schemaGestor = z.object({
    username: z.string().min(1, 'Informe um nome de usuário.'),
    email: z.string().email('Email inválido.'),
    ni: z.number({ invalid_type_error: 'Informe um NI válido.' }).int().positive(),
    telefone: z.string().min(8, 'Informe o telefone.'),
    data_nascimento: z.string().min(1, 'Informe a data de nascimento.'),
    data_contratacao: z.string().min(1, 'Informe a data de contratação.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.')
});

export function GestoresEditar() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: zodResolver(schemaGestor)
    });

    useEffect(() => {
        async function carregarDadosGestor() {
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

                const gestor = response.data;
                setValue('username', gestor.username);
                setValue('email', gestor.email);
                setValue('ni', gestor.ni);
                setValue('telefone', gestor.telefone);
                setValue('data_nascimento', gestor.data_nascimento);
                setValue('data_contratacao', gestor.data_contratacao);
                setValue('password', gestor.password); // cuidado: geralmente não se retorna senha no backend
            } catch (error) {
                console.error("Erro ao carregar gestor:", error);
                alert("Erro ao carregar gestor. Verifique sua autenticação.");
                navigate('/gestores');
            }
        }

        carregarDadosGestor();
    }, [id, navigate, setValue]);

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Você não está autenticado. Faça login.");
                navigate('/login');
                return;
            }

            const payload = { ...data, tipo: 'G' };

            await axios.put(`http://127.0.0.1:8000/api/usuario/${id}/`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("Gestor atualizado com sucesso!");
            navigate('/gestores');
        } catch (error) {
            console.error("Erro ao atualizar gestor:", error.response?.data || error);
            alert("Erro ao atualizar. Verifique os campos ou tente novamente.");
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.tituloedit}>EDITAR GESTOR</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.Formeditcriar}>
                <div className={estilos.formGroup}>
                    <input type="text" placeholder="Nome do gestor:" {...register("username")} className={estilos.inputField} />
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
                    <input type="password" placeholder="Senha" {...register("password")} className={estilos.inputField} />
                    {errors.password && <p className={estilos.error}>{errors.password.message}</p>}
                </div>

                <button type="submit" className={estilos.submitButton}>
                    SALVAR ALTERAÇÕES
                </button>
            </form>
        </div>
    );
}