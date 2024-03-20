import { RiEBike2Line } from 'react-icons/ri'
export default function DemoButtons() {
  return (
    <div className='flex flex-col items-center justify-items-center'>
      <button className={`rounded-full bg-green-300`}>
        <RiEBike2Line />
      </button>
      <div>
        <p>Moto Bike</p>
      </div>
    </div>
  )
}
