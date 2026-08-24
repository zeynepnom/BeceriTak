"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ShoppingCart, Sparkles, Clock, Users, Star } from "lucide-react"

export default function PaketlerPage() {
  const router = useRouter()
  const [sepet, setSepet] = useState<string[]>([])

  const paketler = [
    {
      id: "baslangic",
      ad: "Başlangıç Paketi",
      fiyat: 99,
      saat: 5,
      populer: false,
      ozellikler: ["5 saatlik ders hakkı", "Tüm becerilere erişim", "Email destek", "1 ay geçerlilik"],
    },
    {
      id: "standart",
      ad: "Standart Paket",
      fiyat: 179,
      saat: 10,
      populer: true,
      tasarruf: 10,
      ozellikler: [
        "10 saatlik ders hakkı",
        "Tüm becerilere erişim",
        "Öncelikli destek",
        "2 ay geçerlilik",
        "+2 bonus saat",
      ],
    },
    {
      id: "premium",
      ad: "Premium Paket",
      fiyat: 299,
      saat: 20,
      populer: false,
      tasarruf: 25,
      ozellikler: [
        "20 saatlik ders hakkı",
        "Tüm becerilere erişim",
        "7/24 öncelikli destek",
        "3 ay geçerlilik",
        "+5 bonus saat",
        "Özel eğitmen desteği",
      ],
    },
  ]

  const handleSepeteEkle = (paketId: string) => {
    setSepet([...sepet, paketId])
    alert("Paket sepete eklendi!")
  }

  const handleSepeteGit = () => {
    if (sepet.length === 0) {
      alert("Sepetiniz boş!")
      return
    }
    // Sepet bilgilerini localStorage'a kaydet
    localStorage.setItem("sepet", JSON.stringify(sepet))
    router.push("/sepet")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent">Ücretli Paketler</Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Size Uygun Paketi Seçin
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Beceri sahibi değilseniz veya saat bakiyeniz yoksa, ücretli paketlerle derslere erişim sağlayın
            </p>
          </div>

          {/* Avantajlar */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-bold">Esnek Saatler</h3>
              <p className="text-sm text-muted-foreground">Dilediğiniz zaman kullanın</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-accent/10 to-secondary/10">
              <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
              <h3 className="font-bold">1000+ Eğitmen</h3>
              <p className="text-sm text-muted-foreground">Geniş eğitmen havuzu</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-secondary/10 to-primary/10">
              <Star className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <h3 className="font-bold">Kaliteli Eğitim</h3>
              <p className="text-sm text-muted-foreground">Deneyimli eğitmenler</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-bold">Bonus Saatler</h3>
              <p className="text-sm text-muted-foreground">Her pakette ekstra hediye</p>
            </Card>
          </div>

          {/* Paketler */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {paketler.map((paket) => (
              <Card
                key={paket.id}
                className={`p-8 relative flex flex-col ${paket.populer ? "border-4 border-primary shadow-2xl scale-105" : "border-2"}`}
              >
                {paket.populer && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-base px-4 py-1">
                    En Popüler
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{paket.ad}</h3>
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {paket.fiyat}₺
                  </div>
                  <div className="text-lg text-muted-foreground mb-2">{paket.saat} saat ders hakkı</div>
                  {paket.tasarruf && <Badge className="bg-green-500 text-white">%{paket.tasarruf} Tasarruf</Badge>}
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  {paket.ozellikler.map((ozellik, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{ozellik}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSepeteEkle(paket.id)}
                  className={`w-full ${paket.populer ? "bg-gradient-to-r from-primary via-accent to-secondary" : ""}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Sepete Ekle
                </Button>
              </Card>
            ))}
          </div>

          {/* Sepet Butonu */}
          {sepet.length > 0 && (
            <div className="fixed bottom-6 right-6 z-40">
              <Button
                onClick={handleSepeteGit}
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary via-accent to-secondary shadow-2xl animate-bounce"
              >
                <ShoppingCart className="w-5 h-5" />
                Sepete Git ({sepet.length})
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
