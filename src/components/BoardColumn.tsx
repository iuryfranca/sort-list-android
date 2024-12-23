import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { type UniqueIdentifier } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useMemo, useState } from 'react'
import { Task, TaskCard } from './TaskCard'
import { cva } from 'class-variance-authority'
import { Card, CardContent } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { useList } from '@/core/list-provider'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'

export interface Column {
  id: UniqueIdentifier
  title: string
}

export type ColumnType = 'Column'

export interface ColumnDragData {
  type: ColumnType
  column: Column
}

interface BoardColumnProps {
  column: Column
  tasks: Task[]
  isOverlay?: boolean
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const variants = cva(
    // 'h-full min-h-[500px] w-[calc(100vw-2rem)] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center',
    'h-full min-h-[500px] w-[calc(100vw-1rem)] border-none max-w-full bg-transparent flex flex-col flex-shrink-0 snap-center shadow-none',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2 opacity-30',
          overlay: 'ring-2 ring-primary',
        },
      },
    }
  )

  const { listTasks, updateItem, addItem } = useList()

  const [itemOnSave, setItemOnSave] = useState<Task | null>(null)

  const handleEdit = () => {
    if (!itemOnSave) return

    updateItem(itemOnSave.id, {
      id: itemOnSave.id,
      columnId: itemOnSave.columnId,
      checked: itemOnSave.checked,
      value: itemOnSave.value,
      description: itemOnSave.description,
      positionList: itemOnSave.positionList,
    })
  }

  const handleAddNewItem = () => {
    addItem({
      id: uuidv4(),
      columnId: 'sortList',
      checked: false,
      value: null,
      description: '',
      positionList: listTasks.length,
    })
  }

  useEffect(() => {
    handleEdit()
  }, [itemOnSave])

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
      })}>
      <ScrollArea className='p-1'>
        <CardContent className='flex flex-grow flex-col gap-2 p-1'>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onSave={setItemOnSave} />
            ))}
            <Button className='mt-2' onClick={handleAddNewItem}>
              Novo +
            </Button>
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex gap-4 items-center flex-row justify-center'>
      {children}
    </div>
  )
}
