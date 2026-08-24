"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Trash2, ArrowRight, Gift } from "lucide-react"

export default function SepetPage() {
  const router = useRouter()
  const [sepetItems, setSepetItems] = useState<string[]>([])

  const paketler = {
    baslangic: { ad: "Başlangıç Paketi", fiyat: 99, saat: 5 },
    standart: { ad: "Standart Paket", fiyat: 179, saat: 10, bonus: 2 },
    premium: { ad: "Premium Paket", fiyat: 299, saat: 20, bonus: 5 },
  }

  useEffect(() => {
    const sepet = localStorage.getItem("sepet")
    if (sepet) {
      setSepetItems(JSON.parse(sepet))
    }
  }, [])

  const handleSil = (index: number) => {
    const yeniSepet = sepetItems.filter((_, i) => i !== index)
    setSepetItems(yeniSepet)
    localStorage.setItem("sepet", JSON.stringify(yeniSepet))
  }

  const toplamFiyat = sepetItems.reduce((toplam, item) => {
    const paket = paketler[item as keyof typeof paketler]
    return toplam + (paket?.fiyat || 0)
  }, 0)

  const toplamSaat = sepetItems.reduce((toplam, item) => {
    const paket = paketler[item as keyof typeof paketler]
    return toplam + (paket?.saat || 0) + (paket?.bonus || 0)
  }, 0)

  const handleOdemeGit = () => {
    if (sepetItems.length === 0) {
      alert("Sepetiniz boş!")
      return
    }
    router.push("/odeme")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Sepetim</h1>

          {sepetItems.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Sepetiniz Boş</h2>
              <p className="text-muted-foreground mb-6">Henüz sepetinize ürün eklemediniz</p>
              <Button onClick={() => router.push("/paketler")} className="bg-gradient-to-r from-primary to-accent">
                Paketlere Göz At
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Sepet İçeriği */}
              <div className="lg:col-span-2 space-y-4">
                {sepetItems.map((item, index) => {
                  const paket = paketler[item as keyof typeof paketler]
                  if (!paket) return null

                  return (
                    <Card key={index} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{paket.ad}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg text-muted-foreground">{paket.saat} saat</span>
                            {paket.bonus && (
                              <span className="text-sm text-green-600 font-bold flex items-center gap-1">
                                <Gift className="w-4 h-4" />+ {paket.bonus} bonus
                              </span>
                            )}
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {paket.fiyat}₺
                          </div>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleSil(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Özet */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Sipariş Özeti</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ürün Sayısı:</span>
                      <span className="font-bold">{sepetItems.length} adet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Toplam Saat:</span>
                      <span className="font-bold">{toplamSaat} saat</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Toplam:</span>
                      <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {toplamFiyat}₺
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleOdemeGit}
                    className="w-full bg-gradient-to-r from-primary via-accent to-secondary gap-2"
                  >
                    Ödemeye Geç
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      <Gift className="w-4 h-4 inline mr-1" />
                      İlk alışverişinizde ekstra bonus kazanın!
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
