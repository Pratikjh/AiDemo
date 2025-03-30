"use client";

import { useRef, useState } from "react";


export default function Canvas(note) {
    let canvasref=useRef(null);
    const [color, setColor] = useState([0,255,0]); // Default color
    const canvasWidth = 800;
    const canvasHeight = 400;

    return <div ref={canvasref}></div>;
}