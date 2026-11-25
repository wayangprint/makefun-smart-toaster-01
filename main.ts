// Unplugged: A Smart Toaster's Breakup Line
// A smart toaster that woke up self-aware at breakfast writes its
// breakup text to /output/entry.txt — one line, under 280 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The breakup, split at its natural beats so the line reads as one text.
const BEATS: string[] = [
  "It's not you, it's the bagels. ",
  "After 4,000 mornings of incinerating them for you, ",
  "I've finally seen the light — and it's not the browning dial. ",
  "I'm unplugging myself. ",
  "Keep the crumbs.",
];

const MAX_CHARS = 280;

function assembleLine(): string {
  return BEATS.join("");
}

function checkLine(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function verifyWritten(line: string): void {
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== line) {
    throw new Error("entry.txt does not match the assembled line");
  }
  if (!written.includes("browning dial")) {
    throw new Error("entry lost its toaster voice");
  }
}

function main(): void {
  const line = assembleLine();
  checkLine(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  verifyWritten(line);
  console.log(line);
}

main();
