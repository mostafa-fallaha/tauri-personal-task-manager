export default function getFirst4Words(inputString: string): string {
  const words = inputString.split(" ");

  // Take the first 4 words and join them back into a string
  const firstFourWords = words.slice(0, 4).join(" ");

  return firstFourWords;
}
