import { FaBrain, FaTrophy, FaChartLine } from "react-icons/fa"

export default function Features() {
  return (
    <div id="features" className="py-12 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Elevate Your Quiz Experience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Discover what makes QuizMaster the ultimate platform for knowledge enthusiasts.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FaBrain className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Diverse Topics</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-300">
                Explore a wide range of subjects and challenge yourself in various fields of knowledge.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FaTrophy className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Compete & Win</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-300">
                Earn points, climb the leaderboard, and showcase your expertise to the world.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FaChartLine className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">Track Progress</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-300">
                Monitor your performance, identify areas for improvement, and watch your knowledge grow.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

