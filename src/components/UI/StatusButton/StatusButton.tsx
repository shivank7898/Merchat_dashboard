import styles from "./StatusButton.module.css";

interface StatusButtonProps {
    label: string;
    isActive: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

export default function StatusButton({
    label,
    isActive,
    onClick,
    disabled = false,
}: StatusButtonProps) {
    return (
        <button
            className={`${styles.statusButton} ${isActive ? styles.active : ""}`}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            <span className={styles.indicator}></span>
            <span className={styles.label}>{label}</span>
        </button>
    );
}

