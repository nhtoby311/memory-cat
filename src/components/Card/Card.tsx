import styles from "./Card.module.css";
import Tilt from "react-parallax-tilt";

type Props = {
  active?: boolean;
  onClickCB?: () => void;
  url: string;
};

export default function Card({ active, onClickCB, url }: Props) {
  return (
    <Tilt
      // glareEnable={true}
      // glareMaxOpacity={0.1}
      // glareColor="#ffffff"
      // glarePosition="bottom"
      // glareBorderRadius="10px"
      tiltReverse={true}
    >
      <div className={styles.container} onClick={onClickCB}>
        <div
          className={`${styles.content}`}
          data-active={active ? true : false}
        >
          <div className={styles.back}>
            <div className={styles["back-pattern"]} />
          </div>
          <div className={styles.front}>
            <img className={styles.image} src={url} alt="cat picture" />
          </div>
        </div>
      </div>
    </Tilt>
  );
}
