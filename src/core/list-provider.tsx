import { Task } from '@/components/TaskCard'
import { UniqueIdentifier } from '@dnd-kit/core'
import { createContext, useContext, useMemo, useState } from 'react'
import { load } from '@tauri-apps/plugin-store'

type ListProviderProps = {
  children: React.ReactNode
}

type ListProviderState = {
  listTasks: Task[]
  totalValueList: number
  totalItemsList: number
  setListTasks: (value: React.SetStateAction<Task[]>) => void
  addItem: (item: Task) => void
  updateItem: (id: UniqueIdentifier, updatedItem: Task) => void
  removeItem: (id: UniqueIdentifier) => void
  clearList: () => void
}

const initialState: ListProviderState = {
  listTasks: [],
  totalValueList: 0,
  totalItemsList: 0,
  setListTasks: () => null,
  addItem: () => null,
  updateItem: () => null,
  removeItem: () => null,
  clearList: () => null,
}

const ListContext = createContext<ListProviderState>(initialState)

const storeListTasks = await load('../store/storeListTasks.json', {
  autoSave: true,
})

const initialTasks: Task[] = await storeListTasks.values().then((values) => {
  const tasks = values as Task[]
  // Reordenar os valores de acordo com a posiçãoList
  return tasks.sort((a, b) => a.positionList - b.positionList)
})

export function ListProvider({ children }: ListProviderProps) {
  const [listTasks, setListTasks] = useState<Task[]>(initialTasks)

  const addItem = (item: Task) => {
    setListTasks((prevList) => [...prevList, item])

    storeListTasks.set(String(item.id), item)
  }

  const updateItem = (id: UniqueIdentifier, updatedItem: Task) => {
    setListTasks((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    )

    storeListTasks.set(String(updatedItem.id), updatedItem)
  }

  const removeItem = (id: UniqueIdentifier) => {
    setListTasks((prevList) => prevList.filter((item) => item.id !== id))
    storeListTasks.delete(String(id))
  }

  const clearList = () => {
    setListTasks([])
    storeListTasks.clear()
  }

  const totalValueList = useMemo(() => {
    return listTasks.reduce((acc, task) => {
      return acc + (task.value || 0)
    }, 0)
  }, [listTasks])

  const totalItemsList = useMemo(() => {
    return listTasks.length
  }, [listTasks])

  // useEffect(() => {}, [listTasks])

  const value = {
    listTasks,
    totalValueList,
    totalItemsList,
    setListTasks,
    addItem,
    updateItem,
    removeItem,
    clearList,
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
