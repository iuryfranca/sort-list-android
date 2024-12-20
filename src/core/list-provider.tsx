import { UniqueIdentifier } from '@dnd-kit/core'
import { createContext, useContext, useState } from 'react'

type ListProviderProps = {
  children: React.ReactNode
}

export type ListItem = {
  id: number
  checked: boolean
  value: number
  description: string
}

type ListProviderState = {
  list: ListItem[]
  addItem: (item: ListItem) => void
  updateItem: (index: number, updatedItem: Partial<ListItem>) => void
  removeItem: (index: number) => void
}

const initialState: ListProviderState = {
  list: [],
  addItem: () => null,
  updateItem: () => null,
  removeItem: () => null,
}

const ListContext = createContext<ListProviderState>(initialState)

export function ListProvider({ children }: ListProviderProps) {
  const [list, setList] = useState<ListItem[]>([])

  const addItem = (item: ListItem) => {
    setList((prevList) => [...prevList, item])
  }

  const updateItem = (index: number, updatedItem: Partial<ListItem>) => {
    setList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, ...updatedItem } : item
      )
    )
  }

  const removeItem = (index: number) => {
    setList((prevList) => prevList.filter((_, i) => i !== index))
  }

  const value = {
    list,
    addItem,
    updateItem,
    removeItem,
  }

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export const useList = () => {
  const context = useContext(ListContext)

  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider')
  }

  return context
}
