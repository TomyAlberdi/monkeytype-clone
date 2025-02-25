import "./App.css";
import { Header } from "@/Components/Header";
import { Body } from "@/Components/Body";

function App() {
  return (
    <div className="App h-[100vh] w-[100vw] bg-n-bg text-n-sub-color flex flex-col justify-between items-center">
      <Header />
      <Body />
    </div>
  );
}

export default App;
