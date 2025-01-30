import { useState, useEffect } from "react"
import { FaCheck, FaTimes, FaClock, FaFire, FaInfoCircle } from "react-icons/fa"
import confetti from "canvas-confetti"

export default function QuizComponent({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showDetailedAnswer, setShowDetailedAnswer] = useState(false)

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

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
    const correct = questions[currentQuestion].options.find((opt) => opt.id === optionId).is_correct
    if (correct) {
      setScore(score + 1)
      setStreak(streak + 1)
      triggerConfetti()
    } else {
      setStreak(0)
      setShowSolution(true)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      resetQuestion()
    } else {
      // Quiz finished
      alert(`Quiz completed! Your score: ${score}/${questions.length}`)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      resetQuestion()
    }
  }

  const resetQuestion = () => {
    setSelectedOption(null)
    setShowSolution(false)
    setTimeLeft(30)
    setShowDetailedAnswer(false)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const toggleDetailedAnswer = () => {
    setShowDetailedAnswer(!showDetailedAnswer)
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaClock className="mr-2 text-blue-500" />
            <span>{timeLeft}s</span>
          </div>
          <div className="flex items-center">
            <FaFire className="mr-2 text-red-500" />
            <span>Streak: {streak}</span>
          </div>
          <div>
            Score: {score}/{questions.length}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4 text-white">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <p className="mb-4 text-gray-300">{currentQuestionData.description}</p>
        <div className="space-y-2">
          {currentQuestionData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full text-left p-3 rounded transition-colors duration-300 ${
                selectedOption === option.id
                  ? option.is_correct
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
              disabled={selectedOption !== null}
            >
              {option.description}
              {selectedOption === option.id &&
                (option.is_correct ? <FaCheck className="inline ml-2" /> : <FaTimes className="inline ml-2" />)}
            </button>
          ))}
        </div>
        {showSolution && (
          <div className="mt-4 p-4 bg-blue-900 rounded text-white">
            <h3 className="font-bold mb-2">Correct Answer:</h3>
            <p>{currentQuestionData.options.find((opt) => opt.is_correct).description}</p>
          </div>
        )}
        <button
          onClick={toggleDetailedAnswer}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaInfoCircle className="mr-2" />
          {showDetailedAnswer ? "Hide" : "Show"} Detailed Answer
        </button>
        {showDetailedAnswer && (
          <div className="mt-4 p-4 bg-gray-700 rounded text-white">
            <h3 className="font-bold mb-2">Detailed Solution:</h3>
            <p>{currentQuestionData.detailed_solution}</p>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousQuestion}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={selectedOption === null}
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  )
}

