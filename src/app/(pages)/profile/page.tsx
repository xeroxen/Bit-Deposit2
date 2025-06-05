import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  User,
  CreditCard,
  Mail,
  Phone,
  Users,
  MapPin,
  FileText,
  Copy,
  Edit,
  Plus,
  ChevronRight,
  Shield,
  Calendar,
} from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header Tabs */}
        <div className="flex bg-white border-b">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white text-sm font-medium">
            <User className="w-4 h-4" />
            Profile
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-blue-500 text-sm font-medium">
            <Shield className="w-4 h-4" />
            Security
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-blue-500 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Sessions
          </button>
        </div>

        {/* Profile Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`,
                }}
              />
            </div>
          </div>

          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="text-white font-bold text-xs text-center">
                  <div className="flex items-center justify-center mb-1">
                    <span className="text-yellow-300 text-lg">👑</span>
                  </div>
                  <div className="text-[10px] leading-tight">
                    SUPER
                    <br />
                    EA
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 pb-6 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-1">BD-0022033</h1>
          <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-100">
            ⭐ Beginner
          </Badge>
        </div>

        <div className="px-4 space-y-6">
          {/* Account Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Account Info</h2>
            <Separator className="mb-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Account ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">710341</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Copy className="w-3 h-3 text-gray-400" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Code Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">BD-0022033</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Copy className="w-3 h-3 text-gray-400" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">---</span>
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Phone Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">01710699394</span>
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Info</h2>
            <Separator className="mb-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Full Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">---</span>
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Gender</span>
                </div>
                <span className="text-sm text-gray-400">---</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Country</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">BANGLADESH</span>
                  <div className="w-4 h-3 bg-green-500 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">City</span>
                </div>
                <span className="text-sm text-gray-400">---</span>
              </div>
            </div>
          </div>

          {/* Identity Verification */}
          <div className="pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Identity Verification</h2>
            <Separator className="mb-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Not Verified</span>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                  Verify Now
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Document Type</span>
                </div>
                <span className="text-sm text-gray-400">---</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Document Number</span>
                </div>
                <span className="text-sm text-gray-400">---</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
