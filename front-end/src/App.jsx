import "./App.css";
import logo from "./logo.png";
import { version } from "../package.json";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <p>Welcome to the Message Broadcast Code Exercise,</p>

      <p>Good luck!</p>

      <small style={{ position: "absolute", bottom: "10px" }}>v{version}</small>
    </header>
  </div>
);

export default App;
