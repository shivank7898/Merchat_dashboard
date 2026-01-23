import { useEffect, useRef, useState, useCallback } from "react";
import Card from "../Card/Card";
import styles from "./CustomTable.module.css";

export interface TableColumn<T = any> {
    key: string;
    header: string | React.ReactNode;
    render?: (row: T, index: number) => React.ReactNode;
    width?: string;
}

export interface CustomTableProps<T = any> {
    columns: TableColumn<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    maxHeight?: string;
    onLoadMore?: () => void;
    hasMore?: boolean;
    getRowKey?: (row: T, index: number) => string;
}

export default function CustomTable<T = any>({
    columns,
    data,
    loading = false,
    emptyMessage = "No data available",
    maxHeight = "600px",
    onLoadMore,
    hasMore = false,
    getRowKey = (_, index) => `row-${index}`,
}: CustomTableProps<T>) {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const loadingRef = useRef(false);
    const onLoadMoreRef = useRef(onLoadMore);
    const loadingRefValue = useRef(loading);
    const hasMoreRef = useRef(hasMore);

    useEffect(() => {
        onLoadMoreRef.current = onLoadMore;
        loadingRefValue.current = loading;
        hasMoreRef.current = hasMore;
    }, [onLoadMore, loading, hasMore]);

    const handleScroll = useCallback(() => {
        if (!tbodyRef.current || loadingRefValue.current || !hasMoreRef.current || loadingRef.current || !onLoadMoreRef.current) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = tbodyRef.current;

        if (scrollHeight <= clientHeight) {
            return;
        }

        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

        if (scrollPercentage >= 0.8) {
            loadingRef.current = true;
            setIsLoadingMore(true);
            onLoadMoreRef.current();
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            setIsLoadingMore(false);
            loadingRef.current = false;
        }
    }, [loading, data.length]);

    useEffect(() => {
        const tbody = tbodyRef.current;
        if (!tbody) return;

        tbody.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            tbody.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!tbodyRef.current || !hasMoreRef.current || loadingRefValue.current || !onLoadMoreRef.current) return;

        const { scrollHeight, clientHeight } = tbodyRef.current;

        if (scrollHeight <= clientHeight && data.length > 0 && !loadingRef.current) {
            loadingRef.current = true;
            setIsLoadingMore(true);
            onLoadMoreRef.current();
        }
    }, [data.length]);

    const renderCell = useCallback(
        (column: TableColumn<T>, row: T, index: number) => {
            if (column.render) {
                return column.render(row, index);
            }
            return (row as any)[column.key] ?? "";
        },
        []
    );

    const isEmpty = !loading && data.length === 0;
    const isInitialLoading = loading && data.length === 0;

    return (
        <Card className={styles.tableCard}>
            {isEmpty ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyMessage}>{emptyMessage}</p>
                </div>
            ) : (
                <div className={styles.tableWrapper} style={{ height: maxHeight }}>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.key} style={{ width: column.width }}>
                                            {column.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody ref={tbodyRef}>
                                {isInitialLoading
                                    ? Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={`skeleton-${index}`}>
                                            {columns.map((column) => (
                                                <td key={column.key}>
                                                    <div className={styles.skeleton} style={{ width: "100%" }} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                    : data.map((row, index) => (
                                        <tr key={getRowKey(row, index)}>
                                            {columns.map((column) => (
                                                <td key={column.key}>{renderCell(column, row, index)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                {hasMore && data.length > 0 && (isLoadingMore || loading) && (
                                    <tr>
                                        <td colSpan={columns.length} className={styles.loadMoreCell}>
                                            <div className={styles.loadingMore}>
                                                <div className={styles.skeleton} style={{ width: "100%" }} />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Card>
    );
}