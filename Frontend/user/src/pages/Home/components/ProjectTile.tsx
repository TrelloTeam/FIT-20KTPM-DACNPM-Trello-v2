
import StarBorderIcon from '@mui/icons-material/StarBorder'

const ProjectTile = () => {
  return (
    <div data-testid='home-tile-Project Trello' className='div-card-project-viewed'>
      <a href='/b/nkiHj9Gg/project-trello' className='div-content-card'>
        <div
          className='div-image-card'
          style={{
            backgroundImage:
              'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/09b457ee43a8833c515e9d3d5796f59f/photo-1698859858637-9aa64302f629.jpg")'
          }}
        ></div>
        <span className='div-content-reveiwed'>
          <span className='content-project-reveiwed'>Project Trello</span>
          <span className='content-workspace-reveiwed'>Âu Hồng Minh's workspace</span>
        </span>
      </a>
      <button
        data-testid='home-tile-secondary-button-Project Trello'
        title='Click to star Project Trello. It will show up at the top of your boards list.'
        className='button-to-vote-star'
      >
        <span className='icon-star icon-sm icon-of-button-star'>
          <StarBorderIcon fontSize='small' />
        </span>
      </button>
    </div>
  )
}

export default ProjectTile
