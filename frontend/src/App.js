import "./App.css";
import ShopPage from "./components/shopPage/ShopPage";
import Nav from "./components/navBar/Nav";
import { Outlet } from "react-router-dom";
import CardsGrid from "./components/CardsGrid";
import Footer from "./components/Footer";
import { AuthProvider } from './AuthContext'; // Import Context Provider

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <Outlet />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
