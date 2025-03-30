"use client";

import { useEffect, useRef, useState } from "react";
import p5 from "p5";

export default function Canvas(note) {
    let canvasRef=useRef(null);
    const [color, setColor] = useState([0,255,0]); // Default color
    const canvasWidth = 800;
    const canvasHeight = 400;

    useEffect(() => {
        const sketch=(p) => {
            p.setup=()=>{
                p.createCanvas(canvasWidth,canvasHeight);
                p.clear();
            }
            p.draw=()=>{
                p.clear();
                let xPos = 0; // Default xPos value
                if(note){
                    xPos = mapNote(note.note);
                }
                p.fill(color);
                p.ellipse(xPos + 75, canvasHeight / 2, 100, 100); // Draw a circle at the mapped position
            }
        };
        const mapNote=(note)=>{
            const spacing=canvasWidth/13;
            const notePositions={ 
                C:spacing*0,
                "C#":spacing*1,
                D:spacing*2,
                "D#":spacing*3,
                E:spacing*4,
                F:spacing*5,
                "F#":spacing*6,
                G:spacing*7,
                "G#":spacing*8,
                A:spacing*9,
                "A#":spacing*10,
                B:spacing*11
            }
            return notePositions[note] || 0; // Default to 0 if note is not found
        };
        const canvas =new p5(sketch,canvasRef.current);
        return () => {
            canvas.remove(); // Cleanup the canvas when the component unmounts
        };
    },[note,color]); // Re-run the effect when note or color changes
    useEffect(() => {
        if(note){
            if(note.note === "C"){
                setColor([255,0,0]); // Red for C
            }else if(note.note === "D"){
                setColor([0,255,0]); // Green for D
            }else if(note.note === "E"){
                setColor([0,0,255]); // Blue for E
            }else if(note.note === "F"){
                setColor([255,255,0]); // Yellow for F
            }else if(note.note === "G"){        
                setColor([255,0,255]); // Magenta for G     
            }
        }
    },[note]); // Re-run the effect when note changes
    return <div ref={canvasRef}></div>;
}