import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./Shared/Layout/Layout";
import Movimentacoes from "./Pages/Movimentacoes/Movimentacoes";
import LoginAdmin from "./Pages/Login/Login"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas que não possuem o Layout principal */}
        <Route path='/login' element={<LoginAdmin />} />

        {/* Envolve todas as rotas que incluem o Layout principal */}
        <Route path='/*' element={
          <Layout>
            <Routes>
              {/* Rota padrão para redirecionar para 'Despesas Fixas' */}
              <Route path='/' element={<Navigate to='/movimentacoes/despesas-fixas' />} />
              <Route path='/movimentacoes' element={<Navigate to='/movimentacoes/despesas-fixas' />} />
              <Route path='/movimentacoes/*' element={<Movimentacoes />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
