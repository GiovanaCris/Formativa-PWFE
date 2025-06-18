/*Disciplinas do gestor*/
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import { Edit, Trash2, Plus} from 'lucide-react';
import { Link } from 'react-router-dom';
import add from '../assets/add.png';
import edit from '../assets/edit.png';
import del from '../assets/delete.png';
import estilos from './Visualizar.module.css';

export function Disciplina() {
    const [disciplinas, setDisciplina] = useState([]);
    const [professores, setProfessores] = useState([]);
    console.log("Disciplinas:", disciplinas);
    console.log("Professores:", professores);

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        axios.get('http://127.0.0.1:8000/api/disciplinas/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })// url aqui da disciplina 

            .then(response => {
                setDisciplina(response.data);
            })

            .catch(error => {
                console.error('error', error);

            });

            //Busca dos professores
        axios.get('http://127.0.0.1:8000/api/usuario/', {
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })
        .then(response =>{
            //serve para transformar array de prof em objeto com id
            const professorporId ={};
            response.data.forEach(prof => {
                professorporId[prof.id] = `${prof.username}`;
            });
            setProfessores(professorporId || {});
        })
        .catch(error =>{
            console.error("Erro o buscar o professor", error); //se der ruim tem que vir mensagem de erro
        });

    },[]);

    function excluirDisciplina(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta disciplina?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
        //atualiza a lista automaticamente
        setDisciplina(prev => prev.filter(d => d.id !== id));
        alert("Disciplina excluída com sucesso!");
    })
    .catch(error => {
        console.error("Erro ao excluir disciplina", error);
        alert("Erro ao excluir disciplina.");
    });
}

    return(
              <>
        {/* esse é o meu cabeçalho */}
            <main className={estilos.containerM}>
                <div className={estilos.container}>
                    <h3 className={estilos.title}>DISCIPLINAS</h3>
                    {/* adicionar nova disicplina */}
                    <div className={estilos.topoAcoes}>
                        <Link to="/adicionardisciplina" className={estilos.botaoAdicionar}>
                            <img className={estilos.iconeAdd} src={more} alt='Adicionar disciplina' />
                        </Link>
                    </div>
                    {/* tabela de exibir as disciplinas ja cadastradas */}
                    <div className={estilos.tabelaWrapper}>
                        <table className={estilos.tabeladados}>
                            <thead>
                                <tr className={estilos.cabecalho}>
                                    <th>Nome</th>
                                    <th>Curso</th>
                                    <th>Descrição</th>
                                    <th>Carga Horária</th>
                                    <th>Professor</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {disciplinas.map(disciplina => (
                                        <tr key={disciplina.id}>
                                        <td>{disciplina.nome}</td>
                                        <td>{disciplina.curso}</td>
                                        <td>{disciplina.descricao}</td>
                                        <td>{disciplina.carga_horaria}</td>
                                        <td>
                                            <button onClick={() => excluirDisciplina(disciplina.id)}>
                                            <Trash2 className="text-red-500 hover:text-red-700 w-5 h-5" />
                                            </button>
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>


 // <td>
        //         {/* editar disciplina */}
        //         <Link to={`/editardisciplina/${disciplina.id}`} className={estilos.botaoAdicionar}>
        //             <img className={estilos.icone} src={edit} alt="Editar disciplina" />
        //         </Link>
        //         {/* botão de deletar disciplina */}
        //         <button className={estilos.botaoExcluir} onClick={() => excluirDisciplina(disciplina.id)} title="Excluir">
        //             <img className={estilos.icone} src={del} alt="Excluir disciplina" />
        //         </button>
//  </td>



        //  <>
        //     <div className="p-6">
        //         <h2 className="text-2xl font-bold mb-6">Disciplinas</h2>
                   
        //         <Link to="/cadastro">
        //             <Plus className="w-10 h-10 text-black-500 hover:text-blue-700 transition"  />  
        //         </Link>

        //         <br></br>

               
                
        //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //             {disciplinas.map((disciplina) => (
        //                 <div
        //                     key={disciplina.id}
        //                     className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition-shadow"
        //                 >   <div className=" flex flex-direction: row;">
        //                         <Trash2 className="w-7 h-7 text-red-500 hover:text-red-700 transition" onClick={() => handleDelete(disciplina.id)}/>
                                
        //                         <Link to={`/editar/${disciplina.id}`}>                              
        //                           <Edit className="w-7 h-7 text-blue-500 hover:text-blue-700 transition" />
        //                         </Link>
                             
        //                     </div>
        //                     <h3 className="text-lg font-semibold text-indigo-700">{disciplina.nome}</h3>
        //                     <p className="text-gray-600">Curso: {disciplina.curso}</p>
        //                     <p className="text-gray-600">Carga Horária: {disciplina.carga_horaria}h</p>
        //                     <p className="text-gray-600">Descrição: {disciplina.descricao}</p>
        //                     <p className="text-gray-600">Professor: {disciplina.professor}</p>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </>
        );
    }


        // <main className={estilos.container}>
        //     <h3 className={estilos.titulo}>Disciplinas</h3>
        //     <div className={estilos.topoAcoes}>
        //         <img className={estilos.iconeAdd} src={add} alt='adicionar disciplina'/>
        //     </div>
        //     <div className={estilos.tabelaWrapper}>
        //         <table className={estilos.tabelaDados}>
        //             <thead>
        //                 <tr>
        //                     <th>Nome</th>
        //                     <th>Curso</th>
        //                     <th>Descrição</th>
        //                     <th>Carga Horária</th>
        //                     <th>Professor</th>
        //                     <th>Ação</th>
        //                 </tr>
        //             </thead>
        //             <tbody className={estilos.infoDisc}>
        //                 {disciplinas.map(disciplina => (
        //                     <tr key={disciplina.id}>
        //                         <td>{disciplina.nome}</td>
        //                         <td>{disciplina.curso}</td>
        //                         <td>{disciplina.descricao}</td>
        //                         <td>{disciplina. carga_horaria}</td>
        //                         <td>{disciplina[professores.professor]}</td> {/*ARRUMARRR*/}
        //                         <td>
        //                             <img className={estilos.iconeEdit} src={edit}/>
        //                             <img className={estilos.iconeDel} src={del}/>
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </main>
 




// export function Disciplina(){
// const [disciplinas, setDisciplinas] = useState([]);
// // const [professores, setProfessores] = useState([]);

//     useEffect(()=>{
//         const token = localStorage.getItem('access_token');

//         axios.get('http://127.0.0.1:8000/api/disciplinas/',{
//             headers:{
//                 'Authorization': `Bearer ${token}`
//             }
//         })

//         //Se der bom (200) quero popular a minha variavel disciplina com dados da api
//         .then(response =>{
//             setDisciplinas(response.data);
//         })
//         //Se der ruim 
//         .catch(error => {
//             console.error("Erro: ", error);
//         });

//         //Busca dos professores
//         axios.get('', { //http://127.0.0.1:8000/api/usuario/
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//     }, [])
//         .then(response =>{
//             const professorPorId = {};
//             response.data.forEach(prof =>{
//                 professorPorId[prof.id] = `${prof.first_name} ${prof.last_name}`;
//             });
//             setProfessores(professorPorId);
//         })
//         .catch(error =>{
//             console.error("Erro o buscar profs", error);
//         });
//     }, [])












    //   const handleDelete = (id) => {
    //     const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    //     if (!confirmar) return;
 
    //     const token = localStorage.getItem('access_token');
 
    //     axios.delete(`http://127.0.0.1:8000/aoi/disciplina/${id}`, {
    //         headers: {
    //         'Authorization': `Bearer ${token}`
    //         }
    //     })
    //     .then(() => {
    //         alert('Disciplina excluída com sucesso!');
    //         setDisciplina(prev => prev.filter(dis => dis.id !== id));
    //     })
    //     .catch(error => {
    //         console.error('Erro ao excluir disciplina:', error);
    //         alert('Erro ao excluir a disciplina.');
    //     });
    //     };