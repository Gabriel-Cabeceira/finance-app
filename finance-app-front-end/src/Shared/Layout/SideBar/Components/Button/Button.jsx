;import { Link } from 'react-router-dom';
import { ButtonDiv, Container } from "./button.styles";

export default function Button({ description, link, icon }) {
  return (
    <Container>
      <ButtonDiv>
        <Link className='button' to={link}>
          {icon}
          {description}
        </Link>
      </ButtonDiv>
    </Container>
  );
}
