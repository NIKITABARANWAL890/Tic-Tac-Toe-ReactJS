import { useState } from "react";
import Card from "../Cards/Card";
import './Grid.css';
import { use } from "react";
import isWinner from "../../Helpers/checkWinner";

function Grid ({numberOfCards}) {

    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    function play(index){
        if(turn == true){
            board[index]="O";
        }else{
            board[index]="X";
        }
        const win = isWinner(board, turn? "O":"X");
        if(win){
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function reset(){
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberOfCards).fill(""));
    }

    return(
        <div className="grid-wrapper">
        {
            winner && (
                <>
                <h1 className="turn-highlight">🎉Winner is: {winner}🎉</h1>
                </>
            )
        }
        <h1 className="turn-highlight">Current turn: {(turn)?'O':'X'}</h1>
        <div className="grid">
        {board.map((el, index) => <Card gameEnd={winner?true:false} key={index} onPlay={play} player={el} index={index}/>)}
        </div>
        <button className="reset" onClick={reset}>Reset Game</button>
        </div>
    );

}
export default Grid;