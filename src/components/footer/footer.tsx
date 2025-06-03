import Link from "next/link"
import { Facebook, Youtube, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function BottomFooter() {
  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo/logo.png" alt="logo" width={200} height={40} />
          </div>
          <p className="text-gray-300 mb-4">Contact with us</p>

          {/* Social Media Icons */}
          <div className="flex gap-3 mb-4">
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Youtube className="w-5 h-5 text-red-600" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">t</span>
              </div>
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">in</span>
              </div>
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center">
                <span className="text-white text-xs">🐦</span>
              </div>
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">@</span>
              </div>
            </Link>
          </div>

          {/* Phone Number */}
          <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">+61 483 915 084</div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {/* Game Types */}
          <div>
            <h3 className="text-white font-semibold mb-4">Game Types</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Baccarat
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Slot
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Fish Shooting
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Roulette
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Hi-Lo/Sic Bo
                </Link>
              </li>
            </ul>
          </div>

          {/* Game Providers */}
          <div>
            <h3 className="text-white font-semibold mb-4">Game Providers</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Evolution
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Red Tiger
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  NetEnt
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Big
                </Link>
              </li>
            </ul>
          </div>

          {/* Live Games */}
          <div>
            <h3 className="text-white font-semibold mb-4">Live Games</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  First Person Lightning
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Lotto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Monopoly Big Baller
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cash Or Crash
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Lightning Dice
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Affiliate
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  White Level
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  b2b
                </Link>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-white font-semibold mb-4">Games</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Big Time Bonus
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sports Bonus
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Signup Bonus
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Weekly Bonus
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Instruction
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Rewards</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Bet Transfer Bonus
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Sports Bonus
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Signup Bonus
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Weekly Bonus
            </Link>
          </div>
        </div>

        {/* Downloads Section */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Downloads</h3>
          <Link href="#" className="inline-block">
            <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-900 transition-colors">
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">▶</span>
              </div>
              <div>
                <div className="text-xs text-gray-400">GET IT ON</div>
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Quick & Easy Payment Methods We Support</h3>
          <div className="flex gap-4">
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-yellow-400 rounded-sm"></div>
            </div>
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-8 h-6 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
            </div>
            <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-8 h-6 bg-green-600 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Instruction
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                About Us
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p>© 2024 All Rights Reserved bitdeposit.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
