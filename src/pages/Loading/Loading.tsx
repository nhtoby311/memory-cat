import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div></div>
      <div className={styles.container}>
        <div className={`g-container ${styles["cards-cont"]}`}>
          <Card />
          <Card />
          <Card />
        </div>
        <div className={`g-container ${styles["descrip-cont"]}`}>
          <p>
            Find and match the same pair of cards, by click to flip the card
            over. Try to find the pair above to continue.
          </p>
        </div>
        <div className={`g-container ${styles["percentage-cont"]}`}>
          <span>88%</span>
          <Button title="Single Player" />
          <Button title="Multi Player" />
        </div>
      </div>
    </>
  );
}
