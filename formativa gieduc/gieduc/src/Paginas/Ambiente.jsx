//Listagem dos ambientes
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Trash2, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';
import estilos from './Visualizar.module.css';

export function Ambiente() {
    const [reservas, setReservas] = useState([]);
    const [professores, setProfessores] = useState({});
    const [disciplinas, setDisciplinas] = useState({});
    const [salas, setSalas] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('Você não está autenticado.');
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        async function carregarDados() {
            try {
                const [resReservas, resProfessores, resDisciplinas, resSalas] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/reservas/', { headers }),
                    axios.get('http://127.0.0.1:8000/api/usuario/', { headers }),
                    axios.get('http://127.0.0.1:8000/api/disciplinas/', { headers }),
                    axios.get('http://127.0.0.1:8000/api/salalistcreate/', { headers }),
                ]);

                setReservas(resReservas.data);

                const professoresMap = {};
                resProfessores.data.forEach(p => {
                    professoresMap[p.id] = p.username || `${p.first_name} ${p.last_name}` || p.email;
                });
                setProfessores(professoresMap);

                const disciplinasMap = {};
                resDisciplinas.data.forEach(d => {
                    disciplinasMap[d.id] = d.nome;
                });
                setDisciplinas(disciplinasMap);

                const salasMap = {};
                resSalas.data.forEach(s => {
                    salasMap[s.id] = s.nome;
                });
                setSalas(salasMap);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                alert('Erro ao carregar reservas, professores, disciplinas ou salas.');
            }
        }

        carregarDados();
    }, []);

    function excluirReserva(id) {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');
        if (!token) return alert('Você não está autenticado.');

        axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setReservas(prev => prev.filter(r => r.id !== id));
                alert("Reserva excluída com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao excluir reserva", error);
                alert("Erro ao excluir reserva.");
            });
    }

    return (
        <main className={estilos.containerAmb}>
            <div className={estilos.content_container}>
                <h3 className={estilos.title}>RESERVAS</h3>

                <div className={estilos.topoAcoes}>
                    <Link to="/adicionarreserva" className={estilos.botaoAdicionar}>
                        <span className={estilos.iconeAdd}>+</span>
                    </Link>
                </div>

                <div className={estilos.tabelaWrapper}>
                    <table className={estilos.tabeladados}>
                        <thead>
                            <tr className={estilos.cabecalho}>
                                <th>Período</th>
                                <th>Data de início</th>
                                <th>Data de término</th>
                                <th>Sala reservada</th>
                                <th>Professor</th>
                                <th>Disciplina</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map(reserva => (
                                <tr key={reserva.id}>
                                    <td>{reserva.periodo}</td>
                                    <td>{new Date(reserva.data_inicio).toLocaleString()}</td>
                                    <td>{new Date(reserva.data_termino).toLocaleString()}</td>
                                    <td>{salas[reserva.sala_reservada] || '—'}</td>
                                    <td>{professores[reserva.professor] || '—'}</td>
                                    <td>{disciplinas[reserva.disciplina] || '—'}</td>
                                    <td className={estilos.atualizacoes}>
                                        <button onClick={() => excluirReserva(reserva.id)}>
                                            <Trash2 className={estilos.excluir} />
                                        </button>
                                        <Link to={`/reservas/editar/${reserva.id}`}>
                                            <button className={estilos.meuBotaoComIcone}>
                                                <Brush className={estilos.editar} />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}


// /*Ambientes do gestor*/
// import axios from 'axios'
// import React, {useState, useEffect} from 'react';
// import add from '../assets/add.png';
// import edit from '../assets/edit.png';
// import del from '../assets/delete.png';
// import estilos from './Visualizar.module.css';

// export function Ambiente(){
// const [ambientes, setAmbientes] = useState([]);
// const [professores, setProfessores] = useState([]);

//     useEffect(()=>{
//         const token = localStorage.getItem('access_token');
//         axios.get('http://127.0.0.1:8000/api/reservas/',{
//             headers:{
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         //Se der bom (200) quero popular a minha variavel disciplina com dados da api
//         .then(response =>{
//             setAmbientes(response.data);
//         })
//         //Se der ruim 
//         .catch(error => {
//             console.error("Erro: ", error);
//         });

//         //Busca dos professores
//         axios.get('http://127.0.0.1:8000/api/usuario/', {
//             headerr: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })

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

//     return(
//         <main className={estilos.container}>
//             <h3 className={estilos.titulo}>Reservas de Ambiente</h3>
//             <div className={estilos.topoAcoes}>
//                 <img className={estilos.iconeAdd} src={add} alt='adicionar ambiente'/>
//             </div>
//             <div className={estilos.tabelaWrapper}>
//                 <table className={estilos.tabelaDados}>
//                     <thead>
//                         <tr>
//                             <th>Data Início</th>
//                             <th>Data término</th>
//                             <th>Periodo</th>
//                             <th>Sala Reservada</th>
//                             <th>Professor</th>
//                             <th>Disciplina</th>
//                         </tr>
//                     </thead>
//                     <tbody className={estilos.infoDisc}>
//                         {ambientes.map(ambientes => (
//                             <tr key={ambientes.id}>
//                                 <td>{ambientes.data_inicio}</td>
//                                 <td>{ambientes.data_termino}</td>
//                                 <td>{ambientes.periodo}</td>
//                                 <td>{ambientes.sala_reservada}</td>
//                                 <td>{ambientes.disciplina}</td>
//                                 <td>{ambientes[professores.professor]}</td> {/*ARRUMARRR*/}
//                                 <td>
//                                     <img className={estilos.iconeEdit} src={edit}/>
//                                     <img className={estilos.iconeDel} src={del}/>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </main>
//     )
// }