import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './pages/shared/Layout';
import ListPage from "./pages/ListPage";
import AddProductsPage from "./pages/AddProductsPage";
import SingularProduct from "./pages/SingularProduct";
import MainPage from "./pages/MainPage";

// const Layout = React.lazy(() => import('./pages/shared/Layout'))
// const MainPage = React.lazy(() => import('./pages/MainPage'))
// const AddProductsPage = React.lazy(() => import('./pages/AddProductsPage'))
// const SingularProduct = React.lazy(() => import('./pages/SingularProduct'))
// const ListPage = React.lazy(() => import('./pages/ListPage'))

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="add" element={<AddProductsPage />}></Route>
          <Route path="list" element={<ListPage />}></Route>
          <Route path="list/:productId" element={<SingularProduct />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
