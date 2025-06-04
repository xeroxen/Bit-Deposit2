"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Copy, ArrowRight } from "lucide-react"
import Image from "next/image"
import { triggerBalanceUpdate } from "@/lib/authentication"
import { apiRequest } from "@/lib/authentication"

interface PaymentMethod {
  id: string
  name: string
  type: string
  discount: string
  logo: string
  color: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "bkash-personal",
    name: "bKash Personald",
    type: "mobile",
    discount: "-5%",
    logo: "/images/bkash-logo.png",
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
  },
  {
    id: "nagad-personal",
    name: "Nagad Personal",
    type: "mobile",
    discount: "-3%",
    logo: "/images/nagad-logo.png",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
  },
  {
    id: "rocket-personal",
    name: "Rocket Personal",
    type: "mobile",
    discount: "-4%",
    logo: "/images/rocket-logo.png",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
]

export default function DepositForm() {
  const [step, setStep] = useState(1)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    accountNumber: "",
    transactionId: "",
    depositAmount: "",
  })

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        amount: Number(formData.depositAmount),
        payment_id: formData.transactionId ,
        sender_number: formData.accountNumber,
        type: selectedMethod?.id?.split('-')[0] 
      }
      await apiRequest('/games/deposite', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      console.log("Submitting payload:", payload)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStep(3)
      triggerBalanceUpdate();
      setFormData({
        accountNumber: "",
        transactionId: "",
        depositAmount: "",
      });
    } catch (error) {
      console.error("Error submitting deposit:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const copyAccountNumber = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BKASH_NUMBER?.toString() || '')
  }

  if (step === 3) {
    return (
      <div className="max-w-md w-full mx-auto p-8 bg-card rounded-lg shadow-md text-center mt-20">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Deposit Successful!</h1>
        <p className="text-muted-foreground mb-6">
          Your deposit has been submitted successfully and is being processed. You will receive a confirmation shortly.
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild>
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStep(1)
              setSelectedMethod(null)
            }}
          >
            Make Another Deposit
          </Button>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <Card className="w-full max-w-md shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-8">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Mobile Banking</h2>
              <p className="text-gray-600">Choose your preferred payment method</p>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handleMethodSelect(method)}
                  className="relative cursor-pointer group transform transition-all duration-200 hover:scale-105"
                >
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border-2 border-transparent hover:border-blue-200 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                          <Image
                            src={method.logo || "/placeholder.svg"}
                            alt={method.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{method.name}</h3>
                          <p className="text-sm text-gray-500">Mobile Banking</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>

                    {/* Enhanced discount badge */}
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {method.discount}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="hover:bg-white/50">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold text-gray-800">Mobile Banking</h2>
          </div>

          {/* Enhanced payment method display with animation */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                  <Image
                    src={selectedMethod?.logo || ""}
                    alt={selectedMethod?.name || ""}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-800 text-sm">{selectedMethod?.name}</p>
              </div>

              {/* Animated GIF */}
              <div className="flex items-center">
                <Image
                  src="/images/anime4.gif"
                  alt="Transaction Animation"
                  width={128}
                  height={96}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">Wallet</span>
                </div>
                <p className="text-sm text-gray-600">Wallet</p>
              </div>
            </div>

            {/* Enhanced exchange rate */}
            <div className="text-center py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                Current Rate: <span className="text-green-600 font-bold">1 BDT = 1.00 BDT</span>
              </p>
            </div>
          </div>

          {/* Enhanced account number section */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <Label className="font-semibold text-gray-800 mb-3 block">{selectedMethod?.name} Number</Label>
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
              <span className="flex-1 font-mono text-lg font-medium text-gray-800">{process.env.NEXT_PUBLIC_BKASH_NUMBER}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={copyAccountNumber}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced form fields */}
            <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="font-semibold text-gray-800">
                  Your Account No <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Enter Mobile Number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="border-2 focus:border-blue-400 rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionId" className="font-semibold text-gray-800">
                  Transaction ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="transactionId"
                  name="transactionId"
                  placeholder="Enter Transaction ID"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className="border-2 focus:border-blue-400 rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="depositAmount" className="font-semibold text-gray-800">
                  Deposit Amount (BDT) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="depositAmount"
                  name="depositAmount"
                  type="number"
                  placeholder="Enter Deposit Amount"
                  value={formData.depositAmount}
                  onChange={handleInputChange}
                  className="border-2 focus:border-blue-400 rounded-lg"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Request...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
