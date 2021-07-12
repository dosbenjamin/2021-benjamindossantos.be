import { useState } from 'react'

export const useReveal = () => {
  const [reveal, setReveal] = useState(false)

  return {
    setReveal,
    revealClass: `transition-transform-opacity duration-1000 ease-out origin-bottom-left transform-gpu ${reveal
        ? 'opacity-100 translate-y-0 rotate-0'
        : 'opacity-0 translate-y-[25%] rotate-1'
      }`
  }
}