import { useState, useEffect } from 'react';
import CircleButton from '../component/CircleButton';

function Game() {
    const [inputPoint, setInputPoint] = useState(0);
    const [pointNext, setPointNext] = useState(1); 
    const [time, setTime] = useState(0);
    const [circles, setCircles] = useState([]);
    const [isRestart, setIsRestart] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [selectedPoints, setSelectedPoints] = useState([]);
    useEffect(() => {
        if (isRestart && !endGame) {  
            const timer = setInterval(() => {
                setTime((prev) => prev + 0.1);
            }, 100);
            return () => clearInterval(timer);
        }
    }, [isRestart, endGame]);

    const handleRestartGame = () => {
        if(!inputPoint){ alert("Vui lòng nhập Point!"); return}
        setCircles(createCircles(inputPoint));
        setTime(0);
        setIsRestart(true);
        setPointNext(1);
        setEndGame(false);
        setSelectedPoints([])
    };
    const createCircles = (Points) => {
        return Array.from({ length: Points }, (_, i) => ({
            id: i + 1,
            x: Math.random() * 250,
            y: Math.random() * 250,
        }));
    };
    const handleClickCircle = (id) => {
        if(endGame) { alert('Bạn đã thua!');return };
        if (id === pointNext) {
            setSelectedPoints(e=>[...e, id])
            setPointNext(pointNext + 1);
            setTimeout(() => {
                setCircles(prevCircles => prevCircles.filter(circle => circle.id !== id));
                if (id === inputPoint) { setEndGame(true); }
            }, 1000);
        } else { setEndGame(true); }
    };

    return (
        <div style={{textAlign:"start"}}>
           <h1 style={{ fontSize: "20px", color: endGame&&pointNext < inputPoint ? "red" :"#00a67d"  }}>
           {endGame? <div>{pointNext < inputPoint ? "GAME OVER" : "ALL CLEARED"}</div>: "LET'S PLAY"}
           </h1>
            <div style={{display:"flex"}}>
                <div style={{width:"30%"}}> Points:</div>
                <input onChange={(e) =>{setInputPoint(parseInt(e.target.value))}} type="text"/>
            </div>
            <div style={{display:"flex"}}> 
                <div style={{width:"30%"}}>Time: </div>  
                <div>  {time.toFixed(1)}s</div>
            </div>
            <button onClick={handleRestartGame} style={{outline:"none", margin:"10px 0",padding:"0 20px",border: '1px solid black', borderRadius:"2px"}}>Restart</button>
            <div style={{ position: 'relative', width: '300px', height: '300px', border: '1px solid black' }}>
                {circles?.map(circle => (
                    <CircleButton
                        key={circle.id}
                        id={circle.id}
                        x={circle.x}
                        y={circle.y}
                        active={selectedPoints?.includes(circle.id)}
                        onClick={handleClickCircle}
                    />
                ))}
            </div>
        </div>
    );
}
export default Game;
