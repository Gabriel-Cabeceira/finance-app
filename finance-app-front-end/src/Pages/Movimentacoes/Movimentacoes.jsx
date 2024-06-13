import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container, Content, TitleHeaderDiv } from "./movimentacoes.styles";
import MovNavbar from "./Components/MovNavbar/MovNavbar";
import DespesasFixas from "./DespesasFixas/DespesasFixas";
import DespesasVariaveis from "./DespesasVariaveis/DespesasVariaveis";
import Planejamento from "./Planejamento/Planejamento";
import VisaoGeral from "./VisaoGeral/VisaoGeral";
import Remuneracoes from "./Remuneracoes/Remuneracoes";

const routeTitles = {
    "/movimentacoes/planejamento": {
        title: "Movimentações",
        subTitle: "Planejamento",
    },
    "/movimentacoes/despesas-fixas": {
        title: "Movimentações",
        subTitle: "Despesas Fixas",
    },
    "/movimentacoes/despesas-variaveis": {
        title: "Movimentações",
        subTitle: "Despesas Variáveis",
    },
    "/movimentacoes/visao-geral": {
        title: "Movimentações",
        subTitle: "Visão Geral",
    },
};

export default function Movimentacoes() {
    const location = useLocation();
    const [currentTitle, setCurrentTitle] = useState(
        routeTitles[location.pathname]?.title || "Movimentações"
    );
    const [currentSubTitle, setCurrentSubTitle] = useState(
        routeTitles[location.pathname]?.subTitle || ""
    );

    useEffect(() => {
        const route = location.pathname;
        const titleData = routeTitles[route];
        if (titleData) {
            setCurrentTitle(titleData.title);
            setCurrentSubTitle(titleData.subTitle);
        }
    }, [location.pathname]);

    return (
        <Container>
            <TitleHeaderDiv>
                <h1 className="title">{currentTitle}</h1>
                <h2 className="sub-title">{currentSubTitle}</h2>
            </TitleHeaderDiv>

            <Content>
                <MovNavbar />
                <Routes>
                    <Route path="/despesas-fixas" element={<DespesasFixas />} />
                    <Route
                        path="/despesas-variaveis"
                        element={<DespesasVariaveis />}
                    />
                    <Route path="/planejamento" element={<Planejamento />} />
                    <Route path="/remuneracoes" element={<Remuneracoes />} />
                    <Route path="/visao-geral" element={<VisaoGeral />} />
                </Routes>
            </Content>
        </Container>
    );
}
