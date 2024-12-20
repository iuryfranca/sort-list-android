import { invoke } from '@tauri-apps/api/core'
import { Button } from '@/components/ui/button'

import './App.css'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function App() {
  const [rows, setRows] = useState<any[]>([])

  const newRow = () => {
    setRows([
      ...rows,
      { id: Math.random(), description: '', price: 0, checked: false },
    ])
  }

  return (
    <div className='flex flex-col items-center justify-start h-screen p-4 gap-4'>
      {rows.map((row, index) => (
        <div key={row.id} className='flex items-center space-x-2 w-full'>
          <Checkbox
            id='terms'
            checked={row.checked}
            onCheckedChange={() =>
              setRows((rows) =>
                rows.map((row, i) =>
                  i === index ? { ...row, checked: !row.checked } : row
                )
              )
            }
          />
          <Input
            type='number'
            placeholder='R$ 100,00'
            value={row.price}
            onChange={(e) =>
              setRows((rows) =>
                rows.map((row, i) =>
                  i === index ? { ...row, price: e.target.value } : row
                )
              )
            }
          />
          <Input
            type='text'
            placeholder='Escreva aqui...'
            value={row.description}
            onChange={(e) =>
              setRows((rows) =>
                rows.map((row, i) =>
                  i === index ? { ...row, description: e.target.value } : row
                )
              )
            }
          />
        </div>
      ))}

      <Button className='w-full' onClick={() => newRow()}>
        Novo...
      </Button>
    </div>
  )
}

export default App
