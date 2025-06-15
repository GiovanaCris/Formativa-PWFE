import estilo from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
    return (
        <footer className={estilo.container}>
            <div className={estilo.content_footer}>
                <h1 className={estilo.nome_logo}>GiEduc</h1>

                <div className={estilo.icones}>
                    <a
                        href="https://www.instagram.com/accounts/login/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={estilo.icone}>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>

                    <a
                        href="https://www.linkedin.com/login/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={estilo.icone}>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>

                    <a
                        href="https://www.facebook.com/login/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={estilo.icone}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>

                    <a
                        href="https://www.youtube.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={estilo.icone}>
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>

                    <a
                        href="https://www.tiktok.com/login/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={estilo.icone}>
                        <FontAwesomeIcon icon={faTiktok} />
                    </a>
                </div>
            </div>
            <aside className={estilo.copyright}>
                    <p>&copy; <strong>2025</strong> GiEduc. Todos os direitos reservados.</p>
            </aside>
        </footer>
    );
}
