"use client"
import { useState } from "react"
import Link from "next/link"
import { FaPlay } from "react-icons/fa"

export default function StartQuiz() {
  const [selectedTopic, setSelectedTopic] = useState("")

  const topics = ["General Knowledge", "Science", "History", "Geography", "Literature"]

  return (
    <div id="start-quiz" className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Ready to Begin?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Start Your Quiz Adventure
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Choose your preferred topic and embark on an exciting journey of knowledge.
          </p>
        </div>

        <div className="mt-10">
          <div className="max-w-xl mx-auto">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-300">
              Select a Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">Choose a topic</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={selectedTopic ? `/quiz?topic=${encodeURIComponent(selectedTopic)}` : "#"}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                selectedTopic ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              onClick={(e) => {
                if (!selectedTopic) {
                  e.preventDefault()
                }
              }}
            >
              <FaPlay className="mr-2" /> Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

