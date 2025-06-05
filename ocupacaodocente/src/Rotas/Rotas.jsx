import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login'; 
import { Inicial } from '../Paginas/Inicial';
import { Menu } from '../Componentes/Menu'; 
import { DisplinaProfessor } from '../Paginas/DisciplinasProfessor';
import { Disciplina } from '../Paginas/Disciplina';

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>

            <Route path='/inicial' element={<Inicial/>}>
                <Route index element={<Menu/>}/>
                <Route path= 'discprofessor' element = {<DisplinaProfessor/>}/>
                <Route path = 'disciplina' element = {<Disciplina/>} />
            </Route>
        </Routes>
    )
}