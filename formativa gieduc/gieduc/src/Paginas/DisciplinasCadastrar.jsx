//Cadastro e exlusão das disciplinas
import { useForm } from 'react-hook-form';
import estilos from './Visualizar.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

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
    descricao: z.string() // Mesmos campos do models e o min e max dos valores também
        .min(1, 'Informe a descrição.')
        .max(255, 'Informe no máximo 255 caracteres.'),
    professor: z.number({
        invalid_type_error: 'Selecione um professor.'
    })
        .min(1, 'Selecione um professor.') 
});

export function DisciplinasCadastrar() {
    const [professores, setProfessores] = useState([]);
    const navigate = useNavigate(); 

    //formulário de cadastro
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset //Limpar os campos do formulário
    } = useForm({
        resolver: zodResolver(schemaDisciplinas)
    });

    // useEffect para buscar a lista de professores ao carregar o componente
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

    //Função para para o envio do formulário
    async function obterDadosFormulario(data) {
        console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Você não está autenticado. Por favor, faça login.");
                return;
            }

            // Requisição POST para cadastrar a nova disciplina
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/', //Endpoint da API Django para criar disciplinas
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json' 
                    }
                }
            );
            alert("Disciplina cadastrada com sucesso!");
            reset(); // Limpa os campos do formulário após o sucesso
            // Redireciona para a página de visualização de disciplinas
            navigate('/disciplina'); 
        } catch (error) {
            console.error("Erro ao cadastrar disciplina:", error);
            if (error.response && error.response.data) {
                alert(`Erro ao cadastrar: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Erro ao cadastrar disciplina. Por favor, tente novamente.");
            }
        }
    }

    return (
        <div className={estilos.container}> 
            <h2 className={estilos.titulo}>CADASTRAR DISCIPLINA</h2>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.Formeditcriar}>
                <div className={estilos.formGroup}>
                    <input
                        type="text"
                        placeholder='Nome da disciplina:'
                        id="nome"
                        {...register('nome')}
                        className={estilos.inputField}
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input
                        type="text"
                        placeholder='Nome do curso:'
                        id="curso"
                        {...register('curso')}
                        className={estilos.inputField} 
                    />
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <input
                        type="number"
                        placeholder='Carga horária:'
                        id="carga_horaria"
                        {...register('carga_horaria', { valueAsNumber: true })} // Importante para converter o valor para número
                        className={estilos.inputField} 
                    />
                    {errors.carga_horaria && <p className={estilos.error}>{errors.carga_horaria.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <textarea
                        id="descricao"
                        placeholder='Adicone uma descrição:'
                        {...register('descricao')}
                        rows="3" 
                        className={estilos.inputField}
                    ></textarea>
                    {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}
                </div>

                <div className={estilos.formGroup}>
                    <select
                        id="professor"
                        placeholder='Selecione o professor:'
                        {...register('professor', { valueAsNumber: true })}
                        className={estilos.inputField}>

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
                    CADASTRAR DISCIPLINA
                </button>
            </form>
        </div>
    );
}


// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const schemaDisciplinas = z.object({
//     nome: z.string
//         .min(1, 'informe um nome plisss')
//         .max(100, 'informe no máximo 100 caracteres'),
//     curso: z.string()
//         .min(1, 'informe o curso moçoo')
//         .max(100, 'Informe no máximo 100 caracteres'),
//     carga_horaria: z.number(
//         {invalid_type_error: 'Insira uma carga horaria'})
//         .int("Digite um valor inteiro")
//         .min(1, 'Informe um valor')
//         .max(260, 'IA cargahoria máxima é 260h'),
//     descricao: z.string() //Mesmos campos do models e o min e max tambem
//         .min(1, 'Informe a descricao')
//         .max(255, 'Informe no máximo 255 caracteres'),
//     professor: z.number(
//         {invalid_type_error: 'Selecione um professor'})
//             .min(1, 'Selecione um professor')
// });

// export function DisciplinasCadastrar (){
//     const [professores, setProfessores] = useState([]);

//     const{
//         register, 
//         handleSubmit,
//         formState: {errors},
//     } = useForm ({
//         resolver: zodResolver(schemaDisciplinas)
//     });

//     useEffect(() => {
//         async function buscarProfessores() {
//             try{
//                 const token =  localStorage.getItem('access_token');
//                 const response = await axios.get('http://127.0.0.1:8000/api/professores/',{
//                     headers:{
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 setProfessores(response.data);
//             }catch(error){
//                 console.error("erro", error);
//             }
//         }
//         buscarProfessores();
//     },[]);

//     async function obterDadosFormulario(params) {
//         console.log("dados do formulário", data);
//         try{
//             const token = localStorage.getItem('access_token');
//             const response = await axios.post(
//                 'http://127.0.0.1:8000/api/disciplinas/',
//                 data,{
//                     headers:{
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
//             alert("Disciplina cadastrada com sucesso!");
//             resizeTo();
//         }catch(error){
//             console.error("erro", error)
//             alert("Erro ao cadastrar")
//         }
//     }
// }