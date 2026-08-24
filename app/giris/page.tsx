"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { HourglassLogo } from "@/components/hourglass-logo"
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { kullaniciGiris } from "@/lib/storage"

export default function GirisPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    sifre: "",
    beniHatirla: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const kullanici = kullaniciGiris(formData.email, formData.sifre)

    if (kullanici) {
      alert(`Hoş geldin ${kullanici.ad}! Profil sayfasına yönlendiriliyorsunuz...`)
      router.push("/profil")
    } else {
      alert("E-posta veya şifre hatalı!")
    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <HourglassLogo className="transition-transform group-hover:scale-110" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              BeceriTak
            </span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Hoş Geldin</h1>
          <p className="text-muted-foreground">Hesabına giriş yap ve öğrenmeye devam et</p>
        </div>

        <Card className="p-8 shadow-2xl border-2 hover:shadow-3xl transition-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-posta Adresi</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@universite.edu.tr"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Şifre */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="sifre">Şifre</Label>
                <Link href="/sifremi-unuttum" className="text-sm text-primary hover:underline">
                  Şifremi Unuttum
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="sifre"
                  name="sifre"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.sifre}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Beni Hatırla */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="beniHatirla"
                checked={formData.beniHatirla}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    beniHatirla: checked as boolean,
                  })
                }
              />
              <Label htmlFor="beniHatirla" className="text-sm cursor-pointer">
                Beni hatırla
              </Label>
            </div>

            {/* Giriş Butonu */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-all text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>

            {/* Kayıt Linki */}
            <div className="text-center text-sm text-muted-foreground">
              Hesabın yok mu?{" "}
              <Link href="/kayit" className="text-primary hover:underline font-medium">
                Hemen Kayıt Ol
              </Link>
            </div>
          </form>
        </Card>

        {/* Geri Dön */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
