import styles from "./Button.module.css";

type Props = {
  onClickCB: () => void;
  title: string;
};

export default function Button({ onClickCB, title = "Test" }: Props) {
  return <button className={styles.container}>{title}</button>;
}
