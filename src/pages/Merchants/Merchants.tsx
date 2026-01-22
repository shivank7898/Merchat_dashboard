import MerchantsTable from "../../components/UI/MerchantsTable/MerchantsTable";
import styles from "./Merchants.module.css";

export default function Merchants() {
  return (
    <div className={styles.merchants}>
      {/* <h2 className={styles.title}>Merchants</h2> */}
      <div className={styles.content}>
        <MerchantsTable />
      </div>
    </div>
  );
}

