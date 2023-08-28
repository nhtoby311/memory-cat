import MenuSVG from "../../../SVG/MenuSVG";
import styles from "./Overlay.module.css";

export default function Overlay() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div></div>
        <div className={styles.display}>
          <p className={styles.currentCounter}>00:20</p>
          <p className={styles.highCounter}>00:12</p>
        </div>
      </div>

      <div className={styles.middle}>
        <div></div>
        <div className={styles.svgBubble}>
          <MenuSVG color="white" />
        </div>
      </div>

      <div className={styles.bottom}>
        <div>Restart Game</div>
        <div className={styles.svgBubble}>
          <MenuSVG color="white" />
        </div>
      </div>
    </div>
  );
}
