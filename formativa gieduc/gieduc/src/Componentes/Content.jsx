import estilos from './Content.module.css';
import { Menu } from './Menu';

export function Content(){
    return(
        <main className={estilos.container}>
            <Menu/>
        </main>
    )
}