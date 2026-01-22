import type { Merchant } from "../../../configs/merchants";
import { formatCurrency } from "../../../utils/formatters";
import styles from "./MerchantView.module.css";

interface MerchantViewProps {
    merchant: Merchant;
}

export default function MerchantView({ merchant }: MerchantViewProps) {

    return (
        <>
            <div className={styles.detailSection}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Merchant ID:</span>
                    <span className={styles.value}>{merchant.id}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Name:</span>
                    <span className={styles.value}>{merchant.name}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Country:</span>
                    <span className={styles.value}>{merchant.country}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Monthly Volume:</span>
                    <span className={styles.value}>
                        {formatCurrency(merchant.monthlyVolume)}
                    </span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Chargeback Ratio:</span>
                    <span className={styles.value}>
                        {merchant.chargebackRatio.toFixed(2)}%
                    </span>
                </div>
            </div>
        </>
    );
}

