import { ThemeProvider } from '@/core/theme-provider'
import './App.css'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DragSortList } from '@/components/DragSortList'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='min-h-screen flex flex-col'>
          <header className='flex items-center justify-between py-4 px-8 text-white'>
            <h1 className='text-primary scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl'>
              Drag and Drop Sort List
            </h1>
            <ThemeToggle />
          </header>

          <main className='mx-2 flex flex-col gap-6 h-full'>
            <DragSortList />
          </main>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
