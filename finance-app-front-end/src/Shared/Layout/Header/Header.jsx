import { Nav } from "./header.styles";
import { Avatar, Center } from '@chakra-ui/react';



export default function Header() {
  return (
    <Nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand title" href="#">Gestão Financeira</a>
        <div>
          <div className="navbar-collapse" id="navbarSupportedContent">

          <Center>
            {/* Foto de Perfil */}
            <Avatar
              className="avatar"
              name='Gabriel Cabeceira'
              src='https://avatars.githubusercontent.com/u/108899485?s=400&u=19f87fe0fd5755de98616b4268179f9e5eecd992&v=4'
            />

            <div className="nav-item dropdown">
              {/* Nome e Botão de Menu */}
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="navbar-collapse collapse">
                  Gabriel Cabeceira
                </span>
              </a>
                  
              <ul className="dropdown-menu menu-items">
                <li><a className="dropdown-item" href="#">Preferências</a></li>
                <li><a className="dropdown-item" href="#">Configurações da Conta</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="#">Sair</a></li>
              </ul>
            </div>

            </Center>
          </div>
        </div>
      </div>
    </Nav>
  )
}
