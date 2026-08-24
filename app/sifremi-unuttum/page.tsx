"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { HourglassLogo } from "@/components/hourglass-logo"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"

export default function SifremiUnuttumPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simüle edilmiş şifre sıfırlama isteği
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Şifre sıfırlama e-postası gönderildi:", email)
    setIsSuccess(true)
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group mb-4">
              <HourglassLogo className="transition-transform group-hover:scale-110" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                BeceriTak
              </span>
            </Link>
          </div>

          <Card className="p-8 shadow-2xl border-2 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">E-posta Gönderildi</h2>
            <p className="text-muted-foreground mb-6">
              Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. Lütfen e-postanızı kontrol edin.
            </p>
            <Button asChild className="w-full bg-gradient-to-r from-primary via-accent to-secondary">
              <Link href="/giris">Giriş Sayfasına Dön</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold mb-2">Şifremi Unuttum</h1>
          <p className="text-muted-foreground">E-posta adresini gir, sana şifre sıfırlama bağlantısı gönderelim</p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Gönder Butonu */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-all text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
            </Button>

            {/* Giriş Linki */}
            <div className="text-center text-sm text-muted-foreground">
              Şifreni hatırladın mı?{" "}
              <Link href="/giris" className="text-primary hover:underline font-medium">
                Giriş Yap
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
