import { NavLink } from "react-router-dom";
import { menuItems } from "../../../configs";
import type { MenuItem } from "../../../configs/menuItems";
import styles from "./Sidebar.module.css";
import { logo } from "../../../assets";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" className={styles.logoIcon} />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item: MenuItem) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.menuItem} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.icon}>
                    <IconComponent size={20} />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* <div className={styles.themeToggleContainer}>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div> */}
    </aside>
  );
}

