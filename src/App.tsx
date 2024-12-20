import { ThemeProvider } from '@/core/theme-provider'
import './App.css'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DragSortList } from '@/components/DragSortList'
import { OptionsNav } from '@/components/OptionsNav'
import { PainelTotalValues } from '@/components/PainelTotalValues'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='min-h-screen flex flex-col'>
          <header className='flex h-20 items-center justify-between py-4 px-6 text-white'>
            <div className='flex flex-col items-start gap-2'>
              <h1 className='text-primary scroll-m-20 text-xl font-extrabold tracking-tight lg:text-5xl'>
                Drag and Drop Sort List
              </h1>

              <p className='text-sm text-muted-foreground'>
                Drag and Drop Sort List
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <PainelTotalValues />
              <ThemeToggle />
              <OptionsNav />
            </div>
          </header>

          <main className='mx-2 flex flex-col justify-between gap-6 h-[calc(100vh-5rem)]'>
            <DragSortList />
          </main>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
