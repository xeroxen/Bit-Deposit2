'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getUserData, User } from "@/lib/authentication"
import { useEffect, useState } from "react"
import {
  User as UserIcon,
  CreditCard,
  Mail,
  Phone,
  FileText,
  Copy,
  Plus,
  // Shield,
  // Calendar,
  Check,
} from "lucide-react"
import Image from "next/image"
import { PageMetadata } from "@/components/PageMetadata"

export default function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Try to get user data from localStorage
    const user = getUserData();
    setUserData(user);
  }, []);

  // Reset copy status after a delay
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Function to copy text to clipboard
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
    });
  };

  // Check if user data is loaded
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <>
    <PageMetadata />
    <div className="min-h-screen bg-gray-50 mt-15">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header Tabs */}
        {/* <div className="flex bg-white border-b">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white text-sm font-medium">
            <UserIcon className="w-4 h-4" />
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
        </div> */}

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
              <Image
                src="/user/user.jpg"
                alt="Avatar"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-orange-400 to-red-500 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 pb-6 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-1">{userData.user_name}</h1>
          <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-100">
            ⭐ {userData.status === 'active' ? 'Active' : userData.status}
          </Badge>
        </div>
        {userData.banned === 1 ? (
        <div className=" text-re font-bold text-center py-3">
          This user is banned and cannot withdraw or deposit. contact support.
        </div>
      ) : null}
        <div className="px-4 space-y-6">
          {/* Account Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Account Info</h2>
            <Separator className="mb-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Account ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{userData.id}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(userData.id.toString(), 'id')}
                  >
                    {copied === 'id' ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600"> Reference Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{userData.inviter_code}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => userData.inviter_code != null && copyToClipboard(`${window.location.origin}/signup?referer=${userData.inviter_code}`, 'inviter_code')}
                  >
                    {copied === 'inviter_code' ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Code Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{userData.user_name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(userData.user_name, 'username')}
                  >
                    {copied === 'username' ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{userData.email || '---'}</span>
                  {!userData.email && (
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Phone Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{userData.phone || '---'}</span>
                  {/* <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button> */}
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
                  <UserIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Full Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {userData.name ? `${userData.name}${userData.last_name ? ` ${userData.last_name}` : ''}` : '---'}
                  </span>
                  {/* <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button> */}
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Gender</span>
                </div>
                <span className="text-sm text-gray-400">---</span>
              </div> */}

              {/* <div className="flex items-center justify-between">
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
              </div> */}

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Language</span>
                </div>
                <span className="text-sm font-medium">{userData.language || '---'}</span>
              </div> */}
            </div>
          </div>

          {/* Identity Verification */}
          <div className="pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Identity Verification</h2>
            <Separator className="mb-4" />

            <div className="space-y-4">
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {userData.email_verified_at ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                {!userData.email_verified_at && (
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 h-auto p-0">
                    Verify Now
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div> */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Created At</span>
                </div>
                <span className="text-sm font-medium">{userData.createdAt || '---'}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Role ID</span>
                </div>
                <span className="text-sm font-medium">{userData.role_id || '---'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
