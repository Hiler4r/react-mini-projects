import Link from 'next/link'
import React from 'react'


export default function Home() {
  return (
    <div>
      Quiz-app Link <Link href="/quiz-app">View</Link>
      Tic Tac Toe Link <Link href="/tic-tac-toe">View</Link>
      BMI Calculator <Link href="/bmi-calculator">View</Link>
      Random Password Generator <Link href="/random-password-gen">View</Link>
      Currency Converter <Link href="/currency-converter">View</Link>
      Birthday <Link href="/birthday">View</Link>

    </div>
  )
}
