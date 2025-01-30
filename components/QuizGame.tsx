import { useState, useEffect } from "react"
import { FaClock, FaTrophy, FaArrowRight, FaBolt, FaFire } from "react-icons/fa"
import confetti from "canvas-confetti"

export default function QuizGame({ quizData }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [multiplier, setMultiplier] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          handleNextQuestion()
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, []) // Removed unnecessary dependency: currentQuestion

  useEffect(() => {
    if (streak > 0 && streak % 3 === 0) {
      setMultiplier((prevMultiplier) => Math.min(prevMultiplier + 0.5, 3))
    }
  }, [streak])

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
    const currentQuestionData = quizData.questions[currentQuestion]
    const selectedOptionData = currentQuestionData.options.find((option) => option.id === optionId)
    setIsCorrect(selectedOptionData.is_correct)
    setShowFeedback(true)

    if (selectedOptionData.is_correct) {
      const basePoints = Number.parseInt(quizData.correct_answer_marks)
      const earnedPoints = Math.round(basePoints * multiplier)
      setScore((prevScore) => prevScore + earnedPoints)
      setStreak((prevStreak) => prevStreak + 1)
      triggerConfetti()
    } else {
      setStreak(0)
      setMultiplier(1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1)
      setSelectedOption(null)
      setShowFeedback(false)
      setTimeLeft(30)
    } else {
      setGameOver(true)
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-2xl mb-4">Your final score: {score}</p>
        <FaTrophy className="text-yellow-400 text-6xl mb-4" />
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
    )
  }

  const currentQuestionData = quizData.questions[currentQuestion]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>Time left: {timeLeft}s</span>
          </div>
          <div className="flex items-center">
            <FaBolt className="mr-2 text-yellow-400" />
            <span>x{multiplier.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <FaFire className="mr-2 text-red-500" />
            <span>Streak: {streak}</span>
          </div>
          <div>Score: {score}</div>
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentQuestion / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Question {currentQuestion + 1}/{quizData.questions.length}
        </h2>
        <p className="text-xl mb-4">{currentQuestionData.description}</p>
        <div className="space-y-2">
          {currentQuestionData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full text-left p-3 rounded transition-colors duration-300 ${
                selectedOption === option.id
                  ? isCorrect
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              disabled={showFeedback}
            >
              {option.description}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div className={`mt-4 p-3 rounded ${isCorrect ? "bg-green-600" : "bg-red-600"}`}>
            {isCorrect
              ? `Correct! +${Math.round(Number.parseInt(quizData.correct_answer_marks) * multiplier)} points`
              : "Incorrect. Try again!"}
          </div>
        )}
        <button
          onClick={handleNextQuestion}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
          disabled={!showFeedback}
        >
          {currentQuestion + 1 === quizData.questions.length ? "Finish Quiz" : "Next Question"}
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  )
}

