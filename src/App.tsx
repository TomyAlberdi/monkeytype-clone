import "./App.css";
import { Header } from "@/Components/Header";
import { Body } from "@/Components/Body";
import { Footer } from "@/Components/Footer";

function App() {
  return (
    <div className="App h-[100vh] w-[100vw] bg-n-bg text-n-sub-color">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
