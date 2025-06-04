"use client"
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

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
import { apiRequest, triggerBalanceUpdate } from '@/lib/authentication';
import { toast } from 'sonner';

// Define the schema outside of any components
const formSchema = z.object({
    payment_id: z.string().min(5, {
        message: "Transaction ID must be at least 5 characters.",
    }),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number.",
    }),
    method: z.string().min(1, {
        message: "Please select a payment method.",
    }),
    phoneNumber: z.string().min(11, {
        message: "Phone number must be at least 11 digits.",
    }).max(15, {
        message: "Phone number must not exceed 15 digits."
    }),
});

// Define the type directly to avoid deep instantiation
interface FormValues {
    payment_id: string;
    amount: string;
    method: string;
    phoneNumber: string;
}

const paymentMethods = [
    { value: "bkash", label: "Bkash" },
    { value: "nagad", label: "Nagad" },
    { value: "rocket", label: "Rocket" },
];

const Depositform = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        defaultValues: {
            payment_id: "",
            amount: "",
            method: "",
            phoneNumber: "",
        },
    });

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        setError(null);

        // Use Zod for validation
        const validationResult = formSchema.safeParse(values);

        if (!validationResult.success) {
            // Simplified error handling to avoid TypeScript errors
            const errors = validationResult.error.errors.map(err => err.message);

            if (errors.length > 0) {
                setError(errors.join(", "));
                setIsSubmitting(false);
                return;
            }
        }

        try {
            // Create the exact payload structure required by the API
            const apiPayload = {
                payment_id: values.payment_id,
                amount: Number(values.amount),
                type: values.method,
                sender_number: values.phoneNumber
            };

            // //console.log('Sending payload:', apiPayload);

            // Use apiRequest to send the payload
           await apiRequest('/games/deposite', {
                method: 'POST',
                body: JSON.stringify(apiPayload)
            });


            // Trigger balance update after successful deposit
            triggerBalanceUpdate();

            // Reset form after successful submission
            form.reset();

            // Redirect or show success message
            router.push('/deposit/success');
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err && err.status === false && 'message' in err && err.message === "Unauthorized") {
                toast.error(`Please login to deposit`);
                router.push('/login');
                return;
            }
            console.error("Deposit error:", err);
            setError("Failed to process your deposit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-card rounded-lg shadow-md ">
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Make a Deposit</h2>

            {error && (
                <div className="mb-4 p-3 bg-destructive/15 text-destructive rounded-md text-sm">
                    {error}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="payment_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Transaction ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter transaction ID" className="text-black placeholder:text-muted-foreground" {...field} />
                                </FormControl>
                                <FormDescription className="text-muted-foreground">
                                    The transaction ID from your payment provider
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />

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
                                    Amount you wish to deposit
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="method"
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
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground">Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 01712345678" className="text-black placeholder:text-muted-foreground" {...field} />
                                </FormControl>
                                <FormDescription className="text-muted-foreground">
                                    Your phone number associated with the payment method
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
                        {isSubmitting ? "Processing..." : "Submit Deposit"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Depositform;