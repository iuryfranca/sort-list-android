import type { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cva } from 'class-variance-authority'
import { GripVertical } from 'lucide-react'
import { ColumnId } from './DragSortList'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

export interface Task {
  id: UniqueIdentifier
  columnId: ColumnId
  content: string
}

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
}

export type TaskType = 'Task'

export interface TaskDragData {
  type: TaskType
  task: Task
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
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
          checked={true}
          onCheckedChange={() => console.log('checked')}
        />
        <Input
          type='number'
          className='w-24'
          placeholder='R$ 10,00'
          onChange={(e) => console.log(e.target.value)}
        />
        <Textarea
          className='min-h-[auto] h-11 resize-none text-sm border-none leading-8 p-1'
          placeholder='Escreva aqui...'
          onChange={(e) => console.log(e.target.value)}
        />
      </CardContent>
    </Card>
  )
}
