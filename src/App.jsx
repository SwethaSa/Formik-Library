// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import Dashboard from "./Pages/Dashboard";
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";
import View from "./Pages/View";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/book/:id" element={<View />} />
        </Routes>
      </Container>
    </Router>
    //
  );
}

export default App;
