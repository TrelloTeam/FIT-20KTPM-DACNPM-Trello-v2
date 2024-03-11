import { ReactNode } from 'react'
import backgroundImage from '../../assets/Board/bg_2.jpg';
interface LayoutProps {
  children: ReactNode,
  openCardSetting:string
}
export const BoardLayout: React.FC<LayoutProps> = ({ children, openCardSetting }) => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.7,
  };
  return (
    <div className={`relative min-h-screen `}>
      
      <div className={`absolute inset-0`} style={backgroundStyle} />
      <main className={`relative z-0 min-h-screen ${openCardSetting ? 'pointer-events-none':''}`}>{children}</main>
    </div>
  )
}
