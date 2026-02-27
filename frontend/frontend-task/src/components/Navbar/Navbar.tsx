import styles from "./Navbar.module.css"
import freeRoomsLogo from "../../assets/freeRoomsLogo.png"
import freeRoomsLogoClosed from "../../assets/freeroomsDoorClosed.png"
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(true);
  
  const sections = ["search", "grid_view", "map", "dark_mode"] as const;
  const [clicked, setClicked] = useState<typeof sections[number]>();

  return (
    <div className={styles.container}>
      <div className={styles.logo} onClick={() => setOpen(prev => !prev)}>
        <img className={styles.logoIcon} src={open ? freeRoomsLogo : freeRoomsLogoClosed} alt="Freerooms Logo" />
        <h1 className={styles.logoName}>Freerooms</h1>
      </div>
      <div className={styles.iconsContainer}>
        {
          sections.map(s => {
            return (
              <button 
                className={`${styles.icon} ${clicked === s ? styles.iconClicked: ""}`}
                onClick={() => setClicked(s)}
              >
                <span className="material-symbols-outlined">{s}</span>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}