"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building2, Lock, CheckCircle2 } from "lucide-react"
import { aktifKullaniciGetir, kullaniciBilgileriniGuncelle } from "@/lib/storage"

export default function OdemePage() {
  const router = useRouter()
  const [sepetItems, setSepetItems] = useState<string[]>([])
  const [odemeTipi, setOdemeTipi] = useState("kredi-karti")
  const [odemeIslemi, setOdemeIslemi] = useState(false)

  const paketler = {
    baslangic: { ad: "Başlangıç Paketi", fiyat: 99, saat: 5 },
    standart: { ad: "Standart Paket", fiyat: 179, saat: 10, bonus: 2 },
    premium: { ad: "Premium Paket", fiyat: 299, saat: 20, bonus: 5 },
  }

  useEffect(() => {
    const sepet = localStorage.getItem("sepet")
    if (sepet) {
      setSepetItems(JSON.parse(sepet))
    } else {
      router.push("/paketler")
    }
  }, [router])

  const toplamFiyat = sepetItems.reduce((toplam, item) => {
    const paket = paketler[item as keyof typeof paketler]
    return toplam + (paket?.fiyat || 0)
  }, 0)

  const toplamSaat = sepetItems.reduce((toplam, item) => {
    const paket = paketler[item as keyof typeof paketler]
    return toplam + (paket?.saat || 0) + (paket?.bonus || 0)
  }, 0)

  const handleOdemeYap = (e: React.FormEvent) => {
    e.preventDefault()
    setOdemeIslemi(true)

    setTimeout(() => {
      const kullanici = aktifKullaniciGetir()
      if (kullanici) {
        kullanici.saatBakiyesi += toplamSaat
        kullaniciBilgileriniGuncelle(kullanici)
      }

      // Sepeti temizle
      localStorage.removeItem("sepet")

      // Başarı ekranı
      setTimeout(() => {
        alert(`✅ Ödeme başarılı!\n💰 ${toplamFiyat}₺ ödeme yapıldı\n🎉 ${toplamSaat} saat bakiyenize eklendi!`)
        router.push("/saat-bakiyesi")
      }, 2000)
    }, 2000)
  }

  if (odemeIslemi) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ödeme İşleniyor...</h2>
          <p className="text-muted-foreground">Lütfen bekleyin, ödemeniz güvenli bir şekilde işleniyor</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-8">Ödeme</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Ödeme Formu */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Ödeme Yöntemi</h2>

                <RadioGroup value={odemeTipi} onValueChange={setOdemeTipi} className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="kredi-karti" id="kredi-karti" />
                    <Label htmlFor="kredi-karti" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5" />
                      <span>Kredi/Banka Kartı</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="mobil-odeme" id="mobil-odeme" />
                    <Label htmlFor="mobil-odeme" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="w-5 h-5" />
                      <span>Mobil Ödeme</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="banka-havalesi" id="banka-havalesi" />
                    <Label htmlFor="banka-havalesi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building2 className="w-5 h-5" />
                      <span>Banka Havalesi</span>
                    </Label>
                  </div>
                </RadioGroup>

                {odemeTipi === "kredi-karti" && (
                  <form onSubmit={handleOdemeYap} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="kart-isim">Kart Üzerindeki İsim</Label>
                      <Input id="kart-isim" placeholder="AHMET YILMAZ" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kart-numara">Kart Numarası</Label>
                      <Input id="kart-numara" placeholder="1234 5678 9012 3456" maxLength={19} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="son-kullanma">Son Kullanma</Label>
                        <Input id="son-kullanma" placeholder="MM/YY" maxLength={5} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" type="password" placeholder="123" maxLength={3} required />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <Lock className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-green-700 dark:text-green-400">Ödemeniz SSL ile güvence altında</p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary via-accent to-secondary"
                      size="lg"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      {toplamFiyat}₺ Öde
                    </Button>
                  </form>
                )}

                {odemeTipi === "mobil-odeme" && (
                  <form onSubmit={handleOdemeYap} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefon">Telefon Numarası</Label>
                      <Input id="telefon" type="tel" placeholder="0555 123 45 67" required />
                    </div>
                    <p className="text-sm text-muted-foreground">Telefonunuza onay SMS'i gönderilecektir</p>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary via-accent to-secondary"
                      size="lg"
                    >
                      SMS Gönder ve Öde
                    </Button>
                  </form>
                )}

                {odemeTipi === "banka-havalesi" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-bold mb-2">Banka Bilgileri</h3>
                      <p className="text-sm mb-1">Banka: Ziraat Bankası</p>
                      <p className="text-sm mb-1">IBAN: TR12 3456 7890 1234 5678 9012 34</p>
                      <p className="text-sm">Alıcı: BeceriTak Platform A.Ş.</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Havale açıklamasına sipariş numaranızı yazınız: #{Math.floor(Math.random() * 10000)}
                    </p>
                    <Button
                      onClick={handleOdemeYap}
                      className="w-full bg-gradient-to-r from-primary via-accent to-secondary"
                      size="lg"
                    >
                      Havaleyi Yaptım
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Sipariş Özeti */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Sipariş Özeti</h3>

                <div className="space-y-4 mb-6">
                  {sepetItems.map((item, index) => {
                    const paket = paketler[item as keyof typeof paketler]
                    if (!paket) return null

                    return (
                      <div key={index} className="pb-4 border-b border-border">
                        <div className="font-bold">{paket.ad}</div>
                        <div className="text-sm text-muted-foreground">
                          {paket.saat} saat {paket.bonus && `+ ${paket.bonus} bonus`}
                        </div>
                        <div className="text-primary font-bold">{paket.fiyat}₺</div>
                      </div>
                    )
                  })}

                  <div className="pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Toplam Saat:</span>
                      <span className="font-bold">{toplamSaat} saat</span>
                    </div>
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Toplam:</span>
                      <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {toplamFiyat}₺
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
