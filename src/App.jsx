import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { lazy, Suspense } from "react";

const CurrencyPage = lazy(() => import("./pages/Currency"));
const TransactionsPage = lazy(() => import("./pages/Transactions"));
const Analytics = lazy(() => import("./pages/Analytics"));

const App = () => {
  return (
    <div>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Analytics />} />
            <Route path="currency" element={<CurrencyPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
