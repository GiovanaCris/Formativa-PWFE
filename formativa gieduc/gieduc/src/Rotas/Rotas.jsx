import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login'; //  ../
import { Inicial } from '../Paginas/Inicial';
import { Menu } from '../Componentes/Menu';

export function Rotas(){
    return(
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/inicial' element={<Inicial/>}> //QUANDO NÃO FECHA QUER DIZER QUE POSSU UTILIZAR MAIS UMA ROTA
                <Route index element={<Menu/>}/>
            </Route>
        </Routes>
    )
}