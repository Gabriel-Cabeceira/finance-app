import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from './movNavbar.styles';

export default function MovNavbar() {
    const location = useLocation();

    const buttonsList = [
        {
            id: 1,
            name: 'Remunerações',
            link: '/movimentacoes/remuneracoes'
        },
        {
            id: 2,
            name: 'Planejamento',
            link: '/movimentacoes/planejamento'
        },
        {
            id: 3,
            name: 'Despesas Fixas',
            link: '/movimentacoes/despesas-fixas'
        },
        {
            id: 4,
            name: 'Despesas Variáveis',
            link: '/movimentacoes/despesas-variaveis'
        },
        {
            id: 5,
            name: 'Visão Geral',
            link: '/movimentacoes/visao-geral'
        }
    ];

    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const activeButton = buttonsList.find(button => button.link === location.pathname);
        if (activeButton) {
            setActiveId(activeButton.id);
        }
    }, [location.pathname, buttonsList]);

    const handleItemClick = (id) => {
        setActiveId(id);
    };

    return (
        <Container>
            <ul className='buttons-list'>
                {buttonsList.map((button) => (
                    <li 
                        key={button.id} 
                        className={`list-items ${activeId === button.id ? 'active' : ''}`}
                        onClick={() => handleItemClick(button.id)}
                    >
                        <a className='link-list-items' href={button.link}>{button.name}</a>
                    </li>
                ))}
            </ul>
        </Container>
    );
}
