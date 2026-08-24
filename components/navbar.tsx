"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HourglassLogo } from "@/components/hourglass-logo"
import { Menu, X, Clock, MessageSquare, Search, User, Home, Settings, ShoppingBag } from "lucide-react"
import { aktifKullaniciGetir } from "@/lib/storage"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Eğer anasayfa veya kayıt/giriş sayfalarına gidiyorsa engelleme
    if (href === "/" || href === "/kayit" || href === "/giris") {
      return
    }

    const aktifKullanici = aktifKullaniciGetir()
    if (!aktifKullanici) {
      e.preventDefault()
      router.push("/giris")
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg shadow-lg py-3" : "bg-background/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <HourglassLogo className="transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              BeceriTak
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </Link>
            <Link
              href="/beceri-ara"
              onClick={(e) => handleNavigation(e, "/beceri-ara")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Beceri Ara</span>
            </Link>
            <Link
              href="/paketler"
              onClick={(e) => handleNavigation(e, "/paketler")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Paketler</span>
            </Link>
            <Link
              href="/derslerim"
              onClick={(e) => handleNavigation(e, "/derslerim")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Clock className="w-4 h-4" />
              <span>Derslerim</span>
            </Link>
            <Link
              href="/mesajlar"
              onClick={(e) => handleNavigation(e, "/mesajlar")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Mesajlar</span>
            </Link>
            <Link
              href="/profil"
              onClick={(e) => handleNavigation(e, "/profil")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <User className="w-4 h-4" />
              <span>Profil</span>
            </Link>
            <Link
              href="/ayarlar"
              onClick={(e) => handleNavigation(e, "/ayarlar")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Ayarlar</span>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/giris">Giriş Yap</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-opacity"
            >
              <Link href="/kayit">Üye Ol</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-3 space-y-1 bg-card rounded-xl shadow-xl border border-border animate-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:bg-muted hover:text-primary transition-colors rounded-lg mx-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Ana Sayfa</span>
            </Link>
            <Link
              href="/beceri-ara"
              onClick={(e) => {
                handleNavigation(e, "/beceri-ara")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:bg-muted hover:text-primary transition-colors rounded-lg mx-2"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Beceri Ara</span>
            </Link>
            <Link
              href="/paketler"
              onClick={(e) => {
                handleNavigation(e, "/paketler")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:bg-muted hover:text-primary transition-colors rounded-lg mx-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm font-medium">Paketler</span>
            </Link>
            <Link
              href="/derslerim"
              onClick={(e) => {
                handleNavigation(e, "/derslerim")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:bg-muted hover:text-primary transition-colors rounded-lg mx-2"
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Derslerim</span>
            </Link>
            <Link
              href="/mesajlar"
              onClick={(e) => {
                handleNavigation(e, "/mesajlar")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:bg-muted hover:text-primary transition-colors rounded-lg mx-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Mesajlar</span>
            </Link>
            <Link
              href="/profil"
              onClick={(e) => {
                handleNavigation(e, "/profil")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:bg-muted hover:text-primary transition-colors rounded-lg mx-2"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Profil</span>
            </Link>
            <Link
              href="/ayarlar"
              onClick={(e) => {
                handleNavigation(e, "/ayarlar")
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-foreground/80 hover:bg-muted hover:text-primary transition-colors rounded-lg mx-2"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Ayarlar</span>
            </Link>
            <div className="px-4 pt-3 border-t border-border flex flex-col gap-2">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link href="/giris" onClick={() => setIsMobileMenuOpen(false)}>
                  Giriş Yap
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-gradient-to-r from-primary via-accent to-secondary">
                <Link href="/kayit" onClick={() => setIsMobileMenuOpen(false)}>
                  Üye Ol
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
