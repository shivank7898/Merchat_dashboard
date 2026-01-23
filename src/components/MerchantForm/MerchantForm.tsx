import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Merchant } from "../../configs/merchants";
import styles from "./MerchantForm.module.css";

const merchantSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    country: z.string().min(1, "Country is required"),
    monthlyVolume: z.number()
        .min(0.01, "Monthly Volume is required"),
    chargebackRatio: z.number().min(0).max(100).optional(),
});

export type MerchantFormData = z.infer<typeof merchantSchema>;

interface MerchantFormProps {
    merchant?: Merchant;
    onFormChange?: (isValid: boolean) => void;
    formRef?: React.RefObject<{ getFormData: () => MerchantFormData | null }>;
}

export default function MerchantForm({
    merchant,
    onFormChange,
    formRef,
}: MerchantFormProps) {
    const {
        register,
        getValues,
        formState: { errors, isValid },
    } = useForm<MerchantFormData>({
        resolver: zodResolver(merchantSchema),
        defaultValues: merchant
            ? {
                name: merchant.name,
                country: merchant.country,
                monthlyVolume: merchant.monthlyVolume,
                chargebackRatio: merchant.chargebackRatio,
            }
            : {
                name: "",
                country: "",
                monthlyVolume: 0,
                chargebackRatio: 0,
            },
        mode: "onChange",
    });

    useEffect(() => {
        if (formRef) {
            (formRef as any).current = {
                getFormData: () => {
                    if (!isValid) return null;
                    const data = getValues();
                    return {
                        ...data,
                        chargebackRatio: data.chargebackRatio ?? 0,
                    };
                },
            };
        }

        if (onFormChange) {
            onFormChange(isValid);
        }
    }, [formRef, isValid]);

    return (
        <div className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                    Name <span className={styles.required}>*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                    placeholder="Enter merchant name"
                />
                {errors.name && (
                    <span className={styles.errorMessage}>{errors.name.message}</span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="country" className={styles.label}>
                    Country <span className={styles.required}>*</span>
                </label>
                <input
                    id="country"
                    type="text"
                    {...register("country")}
                    className={`${styles.input} ${errors.country ? styles.inputError : ""}`}
                    placeholder="Enter country"
                />
                {errors.country && (
                    <span className={styles.errorMessage}>{errors.country.message}</span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="monthlyVolume" className={styles.label}>
                    Monthly Volume <span className={styles.required}>*</span>
                </label>
                <input
                    id="monthlyVolume"
                    type="number"
                    step="0.01"
                    {...register("monthlyVolume", { valueAsNumber: true })}
                    className={`${styles.input} ${errors.monthlyVolume ? styles.inputError : ""}`}
                    placeholder="Enter monthly volume"
                />
                {errors.monthlyVolume && (
                    <span className={styles.errorMessage}>{errors.monthlyVolume.message}</span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="chargebackRatio" className={styles.label}>
                    Chargeback Ratio (%)
                </label>
                <input
                    id="chargebackRatio"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    {...register("chargebackRatio", { valueAsNumber: true })}
                    className={`${styles.input} ${errors.chargebackRatio ? styles.inputError : ""}`}
                    placeholder="0.00"
                />
                {errors.chargebackRatio && (
                    <span className={styles.errorMessage}>{errors.chargebackRatio.message}</span>
                )}
            </div>
        </div>
    );
}

MerchantForm.displayName = "MerchantForm";

