import { FaMedal } from "react-icons/fa"

export default function AchievementPopup({ achievement }) {
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg flex items-center animate-bounce">
      <FaMedal className="text-2xl mr-2" />
      <div>
        <p className="font-bold">Achievement Unlocked!</p>
        <p>{achievement}</p>
      </div>
    </div>
  )
}

