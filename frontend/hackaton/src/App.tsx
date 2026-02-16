import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyRegister from "./pages/VerifyRegister";
import ForgotPassword from "./pages/ForgotPassword.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<VerifyRegister />} />
                <Route path="/forgotPassword" element={<ForgotPassword/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
