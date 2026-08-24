"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Clock, MapPin, GraduationCap, Award, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

interface Ogretmen {
  id: number
  ad: string
  universite: string
  bolum: string
  beceri: string
  kategori: string
  seviye: string
  saat: number
  puan: number
  degerlendirme: number
  ders: number
}

export default function OgretmenDetayPage() {
  const router = useRouter()
  const params = useParams()
  const ogretmenId = params.id as string

  const [ogretmen, setOgretmen] = useState<Ogretmen | null>(null)
  const [dersTalepDialog, setDersTalepDialog] = useState(false)
  const [dersFormu, setDersFormu] = useState({
    konu: "",
    tarih: "",
    saat: "",
    sure: "2",
    notlar: "",
  })

  useEffect(() => {
    const ogretmenler = JSON.parse(localStorage.getItem("ogretmenler") || "[]")
    const bulunanOgretmen = ogretmenler.find((o: Ogretmen) => o.id === Number.parseInt(ogretmenId))

    if (bulunanOgretmen) {
      setOgretmen(bulunanOgretmen)
      setDersFormu({ ...dersFormu, konu: bulunanOgretmen.beceri })
    }
  }, [ogretmenId])

  const yorumlar = [
    {
      id: 1,
      kullanici: "Mehmet Y.",
      puan: 5,
      yorum: "Harika bir öğretici! Konusunda çok yardımcı oldu. Karmaşık kavramları basit örneklerle açıkladı.",
      tarih: "3 gün önce",
    },
    {
      id: 2,
      kullanici: "Zeynep K.",
      puan: 5,
      yorum: "Çok sabırlı ve anlayışlı. Gerçekten çok şey öğretti.",
      tarih: "1 hafta önce",
    },
    {
      id: 3,
      kullanici: "Can Ö.",
      puan: 5,
      yorum: "Derslerini çok beğendim. Pratik örnekler ile güzel açıklıyor.",
      tarih: "2 hafta önce",
    },
  ]

  const handleDersTalep = () => {
    if (!dersFormu.konu || !dersFormu.tarih || !dersFormu.saat || !ogretmen) {
      alert("Lütfen tüm zorunlu alanları doldurun!")
      return
    }

    const dersler = JSON.parse(localStorage.getItem("dersler") || "[]")
    const yeniDers = {
      id: Date.now(),
      konu: dersFormu.konu,
      ogretmen: ogretmen.ad,
      tarih: new Date(dersFormu.tarih).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      saat: dersFormu.saat,
      sure: dersFormu.sure,
      notlar: dersFormu.notlar,
      durum: "Beklemede",
      tip: "Online",
      tip_ders: "aldigim",
    }

    dersler.push(yeniDers)
    localStorage.setItem("dersler", JSON.stringify(dersler))

    alert("Ders talebiniz başarıyla gönderildi!")
    setDersTalepDialog(false)
    setDersFormu({
      konu: ogretmen.beceri,
      tarih: "",
      saat: "",
      sure: "2",
      notlar: "",
    })
    router.push("/derslerim")
  }

  if (!ogretmen) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Profil Kartı */}
          <Card className="p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/80 via-accent/80 to-secondary/80" />

            <div className="relative flex flex-col md:flex-row gap-6 items-start pt-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-5xl font-bold border-4 border-background shadow-xl">
                {ogretmen.ad[0]}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{ogretmen.ad}</h1>
                <div className="flex flex-wrap gap-3 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>{ogretmen.bolum}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{ogretmen.universite}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-2xl">{ogretmen.puan}</span>
                      <span className="text-muted-foreground text-sm">({ogretmen.degerlendirme} değerlendirme)</span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm">{ogretmen.ders} ders verdi</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm">Üye: 8 ay</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-primary via-accent to-secondary"
                    onClick={() => setDersTalepDialog(true)}
                  >
                    <Calendar className="w-5 h-5" />
                    Ders Talep Et
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                    <Link href="/mesajlar">
                      <MessageSquare className="w-5 h-5" />
                      Mesaj Gönder
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Hakkında */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Hakkında</h2>
            <p className="text-muted-foreground leading-relaxed">
              {ogretmen.beceri} konusunda uzmanım. Öğretmeyi seviyorum ve karmaşık konuları basit anlatmakta iyiyimdir.
              {ogretmen.kategori === "yazilim" && " Yazılım geliştirme konusunda deneyimim var."}
              {ogretmen.kategori === "dil" && " Dil öğretimi konusunda sertifikalarım var."}
              {ogretmen.kategori === "muzik" && " Müzik eğitimi ve performans deneyimim var."}
              {ogretmen.kategori === "sanat" && " Sanat ve tasarım alanında profesyonel çalışmalarım var."}
              {ogretmen.kategori === "finans" && " Finans ve iş dünyası konusunda pratik deneyimim var."}
            </p>
          </Card>

          {/* Beceriler */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Beceriler</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{ogretmen.beceri}</h3>
                <div className="flex items-center gap-3">
                  <Badge
                    className={`${ogretmen.seviye === "İleri" ? "bg-primary" : ogretmen.seviye === "Orta" ? "bg-accent" : "bg-secondary"}`}
                  >
                    {ogretmen.seviye}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{ogretmen.saat} saat/ders</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Yorumlar */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Öğrenci Yorumları</h2>
            <div className="space-y-6">
              {yorumlar.map((yorum) => (
                <div key={yorum.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {yorum.kullanici[0]}
                      </div>
                      <div>
                        <h4 className="font-bold">{yorum.kullanici}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < yorum.puan ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{yorum.tarih}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{yorum.yorum}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={dersTalepDialog} onOpenChange={setDersTalepDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ders Talep Et</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ders Konusu *</Label>
              <Input
                placeholder="Örn: Python Programlama"
                value={dersFormu.konu}
                onChange={(e) => setDersFormu({ ...dersFormu, konu: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tarih *</Label>
              <Input
                type="date"
                value={dersFormu.tarih}
                onChange={(e) => setDersFormu({ ...dersFormu, tarih: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Saat *</Label>
                <Input
                  type="time"
                  value={dersFormu.saat}
                  onChange={(e) => setDersFormu({ ...dersFormu, saat: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Süre (saat)</Label>
                <Input
                  type="number"
                  min="1"
                  max="8"
                  value={dersFormu.sure}
                  onChange={(e) => setDersFormu({ ...dersFormu, sure: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notlar (Opsiyonel)</Label>
              <Textarea
                placeholder="Ders hakkında özel notlarınız..."
                rows={3}
                value={dersFormu.notlar}
                onChange={(e) => setDersFormu({ ...dersFormu, notlar: e.target.value })}
              />
            </div>
            <Button onClick={handleDersTalep} className="w-full bg-gradient-to-r from-primary to-accent">
              Talebi Gönder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
