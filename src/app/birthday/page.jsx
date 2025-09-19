"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import ConfettiComponent from "react-confetti";

const Confetti = dynamic(() => Promise.resolve(ConfettiComponent), { ssr: false });

export default function BirthdayCard() {
    const wishes = [
        "💜 Wishing you endless joy, laughter, and love on your special day! 🎂✨",
        "💜 May your birthday sparkle with happiness and fill your heart with love! 💜",
        "💜 Here’s to a day as beautiful as you are – cheers to more smiles & memories! 💜",
        "💜 You shine brighter than the stars – may your dreams come true this year! 💜",
        "💜 Sweet moments, big hugs, and endless happiness, even though we might not be close anymore, or we don't speak to each other anymore . I Love You Forever – Happy Birthday My Purple Princess! 💜"
    ];

    const [currentWish, setCurrentWish] = useState(wishes[0]);
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    const handleButtonClick = () => {
        // Show confetti again when button is clicked
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);

        // Change to a random new wish (not the same as current)
        let newWish;
        do {
            newWish = wishes[Math.floor(Math.random() * wishes.length)];
        } while (newWish === currentWish && wishes.length > 1);
        setCurrentWish(newWish);
    };

    return (
        <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

            <div className="aspect-video w-full max-w-full sm:max-w-md md:max-w-[900px] bg-purple-800/30 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 sm:p-12 border border-purple-300 relative overflow-hidden">
                {/* Floating Decorations */}
                <div className="absolute w-40 h-40 bg-purple-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
                <div className="absolute w-32 h-32 bg-purple-600/40 rounded-full blur-2xl bottom-10 right-10 animate-bounce"></div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-100 drop-shadow-2xl mb-8 tracking-wide flex justify-center items-center gap-2" style={{ fontFamily: "var(--font-cursive)" }}>
                    <span role="img" aria-label="party-popper">🎉</span>
                    <span>Happy Birthday My Purple Princess!</span>
                    <span role="img" aria-label="birthday-cake">🎂</span>
                </h1>

                <p className="text-lg sm:text-2xl md:text-3xl text-purple-50 text-center font-semibold bg-purple-900/40 p-6 sm:p-8 rounded-2xl shadow-lg border border-purple-300 transition-all duration-500">
                    {currentWish}
                </p>

                <button
                    onClick={handleButtonClick}
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 cursor-pointer"
                >
                    💌 Send Love
                </button>
            </div>
        </div>
    );
}
