import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import estilos from './Login.module.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
 
const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Informe um nome')
        .max(25, 'Informe no máximo 25 caracteres'),
    password: z.string()
        .min(1, 'Informe uma senha')
        .max(15, 'Informe no máximo 15 caracteres')
});
 
export function Login() {
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    });
 
    async function obterDadosFormulario(data) {
        console.log(`Dados: ${data.username} ${data.password}`)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: data.username,
                password: data.password
            });
 
            const { access, refresh, user } = response.data;
 
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('tipo', user.tipo);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('username', response.data.username);
 
            console.log('Login bem-sucedido!');          
            navigate('/home');
         
 
        } catch (error) {
            console.error('Erro de autenticação', error);
            alert("Dados Inválidos, por favor verifique suas credenciais");
        }
    }
 
    return (
        <div className={estilos.container}>
            <h2 className={estilos.titulo}>FAÇA SEU LOGIN</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.loginForm}>
 
                <input
                    {...register('username')}
                    placeholder='Nome de usuário:'
                    className={estilos.inputField}
                />
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}
 
                <input
                    {...register('password')}
                    placeholder='Digite sua senha:'
                    type="password"
                    className={estilos.inputField}
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

                <input
                    {...register('password')}
                    placeholder='Digite sua senha novamente:'
                    type="password"
                    className={estilos.inputField}
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}
 
                <button type="submit" className={estilos.submitButton}>ENTRAR</button>
            </form>
        </div>
    );
}
 
 