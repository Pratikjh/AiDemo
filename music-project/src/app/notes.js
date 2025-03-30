"use client";

import { useState } from "react";   

import Canvas from "./canvas";

const scale = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

export default function Notes() {
    const[detectedNote, setDetectedNote] = useState("C"); // Default note
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Detected Note: {detectedNote}</p>
        <Canvas />
      </main>
    </div>
  );
}