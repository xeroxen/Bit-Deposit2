"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Copy } from "lucide-react"
import Image from "next/image"
import { apiRequest, triggerBalanceUpdate } from "@/lib/authentication"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PaymentMethod {
  id: string
  name: string
  type: string
  discount: string
  logo: string
  color: string
  agentNumber: string
  agentId: string | number
  isBank: boolean
  customLogo?: string
}

const getLogoUrl = (logoPath: string, isBank: boolean) => {
  if (!logoPath) return ""
  
  // If it's a bank and has a custom logo, use the full URL
  if (isBank && logoPath) {
    return `${logoPath}`
  }
  
  // For mobile banking, use the logo from API
  return logoPath
}

export default function WithdrawForm() {
  const [step, setStep] = useState(1)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobilePaymentMethods, setMobilePaymentMethods] = useState<PaymentMethod[]>([])
  const [bankPaymentMethods, setBankPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    accountNumber: "",
    withdrawAmount: "",
  })
  const [amountError, setAmountError] = useState("")

  useEffect(() => {
    const fetchWithdrawData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent-numbers`)
        const data = await response.json()
        if (data.status && Array.isArray(data.data)) {
          type Agent = {
            agent_name: string;
            agent_number: string;
            text: string;
            bonus?: number;
            agent_id: string;
            status: string;
            logo: string;
            is_bank: string | null;
          };
          
          const mobileMethods: PaymentMethod[] = []
          const bankMethods: PaymentMethod[] = []
          
          data.data.forEach((agent: Agent) => {
            if (agent.status === "1") {
              const text = (agent.text || "").toLowerCase()
              
              const paymentMethod: PaymentMethod = {
                id: text.replace(/\s+/g, "-"),
                name: agent.text,
                type: "mobile",
                discount: agent.bonus ? `+${agent.bonus}%` : "+0%",
                logo: agent.is_bank === "1" ? getLogoUrl(agent.logo, true) : (agent.logo || ""),
                color: "#E2136E", // Default color
                agentNumber: agent.agent_number,
                agentId: agent.agent_id,
                isBank: agent.is_bank === "1",
                customLogo: agent.is_bank === "1" ? getLogoUrl(agent.logo, true) : undefined
              }
              
              if (agent.is_bank === "1") {
                bankMethods.push(paymentMethod)
              } else {
                mobileMethods.push(paymentMethod)
              }
            }
          })
          
          setMobilePaymentMethods(mobileMethods)
          setBankPaymentMethods(bankMethods)
        }
      } catch (error) {
        console.error("Error fetching withdraw data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWithdrawData()
  }, [])

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Validate amount when withdraw amount changes
    if (name === "withdrawAmount") {
      const amount = Number(value)
      if (value && (amount < 300 || amount > 25000)) {
        setAmountError("Amount must be between 300 and 25,000 BDT")
      } else {
        setAmountError("")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate amount before submission
    const amount = Number(formData.withdrawAmount)
    if (amount < 300 || amount > 25000) {
      setAmountError("Amount must be between 300 and 25,000 BDT")
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    try {
      // Add null check and provide a default value
      const paymentType = selectedMethod && selectedMethod.id ? selectedMethod.id.split('-')[0] : '';
      
      const payload = {
        amount: amount,
        agent_number: selectedMethod?.agentId,
        recever_number: formData.accountNumber,
        type: paymentType
      }
      await apiRequest('/games/withdrawal', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      console.log("Submitting payload:", payload)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStep(3)
      triggerBalanceUpdate();
      setFormData({
        accountNumber: "",
        withdrawAmount: "",
      });
      setAmountError("");
    } catch (error) {
      console.error("Error submitting withdraw:", error)
      setError((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyAccountNumber = () => {
    if (selectedMethod) {
      navigator.clipboard.writeText(selectedMethod.agentNumber)
    }
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

        <h1 className="text-2xl font-bold mb-2">Withdraw Successful!</h1>
        <p className="text-muted-foreground mb-6">
          Your withdraw has been submitted successfully and is being processed. You will receive a confirmation shortly.
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/">Go to Home Page</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStep(1)
              setSelectedMethod(null)
            }}
          >
            Make Another Withdraw
          </Button>
        </div>
      </div>
    )
  }

  const renderPaymentMethods = (methods: PaymentMethod[]) => (
    <div className="grid grid-cols-4 gap-3">
      {methods.map((method) => (
        <div
          key={method.id}
          onClick={() => handleMethodSelect(method)}
          className="relative cursor-pointer"
        >
          <div className={`rounded-lg p-3 flex flex-col items-center justify-center text-center`}>
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-1">
              <Image
                src={`https://new.fnd777.pro${method.logo}`}
                alt={method.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="mt-1">
              <p className="text-xs text-black font-semibold">{method.name}</p>
              <p className="text-xs text-black/80 font-mono mt-0.5">{method.agentId}</p>
            </div>
            
            {/* Discount badge */}
            {/* {method.discount && (
              <div className="absolute top-1 left-10 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded transform rotate-45">
                {method.discount}
              </div>
            )} */}
          </div>
        </div>
      ))}
    </div>
  )

  if (step === 1) {
    return (
      <Card className="w-full max-w-xl shadow-lg border-0 bg-white">
        {/* Mobile Banking Section */}
        {mobilePaymentMethods.length > 0 && (
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800">Mobile Bank</h2>
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                renderPaymentMethods(mobilePaymentMethods)
              )}
            </div>
          </CardContent>
        )}

        {/* Bank Section */}
        {bankPaymentMethods.length > 0 && (
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800">Bank Transfer</h2>
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                renderPaymentMethods(bankPaymentMethods)
              )}
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="hover:bg-white/50">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold text-gray-800">
              {selectedMethod?.isBank ? "Bank Transfer" : "Mobile Banking"}
            </h2>
          </div>

          {/* Enhanced payment method display with animation */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">Wallet</span>
                </div>
                <p className="text-sm text-gray-600">Wallet</p>
              </div>



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
                <p className="text-gray-800 text-sm">{selectedMethod?.name || ""}</p>
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
            <Label className="font-semibold text-gray-800 mb-3 block">{selectedMethod?.name || "Payment"} ID</Label>
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
              <span className="flex-1 font-mono text-lg font-medium text-gray-800">{selectedMethod?.agentId || ""}</span>
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
                <Label htmlFor="withdrawAmount" className="font-semibold text-gray-800">
                  Withdraw Amount (BDT) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="withdrawAmount"
                  name="withdrawAmount"
                  type="number"
                  min="300"
                  max="25000"
                  placeholder="Enter Withdraw Amount (300-25,000 BDT)"
                  value={formData.withdrawAmount}
                  onChange={handleInputChange}
                  className={`border-2 focus:border-blue-400 rounded-lg ${amountError ? 'border-red-500' : ''}`}
                  required
                />
                {amountError && (
                  <p className="text-red-500 text-sm mt-1">{amountError}</p>
                )}
                <p className="text-gray-500 text-xs">Minimum: 300 BDT | Maximum: 25,000 BDT</p>
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
