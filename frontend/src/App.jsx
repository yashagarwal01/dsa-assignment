import { useState } from "react";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="h-screen overflow-auto no-scrollbar bg-slate-100">
      {isAuth ? (
        <Dashboard
          onLogout={() => {
            localStorage.removeItem("token");
            setIsAuth(false);
          }}
        />
      ) : showSignup ? (
        <Signup
          onSignup={() => setIsAuth(true)}
          onSwitch={() => setShowSignup(false)}
        />
      ) : (
        <Login
          onLogin={() => setIsAuth(true)}
          onSwitch={() => setShowSignup(true)}
        />
      )}
    </div>
  );
}
