import MerchantsTable from "../../components/MerchantsTable/MerchantsTable";
import styles from "./Merchants.module.css";

export default function Merchants() {
  return (
    <div className={styles.merchants}>
      <div className={styles.content}>
        <MerchantsTable />
      </div>
    </div>
  );
}

