import { Routes, Route, Navigate } from 'react-router-dom';
import { Inicial } from '../Paginas/Inicial';
import { Inicio } from '../Paginas/Inicio';
import { Login } from '../Paginas/Login';
import { MenuNav } from '../Componentes/MenuNav';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { Disciplina } from '../Paginas/Disciplina';
import { Ambiente } from '../Paginas/Ambiente';
import { SobreNos } from '../Paginas/SobreNos';
import { Home } from '../Paginas/Home';

export function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Inicial />}>
        <Route index element={<Inicio />} />
        <Route path ='login' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='sobre_nos' element={<SobreNos/>} />
        <Route path='menu' element={<MenuNav />} />
        <Route path = 'disciplina' element={<Disciplina/>}/>
        <Route path = 'ambiente' element={<Ambiente/>} />
      </Route>
    </Routes>
  );
}



// export function Rotas() {
//     return (
//         <Routes>
//             <Route path="/" element={<Login />} />
           
//             <Route path="/inicial" element={<Inicial />} >
//                 <Route index element={<MenuPrincipal />} />
//                  <Route path="disciplina" element={<Disciplina/>}/>
//                 <Route path="ambiente" element={<Ambiente/>}/>
//                 <Route path='professores' element={<Professores/>}/>
//                 <Route path='ambiente/ambCadastrar' element={<AmbienteCadastrar/>}/>
//                 <Route path="ambiente/editar/:id" element={<AmbienteEditar />} />
//                 <Route path='disciplina/disCad' element={<DisciplinaCadastrar/>}/>
//                 <Route path="disciplina/editar/:id" element={<DisciplinaEditar />} />
//                 <Route path='ambienteProfessor' element={<AmbienteProfessor/>}/>
//                 <Route path='disciplinaProfessor' element={<DisciplinaProfessor/>}/>
//                 <Route path="professores/editar/:id" element={<ProfessorEditar />} />
//                 <Route path='professores/profCadastrar' element={<ProfessorCadastrar/>}/>
//             </Route>
//         </Routes>
//     )
// }