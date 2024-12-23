import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Active, DataRef, Over } from '@dnd-kit/core'
import { ColumnDragData } from '@/components/BoardColumn'
import { TaskDragData } from '@/components/TaskCard'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DraggableData = ColumnDragData | TaskDragData

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>
} {
  if (!entry) {
    return false
  }

  const data = entry.data.current

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true
  }

  return false
}
