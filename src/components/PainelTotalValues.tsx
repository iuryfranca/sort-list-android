import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Calculator } from 'lucide-react'

export function PainelTotalValues() {
  return (
    <Drawer>
      <DrawerTrigger>
        {' '}
        <Button variant='outline' size='icon' className='relative'>
          <Calculator className='h-4 w-4 text-primary' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Somar valores da lista</DrawerTitle>
          <DrawerDescription className='mt-2'>
            Será somado o valor total de todos os campos numerais e a quantidade
            de items da colunas da lista.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className='h-full flex flex-col gap-2 p-4 justify-center'>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col gap-2 bg-muted p-4 rounded-lg w-full'>
              <p className='text-sm text-muted-foreground'>Total de valores:</p>
              <h1 className='text-primary scroll-m-20 text-xl font-extrabold tracking-tight lg:text-5xl'>
                R$ 5000,00
              </h1>
            </div>
            <div className='flex flex-col gap-2 bg-muted p-4 rounded-lg w-full'>
              <p className='text-sm text-muted-foreground'>Total de valores:</p>
              <h1 className='text-primary scroll-m-20 text-xl font-extrabold tracking-tight lg:text-5xl'>
                9
              </h1>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
