import StudentList from "./components/studentList";
import AddStudent from "./components/addStudent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />}></Route>
        <Route path="/register" element={<AddStudent />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
