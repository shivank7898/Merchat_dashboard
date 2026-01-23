import type { ReactNode } from "react";
import Card from "../UI/Card/Card";
import styles from "./StatCard.module.css";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    onClick?: () => void;
    isActive?: boolean;
}

export default function StatCard({
    title,
    value,
    icon,
    trend,
    onClick,
    isActive = false,
}: StatCardProps) {
    return (
        <Card className={isActive ? styles.activeCard : ""}>
            <div
                className={`${styles.statCard} ${onClick ? styles.clickable : ""}`}
                onClick={onClick}
                role={onClick ? "button" : undefined}
                tabIndex={onClick ? 0 : undefined}
                onKeyDown={
                    onClick
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onClick();
                            }
                        }
                        : undefined
                }
            >
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    {icon && <div className={styles.icon}>{icon}</div>}
                </div>
                <div className={styles.value}>{value}</div>
                {trend && (
                    <div
                        className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative
                            }`}
                    >
                        {trend.isPositive ? "↑" : "↓"} {trend.value}
                    </div>
                )}
            </div>
        </Card>
    );
}

