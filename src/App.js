import "./styles.css";
import Navbar from "./components/Navbar";
import Bg from "./components/Banner";
import Card from "./components/CardBanner";
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Bg />
      <Card />
    </div>
  );
}
