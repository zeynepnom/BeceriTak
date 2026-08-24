"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, TrendingUp, TrendingDown, CreditCard, Plus, Gift } from "lucide-react"

export default function SaatBakiyesiPage() {
  const [satinAlmaDialog, setSatinAlmaDialog] = useState(false)

  const bakiye = {
    toplam: 24.5,
    kazanilan: 42.0,
    harcanan: 17.5,
  }

  const islemler = [
    {
      id: 1,
      tip: "kazanc",
      miktar: 3,
      aciklama: "Python dersi verdiniz - Ayşe Demir",
      tarih: "18 Ocak 2025",
    },
    {
      id: 2,
      tip: "harcama",
      miktar: 4,
      aciklama: "Web Tasarım dersi aldınız - Mehmet Yılmaz",
      tarih: "17 Ocak 2025",
    },
    {
      id: 3,
      tip: "kazanc",
      miktar: 2,
      aciklama: "İngilizce dersi verdiniz - Can Öztürk",
      tarih: "15 Ocak 2025",
    },
    {
      id: 4,
      tip: "satin-alma",
      miktar: 10,
      aciklama: "Saat paketi satın aldınız",
      tarih: "12 Ocak 2025",
    },
    {
      id: 5,
      tip: "harcama",
      miktar: 3,
      aciklama: "JavaScript dersi aldınız - Elif Şahin",
      tarih: "10 Ocak 2025",
    },
  ]

  const saatPaketleri = [
    { id: 1, saat: 5, fiyat: 99, populer: false },
    { id: 2, saat: 10, fiyat: 179, populer: true, tasarruf: 10 },
    { id: 3, saat: 20, fiyat: 299, populer: false, tasarruf: 25 },
  ]

  const handleSatinAl = (paket: { saat: number; fiyat: number }) => {
    console.log("[v0] Saat paketi satın alındı:", paket)

    // Gerçek uygulamada ödeme işlemi burada gerçekleşir
    if (confirm(`${paket.saat} saatlik paketi ${paket.fiyat} ₺'ye satın almak istiyor musunuz?`)) {
      alert(
        `✅ ${paket.saat} saatlik paket başarıyla satın alındı!\n💰 ${paket.fiyat} ₺ ödeme yapıldı.\n🎉 Yeni bakiyeniz güncellendi!`,
      )
      setSatinAlmaDialog(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Saat Bakiyesi</h1>

          {/* Bakiye Kartları */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-muted-foreground">Toplam Bakiye</h3>
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {bakiye.toplam} saat
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border-2 border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-muted-foreground">Kazandığınız</h3>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600">{bakiye.kazanilan} saat</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-2 border-orange-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-muted-foreground">Harcadığınız</h3>
                <TrendingDown className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-orange-600">{bakiye.harcanan} saat</div>
            </Card>
          </div>

          {/* Saat Satın Alma */}
          <Card className="p-8 mb-8 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Saat Satın Al</h2>
                <p className="text-muted-foreground">Daha fazla ders alabilmek için saat bakiyenizi artırın</p>
              </div>
              <Dialog open={satinAlmaDialog} onOpenChange={setSatinAlmaDialog}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-primary via-accent to-secondary">
                    <Plus className="w-5 h-5" />
                    Saat Satın Al
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Saat Paketi Seçin</DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-3 gap-4">
                    {saatPaketleri.map((paket) => (
                      <Card
                        key={paket.id}
                        className={`p-6 relative ${paket.populer ? "border-2 border-primary shadow-xl scale-105" : ""}`}
                      >
                        {paket.populer && (
                          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent">
                            En Popüler
                          </Badge>
                        )}
                        <div className="text-center">
                          <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {paket.saat}
                          </div>
                          <div className="text-lg font-bold mb-4">saat</div>
                          <div className="text-3xl font-bold mb-2">{paket.fiyat} ₺</div>
                          {paket.tasarruf && (
                            <div className="text-sm text-green-600 font-bold mb-4">%{paket.tasarruf} tasarruf</div>
                          )}
                          <Button
                            onClick={() => handleSatinAl(paket)}
                            className={`w-full ${paket.populer ? "bg-gradient-to-r from-primary to-accent" : ""}`}
                          >
                            Satın Al
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Gift className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">İlk Satın Alımınıza Özel</h4>
                        <p className="text-sm text-muted-foreground">
                          İlk saat paketi alımınızda 2 saat bonus kazanın!
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          {/* İşlem Geçmişi */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">İşlem Geçmişi</h2>
            <Tabs defaultValue="tumu">
              <TabsList className="mb-6">
                <TabsTrigger value="tumu">Tümü</TabsTrigger>
                <TabsTrigger value="kazanc">Kazançlar</TabsTrigger>
                <TabsTrigger value="harcama">Harcamalar</TabsTrigger>
              </TabsList>

              <TabsContent value="tumu">
                <div className="space-y-4">
                  {islemler.map((islem) => (
                    <div
                      key={islem.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            islem.tip === "kazanc"
                              ? "bg-green-500/20"
                              : islem.tip === "harcama"
                                ? "bg-orange-500/20"
                                : "bg-primary/20"
                          }`}
                        >
                          {islem.tip === "kazanc" ? (
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          ) : islem.tip === "harcama" ? (
                            <TrendingDown className="w-6 h-6 text-orange-600" />
                          ) : (
                            <CreditCard className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold">{islem.aciklama}</p>
                          <p className="text-sm text-muted-foreground">{islem.tarih}</p>
                        </div>
                      </div>
                      <div
                        className={`text-xl font-bold ${
                          islem.tip === "kazanc"
                            ? "text-green-600"
                            : islem.tip === "harcama"
                              ? "text-orange-600"
                              : "text-primary"
                        }`}
                      >
                        {islem.tip === "kazanc" ? "+" : islem.tip === "harcama" ? "-" : "+"}
                        {islem.miktar} saat
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="kazanc">
                <div className="space-y-4">
                  {islemler
                    .filter((islem) => islem.tip === "kazanc")
                    .map((islem) => (
                      <div key={islem.id} className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-bold">{islem.aciklama}</p>
                            <p className="text-sm text-muted-foreground">{islem.tarih}</p>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-green-600">+{islem.miktar} saat</div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="harcama">
                <div className="space-y-4">
                  {islemler
                    .filter((islem) => islem.tip === "harcama")
                    .map((islem) => (
                      <div key={islem.id} className="flex items-center justify-between p-4 bg-orange-500/10 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <TrendingDown className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-bold">{islem.aciklama}</p>
                            <p className="text-sm text-muted-foreground">{islem.tarih}</p>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-orange-600">-{islem.miktar} saat</div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
