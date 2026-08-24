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
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, GraduationCap } from "lucide-react"
import { kullaniciKaydet } from "@/lib/storage"

export default function KayitPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    sifre: "",
    sifreTekrar: "",
    universite: "",
    bolum: "",
    kvkk: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.sifre !== formData.sifreTekrar) {
      alert("Şifreler eşleşmiyor!")
      setIsLoading(false)
      return
    }

    try {
      kullaniciKaydet({
        ad: formData.ad,
        soyad: formData.soyad,
        email: formData.email,
        sifre: formData.sifre,
        universite: formData.universite,
        bolum: formData.bolum,
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...")

      router.push("/giris")
    } catch (error) {
      alert("Kayıt sırasında bir hata oluştu!")
      console.error(error)
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
      <div className="w-full max-w-2xl">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <HourglassLogo className="transition-transform group-hover:scale-110" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              BeceriTak
            </span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Hesap Oluştur</h1>
          <p className="text-muted-foreground">Beceri paylaşımına başlamak için kayıt ol</p>
        </div>

        <Card className="p-8 shadow-2xl border-2 hover:shadow-3xl transition-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad Soyad */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ad">Ad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="ad"
                    name="ad"
                    type="text"
                    placeholder="Adınız"
                    value={formData.ad}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="soyad">Soyad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="soyad"
                    name="soyad"
                    type="text"
                    placeholder="Soyadınız"
                    value={formData.soyad}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sifre">Şifre</Label>
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
              <div className="space-y-2">
                <Label htmlFor="sifreTekrar">Şifre Tekrar</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="sifreTekrar"
                    name="sifreTekrar"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.sifreTekrar}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Üniversite Bilgileri */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="universite">Üniversite (Opsiyonel)</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="universite"
                    name="universite"
                    type="text"
                    placeholder="Üniversite adı"
                    value={formData.universite}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bolum">Bölüm (Opsiyonel)</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="bolum"
                    name="bolum"
                    type="text"
                    placeholder="Bölüm adı"
                    value={formData.bolum}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* KVKK Onayı */}
            <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
              <Checkbox
                id="kvkk"
                checked={formData.kvkk}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    kvkk: checked as boolean,
                  })
                }
                required
              />
              <Label htmlFor="kvkk" className="text-sm leading-relaxed cursor-pointer">
                <Link href="/kvkk" className="text-primary hover:underline">
                  KVKK Aydınlatma Metni
                </Link>
                'ni okudum ve{" "}
                <Link href="/kullanim-kosullari" className="text-primary hover:underline">
                  Kullanım Koşulları
                </Link>
                'nı kabul ediyorum.
              </Label>
            </div>

            {/* Kayıt Butonu */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-all text-lg"
              disabled={isLoading || !formData.kvkk}
            >
              {isLoading ? "Kayıt Oluşturuluyor..." : "Hesap Oluştur"}
            </Button>

            {/* Giriş Linki */}
            <div className="text-center text-sm text-muted-foreground">
              Zaten hesabın var mı?{" "}
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
