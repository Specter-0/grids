"use client"

import { useEffect, useRef, useState } from "react";


function genmap(rows, cols) {
    let map = []

    for (let col = 0; col < cols; col++) {
        let lrow = []
        for (let row = 0; row < rows; row++) {
            lrow.push(Math.floor(Math.random()*16777215).toString(16))
        }
        map.push(lrow)
    }

    return map
}

export default function Page() {
    const [map, setMap] = useState(genmap(40, 40))
    const [visibleMap, setVisibleMap] = useState(null)
    
    const [offset, _setOffset] = useState([0, 0]);
    const [offsetChange, setOffsetChange] = useState([0, 0])

    const [view, _setView] = useState([3, 2])
    const [viewChange, setViewChange] = useState([0, 0])
    
    const handleKeypress = (event) => {
        console.log("handled")
        switch (event.key) {
            case 'ArrowUp':
                setOffsetChange([0, -1])
                break;
    
            case 'ArrowDown':
                setOffsetChange([0, 1])
                break;
    
            case 'ArrowRight':
                setOffsetChange([1, 0])
                break;
    
            case 'ArrowLeft':
                setOffsetChange([-1, 0])
                break;

            case 'w':
                setViewChange([0, 1])
                break;
    
            case 's':
                setViewChange([0, -1])
                break;
    
            case 'a':
                setViewChange([-1, 0])
                break;
    
            case 'd':
                setViewChange([1, 0])
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
                    
        return () => {
            window.removeEventListener('keydown', handleKeypress);
        }
    }, [])

    useEffect(() => {
        _setView(view => {
            if (viewChange[0] + offset[0] + view[0] > map[0].length || viewChange[1] + offset[1] + view[1] > map.length || viewChange[0] + view[0] < 0 || viewChange[1] + view[1] < 0) {
                return view
            }
            
            return [view[0] + viewChange[0], view[1] + viewChange[1]]
        })

        _setOffset(offset => {
            if (offsetChange[0] + offset[0] + view[0] > map[0].length || offsetChange[1] + offset[1] + view[1] > map.length || offsetChange[0] + offset[0] < 0 || offsetChange[1] + offset[1] < 0) {
                return offset
            }

            return [offset[0] + offsetChange[0], offset[1] + offsetChange[1]]
        })

        setOffsetChange([0, 0])
        setViewChange([0, 0])
    }, [viewChange, offsetChange])

    useEffect(() => {
        setVisibleMap(() => {
            let vismap = []

            for (let y = offset[1]; y < view[1] + offset[1]; y++) {
                let row = []
                for (let x = offset[0]; x < view[0] + offset[0]; x++) {
                    row.push(map[y][x])
                }
                vismap.push(row)
            }

            return vismap
        })
    }, [view, offset])

    return (
        <main className="relative w-screen h-screen overflow-auto text-white flex flex-col items-center justify-center">
            { visibleMap && 
                visibleMap.map((lx, i) => {
                    return (
                        <div key={i} className="w-fit flex">
                            {lx.map((content, j) => {
                                return (
                                    <Box key={j} content={content} />
                                )
                            })}
                        </div>
                    )
                })
            }
        </main>
    );
}

function Box({content}) {
    return (
        <div className="border-4 flex items-center justify-center text-2xl font-extrabold tracking-widest"
            style={{ width: `${75}px`, height: `${75}px`, background : `#${content}`, borderColor: `#${content}`}}
        >
        </div>
    )
}