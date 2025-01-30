"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import QuizGame from "@/components/QuizGame"

export default function QuizPage() {
  const [quizData, setQuizData] = useState(null)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic")

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/api/quiz")
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data")
        }
        const data = await response.json()
        setQuizData(data)
      } catch (error) {
        console.error("Error fetching quiz data:", error)
        setError("Failed to load quiz data. Please try again later.")
      }
    }

    fetchQuizData()
  }, [])

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!quizData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <QuizGame quizData={quizData} topic={topic} />
    </div>
  )
}

