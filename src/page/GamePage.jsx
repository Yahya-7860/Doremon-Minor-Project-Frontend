import { useState, useEffect, useRef } from 'react';
import "../App.css";
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentScore, addMaxScore } from '../features/score/scoreSlice';

const GamePage = () => {
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function fetchScore() {
            // fetching score
            await fetch(`http://localhost:3000/player/getScore/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch(addMaxScore({ maxScore: data.score }))

                })
        }
        fetchScore();
    }, []);

    const [game, setGame] = useState({
        gameScore: 0,
        displayStartBtn: true,
    });
    const updatedScoreRef = useRef(0);
    const fetchedScoreRef = useRef(0);
    const gameScoreRef = useRef(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const isRunningRef = useRef(false)
    const doremonRef = useRef(null);
    const miceRef = useRef(null);
    const themeSong = useRef(new Audio('/music/doremon.mp3'));
    const sadSong = useRef(new Audio('/music/sad.mp3'));
    const [doremonPosition, setDoremonPosition] = useState({ left: 0 });

    const handle_Score_Pass_DB = async () => {
        // fetching score
        await fetch(`http://localhost:3000/player/getScore/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                fetchedScoreRef.current = data.score;
            })

        //passing score but only max score
        if (gameScoreRef.current > fetchedScoreRef.current) {
            updatedScoreRef.current = gameScoreRef.current
        }
        else {
            updatedScoreRef.current = fetchedScoreRef.current
        }

        dispatch(addMaxScore({ maxScore: updatedScoreRef.current }))
        await fetch("http://localhost:3000/player/score", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ score: updatedScoreRef.current }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

    }

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
        // setGame((pre) => ({ ...pre, gameScore: 0 }));
        gameScoreRef.current = 0;
        dispatch(addCurrentScore({ score: gameScoreRef.current }))
        setDoremonPosition({ left: 0 });

        let flag = true;

        const gameInterval = setInterval(() => {

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
                handle_Score_Pass_DB();
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
                gameScoreRef.current = gameScoreRef.current + 1;
                setGame((pre) => ({ ...pre, gameScore: gameScoreRef.current }));
                dispatch(addCurrentScore({ score: gameScoreRef.current }))
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
