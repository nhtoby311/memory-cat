import { useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Loading.module.css";

export default function Loading() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <>
      <div></div>
      <div className={styles.container}>
        <div className={`g-container ${styles["cards-cont"]}`}>
          <Card
            onClickCB={() => {
              setActiveCard(0);
            }}
            active={activeCard === 0}
          >
            1
          </Card>
          <Card onClickCB={() => setActiveCard(1)} active={activeCard === 1}>
            2
          </Card>
          <Card onClickCB={() => setActiveCard(2)} active={activeCard === 2}>
            1
          </Card>
        </div>
        <div className={`g-container ${styles["descrip-cont"]}`}>
          <p>
            Find and match the same pair of cards, by click to flip the card
            over. Try to find the pair above to continue.
          </p>
        </div>
        <div className={`g-container ${styles["percentage-cont"]}`}>
          {/* <span>88%</span> */}
          <Button title="Single Player" />
          <Button title="Multi Player" />
        </div>
      </div>
    </>
  );
}
