import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login'; 
import { Inicial } from '../Paginas/Inicial';
import { Menu } from '../Componentes/Menu';

//QUANDO NÃO FECHA QUER DIZER QUE POSSU UTILIZAR MAIS UMA ROTA
export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Inicial/>}/>
            <Route path='/login' element={<Login/>}> 
                <Route index element={<Menu/>}/>
            </Route>
        </Routes>
    )
}