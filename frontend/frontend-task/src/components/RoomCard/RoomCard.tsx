import styles from "./RoomCard.module.css"

type RoomCardProps = {
  name: string,
  roomsAvailable: number,
  buildingPicture: string
}

export default function RoomCard({ name, roomsAvailable, buildingPicture }: RoomCardProps) {
  return (
    <div 
      className={styles.container}
      style={{ backgroundImage: `url(${buildingPicture})` }}
    >
      <div className={styles.roomsAvailable}>
        <div className={styles.status}/>
        {roomsAvailable} rooms available
      </div>
      <div className={styles.buildingName}>{name}</div>
    </div>
  )
}