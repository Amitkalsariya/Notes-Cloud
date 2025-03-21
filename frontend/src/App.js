import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Mynotes from "./components/pages/Mynotes/Mynotes";
import LandingPage from './components/pages/LandingPage/LandingPage';
import LoginPage from './components/LoginScreen/LoginPage';
import SignupPage from './components/SignupScreen/SignupPage';
import CreateNote from './components/CreateNote/CreateNote';
import SingleNote from './components/CreateNote/SingleNote';
import Profile from './components/Profile/Profile';

const App = () => {
  const [search, setSearch] = useState(""); // ✅ Moved inside function

  return (
    <>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main>
          <Routes> {/* ✅ Routes should wrap Route components */}
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/note/:id" element={<SingleNote />} />
            <Route path="/mynotes" element={<Mynotes search={search} />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
