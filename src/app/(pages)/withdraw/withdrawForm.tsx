"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { apiRequest, triggerBalanceUpdate } from "@/lib/authentication";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

// Define the form values interface
interface FormValues {
    amount: string;
    type: string;
    recever_number: string;
}

const paymentMethods = [
    { value: "bkash", label: "Bkash" },
    { value: "nagad", label: "Nagad" },
    { value: "rocket", label: "Rocket" },
];

const WithdrawForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        defaultValues: {
            amount: "",
            type: "",
            recever_number: "",
        },
    });

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        setError(null);

        // Validate form values
        if (!values.amount || isNaN(Number(values.amount)) || Number(values.amount) <= 0) {
            setError("Amount must be a positive number");
            setIsSubmitting(false);
            return;
        }

        if (!values.type) {
            setError("Please select a payment method");
            setIsSubmitting(false);
            return;
        }

        if (!values.recever_number || values.recever_number.length < 11) {
            setError("Phone number must be at least 11 digits");
            setIsSubmitting(false);
            return;
        }

        try {
            // Create the exact payload structure required by the API
            const apiPayload = {
                amount: Number(values.amount),
                type: values.type,
                recever_number: values.recever_number
            };

            //console.log('Sending payload:', apiPayload);

            // Use apiRequest to send the payload
            await apiRequest('/games/withdrawal', {
                method: 'POST',
                body: JSON.stringify(apiPayload)
            });

            // Trigger balance update after successful withdrawal
            triggerBalanceUpdate();

            // Reset form after successful submission
            form.reset();

            // Redirect or show success message
            router.push('/withdraw/success');
        } catch (err) {
            console.error("Withdrawal error:", err);
            setError("Failed to process your withdrawal. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-card rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Withdraw Funds</h2>

            {error && (
                <div className="mb-4 p-3 bg-destructive/15 text-destructive rounded-md text-sm">
                    {error}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="Enter amount"
                                        className="text-black placeholder:text-muted-foreground"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormDescription className="text-muted-foreground">
                                    Amount you wish to withdraw
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Payment Method</FormLabel>
                                <div className="w-full">
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full text-black data-[state=open]:text-black data-[placeholder]:text-muted-foreground">
                                                <SelectValue className="text-black placeholder:text-muted-foreground" placeholder="Select payment method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full text-foreground">
                                            {paymentMethods.map((method) => (
                                                <SelectItem key={method.value} value={method.value} className="text-black">
                                                    {method.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormDescription className="text-muted-foreground">
                                    Choose your preferred payment method
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="recever_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 01700000175" className="text-black placeholder:text-muted-foreground" {...field} />
                                </FormControl>
                                <FormDescription className="text-muted-foreground">
                                    Your phone number to receive the payment
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full text-primary-foreground bg-sky-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Submit Withdrawal"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default WithdrawForm;