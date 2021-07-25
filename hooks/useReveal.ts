import { useState } from 'react'

export const useReveal = () => {
  const [reveal, setReveal] = useState(false)

  return {
    setReveal,
    revealClass: `duration-1000 ease-out origin-bottom-left transform-gpu ${reveal
        ? 'transition-transform-opacity opacity-100 translate-y-0 rotate-0'
        : 'opacity-0 translate-y-4 rotate-1'
      }`
  }
}