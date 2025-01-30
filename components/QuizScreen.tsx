import { useState, useEffect } from "react"

export default function QuizScreen({ quizData, onEnd }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          onEnd(score)
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [score, onEnd])

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
  }

  const handleNextQuestion = () => {
    if (selectedOption) {
      const currentQuestionData = quizData.questions[currentQuestion]
      const selectedOptionData = currentQuestionData.options.find((option) => option.id === selectedOption)

      if (selectedOptionData.is_correct) {
        setScore((prevScore) => prevScore + Number.parseInt(quizData.correct_answer_marks))
      } else {
        setScore((prevScore) => prevScore - Number.parseInt(quizData.negative_marks))
      }

      if (currentQuestion + 1 < quizData.questions.length) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1)
        setSelectedOption(null)
      } else {
        onEnd(score)
      }
    }
  }

  const currentQuestionData = quizData.questions[currentQuestion]

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-4 flex justify-between items-center">
        <span>
          Question {currentQuestion + 1}/{quizData.questions.length}
        </span>
        <span>
          Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-4">{currentQuestionData.description}</h2>
      <div className="space-y-2">
        {currentQuestionData.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`w-full text-left p-2 rounded ${
              selectedOption === option.id ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {option.description}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}
        disabled={!selectedOption}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {currentQuestion + 1 === quizData.questions.length ? "Finish" : "Next"}
      </button>
    </div>
  )
}

