import styles from "./SvgIcon.module.css";

interface SvgIconProps {
    src: string;
    alt?: string;
    className?: string;
    size?: number;
}

/**
 * Component for rendering SVG icons
 * Use this component when you need to display SVG files from assets/icons
 */
export default function SvgIcon({
    src,
    alt = "icon",
    className = "",
    size = 24,
}: SvgIconProps) {
    return (
        <img
            src={src}
            alt={alt}
            className={`${styles.svgIcon} ${className}`}
            style={{ width: size, height: size }}
        />
    );
}

