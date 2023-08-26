import styles from "./Card.module.css";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  onClickCB?: () => void;
};

export default function Card({ children, active, onClickCB }: Props) {
  return (
    <div className={styles.container} onClick={onClickCB}>
      <div className={`${styles.content}`} data-active={active ? true : false}>
        <div className={styles.back}>
          <div className={styles["back-pattern"]} />
        </div>
        <div className={styles.front}>{children}</div>
      </div>
    </div>
  );
}
