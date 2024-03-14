"use client"

import { useEffect, useState } from "react";

export default function Page() {
    const [zoom, setZoom] = useState(1);
    
    
    const handleKeypress = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                setZoom(zoom => zoom + 0.1);
                break;
    
            case 'ArrowDown':
                setZoom(zoom => (zoom - 0.1));
                break;
    
            case 'ArrowLeft':
                break;
    
            case 'ArrowRight':
                break;
            
            default:
                return
        }
    
        event.preventDefault();
    }

    useEffect(() => {
        if (window) {
            window.addEventListener('keydown', handleKeypress);
        }
        
        alert("arrow up and down")
    }, [])

    useEffect(() => {
        console.log(zoom)

        if (zoom < 0.1) {
            setZoom(0.1)
        }
    }, [zoom])

    return (
        <main className="relative min-w-screen min-h-screen overflow-auto text-white flex items-center justify-center">
            <div className="w-full h-full grid"
                style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${100 * zoom}px, 1fr))`}}
            >
                {
                    Array(144).fill(0).map((_, i) => (
                        <Box key={i} zoom={zoom} />
                    ))
                }
            </div>
        </main>
  );
}

function Box({zoom}) {
    return (
        <div className="bg-red-500 border-8 border-red-600 flex items-center justify-center text-2xl font-extrabold tracking-widest"
            style={{ width: `${100 * zoom}px`, height: `${100 * zoom}px`}}
        >
            {(100 * zoom).toFixed(0)}
        </div>
    )
}