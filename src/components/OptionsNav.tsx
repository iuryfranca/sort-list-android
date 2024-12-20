import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Combine, EllipsisVertical, Github, Linkedin } from 'lucide-react'

import { open } from '@tauri-apps/plugin-shell'

export function OptionsNav() {
  const openExternelLink = (url: string) => {
    open(url)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='relative'>
          <EllipsisVertical className='h-4 w-4 text-primary' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuItem className='flex justify-between items-center'>
          Coleções
          <Combine className='h-4 w-4 text-primary' />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='flex justify-between items-center'
            onClick={() =>
              openExternelLink(
                'https://github.com/iuryfranca/sort-list-android'
              )
            }>
            Sobre mim
            <Linkedin className='h-4 w-4 text-primary' />
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex justify-between items-center'
            onClick={() =>
              openExternelLink('https://www.linkedin.com/in/iury-franca')
            }>
            Sobre o projeto
            <Github className='h-4 w-4 text-primary' />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex justify-between items-center'>
          Login
          <span>(em breve)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
