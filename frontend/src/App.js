import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import ForumAndThread from "./pages/home"
import Navbar from "./components/Navbar";
import Forums from "./pages/Forums";
import Profile from "./pages/Profile/Profile";
function App() {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {user && <Navbar />} {/* Render Navbar only when user is authenticated */}
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user ? (
          <Route path="/" element={<ForumAndThread />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/login" />} />
        )}
        
        {user ? (
          <Route path="/forums" element={<Forums />} />
        ) : (
          <Route path="/forums" element={<Navigate replace to="/login" />} />
        )}
         {user ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
