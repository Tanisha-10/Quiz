"use client"
import type React from "react"
import { createContext, useContext, useState } from "react"

type GameContextType = {
  level: number
  xp: number
  coins: number
  powerups: string[]
  addXp: (amount: number) => void
  addCoins: (amount: number) => void
  usePowerup: (powerup: string) => void
  buyPowerup: (powerup: string, cost: number) => boolean
}

const GameContext = createContext<GameContextType | null>(null)

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [coins, setCoins] = useState(0)
  const [powerups, setPowerups] = useState<string[]>([])

  const addXp = (amount: number) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount
      if (newXp >= level * 100) {
        setLevel((prevLevel) => prevLevel + 1)
        return newXp - level * 100
      }
      return newXp
    })
  }

  const addCoins = (amount: number) => {
    setCoins((prevCoins) => prevCoins + amount)
  }

  const usePowerup = (powerup: string) => {
    setPowerups((prevPowerups) => prevPowerups.filter((p) => p !== powerup))
  }

  const buyPowerup = (powerup: string, cost: number) => {
    if (coins >= cost) {
      setCoins((prevCoins) => prevCoins - cost)
      setPowerups((prevPowerups) => [...prevPowerups, powerup])
      return true
    }
    return false
  }

  return (
    <GameContext.Provider value={{ level, xp, coins, powerups, addXp, addCoins, usePowerup, buyPowerup }}>
      {children}
    </GameContext.Provider>
  )
}

