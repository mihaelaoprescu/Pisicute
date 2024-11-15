import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProfilePage from "./pages/profile/profile";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/profile/:id" element={<ProfilePage></ProfilePage>} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
