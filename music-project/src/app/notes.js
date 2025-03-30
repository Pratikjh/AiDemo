"use client";

import { useEffect, useState } from "react";   
import dynamic from "next/dynamic";
import pitchDetection from "./utils/pitchDetection";

const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

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
let audioContext;
let pitch;
let stream;
export default function Notes() {
    const[detectedNote, setDetectedNote] = useState("C"); // Default note
    useEffect(() => {
      const setup=async () => {
        audioContext= new AudioContext();
        stream = await navigator.mediaDevices.getUserMedia({ audio: true , video: false});
        startPitch(stream, audioContext);
      };
      setup();
    },[]); 

    const startPitch= ( stream, audioContext) => {
      startAudioContext();
      const modelLoaded = () => {
        getPitch();
      };

      if (audioContext) {
        pitch = pitchDetection(
          "./model/",
          audioContext,
          stream,
          modelLoaded
        );

        if (!pitch) {
          console.error("Pitch detection initialization failed.");
        }
      } else {
        console.error("AudioContext or mic not available");
      }
      
    };

    const getPitch= () => {

      pitch.getPitch((_, frequency) => {
        if(frequency){
          console.log(`frequency ${frequency}`);
          let midiNum=freqToMidi(frequency);
          const note=scale[midiNum % 12];
          console.log(`Note ${note}`);
          setDetectedNote(note);
        }
        getPitch();
      });
    };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Detected Note: {detectedNote}</p>
        <Canvas note={detectedNote}/>
      </main>
    </div>
  );
}

function startAudioContext(){
  if(audioContext){
    audioContext.resume()
    }
  else{
    audioContext = new AudioContext();
  }
  }

  function freqToMidi(f){
    const mathlog2=Math.log(f/440) / Math.log(2);
    const m=Math.round(12 * mathlog2 )+ 69;
    return m;
  }
