import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}
export const BoardLayout: React.FC<LayoutProps> = ({ children }) => {
  const bg_path = '../../assets/Board/bg_2.jpg'
  return (
    <div className='relative min-h-screen'>
      <div className='absolute inset-0 bg-cover bg-center opacity-70' style={{ backgroundImage: `url(${bg_path})` }} />
      <main className='relative z-10'>{children}</main>
    </div>
  )
}
