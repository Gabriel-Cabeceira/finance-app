import React, { useState } from "react";
import { AccordionDiv, Button, List, Spans } from "./accordion.styles";

export default function Accordion({ id, description, date, totalValue, subitems }) {

    // Funcção para converter para moeda
    const currencyFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return (
        <AccordionDiv className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <Button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#panelsStayOpen-collapse${id}`}
                        aria-expanded="false"
                        aria-controls={`panelsStayOpen-collapse${id}`}
                    >
                        <div className="buttonInfo">
                            <Spans>{description}</Spans>
                            <Spans>{date}</Spans>
                            <Spans>{totalValue}</Spans>
                        </div>
                    </Button>
                </h2>
                <div
                    id={`panelsStayOpen-collapse${id}`}
                    className="accordion-collapse collapse"
                >
                    <div className="accordion-body">
                        <List>
                            {subitems.map((subitem) => (
                                <li key={subitem.id}>
                                    <div className="list-item-content">
                                        <h1>{subitem.subDescription}</h1>
                                        <span className="dash-divisor">
                                            ---
                                        </span>
                                        <p>{currencyFormat.format(subitem.value)}</p>
                                    </div>
                                </li>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        </AccordionDiv>
    );
}
