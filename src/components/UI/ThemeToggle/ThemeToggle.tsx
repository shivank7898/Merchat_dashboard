import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Light Mood</span>
      <button
        className={`${styles.toggle} ${theme === "light" ? styles.active : ""}`}
        onClick={onToggle}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        role="switch"
        aria-checked={theme === "light"}
      >
        <span className={styles.slider}></span>
      </button>
    </div>
  );
}

