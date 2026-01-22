import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Card from "../Card/Card";
import type { MerchantStatus, RiskLevel } from "../../../configs/merchants";
import styles from "./MerchantFilters.module.css";

interface MerchantFiltersProps {
    selectedStatuses: MerchantStatus[];
    selectedRiskLevels: RiskLevel[];
    onStatusChange: (status: MerchantStatus) => void;
    onRiskLevelChange: (riskLevel: RiskLevel) => void;
}

export default function MerchantFilters({
    selectedStatuses,
    selectedRiskLevels,
    onStatusChange,
    onRiskLevelChange,
}: MerchantFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const statuses: MerchantStatus[] = ["active", "paused", "blocked"];
    const riskLevels: RiskLevel[] = ["low", "medium", "high"];

    return (
        <Card className={styles.filtersCard}>
            <div className={styles.filtersContainer}>
                <button
                    className={styles.filterToggle}
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label="Toggle filters"
                >
                    <span>Filter</span>
                    {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>

                <div
                    className={`${styles.filtersContent} ${isExpanded ? styles.expanded : ""}`}
                >
                    <div className={styles.filterSection}>
                        <span className={styles.filterLabel}>Status:</span>
                        <div className={styles.filterButtons}>
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    className={`${styles.filterButton} ${selectedStatuses.includes(status) ? styles.active : ""
                                        }`}
                                    onClick={() => onStatusChange(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <span className={styles.filterLabel}>Risk:</span>
                        <div className={styles.filterButtons}>
                            {riskLevels.map((riskLevel) => (
                                <button
                                    key={riskLevel}
                                    className={`${styles.filterButton} ${selectedRiskLevels.includes(riskLevel) ? styles.active : ""
                                        }`}
                                    onClick={() => onRiskLevelChange(riskLevel)}
                                >
                                    {riskLevel}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
