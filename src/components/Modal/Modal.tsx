import styles from "./Modal.module.css";

export default function Modal({ children }: any) {
  return <div className={styles.wrapper}>{children}</div>;
}
