import styles from "./App.module.css"
import Navbar from './components/Navbar/Navbar'
import RoomCard from './components/RoomCard/RoomCard'
import Searchbar from './components/Searchbar/Searchbar'
import dataJson from "./data.json"

function App() {
  type Data = {
    name: string,
    rooms_available: number,
    building_picture: string
  }  

  const data = dataJson as Data[];

  return (
    <>
      <Navbar/>
      <div className={styles.container}>
        <Searchbar/>
        <div className={styles.roomsContainer}>
          { 
            data.map(d => <RoomCard 
                name={d.name}
                roomsAvailable={d.rooms_available}
                buildingPicture={`room_images/${d.building_picture}`}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
