import { FaPlay } from "react-icons/fa"

export default function StartScreen({ quizData, onStart }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">{quizData.title}</h1>
      <p className="mb-4">{quizData.description}</p>
      <p className="mb-4">Total questions: {quizData.questions_count}</p>
      <p className="mb-4">Duration: {quizData.duration} minutes</p>
      <button
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center mx-auto"
      >
        <FaPlay className="mr-2" /> Start Quiz
      </button>
    </div>
  )
}

