import estilo from "./SobreNos.module.css";
import imgquemsomos from '../assets/imgquemsomos.png';
import imghistoria from '../assets/imghistoria.png';

export function SobreNos(){
    return(
        <section className={estilo.container}>
            <h1 className={estilo.titulo}>QUEM SOMOS?</h1>
            <section className={estilo.quemsomos}>
                <img className={estilo.imgquemsomos} src={imgquemsomos} alt="Imagem de representação da plataforma" />
                <p>
                    Somos uma plataforma que visa gerenciar de forma adequada funções que são realizadas nas escolas e em alguns casos como na 
                    reserva de uma sala pode dar até mesmo um certo conflito visto a alta demanda das salas. Somos a solução para esse e diversos
                    outros problemas enfrentados no cotidiano escolar!
                </p>
            </section>
            <h1 className={estilo.titulo}>NOSSA HISTÓRIA</h1>
            <section className={estilo.historia}>
                <p>
                    A GiEduc surgiu no ano de 2025 através de uma demanda escolar para projeto integrador da instituição SENAI "Roberto Mange"
                    da criadora do projeto "Giovana Cristina" estudante de Desenvolvimento de Sistemas | DS-16.
                    A demanda se constituia basicamente na criação de uma plataforma para uma gestão escolar assim como dito acima. Após
                    diversos desafios e uma vasta bagagem de aprendizado ela concluiu o projeto 💫.
                </p>
                 <img className={estilo.imghistoria} src={imghistoria} alt="Imagem de representação da plataforma" />
            </section>
        </section>
    )
}