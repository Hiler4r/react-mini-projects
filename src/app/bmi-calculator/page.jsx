'use client';
import { useState } from 'react';

export default function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmiResult] = useState('Enter value to view result');
    const [bmiStatus, setBmiStatus] = useState('Enter value to see status');
    const [bmiRecommendation, setBmiRecommendation] = useState('Enter value to see recommendation');

    const calculateBMI = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);
        if (
            isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0
        ) {
            alert('Please enter valid values for weight and height!');
            return;
        }

        const heightInMeters = heightNum / 100;
        let bmi = weightNum / (heightInMeters * heightInMeters);
        bmi = Number(bmi.toFixed(1));

        let status = '';
        let recommendation = '';

        if (bmi < 18.5) {
            status = 'Underweight';
            recommendation = 'You should eat more balanced meals and gain some healthy weight.';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = 'Normal';
            recommendation = 'Great job! Maintain your healthy lifestyle.';
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = 'Overweight';
            recommendation = 'Consider regular exercise and watch your diet.';
        } else {
            status = 'Obese';
            recommendation = 'Consult a healthcenter for a proper health plan.';
        }

        setBmiResult(`BMI Result: ${bmi}`);
        setBmiStatus(`Status: ${status}`);
        setBmiRecommendation(`Recommendation: ${recommendation}`);
    };

    return (
        <main className="calculator">
            <h1>body mass index</h1>

            <section>
                <div>
                    <span>
                        <input
                            id="weight"
                            type="number"
                            placeholder="weight in kilogram"
                            className="input"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </span>
                    <span>
                        <input
                            id="height"
                            type="number"
                            placeholder="height in centimeters"
                            className="input"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </span>
                    <button onClick={calculateBMI} className="btn">
                        Calculate
                    </button>
                </div>

                <div>
                    <p id="bmiResult" className="mb-4">{bmiResult}</p>
                    <p id="bmiStatus" className="mb-4">{bmiStatus}</p>
                    <p id="bmiRecommendation">{bmiRecommendation}</p>
                </div>
            </section>
        </main>
    );
}