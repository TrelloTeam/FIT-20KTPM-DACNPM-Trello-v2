import SidebarTemplate from '../Templates/component/SidebarTemplate'
import CardTemplate from '../Templates/component/CardTemplate'
import '../../styles/templates.css';

export function Templates() {
  return (
    <>
      <div className="container">
        <div className="sidebar-container">
          <SidebarTemplate />
        </div>
        <div className="card-container">
          <CardTemplate />
        </div>
      </div>
      
    </>
  )
}
