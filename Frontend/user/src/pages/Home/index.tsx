import StarBorderIcon from '@mui/icons-material/StarBorder'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CardHightLightContent from './components/CardHighLightUI'
import ProjectTile from './components/ProjectTile'
import './home.css'
import SidebarTemplate from '~/components/SidebarTemplate'

export default function HomePage() {
  return (
    <>
      <div className='home-container'>
        <div className='home-sticky-container -p'>
          <nav className='home-left-sidebar-container'>
            <SidebarTemplate />
          </nav>

          {/* highlight main content */}
          <div className='home-main-content-container'>
            <div className='home-main-content-item'>
              <div className='div-item'>
                {/* content: Icon + HighLight */}
                <div className='highlight-content'>
                  <div className='icon-highlight'>
                    <span className='nch-icon home-page-main-icon-heart neoUEAwI0GETBQ mb-1'>
                      <StarBorderIcon fontSize='medium' />
                    </span>
                  </div>
                  <div className='content-highlight'>Highlights</div>
                </div>
                {/* end */}

                {/* annoucement */}
                <div className='RN8jBKHlQoem5U'>{/* Add your content for recently viewed boards here */}</div>
                {/* end annoucement */}

                <ul data-testid='home-highlights-list'>
                  {/* Add card highlight items here */}
                  {/* <CardHighlight
                    title="New Tasks"
                    backgroundImage="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x144/09b457ee43a8833c515e9d3d5796f59f/photo-1698859858637-9aa64302f629.jpg"
                    workspaceName="Âu Hồng Minh's workspace"
                    projectName="Project Trello"
                    taskStatus="Fixing"
                    dueDate="Jan 22"
                    attachmentsCount={1}
                    checklistCount="1/2"
                    memberAvatar="https://trello-members.s3.amazonaws.com/659d431a88de3dfb7125d877/d89bc89446cada8ea6cc1cdff85a4452/50.png"
                    memberName="tdtien20"
                    commentText="Do this task"
                  /> */}

                  <CardHightLightContent />
                  <CardHightLightContent />
                  <CardHightLightContent />
                  <CardHightLightContent />

                  {/* end add highlight */}
                </ul>
              </div>
            </div>
          </div>

          {/* right side bar home */}
          <div className='home-right-sidebar-container'>
            <div className='home-recently-veiwed' data-testid='home-recently-viewed-boards-container'>
              <div className='div-title-recently'>
                <div className='div-icon-clock-recently'>
                  <span className='nch-icon Inlinebl-lineh1 neoUEAwI0GETBQ'>
                    <AccessTimeIcon />
                  </span>
                </div>
                <div className='content-highlight'>Recently viewed</div>
              </div>

              {/* card home tile */}
              {/* <HomeTile
                href="/b/nkiHj9Gg/project-trello"
                imageSrc="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/09b457ee43a8833c515e9d3d5796f59f/photo-1698859858637-9aa64302f629.jpg"
                projectName="Project Trello"
                workspaceName="Âu Hồng Minh's workspace"
              /> */}

              <ProjectTile />
              <ProjectTile />
              <ProjectTile />
              <ProjectTile />
              <ProjectTile />

              {/* end home tile */}
            </div>

            <div className='iSLLvvYdGSEgKr'>
              <div className='div-title-recently'>
                <div className='content-highlight'>Links</div>
              </div>
              <div className='div-card-project-viewed'>
                <button className='div-content-card'>
                  <span className='icon-add icon-sm dhuVRdSD87x8HI'></span>
                  <span className='div-content-reveiwed'>
                    <span className='BLp8MvEmT8PnRm'>Create a board</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
