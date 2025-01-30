import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">GitHub</span>
            <FaGithub className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            Contact Us
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">&copy; 2023 QuizMaster. All rights reserved.</p>
      </div>
    </footer>
  )
}

