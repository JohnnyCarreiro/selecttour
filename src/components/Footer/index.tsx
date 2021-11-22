import { Container } from './styles'

export const Footer:React.FC = () => {
  return (
    <Container>
      <div className="container wrapper">
        <div className="logo">
          <strong>Select Tour</strong><small> Viagens</small>
        </div>
        <div className="contact">
          <p><a href="mailto:contato@selecttour.com.br">contato@selecttourviagens.com.br</a></p>
        </div>
        <div className="nav">
          <div>
            <ul>
              <li className="nav-link">
                <a href="#home"><p>Inicio</p></a>
              </li>
              <li className="nav-link">
                <a href="#about"><p>Sobre</p></a>
              </li>
              <li className="nav-link">
                <a href="#how-we-work"><p>Voos</p></a>
              </li>
              <li className="nav-link">
                <a href="#how-we-work"><p>Hoteis</p></a>
              </li>
              <li className="nav-link">
                <a href="#top-packages"><p>Pacotes</p></a>
              </li>
              <li className="nav-link">
                <a href="#contact"><p>Contato</p></a>
              </li>
              <li className="nav-link">
                <a href="/blog"><p>Blog</p></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}

