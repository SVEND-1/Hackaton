import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyRegister from "./pages/VerifyRegister";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import VerifyResetCode from "./pages/VerifyResetCode.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Chat from "./pages/Chat.tsx";
import Profile from "./pages/Profile.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<VerifyRegister />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/reset-verify" element={<VerifyResetCode />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />}/>
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
