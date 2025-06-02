"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu,
  User,
  Settings,
  Bookmark,
  LogOut,
  ChevronDown,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import SearchModal from "./search-modal"
import SocialLinks from "./social-links"
import { resourceUrl } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { navLinks } from "@/lib/data/navigation"

export default function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center flex-1 w-full">
            <Image
              src="/logo.png"
              alt="الموقع الرسمي للشيخ"
              width={200}
              height={50}
            />
          </Link>

          <div className="hidden md:flex items-center gap-2 mx-4 flex-1 max-w-md">
            <SearchButton onClick={() => setIsSearchModalOpen(true)} />
          </div>

          <div className="hidden md:flex">
            <SocialLinks />
          </div>

          <UserMenu user={user} onSignOut={logout} />

          {/* <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button> */}
        </div>

        <div className="mt-3 md:hidden">
          <SearchButton onClick={() => setIsSearchModalOpen(true)} />
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto">
          <NavLinks pathname={pathname} />
        </div>
      </div>

      {isMenuOpen && false && (
        <MobileMenu user={user} pathname={pathname} onSignOut={logout} />
      )}

      <SearchModal
        open={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
      />
    </header>
  )
}

function NavLinks({ pathname }: { pathname: string }) {
  const isActive = (path: string) => pathname === path
  const isActiveStartsWith = (path: string) =>
    pathname.startsWith(path) && (path !== "/" || pathname === "/")
  const getNavLinkClass = (path: string): string =>
    ((path === "/") ? isActive(path) : isActiveStartsWith(path))
      ? "px-4 py-3 text-sm font-medium text-primary border-b-2 border-primary whitespace-nowrap"
      : "px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary whitespace-nowrap"

  return (
    <nav className="flex justify-center">
      <div className="flex overflow-x-auto">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className={getNavLinkClass(href)}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

function UserMenu({
  user,
  onSignOut,
}: {
  user: any
  onSignOut: () => void
}) {
  const getUserInitials = () => {
    if (!user) return "?"
    
    // Use email initial if no name is available
    if (!user.name || user.name.trim() === "") {
      return user.email?.[0]?.toUpperCase() || "?"
    }
    
    // Get first letter of each word in the name, max 2 characters
    return user.name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word: string) => word[0]?.toUpperCase() || "")
      .join("")
  }

  if (user && user.id) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-gray-600"
          >
            <span className="hidden sm:inline">حسابي</span>
            <Avatar className="size-8">
              <AvatarImage src={resourceUrl(user.avatar_url)} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuItem asChild className="flex justify-end">
            <Link href="/profile" className="w-full text-right">
              <User className="size-4 ml-auto" />
              الملف الشخصي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex justify-end">
            <Link href="/bookmarks" className="w-full text-right">
              <Bookmark className="size-4 ml-auto" />
              المحفوظات
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-end cursor-pointer"
            onClick={onSignOut}
          >
            <LogOut className="size-4 ml-auto" />
            تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-600"
        >
          <span>تسجيل الدخول</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuItem asChild className="flex justify-end">
          <Link href="/login" className="w-full text-right">
            تسجيل الدخول
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex justify-end">
          <Link href="/register" className="w-full text-right">
            إنشاء حساب جديد
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileMenu({
  user,
  pathname,
  onSignOut,
}: {
  user: any
  pathname: string
  onSignOut: () => void
}) {
  const isActive = (path: string) => pathname === path
  const isActiveStartsWith = (path: string) =>
    pathname.startsWith(path) && (path !== "/" || pathname === "/")
  const getMobileNavLinkClass = (path: string) =>
    ((path === "/") ? isActive(path) : isActiveStartsWith(path))
      ? "p-2 text-sm font-medium text-primary rounded"
      : "p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded"

  return (
    <div className="md:hidden border-t">
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-2 gap-2">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={getMobileNavLinkClass(href)}>
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex flex-col gap-2">
          {user ? (
            <>
              <Link
                href="/profile"
                className="p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded flex justify-between items-center"
              >
                <User className="h-4 w-4" /> الملف الشخصي
              </Link>
              <Link
                href="/dashboard"
                className="p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded flex justify-between items-center"
              >
                <Settings className="h-4 w-4" /> لوحة التحكم
              </Link>
              <Link
                href="/bookmarks"
                className="p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded flex justify-between items-center"
              >
                <Bookmark className="h-4 w-4" /> المحفوظات
              </Link>
              <button
                onClick={onSignOut}
                className="p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded flex justify-between items-center w-full"
              >
                <LogOut className="h-4 w-4" /> تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded text-center"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="p-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 rounded text-center"
              >
                إنشاء حساب جديد
              </Link>
            </>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      className="w-full flex justify-between"
      onClick={onClick}
      dir="rtl"
    >
      <span className="text-gray-500">ابحث في المكتبة...</span>
      <Search className="h-4 w-4 text-gray-400" />
    </Button>
  )
}
