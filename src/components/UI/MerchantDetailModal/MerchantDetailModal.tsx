import { useState, useEffect, useRef } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useMerchantStore } from "../../../store/merchantStore";
import type { MerchantStatus, RiskLevel, Merchant } from "../../../configs/merchants";
import MerchantForm, { type MerchantFormData } from "../MerchantForm/MerchantForm";
import MerchantView from "../MerchantView/MerchantView";
import MerchantStatusRiskSection from "../MerchantStatusRiskSection/MerchantStatusRiskSection";
import Card from "../Card/Card";
import styles from "./MerchantDetailModal.module.css";

interface MerchantDetailModalProps {
    merchantId: string | null;
    onClose: () => void;
    mode?: "view" | "edit" | "create";
}

export default function MerchantDetailModal({
    merchantId,
    onClose,
    mode = "view",
}: MerchantDetailModalProps) {
    const { merchants, updateMerchant, addMerchant } = useMerchantStore();
    const [currentMode, setCurrentMode] = useState<"view" | "edit" | "create">(mode);
    const [status, setStatus] = useState<MerchantStatus | "">("");
    const [riskLevel, setRiskLevel] = useState<RiskLevel | "">("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<MerchantStatus | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef<{ getFormData: () => MerchantFormData | null }>({ getFormData: () => null });

    const merchant = merchantId
        ? merchants.find((m) => m.id === merchantId)
        : null;

    useEffect(() => {
        if (merchant) {
            setStatus(merchant.status);
            setRiskLevel(merchant.riskLevel);
        }
        if (mode !== currentMode) {
            setCurrentMode(mode);
        }
    }, [merchantId, mode, currentMode, merchant]);

    const currentStatus = status || merchant?.status;
    const currentRiskLevel = riskLevel || merchant?.riskLevel;
    const showWarning = merchant?.chargebackRatio && merchant.chargebackRatio > 2 && currentStatus === "active";

    const hasChanges =
        (status !== "" && status !== merchant?.status) ||
        (riskLevel !== "" && riskLevel !== merchant?.riskLevel);

    const handleStatusChange = (newStatus: MerchantStatus) => {
        if (newStatus === "active" && currentRiskLevel === "high") {
            // Show confirmation for high risk + active status
            setPendingStatus(newStatus);
            setShowConfirmation(true);
        } else {
            setStatus(newStatus);
        }
    };

    const handleRiskLevelChange = (newRiskLevel: RiskLevel) => {
        setRiskLevel(newRiskLevel);
    };


    const handleConfirmStatusChange = () => {
        if (pendingStatus) {
            setStatus(pendingStatus);
            setShowConfirmation(false);
            setPendingStatus(null);
        }
    };

    const handleCancelStatusChange = () => {
        setShowConfirmation(false);
        setPendingStatus(null);
    };

    const handleSave = () => {
        if (currentMode === "view") {
            // View mode: only update status and risk level
            if (merchant?.id && status && riskLevel) {
                updateMerchant(merchant.id, {
                    status: status as MerchantStatus,
                    riskLevel: riskLevel as RiskLevel,
                });
                onClose();
            }
        } else {
            // Edit or Create mode: get form data and save
            const formData = formRef.current?.getFormData();
            if (!formData) return;

            if (currentMode === "create") {
                // Create new merchant
                const newMerchant: Merchant = {
                    id: `merchant-${Date.now()}`,
                    name: formData.name,
                    country: formData.country,
                    status: status as MerchantStatus,
                    monthlyVolume: formData.monthlyVolume,
                    chargebackRatio: formData.chargebackRatio ?? 0,
                    riskLevel: riskLevel as RiskLevel,
                    // Default values for dashboard fields
                    volume: formData.monthlyVolume,
                    successRate: 95,
                    transactions: Math.floor(formData.monthlyVolume / 100),
                    lastActivity: new Date().toISOString().split("T")[0],
                    monthlyData: [],
                };
                addMerchant(newMerchant);
                onClose();
            } else if (currentMode === "edit" && merchant?.id) {
                // Update existing merchant
                updateMerchant(merchant.id, {
                    name: formData.name,
                    country: formData.country,
                    status: status as MerchantStatus,
                    monthlyVolume: formData.monthlyVolume,
                    chargebackRatio: formData.chargebackRatio ?? 0,
                    riskLevel: riskLevel as RiskLevel,
                });
                onClose();
            }
        }
    };

    // Check if save button should be enabled
    const canSave = currentMode === "view"
        ? hasChanges
        : isFormValid;

    // Get button text based on mode
    const getButtonText = () => {
        if (currentMode === "create") return "Create";
        if (currentMode === "edit") return "Update";
        return "Save";
    };

    // If no merchant found and not in create mode, don't render
    if (!merchant && currentMode !== "create") return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <Card className={styles.modalCard}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>
                            {currentMode === "create"
                                ? "Create Merchant"
                                : merchant?.name || "Merchant Details"}
                        </h2>
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {showWarning && currentMode === "view" && (
                        <div className={styles.warningBanner}>
                            <AlertTriangle size={20} />
                            <span>
                                Warning: This merchant has a chargeback ratio above 2% and is
                                currently active.
                            </span>
                        </div>
                    )}

                    {showConfirmation && (
                        <div className={styles.confirmationBanner}>
                            <div className={styles.confirmationContent}>
                                <span>
                                    <AlertTriangle size={20} />
                                    Are you sure you want to set status to active for a high-risk merchant?
                                </span>
                                <div className={styles.confirmationButtons}>
                                    <button className={styles.cancelButton} onClick={handleCancelStatusChange}>
                                        Cancel
                                    </button>
                                    <button className={styles.confirmButton} onClick={handleConfirmStatusChange}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.modalBody}>
                        {currentMode === "view" ? (
                            <MerchantView merchant={merchant!} />
                        ) : (
                            <MerchantForm
                                merchant={currentMode === "edit" ? merchant! : undefined}
                                onFormChange={setIsFormValid}
                                formRef={formRef}
                            />
                        )}

                        <MerchantStatusRiskSection
                            status={status as MerchantStatus}
                            riskLevel={riskLevel as RiskLevel}
                            onStatusChange={handleStatusChange}
                            onRiskLevelChange={handleRiskLevelChange}
                        />
                    </div>

                    <div className={styles.modalFooter}>
                        <button className={styles.cancelBtn} onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={handleSave}
                            disabled={!canSave}
                        >
                            {getButtonText()}
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
