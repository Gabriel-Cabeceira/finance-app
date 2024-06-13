import express from 'express';
import cors from 'cors';

const lista = [
    // {
    //     id: 1,
    //     description: "Financiamento",
    //     date: "05/2024",
    //     subitems: [
    //         {
    //             id: 1,
    //             subDescription: "Financiamento",
    //             value: 600,
    //         },
    //     ],
    //     totalValue: 600,
    // },
    // {
    //     id: 2,
    //     description: "Condomínio",
    //     date: "06/2024",
    //     subitems: [
    //         {
    //             id: 2,
    //             subDescription: "Condomínio",
    //             value: 210.10,
    //         },
    //     ],
    //     totalValue: 210.10,
    // },
];

const variaveis = [
    // {
    //     id: 1,
    //     description: "Mercado",
    //     date: "05/2024",
    //     subitems: [
    //         {
    //             id: 1,
    //             subDescription: "Carne",
    //             value: 32.50,
    //         },
    //         {
    //             id: 2,
    //             subDescription: "Refrigerante",
    //             value: 10.00,
    //         },
    //     ],
    //     totalValue: 42.50,
    // },
    // {
    //     id: 2,
    //     description: "Restaurante",
    //     date: "06/2024",
    //     subitems: [
    //         {
    //             id: 3,
    //             subDescription: "Prato Gabriel",
    //             value: 32.50,
    //         },
    //         {
    //             id: 4,
    //             subDescription: "Prato Aline",
    //             value: 22.50,
    //         },
    //         {
    //             id: 5,
    //             subDescription: "Refrigerante",
    //             value: 10.00,
    //         },
    //     ],
    //     totalValue: 65.00,
    // }
];

const planejamento = [
    // {
    //     id: 1,
    //     description: "Metinha",
    //     date: "05/2024",
    //     subitems: [
    //         {
    //             id: 1,
    //             subDescription: "Cerveja Final de semana, dia 08/05",
    //             value: 25.00,
    //         }
    //     ],
    //     totalValue: 25.00,
    // },
    // {
    //     id: 2,
    //     description: "Meta",
    //     date: "06/2024",
    //     subitems: [
    //         {
    //             id: 2,
    //             subDescription: "Implanon",
    //             value: 100.00,
    //         }
    //     ],
    //     totalValue: 100.00,
    // }
];

const remuneracoes = [
    // {
    //     id: 1,
    //     description: "Salário",
    //     date: "05/2024",
    //     subitems: [
    //         {
    //             id: 1,
    //             subDescription: "Salário Gabriel",
    //             value: 1870.00,
    //         }
    //     ],
    //     totalValue: 1870.00,
    // }
];

const limites = [
    {
        id: 1,
        description: "fixas",
        limit: 75
    },
    {
        id: 2,
        description: "variaveis",
        limit: 10
    },
    {
        id: 3,
        description: "planejamento",
        limit: 15
    }
];








const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Função para formatar a data no padrão "MM/AAAA"
const formatDate = (date) => {
    const formattedDate = new Date(date);
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
    const year = formattedDate.getFullYear().toString(); // Obtém o ano no formato AAAA
    return `${month}/${year}`; // Retorna a data formatada no padrão "MM/AAAA"
};

// Endpoint GET para fornecer os dados
app.get('/api/despesasFixas', (req, res) => {
    const { date } = req.query; // Pega o parâmetro "date" da query
    const filteredData = lista.filter(item => item.date === date); // Filtra os dados pelo parâmetro "date"
    res.json(filteredData);
});

// Endpoint POST para adicionar despesas Fixas
app.post('/api/despesasFixas', (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        let { description, date, subitems } = req.body;

        // Formata a data no padrão "MM/AAAA"
        date = formatDate(date);

        // Cria um novo objeto com os dados recebidos
        const newItem = {
            id: lista.length + 1,
            description,
            date,
            subitems: subitems.map((item, index) => ({
                id: index + 1, // Gera um ID único para cada subItem
                ...item,
                value: parseFloat(item.value), // Certifica que o valor é numérico
            })),
            totalValue: subitems.reduce((total, item) => total + parseFloat(item.value), 0) // Garante que os valores são somados como números
        };

        // Adiciona o novo item à lista de despesas fixas
        lista.push(newItem);
        console.log(newItem);

        // Retorna o novo item adicionado como resposta
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Erro ao processar requisição POST:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});





// Endpoint GET para fornecer os dados
app.get('/api/despesasVariaveis', (req, res) => {
    const { date } = req.query; // Pega o parâmetro "date" da query
    const filteredData = variaveis.filter(item => item.date === date); // Filtra os dados pelo parâmetro "date"
    res.json(filteredData);
});

// Endpoint POST para adicionar despesas variáveis
app.post('/api/despesasVariaveis', (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        let { description, date, subitems } = req.body;

        // Formata a data no padrão "MM/AAAA"
        date = formatDate(date);

        // Cria um novo objeto com os dados recebidos
        const newItem = {
            id: variaveis.length + 1,
            description,
            date,
            subitems: subitems.map((item, index) => ({
                id: index + 1, // Gera um ID único para cada subItem
                ...item,
                value: parseFloat(item.value), // Certifica que o valor é numérico
            })),
            totalValue: subitems.reduce((total, item) => total + parseFloat(item.value), 0) // Garante que os valores são somados como números
        };

        // Adiciona o novo item à lista de despesas variáveis
        variaveis.push(newItem);
        console.log(newItem);

        // Retorna o novo item adicionado como resposta
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Erro ao processar requisição POST:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});





// Endpoint GET para fornecer os dados
app.get('/api/planejamento', (req, res) => {
    const { date } = req.query; // Pega o parâmetro "date" da query
    const filteredData = planejamento.filter(item => item.date === date); // Filtra os dados pelo parâmetro "date"
    res.json(filteredData);
});

// Endpoint POST para adicionar planejamento
app.post('/api/planejamento', (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        let { description, date, subitems } = req.body;

        // Formata a data no padrão "MM/AAAA"
        date = formatDate(date);

        // Cria um novo objeto com os dados recebidos
        const newItem = {
            id: planejamento.length + 1,
            description,
            date,
            subitems: subitems.map((item, index) => ({
                id: index + 1, // Gera um ID único para cada subItem
                ...item,
                value: parseFloat(item.value), // Certifica que o valor é numérico
            })),
            totalValue: subitems.reduce((total, item) => total + parseFloat(item.value), 0) // Garante que os valores são somados como números
        };

        // Adiciona o novo item à lista de planejamento
        planejamento.push(newItem);
        console.log(newItem);

        // Retorna o novo item adicionado como resposta
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Erro ao processar requisição POST:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});





// Endpoint GET para fornecer os dados
app.get('/api/remuneracoes', (req, res) => {
    const { date } = req.query; // Pega o parâmetro "date" da query
    const filteredData = remuneracoes.filter(item => item.date === date); // Filtra os dados pelo parâmetro "date"
    res.json(filteredData);
});

// Endpoint POST para adicionar planejamento
app.post('/api/remuneracoes', (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        let { description, date, subitems } = req.body;

        // Formata a data no padrão "MM/AAAA"
        date = formatDate(date);

        // Cria um novo objeto com os dados recebidos
        const newItem = {
            id: remuneracoes.length + 1,
            description,
            date,
            subitems: subitems.map((item, index) => ({
                id: index + 1, // Gera um ID único para cada subItem
                ...item,
                value: parseFloat(item.value), // Certifica que o valor é numérico
            })),
            totalValue: subitems.reduce((total, item) => total + parseFloat(item.value), 0) // Garante que os valores são somados como números
        };

        // Adiciona o novo item à lista de planejamento
        remuneracoes.push(newItem);
        console.log(newItem);

        // Retorna o novo item adicionado como resposta
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Erro ao processar requisição POST:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});





// Endpoint GET para fornecer os dados
app.get('/api/limites', (req, res) => {
    res.json(limites);
});

// Endpoint POST para adicionar despesas Fixas
app.post('/api/limites', (req, res) => {
    // try {
    //     // Extrai os dados do corpo da requisição
    //     let { description, date, subitems } = req.body;

    //     // Formata a data no padrão "MM/AAAA"
    //     date = formatDate(date);

    //     // Cria um novo objeto com os dados recebidos
    //     const newItem = {
    //         id: lista.length + 1,
    //         description,
    //         date,
    //         subitems: subitems.map((item, index) => ({
    //             id: index + 1, // Gera um ID único para cada subItem
    //             ...item,
    //             value: parseFloat(item.value), // Certifica que o valor é numérico
    //         })),
    //         totalValue: subitems.reduce((total, item) => total + parseFloat(item.value), 0) // Garante que os valores são somados como números
    //     };

    //     // Adiciona o novo item à lista de despesas fixas
    //     lista.push(newItem);
    //     console.log(newItem);

    //     // Retorna o novo item adicionado como resposta
    //     res.status(201).json(newItem);
    // } catch (error) {
    //     console.error('Erro ao processar requisição POST:', error);
    //     res.status(500).json({ message: 'Erro interno do servidor' });
    // }
});




// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
