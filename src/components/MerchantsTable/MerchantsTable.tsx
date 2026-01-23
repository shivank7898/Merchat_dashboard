import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import CustomTable, { type TableColumn } from "../UI/CustomTable/CustomTable";
import MerchantFilters from "./MerchantFilters";
import MerchantDetailModal from "../MerchantDetailModal/MerchantDetailModal";
import Card from "../UI/Card/Card";
import { useMerchantStore } from "../../store/merchantStore";
import { formatCurrency } from "../../utils/formatters";
import type { Merchant, MerchantStatus, RiskLevel } from "../../configs";
import { ArrowUp, ArrowDown, Pencil, Eye, Plus } from "lucide-react";
import styles from "./MerchantsTable.module.css";

type SortField = "monthlyVolume" | "chargebackRatio" | null;
type SortDirection = "asc" | "desc";

export default function MerchantsTable() {
    const { merchants } = useMerchantStore();
    const [displayedMerchants, setDisplayedMerchants] = useState<Merchant[]>(
        merchants.slice(0, 2)
    );
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(merchants.length > 10);
    const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);
    const isLoadingRef = useRef(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<MerchantStatus[]>([]);
    const [selectedRiskLevels, setSelectedRiskLevels] = useState<RiskLevel[]>([]);
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const filteredAndSortedMerchants = useMemo(() => {
        let result = [...merchants];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter((merchant) =>
                merchant.name.toLowerCase().includes(query)
            );
        }

        if (selectedStatuses.length > 0) {
            result = result.filter((merchant) =>
                selectedStatuses.includes(merchant.status)
            );
        }

        if (selectedRiskLevels.length > 0) {
            result = result.filter((merchant) =>
                selectedRiskLevels.includes(merchant.riskLevel)
            );
        }

        if (sortField) {
            result.sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];
                const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                return sortDirection === "asc" ? comparison : -comparison;
            });
        }

        return result;
    }, [merchants, searchQuery, selectedStatuses, selectedRiskLevels, sortField, sortDirection]);

    useEffect(() => {
        if (filteredAndSortedMerchants.length > 0) {
            const newDisplayed = filteredAndSortedMerchants.slice(0, 10);
            setDisplayedMerchants(newDisplayed);
            setHasMore(filteredAndSortedMerchants.length > newDisplayed.length);
        } else {
            setDisplayedMerchants([]);
            setHasMore(false);
        }
    }, [filteredAndSortedMerchants]);

    const handleLoadMore = useCallback(() => {
        if (loading || !hasMore || isLoadingRef.current) return;

        isLoadingRef.current = true;
        setLoading(true);
        setTimeout(() => {
            setDisplayedMerchants((prev) => {
                const currentLength = prev.length;
                const nextBatch = filteredAndSortedMerchants.slice(currentLength, currentLength + 10);

                if (nextBatch.length > 0) {
                    const newLength = currentLength + nextBatch.length;
                    setHasMore(newLength < filteredAndSortedMerchants.length);
                    return [...prev, ...nextBatch];
                } else {
                    setHasMore(false);
                    return prev;
                }
            });
            setLoading(false);
            isLoadingRef.current = false;
        }, 1000);
    }, [loading, hasMore, filteredAndSortedMerchants]);

    const handleStatusChange = useCallback((status: MerchantStatus) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
        setDisplayedMerchants(filteredAndSortedMerchants.slice(0, 10));
    }, [filteredAndSortedMerchants]);

    const handleRiskLevelChange = useCallback((riskLevel: RiskLevel) => {
        setSelectedRiskLevels((prev) =>
            prev.includes(riskLevel)
                ? prev.filter((r) => r !== riskLevel)
                : [...prev, riskLevel]
        );
        setDisplayedMerchants(filteredAndSortedMerchants.slice(0, 10));
    }, [filteredAndSortedMerchants]);

    const handleSort = useCallback((field: SortField) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
        setDisplayedMerchants(filteredAndSortedMerchants.slice(0, 10));
    }, [sortField, filteredAndSortedMerchants]);

    const renderSortIcon = (field: SortField) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? (
            <ArrowUp size={14} />
        ) : (
            <ArrowDown size={14} />
        );
    };

    const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");

    const handleView = useCallback((merchant: Merchant) => {
        setSelectedMerchantId(merchant.id);
        setModalMode("view");
    }, []);

    const handleEdit = useCallback((merchant: Merchant) => {
        setSelectedMerchantId(merchant.id);
        setModalMode("edit");
    }, []);

    const handleCreate = useCallback(() => {
        setSelectedMerchantId(null);
        setModalMode("create");
    }, []);

    const columns: TableColumn<Merchant>[] = [
        {
            key: "name",
            header: "Name",
            render: (merchant) => (
                <span className={styles.merchantName}>
                    {merchant.name}
                </span>
            ),
        },
        {
            key: "country",
            header: "Country",
        },
        {
            key: "status",
            header: "Status",
            render: (merchant) => (
                <span
                    className={`${styles.status} ${styles[merchant.status]}`}
                >
                    {merchant.status}
                </span>
            ),
        },
        {
            key: "monthlyVolume",
            header: (
                <div className={styles.sortableHeader}>
                    Monthly Volume
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSort("monthlyVolume");
                        }}
                        aria-label="Sort by monthly volume"
                    >
                        {renderSortIcon("monthlyVolume") || <ArrowUp size={14} style={{ opacity: 0.3 }} />}
                    </span>
                </div>
            ),
            render: (merchant) => formatCurrency(merchant.monthlyVolume),
        },
        {
            key: "chargebackRatio",
            header: (
                <div className={styles.sortableHeader}>
                    Chargeback Ratio
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSort("chargebackRatio");
                        }}
                        aria-label="Sort by chargeback ratio"
                    >
                        {renderSortIcon("chargebackRatio") || <ArrowUp size={14} style={{ opacity: 0.3 }} />}
                    </span>
                </div>
            ),
            render: (merchant) => `${merchant.chargebackRatio.toFixed(2)}%`,
        },
        {
            key: "riskLevel",
            header: "Risk Level",
            render: (merchant) => (
                <span
                    className={`${styles.riskLevel} ${styles[merchant.riskLevel]}`}
                >
                    {merchant.riskLevel}
                </span>
            ),
        },
        {
            key: "actions",
            header: "",
            render: (merchant) => (
                <div className={styles.actionsContainer}>
                    <button
                        className={styles.actionButton}
                        onClick={() => handleView(merchant)}
                        aria-label="View merchant"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        className={styles.actionButton}
                        onClick={() => handleEdit(merchant)}
                        aria-label="Edit merchant"
                    >
                        <Pencil size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.searchFilterRow}>
                <div className={styles.searchFilterRowContent}>
                    <MerchantFilters
                        selectedStatuses={selectedStatuses}
                        selectedRiskLevels={selectedRiskLevels}
                        onStatusChange={handleStatusChange}
                        onRiskLevelChange={handleRiskLevelChange}
                    />

                    <Card className={styles.searchCard}>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setDisplayedMerchants(filteredAndSortedMerchants.slice(0, 10));
                            }}
                            className={styles.searchInput}
                        />
                    </Card>
                </div>

                <button className={styles.createButton} onClick={handleCreate}>
                    <Plus size={18} />
                    Create Merchant
                </button>
            </div>

            <CustomTable
                columns={columns}
                data={displayedMerchants}
                loading={false}
                emptyMessage="No merchants found"
                maxHeight="600px"
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                getRowKey={(merchant) => merchant.id}
            />

            {(selectedMerchantId !== null || modalMode === "create") && (
                <MerchantDetailModal
                    merchantId={selectedMerchantId}
                    onClose={() => {
                        setSelectedMerchantId(null);
                        setModalMode("view");
                    }}
                    mode={modalMode}
                />
            )}
        </div>
    );
}
