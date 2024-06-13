import { useEffect, useState } from "react";
import {
    Title,
    Divisor,
    RedLine,
    SalaryValue,
    SpendingValue,
    ReloadButton,
    TitleDivisor,
    FooterDivisor,
    Balance,
} from "./resume.styles";
import { CircularProgress } from "@chakra-ui/react";
import { IoReloadSharp } from "react-icons/io5";
import { red, green } from "../../../../Shared/Styles/colorScheme";
import { apiUrl } from "../../../../Services/endpoints";
import ProgressWithMarker from "../ProgressWithMaker/ProgressWithMaker";

export default function ResumeAsside({ currentMonthIndex }) {
    const [remuneration, setRemunaration] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const [plan, setPlan] = useState(null);
    const [planLimit, setPlanLimit] = useState(null);

    const [fixedSpending, setFixedSpending] = useState(null);
    const [fixedSpendingLimit, setFixedSpendingLimit] = useState(null);

    const [variableSpending, setVariableSpending] = useState(null);
    const [variableSpendingLimit, setVariableSpendingLimit] = useState(null);

    const [balance, setBalance] = useState(null);

    const currencyFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const handleSum = (array) => {
        return array.reduce(
            (acc, item) => acc + parseFloat(item.totalValue),
            0
        );
    };

    const fetchData = async (endpoint, setter) => {
        const formattedDate = `${(currentMonthIndex + 1)
            .toString()
            .padStart(2, "0")}/${currentYear}`;
        try {
            const response = await fetch(
                `${apiUrl}/api/${endpoint}?date=${formattedDate}`
            );
            const result = await response.json();
            const total = handleSum(result);
            setter(total);
        } catch (error) {
            console.error(
                `Erro ao buscar dados da API para ${endpoint}:`,
                error
            );
        }
    };

    const fetchLimits = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/limits`);
            const result = await response.json();

            // Limite de despesas Fixas
            setFixedSpendingLimit(result[0].limit);

            // Limite de despesas variáveis
            setVariableSpendingLimit(result[1].limit);

            // Limite de planejamento
            setPlanLimit(result[2].limit);
        } catch (error) {
            console.error("Erro ao buscar limite de planejamento:", error);
        }
    };

    const calculateBalance = async () => {
        if (
            remuneration !== null &&
            plan !== null &&
            fixedSpending !== null &&
            variableSpending !== null
        ) {
            const balance =
                remuneration - (plan + fixedSpending + variableSpending);
            setBalance(balance);
        }
    };

    useEffect(() => {
        fetchData("incomes", setRemunaration);
        fetchData("planning", setPlan);
        fetchData("fixedExpense", setFixedSpending);
        fetchData("variableExpense", setVariableSpending);
        fetchLimits();
    }, [currentMonthIndex, currentYear]);

    useEffect(() => {
        calculateBalance();
    }, [remuneration, plan, fixedSpending, variableSpending]);

    const calculateProgressValue = (remuneration, spent) => {
        const numericAmount = parseFloat(remuneration);

        if (remuneration) {
            return (spent * 100) / numericAmount;
        } else {
            return 0;
        }
    };

    const handleReload = () => {
        fetchData("incomes", setRemunaration);
        fetchData("planning", setPlan);
        fetchData("fixedExpense", setFixedSpending);
        fetchData("variableExpense", setVariableSpending);
        calculateBalance();
        fetchLimits();
    };

    return (
        <div>
            <TitleDivisor>
                <Title>Resumo:</Title>
                <ReloadButton onClick={handleReload}>
                    <IoReloadSharp />
                </ReloadButton>
            </TitleDivisor>

            <RedLine />

            <Divisor>
                <h2 className="salary-title">Remuneração total:</h2>
                {remuneration !== null ? (
                    <SalaryValue>
                        {currencyFormat.format(remuneration)}
                    </SalaryValue>
                ) : (
                    <CircularProgress size="1em" isIndeterminate color={red} />
                )}
            </Divisor>



            <Divisor>
                <h2 className="salary-title">Planejamento:</h2>
                {plan !== null ? (
                    <SpendingValue>{currencyFormat.format(plan)}</SpendingValue>
                ) : (
                    <CircularProgress size="1em" isIndeterminate color={red} />
                )}
            </Divisor>
            {plan !== null && planLimit !== null && (
                <ProgressWithMarker
                    value={calculateProgressValue(remuneration, plan)}
                    limit={planLimit}
                />
            )}



            <Divisor>
                <h2 className="salary-title">Despesas Fixas:</h2>
                {fixedSpending !== null ? (
                    <SpendingValue>
                        {currencyFormat.format(fixedSpending)}
                    </SpendingValue>
                ) : (
                    <CircularProgress size="1em" isIndeterminate color={red} />
                )}
            </Divisor>
            {fixedSpending !== null && fixedSpendingLimit !== null && (
                <ProgressWithMarker
                    value={calculateProgressValue(remuneration, fixedSpending)}
                    limit={fixedSpendingLimit}
                />
            )}



            <Divisor>
                <h2 className="salary-title">Despesas Variáveis:</h2>
                {variableSpending !== null ? (
                    <SpendingValue>
                        {currencyFormat.format(variableSpending)}
                    </SpendingValue>
                ) : (
                    <CircularProgress size="1em" isIndeterminate color={red} />
                )}
            </Divisor>
            {variableSpending !== null && variableSpendingLimit !== null && (
                <ProgressWithMarker
                    value={calculateProgressValue(
                        remuneration,
                        variableSpending
                    )}
                    limit={variableSpendingLimit}
                />
            )}



            <FooterDivisor>
                <h2 className="salary-footer">Saldo:</h2>
                {balance !== null ? (
                    <Balance style={{ color: balance >= 0 ? green : red }}>
                        {currencyFormat.format(balance)}
                    </Balance>
                ) : (
                    <CircularProgress size="1.5em" thickness='2px' isIndeterminate color={red} />
                )}
            </FooterDivisor>
        </div>
    );
}
