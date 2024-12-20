import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Combine, EllipsisVertical, Github, Linkedin } from 'lucide-react'

export function OptionsNav() {
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
          <DropdownMenuItem className='flex justify-between items-center'>
            <a href='https://github.com/iuryfranca/sort-list-android'>
              Sobre mim
            </a>
            <Linkedin className='h-4 w-4 text-primary' />
          </DropdownMenuItem>
          <DropdownMenuItem className='flex justify-between items-center'>
            <a href='https://www.linkedin.com/in/iury-franca'>
              Sobre o projeto
            </a>
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
