import { Keyboard } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-1/5 flex justify-center items-center">
      <h1 className="text-4xl font-bold flex items-center gap-5">
        <Keyboard size={45} />
        Monkeytype Clone
      </h1>
    </header>
  );
};
