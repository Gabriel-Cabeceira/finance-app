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
import { format } from 'date-fns';

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
        let formData;

        const formattedDate = format(new Date(mainDate), 'dd/MM/yyyy');

        switch (type) {
            case 'income':
                formData = {
                    income_description: mainDescription,
                    income_date: formattedDate,
                    income_items: subItems.map(item => ({
                        income_item_description: item.subDescription,
                        income_item_value: item.value
                    }))
                };
                break;
            case 'planning':
                formData = {
                    planning_description: mainDescription,
                    planning_date: formattedDate,
                    planning_items: subItems.map(item => ({
                        planning_item_description: item.subDescription,
                        planning_item_value: item.value
                    }))
                };
                break;
            case 'variable_expense':
                formData = {
                    variable_expense_description: mainDescription,
                    variable_expense_date: formattedDate,
                    variable_expense_items: subItems.map(item => ({
                        variable_expense_item_description: item.subDescription,
                        variable_expense_item_value: item.value
                    }))
                };
                break;
            case 'fixed_expense':
                formData = {
                    fixed_expense_description: mainDescription,
                    fixed_expense_date: formattedDate,
                    fixed_expense_items: subItems.map(item => ({
                        fixed_expense_item_description: item.subDescription,
                        fixed_expense_item_value: item.value
                    }))
                };
                break;
            default:
                formData = {
                    description: mainDescription,
                    date: formattedDate,
                    subitems: subItems
                };
        }

        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
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
                    <Button
                        onClick={handleAddSubItem}
                        colorScheme="blue"
                        mt={4}
                    >
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
            </ModalContent>
        </Modal>
    );
}
