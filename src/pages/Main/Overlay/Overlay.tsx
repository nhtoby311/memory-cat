import styles from "./Overlay.module.css";

export default function Overlay() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>asd</div>
        <div>00:20</div>
      </div>

      <div className={styles.middle}>
        <div>mid</div>
        <div>mid</div>
      </div>

      <div className={styles.bottom}>
        <div>bot</div>
        <div>bot-r</div>
      </div>
    </div>
  );
}
