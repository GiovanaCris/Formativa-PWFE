//axios faz as requisições HTTP , ou seja posso consultar com o backend
import axios from 'axios';
//A junção dessas 3 bibliotecas faz a valudadçã do formulário, eles são tipo uma venda casada um funciona baseado no outro
import { useForm } from 'react-hook-form'; //Validação omput
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import estilos from './Login.module.css';

//Colocar os mesmos nomes do banco de dados
const schemaLogin = z.object({
    username: z.string()
        .min(1, '  Inform o seu usuário') 
        .min(30, 'Informe no máximo 30 caracteres'), //Obedecer o backend

    password: z.string()
        .min (1, 'Intforme ao mínimo um caractere')
        .max(15, 'Informe npo máximo 15 caracteres')
});

export function Login(){
    //Registra todas as informações que são dadas pelo usuário e tnta resolver d eacordo com o schema
    const{
        register,
        handleSubimit,
        formState: {errors}
    } = useForm(
        {resolver: zodResolver(schemaLogin)}
    );

    async function ObterDados(data) {
        console.log(`Dados ${data}`)

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: data.username,
                password: data.password
            });
            const{ acess, refresh, user} = response.data;

            localStorage.setItem('access_token', acess)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('tipo', user.tipo)
            localStorage.setItem('username', username)

            alert("Login realizado com sucesso!") //console.log
        }catch(error){
            console.error('Deu ruim', error);
            alert("Dados inváldos")
        }
    }

    return( 
        <div className={estilos.container}> 
            <form onSubmit={handleSubimit(ObterDados)} //No momento em que der o submit quero que seja lido e relido 
                className={estilos.LoginForm}>

                <h2 className={estilos.title}>Login</h2>

                <label className={estilos.label}>Usuário</label>
                <input className={estilos.inputField}
                    {...register('username')} //Registrando o que ele irá inputar dentro do username
                    placeholder='josesilva'
                /> 
                {errors.username && <p>{errors.username.message}</p>}

                <label className={estilos.label}>Senha:</label>
                <input className={estilos.inputField}
                    {...register('password')}
                    placeholder='Senha'
                    type="password" //deixar a senha oculta ao digitar
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

                <button type='submit' className={estilos.submitButton}>ENTRAR</button>
            </form>
        </div>
    )
}