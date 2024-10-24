import { useState, useEffect, useRef } from 'react';
import "../App.css";
import Navbar from '../components/Navbar';

const GamePage = () => {
    const [game, setGame] = useState({
        gameScore: 0,
        displayStartBtn: true
    });
    const [isGameOver, setIsGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const isRunningRef = useRef(false)
    const doremonRef = useRef(null);
    const miceRef = useRef(null);
    const themeSong = useRef(new Audio('/music/doremon.mp3'));
    const sadSong = useRef(new Audio('/music/sad.mp3'));
    const [doremonPosition, setDoremonPosition] = useState({ left: 0 });

    const handleKeyDown = (event) => {
        if (!isRunning || isGameOver) return;
        const code = event.keyCode;

        if (code === 38) {
            // Jump logic
            doremonRef.current.classList.add('dinoAnimate');
            setTimeout(() => {
                doremonRef.current.classList.remove('dinoAnimate');
            }, 830);
        } else if (code === 39) {
            // Move right
            setDoremonPosition((prevPos) => ({
                left: prevPos.left + 5,
            }));
        } else if (code === 37) {
            // Move left
            setDoremonPosition((prevPos) => ({
                left: prevPos.left - 5,
            }));
        }
    };

    useEffect(() => {
        if (isRunning) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning, isGameOver]);

    const startGame = () => {
        doremonRef.current.style.backgroundImage = 'url("images/1.png")';
        setGame((pre) => ({ ...pre, displayStartBtn: !pre.displayStartBtn }))
        themeSong.current.play();
        sadSong.current.load();
        setIsRunning(true);
        isRunningRef.current = true;
        miceRef.current.classList.add('mice_ani');
        setIsGameOver(false);
        setGame((pre) => ({ ...pre, gameScore: 0 }));
        setDoremonPosition({ left: 0 });
        // console.log("outside of interval")

        let flag = true;

        const gameInterval = setInterval(() => {
            // console.log("inside of interval")

            if (!isRunningRef.current) {
                clearInterval(gameInterval);
                return;
            }

            const doremonStyles = window.getComputedStyle(doremonRef.current);
            const miceStyles = window.getComputedStyle(miceRef.current);

            const dx = parseInt(doremonStyles.getPropertyValue('left'));
            const dy = parseInt(doremonStyles.getPropertyValue('bottom'));

            const mx = parseInt(miceStyles.getPropertyValue('left'));
            const my = parseInt(miceStyles.getPropertyValue('bottom'));

            const disX = Math.abs(dx - mx);
            const disY = Math.abs(dy - my);
            // console.log(disX);

            if (disX < 100 && disY < 40) {
                setGame((pre) => ({ ...pre, displayStartBtn: !pre.displayStartBtn }))
                setIsGameOver(true);
                miceRef.current.classList.remove('mice_ani');
                doremonRef.current.style.backgroundImage = 'url("images/4.png")';
                themeSong.current.pause();
                themeSong.current.load();
                sadSong.current.play();
                setTimeout(() => sadSong.current.pause(), 6000);
                clearInterval(gameInterval);
            } else if (disX < 42 && flag) {
                setGame((pre) => ({ ...pre, gameScore: pre.gameScore + 1 }));
                flag = false;
                setTimeout(() => (flag = true), 1000);
            }
        }, 100);
    };

    const endGame = () => {
        setGame((pre) => ({ ...pre, displayStartBtn: !pre.displayStartBtn }))
        themeSong.current.pause();
        themeSong.current.load();
        setIsRunning(false);
        isRunningRef.current = false;
        setIsGameOver(true);
        miceRef.current.classList.remove('mice_ani');

    }
    return (
        <div className="container">
            <div className="sky">
                <div>
                    <Navbar {...{ game, isGameOver, startGame, endGame }} />
                </div>

                <div className="surface"></div>
                <div
                    className="doremon"
                    ref={doremonRef}
                    style={{ left: `${doremonPosition.left}rem` }}
                ></div>
                <div className="mice" ref={miceRef}></div>
            </div>
        </div>
    );
};

export default GamePage;
