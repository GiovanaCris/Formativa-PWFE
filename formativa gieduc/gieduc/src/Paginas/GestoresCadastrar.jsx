//Cadastro e exlusão dos gestores
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import estilos from './Visualizar.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schemaGestor = z.object({
    username: z.string().min(1, 'Informe um nome de usuário.'),
    email: z.string().email('Email inválido.'),
    ni: z.number({ invalid_type_error: 'Informe um NI válido.' }).int().positive(),
    telefone: z.string().min(8, 'Informe o telefone.'),
    data_nascimento: z.string().min(1, 'Informe a data de nascimento.'),
    data_contratacao: z.string().min(1, 'Informe a data de contratação.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.')
});

export function GestoresCadastrar() {
    localStorage.getItem('access_token')
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaGestor)
    });
        useEffect(() => {
        reset();
    }, []);

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Você não está autenticado. Faça login.");
                return;
            }
            const payload = {
                ...data,
                tipo: 'G' // define como gestor
            };
            await axios.post('http://127.0.0.1:8000/api/usuario/', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("Gestor cadastrado com sucesso!");
            reset();
            navigate('/gestores');
        } catch (error) {
            console.error("Erro ao cadastrar gestor:", error.response?.data || error);
            alert("Erro ao cadastrar. Verifique os campos ou tente novamente.");
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.titulocad}>CADASTRAR NOVO GESTOR</h2>
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
                    CADASTRAR GESTOR
                </button>
            </form>
        </div>
    );
}