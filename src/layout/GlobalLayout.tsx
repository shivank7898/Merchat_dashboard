import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import Header from "../components/UI/Header/Header";
import styles from "./GlobalLayout.module.css";

export default function GlobalLayout() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        // Apply theme to root element
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            return newTheme;
        });
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header theme={theme} onThemeToggle={toggleTheme} />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
