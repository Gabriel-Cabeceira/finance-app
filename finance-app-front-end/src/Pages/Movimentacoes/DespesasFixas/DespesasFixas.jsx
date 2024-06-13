import { useState, useEffect } from "react";
import AddButton from "../Components/AddButton/AddButton";
import Container from "../Components/Container/Container";
import { Divisor, LoadContainer, Main, Resume } from "./despsasFixas.styles";
import MonthCarousel from "../Components/MonthCarroussel/MonthCarroussel";
import Accordion from "../Components/Accordion/Accordion";
import { CircularProgress } from '@chakra-ui/react';
import { red } from "../../../Shared/Styles/colorScheme";
import { apiUrl } from "../../../Services/endpoints";
import ModalForm from "../Components/ModalForm/ModalForm";
import ResumeAsside from "../Components/ResumeAsside/ResumeAsside";

export default function DespesasFixas() {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async (date) => {
        try {
            const response = await fetch(`${apiUrl}/api/fixedExpense?date=${date}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    useEffect(() => {
        const formattedDate = `${(currentMonthIndex + 1).toString().padStart(2, '0')}/${currentYear}`;
        fetchData(formattedDate);
    }, [currentMonthIndex, currentYear]);

    const currencyFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch(`${apiUrl}/api/fixedExpense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                handleCloseModal();
                fetchData(`${(currentMonthIndex + 1).toString().padStart(2, '0')}/${currentYear}`);
            } else {
                console.error('Erro ao enviar os dados para a API:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar os dados para a API:', error);
        }
    };

    return (
        <Container>
            <Divisor>
                <AddButton title="Adicionar Despesa Fixa" onClick={handleOpenModal} />
                <MonthCarousel
                    currentMonthIndex={currentMonthIndex}
                    setCurrentMonthIndex={setCurrentMonthIndex}
                    currentYear={currentYear}
                    setCurrentYear={setCurrentYear}
                />
            </Divisor>

            <Divisor>
                <Main>
                    {data !== null ? (
                        data.map((item) => (
                            <Accordion
                                key={item.id}
                                id={item.id}
                                description={item.description}
                                date={item.date}
                                totalValue={currencyFormat.format(item.totalValue)}
                                subitems={item.subitems}
                            />
                        ))
                    ) : (
                        <LoadContainer>
                            <CircularProgress isIndeterminate color={red} thickness="3px" />
                        </LoadContainer>
                    )}
                </Main>

                <Resume>
                    <ResumeAsside currentMonthIndex={currentMonthIndex} />
                </Resume>
            </Divisor>

            <ModalForm 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSubmit={handleSubmit}
                type='fixed_expense'
                title="Adicionar Despesa Fixa" 
            />
        </Container>
    );
}
