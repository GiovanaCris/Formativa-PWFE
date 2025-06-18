import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';

const schemaDisciplinas = z.object({
    nome: z.string
        .min(1, 'informe um nome plisss')
        .max(100, 'informe no máximo 100 caracteres'),
    curso: z.string()
        .min(1, 'informe o curso moçoo')
        .max(100, 'Informe no máximo 100 caracteres'),
    carga_horaria: z.number(
        {invalid_type_error: 'Insira uma carga horaria'})
        .int("Digite um valor inteiro")
        .min(1, 'Informe um valor')
        .max(260, 'IA cargahoria máxima é 260h'),
    descricao: z.string() //Mesmos campos do models e o min e max tambem
        .min(1, 'Informe a descricao')
        .max(255, 'Informe no máximo 255 caracteres'),
    professor: z.number(
        {invalid_type_error: 'Selecione um professor'})
            .min(1, 'Selecione um professor')
});

export function DisciplinasCadastrar (){
    const [professores, setProfessores] = useState([]);

    const{
        register, 
        handleSubmit,
        formState: {errors},
    } = useForm ({
        resolver: zodResolver(schemaDisciplinas)
    });

    useEffect(() => {
        async function buscarProfessores() {
            try{
                const token =  localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/professores/',{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
            }catch(error){
                console.error("erro", error);
            }
        }
        buscarProfessores();
    },[]);

    async function obterDadosFormulario(params) {
        console.log("dados do formulário", data);
        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
                data,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Disciplina cadastrada com sucesso!");
            resizeTo();
        }catch(error){
            console.error("erro", error)
            alert("Erro ao cadastrar")
        }
    }
}