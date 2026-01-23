import type { MerchantStatus, RiskLevel } from "../../configs/merchants";
import StatusButton from "../UI/StatusButton/StatusButton";
import styles from "./MerchantStatusRiskSection.module.css";

interface MerchantStatusRiskSectionProps {
    status: MerchantStatus;
    riskLevel: RiskLevel;
    onStatusChange: (status: MerchantStatus) => void;
    onRiskLevelChange: (riskLevel: RiskLevel) => void;
}

export default function MerchantStatusRiskSection({
    status,
    riskLevel,
    onStatusChange,
    onRiskLevelChange,
}: MerchantStatusRiskSectionProps) {
    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <div className={styles.buttonGroup}>
                    <StatusButton
                        label="active"
                        isActive={status === "active"}
                        onClick={() => onStatusChange("active")}
                    />
                    <StatusButton
                        label="paused"
                        isActive={status === "paused"}
                        onClick={() => onStatusChange("paused")}
                    />
                    <StatusButton
                        label="blocked"
                        isActive={status === "blocked"}
                        onClick={() => onStatusChange("blocked")}
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Risk Level</label>
                <div className={styles.buttonGroup}>
                    <StatusButton
                        label="low"
                        isActive={riskLevel === "low"}
                        onClick={() => onRiskLevelChange("low")}
                    />
                    <StatusButton
                        label="medium"
                        isActive={riskLevel === "medium"}
                        onClick={() => onRiskLevelChange("medium")}
                    />
                    <StatusButton
                        label="high"
                        isActive={riskLevel === "high"}
                        onClick={() => onRiskLevelChange("high")}
                    />
                </div>
            </div>
        </div>
    );
}

