import type { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cva } from 'class-variance-authority'
import { GripVertical, X } from 'lucide-react'
import { ColumnId } from './DragSortList'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

export interface Task {
  id: UniqueIdentifier
  columnId: ColumnId
  content: string
}

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
  onSave: (item: {
    id: number
    checked: boolean
    value: number
    description: string
  }) => void
}

export type TaskType = 'Task'

export interface TaskDragData {
  type: TaskType
  task: Task
}

export function TaskCard({ task, isOverlay, onSave }: TaskCardProps) {
  const id = task.id as number

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task',
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const variants = cva('border-none shadow-none', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  })

  const [value, setValue] = useState(0)
  const [description, setDescription] = useState('')
  const [checked, setIsChecked] = useState(false)

  const handleClear = () => {
    setValue(0)
    setDescription('')
    setIsChecked(false)
  }

  // Usar debounce para atrasar o envio
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('enviando', id, checked, value, description)
      onSave({ id, checked, value, description })
    }, 500)

    // Limpa o timeout se o usuário continuar digitando
    return () => clearTimeout(handler)
  }, [checked, value, description, onSave])

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
      })}>
      <CardContent className='p-1 pl-3 h-14 flex flex-row items-center gap-3 text-left whitespace-pre-wrap'>
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className='p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab'>
          <span className='sr-only'>Move task</span>
          <GripVertical />
        </Button>
        <Checkbox
          id='terms'
          checked={checked}
          onCheckedChange={() => setIsChecked(!checked)}
        />
        <Input
          type='number'
          className='w-24'
          placeholder='R$ 10,00'
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <Textarea
          className='min-h-[auto] h-11 resize-none text-sm border-none leading-8 p-1'
          placeholder='Escreva aqui...'
          onChange={(e) => setDescription(e.target.value)}
        />
        <X
          onClick={handleClear}
          className='h-10 w-10 p-1 text-secondary-foreground/50 cursor-pointer hover:text-secondary-foreground'
        />
      </CardContent>
    </Card>
  )
}
