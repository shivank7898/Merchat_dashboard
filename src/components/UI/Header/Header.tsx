import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import menuItems from "../../../configs/menuItems";
import { logo } from "../../../assets";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import type { MenuItem } from "../../../configs/menuItems";
import styles from "./Header.module.css";

interface HeaderProps {
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export default function Header({ theme, onThemeToggle }: HeaderProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={`${styles.header} ${isMobileMenuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.headerTop}>
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>
          <h1 className={styles.title}>Merchant Ops Dashboard</h1>
        </div>
        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <button
            className={styles.hamburgerBtn}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.menuOpen : ""}`}>
        <ul className={styles.mobileMenuList}>
          {menuItems.map((item: MenuItem) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`${styles.mobileMenuItem} ${isActive ? styles.active : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

