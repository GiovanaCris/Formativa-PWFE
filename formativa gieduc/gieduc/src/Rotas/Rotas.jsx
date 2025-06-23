import { Routes, Route, Navigate } from 'react-router-dom';
import { Inicial } from '../Paginas/Inicial';
import { Inicio } from '../Paginas/Inicio';
import { Login } from '../Paginas/Login';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { DisciplinasCadastrar } from '../Paginas/DisciplinasCadastrar';
import { Disciplina } from '../Paginas/Disciplina';
import { Ambiente } from '../Paginas/Ambiente';
import { AmbienteProfessor } from '../Paginas/AmbienteProfessor';
import { AmbienteCadastrar } from '../Paginas/AmbienteCadastrar';
import { SalasEditar } from '../Paginas/SalasEditar';
import { SalasProfessor } from '../Paginas/SalasProfessor';
import { Salas } from '../Paginas/Salas';
import { SalasCadastrar } from '../Paginas/SalasCadastrar';
import { DisciplinasEditar } from '../Paginas/DisciplinaEditar';
import { AmbienteEditar } from '../Paginas/AmbienteEdit';
import { Professores } from '../Paginas/Professores';
import { ProfessoresCadastrar } from '../Paginas/ProfessoresCadastrar';
import { ProfessoresEditar } from '../Paginas/ProfessoresEditar';
import { GestoresCadastrar } from '../Paginas/GestoresCadastrar';
import { Gestores } from '../Paginas/Gestores';
import { GestoresEditar } from '../Paginas/GestoresEditar';
import { SobreNos } from '../Paginas/SobreNos';
import { Home } from '../Paginas/Home';

export function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Inicial />}>
        <Route index element={<Inicio />} />
        <Route path ='login' element={<Login/>}/>
        <Route path='home' element={<Home/>} />
        <Route path='discprofessor' element={<DisciplinasProfessor/>} />
        <Route path='disciplina' element={<Disciplina/>} />
        <Route path='/adicionardisciplina' element={<DisciplinasCadastrar/>} />
        <Route path="/disciplinas/editar/:id" element={<DisciplinasEditar />} />
        <Route path = 'ambiente' element={<Ambiente/>} />
        <Route path='/adicionarreserva' element={<AmbienteCadastrar/>} />
        <Route path="/reservas/editar/:id" element={<AmbienteEditar/>} />
        <Route path='ambienteprofessor' element={<AmbienteProfessor/>} />
        <Route path='salas' element={<Salas/>} />
        <Route path='/adicionarsala' element={<SalasCadastrar/>} />
        <Route path="/salas/editar/:id" element={<SalasEditar/>} />
        <Route path='salasprofessor' element={<SalasProfessor/>} />
        <Route path='professores' element={<Professores/>} />
        <Route path='/adicionarprofessor' element={<ProfessoresCadastrar/>} />
        <Route path="/professores/editar/:id" element={<ProfessoresEditar/>} />
        <Route path='gestores' element={<Gestores/>} />
        <Route path='/adicionargestor' element={<GestoresCadastrar/>} />
        <Route path="/gestores/editar/:id" element={<GestoresEditar/>} />
        <Route path='sobre_nos' element={<SobreNos/>} />
      </Route>
    </Routes>
  );
}