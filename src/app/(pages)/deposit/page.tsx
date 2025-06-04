import DepositForm from "./depositForm"

export const metadata = {
  title: "Deposit | Fnd777",
  description: "Make a deposit to your Fnd777 account",
}

export default function DepositPage() {
  return (
    <div className=" bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-10 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Deposit Funds
        </h1>
        <div className="w-full max-w-md flex justify-center px-4 sm:px-0">
          <DepositForm />
        </div>
      </div>
    </div>
  )
}
