import { getRandomQuote } from "@/lib/getRandomQuote";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Quote {
  text: string;
  source: string;
  length: number;
  id: number;
}

export const Body = () => {
  const [Quote, setQuote] = useState<Quote | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null); // Reference to input

  async function fetchNewQuote() {
    const randomQuote = await getRandomQuote();
    setQuote(randomQuote);
    setWords(randomQuote.text.split(" ")); // Split quote into words
    setTypedWords([]); // Reset typed words
    setCurrentWordIndex(0); // Reset position
    setInput("");
  }

  useEffect(() => {
    fetchNewQuote();
  }, []);

  useEffect(() => {
    if (isActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsActive(false);
      setShowResults(true);
    }
  }, [isActive, timer]);

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " ") {
      e.preventDefault(); // Prevent space from affecting the input field

      if (input.trim() === words[currentWordIndex]) {
        setTypedWords([...typedWords, input.trim()]); // Save correct word
        setCurrentWordIndex(currentWordIndex + 1); // Move to next word
        setInput(""); // Reset input field
      }
    } else if (
      e.key === "Backspace" &&
      input.length === 0 &&
      currentWordIndex > 0
    ) {
      e.preventDefault(); // Prevent backspace from affecting previous words
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isActive) setIsActive(true); // Start timer on first keypress
    setInput(e.target.value);
  }

  function handleRetry() {
    setTimer(60);
    setIsActive(false);
    setShowResults(false);
    fetchNewQuote();
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  if (!Quote) {
    return (
      <div className="h-4/5 flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="h-4/5 flex flex-col justify-center items-center w-4/5">
      <div className="flex flex-col justify-center items-center gap-10 h-2/3">
        <h3 className="text-4xl">{timer}s</h3>
        <p className="text-2xl/10 text-center flex flex-wrap justify-center items-center">
          {words.map((word, i) => (
            <span key={i} className="mr-2">
              {word.split("").map((char, j) => {
                let className = "text-n-sub-color";
                if (i < currentWordIndex) {
                  className = "text-n-error-color";
                } else if (i === currentWordIndex) {
                  className =
                    j < input.length
                      ? input[j] === char
                        ? "text-n-error-color"
                        : "text-n-main"
                      : "text-n-sub-color";
                }
                return (
                  <span key={j} className={className}>
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
        <h3 className="text-xl">{Quote.source}</h3>
      </div>
      <input
        ref={inputRef} // Attach ref to input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="absolute opacity-0"
        autoFocus
      />
      <div className="h-1/3 flex flex-col justify-center items-center gap-10">
        <div
          className="retryContainer cursor-pointer bg-n-sub-color text-n-bg p-2 rounded-xl"
          onClick={handleRetry}
        >
          <RotateCcw size={35} />
        </div>
      </div>
    </main>
  );
};
