'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation' // Make sure this is used only if necessary
import QuizComponent from '@/components/QuizComponent'

const QuizLoader = () => {
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/quiz')
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load quiz data')
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center mt-8">Loading quiz...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">{quizData.title}</h1>
      <p className="mb-8 text-center">{quizData.description}</p>
      <QuizComponent questions={quizData.questions} />
    </main>
  )
}

export default function Home() {
  return (
    // Suspense boundary to ensure proper rendering for async data fetching
    <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
      <QuizLoader />
    </Suspense>
  )
}
