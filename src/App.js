import "./App.css";
import MainComponent from "./Components/Main.component";
import MenuComponent from "./Components/Menu.component";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Routes/app.route";

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
