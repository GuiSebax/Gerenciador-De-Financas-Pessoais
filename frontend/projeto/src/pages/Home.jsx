import React from 'react';
import { useAuthContext } from '../context/useAuthContext';
import BalanceChart from '../components/BalanceChart';
import TransactionSummary from '../components/TransactionSummary';
import GoalsProgress from '../components/GoalsProgress';

const Home = () => {
  const { auth } = useAuthContext(); // Pega o estado de autenticação
  const { user } = auth; // Pega o usuário autenticado
  
  return (
    <div className="min-h-screen flex flex-col">
      {user ? (
        <>
          {/* Dashboard para usuários logados */}
          <h1 className="text-3xl font-bold text-center mb-6 mt-4">Dashboard Financeiro</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Gráfico de Saldo */}
            <div className="bg-white p-4 rounded-xl shadow-2xl mx-3 border border-light-green-500">
              <BalanceChart />
              <p className="text-sm text-gray-600 mt-4">
                Este gráfico apresenta uma visão geral do seu saldo financeiro, incluindo receitas,
                despesas e economias. Use-o para acompanhar rapidamente sua saúde financeira.
              </p>
            </div>

            {/* Resumo de Transações */}
            <div className="bg-white p-4 rounded-xl shadow-2xl mx-3 border border-light-green-500">
              <TransactionSummary />
              <p className="text-sm text-gray-600 mt-4">
                Aqui você encontra um resumo das últimas transações realizadas. Isso ajuda a entender
                melhor seus hábitos financeiros e identificar áreas para ajustes.
              </p>
            </div>

            {/* Progresso de Metas */}
            <div className="bg-white p-4 rounded-xl shadow-2xl mx-3 border border-light-green-500">
              <GoalsProgress />
              <p className="text-sm text-gray-600 mt-4">
                Veja o progresso das suas metas financeiras. Monitore suas conquistas e planeje os
                próximos passos para alcançar seus objetivos.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mensagem de boas-vindas para visitantes */}
          <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Seja bem-vindo ao Finance Me!
            </h1>
            <p className="text-lg text-light-green-600">
              Controle suas finanças de forma simples e eficiente. Faça login ou registre-se para
              começar a gerenciar suas transações e metas.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
