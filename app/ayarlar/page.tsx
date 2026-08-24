"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, User, Globe, Trash2, Eye, EyeOff } from "lucide-react"
import { aktifKullaniciGetir, kullaniciBilgileriniGuncelle, kullaniciCikis } from "@/lib/storage"
import { useRouter } from "next/navigation"

export default function AyarlarPage() {
  const router = useRouter()
  const [kullanici, setKullanici] = useState<any>(null)
  const [bildirimler, setBildirimler] = useState({
    email: true,
    push: true,
    yeniDers: true,
    mesaj: true,
    yorumlar: false,
  })

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  useEffect(() => {
    const aktifKullanici = aktifKullaniciGetir()
    if (aktifKullanici) {
      setKullanici(aktifKullanici)
    }
  }, [])

  const handleKaydet = (e: React.FormEvent) => {
    e.preventDefault()
    if (!kullanici) return

    const form = e.target as HTMLFormElement
    const guncelKullanici = {
      ...kullanici,
      ad: (form.elements.namedItem("ad") as HTMLInputElement).value,
      soyad: (form.elements.namedItem("soyad") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      universite: (form.elements.namedItem("universite") as HTMLInputElement).value,
      bolum: (form.elements.namedItem("bolum") as HTMLInputElement).value,
    }

    if (kullaniciBilgileriniGuncelle(guncelKullanici)) {
      setKullanici(guncelKullanici)
      alert("Ayarlar başarıyla kaydedildi!")
    }
  }

  const handleSifreGuncelle = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const eskiSifre = (form.elements.namedItem("eskiSifre") as HTMLInputElement).value
    const yeniSifre = (form.elements.namedItem("yeniSifre") as HTMLInputElement).value
    const yeniSifreTekrar = (form.elements.namedItem("yeniSifreTekrar") as HTMLInputElement).value

    if (!kullanici) return

    if (eskiSifre !== kullanici.sifre) {
      alert("Mevcut şifre yanlış!")
      return
    }

    if (yeniSifre !== yeniSifreTekrar) {
      alert("Yeni şifreler eşleşmiyor!")
      return
    }

    const guncelKullanici = { ...kullanici, sifre: yeniSifre }
    if (kullaniciBilgileriniGuncelle(guncelKullanici)) {
      setKullanici(guncelKullanici)
      alert("Şifre başarıyla güncellendi!")
      form.reset()
    }
  }

  const handleHesapSil = () => {
    if (confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!")) {
      kullaniciCikis()
      localStorage.removeItem("kullanicilar")
      alert("Hesabınız silindi.")
      router.push("/")
    }
  }

  if (!kullanici) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Ayarlar</h1>

          <Tabs defaultValue="profil" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profil" className="gap-2">
                <User className="w-4 h-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="guvenlik" className="gap-2">
                <Lock className="w-4 h-4" />
                Güvenlik
              </TabsTrigger>
              <TabsTrigger value="bildirimler" className="gap-2">
                <Bell className="w-4 h-4" />
                Bildirimler
              </TabsTrigger>
              <TabsTrigger value="genel" className="gap-2">
                <Globe className="w-4 h-4" />
                Genel
              </TabsTrigger>
            </TabsList>

            {/* Profil Ayarları */}
            <TabsContent value="profil">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Profil Bilgileri</h2>
                <form onSubmit={handleKaydet} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ad">Ad</Label>
                      <Input id="ad" name="ad" defaultValue={kullanici.ad} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soyad">Soyad</Label>
                      <Input id="soyad" name="soyad" defaultValue={kullanici.soyad} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input id="email" name="email" type="email" defaultValue={kullanici.email} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="universite">Üniversite</Label>
                      <Input id="universite" name="universite" defaultValue={kullanici.universite || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bolum">Bölüm</Label>
                      <Input id="bolum" name="bolum" defaultValue={kullanici.bolum || ""} />
                    </div>
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-primary via-accent to-secondary">
                    Değişiklikleri Kaydet
                  </Button>
                </form>
              </Card>
            </TabsContent>

            {/* Güvenlik Ayarları */}
            <TabsContent value="guvenlik">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Güvenlik</h2>
                <form onSubmit={handleSifreGuncelle} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="eskiSifre">Mevcut Şifre</Label>
                    <div className="relative">
                      <Input
                        id="eskiSifre"
                        name="eskiSifre"
                        type={showOldPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yeniSifre">Yeni Şifre</Label>
                    <div className="relative">
                      <Input
                        id="yeniSifre"
                        name="yeniSifre"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yeniSifreTekrar">Yeni Şifre Tekrar</Label>
                    <Input id="yeniSifreTekrar" name="yeniSifreTekrar" type="password" placeholder="••••••••" />
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-primary via-accent to-secondary">
                    Şifreyi Güncelle
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-lg font-bold mb-4 text-destructive">Tehlikeli Bölge</h3>
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="text-sm text-muted-foreground mb-4">
                      Hesabınızı silmek tüm verilerinizi kalıcı olarak siler. Bu işlem geri alınamaz.
                    </p>
                    <Button onClick={handleHesapSil} variant="destructive" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Hesabı Sil
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Bildirim Ayarları */}
            <TabsContent value="bildirimler">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Bildirim Tercihleri</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-bold mb-1">E-posta Bildirimleri</h4>
                      <p className="text-sm text-muted-foreground">Önemli güncellemeleri e-posta ile al</p>
                    </div>
                    <Switch
                      checked={bildirimler.email}
                      onCheckedChange={(val) => setBildirimler({ ...bildirimler, email: val })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-bold mb-1">Push Bildirimleri</h4>
                      <p className="text-sm text-muted-foreground">Anlık bildirimler al</p>
                    </div>
                    <Switch
                      checked={bildirimler.push}
                      onCheckedChange={(val) => setBildirimler({ ...bildirimler, push: val })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-bold mb-1">Yeni Ders Talepleri</h4>
                      <p className="text-sm text-muted-foreground">Ders talebi geldiğinde bildirim al</p>
                    </div>
                    <Switch
                      checked={bildirimler.yeniDers}
                      onCheckedChange={(val) => setBildirimler({ ...bildirimler, yeniDers: val })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-bold mb-1">Mesaj Bildirimleri</h4>
                      <p className="text-sm text-muted-foreground">Yeni mesaj geldiğinde bildirim al</p>
                    </div>
                    <Switch
                      checked={bildirimler.mesaj}
                      onCheckedChange={(val) => setBildirimler({ ...bildirimler, mesaj: val })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-bold mb-1">Yorum ve Değerlendirmeler</h4>
                      <p className="text-sm text-muted-foreground">Yeni yorum aldığında bildirim al</p>
                    </div>
                    <Switch
                      checked={bildirimler.yorumlar}
                      onCheckedChange={(val) => setBildirimler({ ...bildirimler, yorumlar: val })}
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-primary via-accent to-secondary">Tercihleri Kaydet</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Genel Ayarlar */}
            <TabsContent value="genel">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Genel Ayarlar</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dil">Dil</Label>
                    <Select defaultValue="tr">
                      <SelectTrigger id="dil">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="en">İngilizce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="saat-dilimi">Saat Dilimi</Label>
                    <Select defaultValue="istanbul">
                      <SelectTrigger id="saat-dilimi">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istanbul">İstanbul (GMT+3)</SelectItem>
                        <SelectItem value="ankara">Ankara (GMT+3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="bg-gradient-to-r from-primary via-accent to-secondary">Ayarları Kaydet</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
