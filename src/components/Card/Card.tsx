import styles from "./Card.module.css";

export default function Card() {
  return (
    <div className={styles.container}>
      <div className={styles["back-pattern"]}></div>
    </div>
  );
}
