import { createContext, useContext } from 'react'

export type BoardActions = {
  enter: (index: number) => void
}

export const BoardActionsContext = createContext<BoardActions | null>(null)

export function useBoardActions() {
  const value = useContext(BoardActionsContext)
  if (!value) {
    throw new Error('Board actions are only available inside the board')
  }
  return value
}
