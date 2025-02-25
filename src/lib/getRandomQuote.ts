import { Quote } from "@/Components/Body";

export async function getRandomQuote(retries: number = 5): Promise<Quote> {
  // Fetch the JSON file
  const response = await fetch("/english.json");
  const { quotes, groups } = await response.json();

  // Select a random group
  const randomGroup = groups[Math.floor(Math.random() * groups.length)];
  const [start, end] = randomGroup;

  // Select a random index within the group range
  const randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;

  // Fetch the quote
  const quote = quotes[randomIndex];

  if (!quote) {
    return getRandomQuote(retries - 1);
  }

  return (
    quote || {
      text: "Keep typing, stay focused!",
      source: "Default Quote",
      length: 28,
      id: -1,
    }
  );
}
