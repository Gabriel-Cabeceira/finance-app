import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import styled from "styled-components";
import { format } from 'date-fns';

// Styled component for ModalContent
const StyledModalContent = styled(ModalContent)`
    @media (max-width: 600px) {
        margin: 2em;
    }
`;

export default function ModalForm({ isOpen, onClose, onSubmit, title, type }) {
    const [mainDescription, setMainDescription] = useState("");
    const [mainDate, setMainDate] = useState("");
    const [subItems, setSubItems] = useState([{ subDescription: "", value: "" }]);

    const handleAddSubItem = () => {
        setSubItems([...subItems, { subDescription: "", value: "" }]);
    };

    const handleInputChange = (index, field, value) => {
        const newSubItems = [...subItems];
        newSubItems[index][field] = value;
        setSubItems(newSubItems);
    };

    const handleSubmit = () => {
        const formattedDate = format(new Date(mainDate), 'dd/MM/yyyy');

        const formData = {
            [`${type}_description`]: mainDescription,
            [`${type}_date`]: formattedDate,
            [`${type}_items`]: subItems.map(item => ({
                [`${type}_item_description`]: item.subDescription,
                [`${type}_item_value`]: item.value
            }))
        };

        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <StyledModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Descrição (Principal)</FormLabel>
                        <Input
                            type="text"
                            value={mainDescription}
                            onChange={(e) => setMainDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Data</FormLabel>
                        <Input
                            type="date"
                            value={mainDate}
                            onChange={(e) => setMainDate(e.target.value)}
                        />
                    </FormControl>
                    <Box mt={4}>
                        {subItems.map((item, index) => (
                            <Box key={index} mb={4}>
                                <FormControl>
                                    <FormLabel>Descrição do Subitem</FormLabel>
                                    <Input
                                        type="text"
                                        value={item.subDescription}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "subDescription",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormControl mt={2}>
                                    <FormLabel>Valor do Subitem</FormLabel>
                                    <Input
                                        type="number"
                                        value={item.value}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                            </Box>
                        ))}
                    </Box>
                    <Button onClick={handleAddSubItem} colorScheme="blue" mt={4}>
                        Adicionar Subitem
                    </Button>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Salvar
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </StyledModalContent>
        </Modal>
    );
}
