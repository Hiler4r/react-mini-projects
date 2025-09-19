"use client";
import React, { useState } from "react";

export default function PasswordGenerator() {
    const [length, setLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [password, setPassword] = useState("");

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+{}[]<>?";

    const generatePassword = () => {
        let characters = "";
        if (includeUpper) characters += upperChars;
        if (includeLower) characters += lowerChars;
        if (includeNumbers) characters += numberChars;
        if (includeSymbols) characters += symbolChars;

        if (!characters) {
            setPassword("⚠️ Select at least one option!");
            return;
        }

        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(result);
    };

    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            alert("Password copied to clipboard!");
        }
    };

    return (
        <div className="password-card text-gray-800">
            <h1 className="text-3xl font-extrabold text-center mb-6">🔐 Random Password Generator</h1>

            <div className="mb-4">
                <label className="block font-semibold">Length: {length}</label>
                <input
                    type="range"
                    min="6"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full cursor-pointer"
                />
            </div>

            <div className="space-y-2 mb-6">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} />
                    <span>Include Uppercase</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} />
                    <span>Include Lowercase</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                    <span>Include Numbers</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                    <span>Include Symbols</span>
                </label>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    readOnly
                    value={password}
                    placeholder="Your password will appear here"
                    className="w-full p-3 rounded-lg border border-gray-300"
                />
            </div>

            <div className="flex space-x-4 justify-center">
                <button onClick={generatePassword} className="btn btn-generate">
                    Generate
                </button>
                <button onClick={copyToClipboard} className="btn btn-copy">
                    Copy
                </button>
            </div>
        </div>
    );
}
