import { CardComponentProps, Card } from '../type'

export function CardComponent({ card }: CardComponentProps) {
  return (
    <>
      <div
        key={card.id}
        className='m-5 rounded-lg border p-2 text-center'
        // onDragStart={(e) => handleOnDrag(e)}
        // onDrop={(e) => handleOnDrop(e)}
        // onDragOver={handleDragOver}
      >
        <p>{card.order + '-' + card.name}</p>
      </div>
    </>
  )
}
