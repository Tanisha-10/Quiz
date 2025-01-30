import { FaStar, FaRedo } from "react-icons/fa"

export default function ResultScreen({ score, totalQuestions, onRestart }) {
  const percentage = (score / (totalQuestions * 4)) * 100
  let message = ""
  let starCount = 0

  if (percentage >= 90) {
    message = "Excellent!"
    starCount = 5
  } else if (percentage >= 70) {
    message = "Great job!"
    starCount = 4
  } else if (percentage >= 50) {
    message = "Good effort!"
    starCount = 3
  } else if (percentage >= 30) {
    message = "You can do better!"
    starCount = 2
  } else {
    message = "Keep practicing!"
    starCount = 1
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-4">{message}</p>
      <div className="mb-4">
        {[...Array(starCount)].map((_, i) => (
          <FaStar key={i} className="inline-block text-yellow-500 text-3xl mx-1" />
        ))}
      </div>
      <p className="text-lg mb-4">
        Your score: {score} / {totalQuestions * 4}
      </p>
      <p className="text-lg mb-4">Percentage: {percentage.toFixed(2)}%</p>
      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center mx-auto"
      >
        <FaRedo className="mr-2" /> Restart Quiz
      </button>
    </div>
  )
}

