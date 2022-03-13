import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { UsersContainer } from "./users/users.container";

const Home = () => {
  return (
    <div className="app">
      <h1>Random Users</h1>
      <p>
        This is a test application and it uses ReactJS, scss for styling, axios
        for fetching the data and context to keep page number on state reload.
      </p>
      <UsersContainer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":page" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
