import { useGameContext } from "@/contexts/GameContext"
import { FaCoins } from "react-icons/fa"

const powerups = [
  { name: "50/50", description: "Remove two incorrect answers", cost: 50 },
  { name: "Time Boost", description: "Add 30 seconds to the timer", cost: 75 },
  { name: "Double XP", description: "Double XP for the next question", cost: 100 },
]

export default function PowerupShop({ onClose }) {
  const { coins, buyPowerup } = useGameContext()

  const handlePurchase = (powerup, cost) => {
    if (buyPowerup(powerup, cost)) {
      alert(`You bought the ${powerup} powerup!`)
    } else {
      alert("Not enough coins!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Powerup Shop</h2>
        <div className="flex items-center mb-4">
          <FaCoins className="text-yellow-400 mr-2" />
          <span>{coins} coins</span>
        </div>
        <div className="space-y-4">
          {powerups.map((powerup) => (
            <div key={powerup.name} className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{powerup.name}</h3>
                <p className="text-sm text-gray-400">{powerup.description}</p>
              </div>
              <button
                onClick={() => handlePurchase(powerup.name, powerup.cost)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Buy ({powerup.cost} coins)
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  )
}

