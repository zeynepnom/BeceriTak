"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Video, CheckCircle, XCircle, Star, User, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Ders {
  id: number
  konu: string
  ogretmen?: string
  ogrenci?: string
  tarih: string
  saat: string
  sure?: string
  notlar?: string
  durum: string
  tip: string
  tip_ders: "aldigim" | "verdigim"
  degerlendirme?: boolean
  puan?: number
}

export default function DerslerimPage() {
  const router = useRouter()
  const [degerlendirmeDialog, setDegerlendirmeDialog] = useState(false)
  const [secilenPuan, setSecilenPuan] = useState(0)
  const [yorumMetni, setYorumMetni] = useState("")
  const [yeniDersDialog, setYeniDersDialog] = useState(false)
  const [tumDersler, setTumDersler] = useState<Ders[]>([])
  const [dersFormu, setDersFormu] = useState({
    konu: "",
    ogrenci: "",
    tarih: "",
    saat: "",
    sure: "2",
    notlar: "",
  })

  useEffect(() => {
    const kaydedilmisDersler = localStorage.getItem("dersler")
    let dersler = kaydedilmisDersler ? JSON.parse(kaydedilmisDersler) : []

    // Eğer geçmiş ders yoksa örnek dersler ekle
    if (dersler.filter((d: Ders) => d.degerlendirme === true).length === 0) {
      const ornekGecmisDersler: Ders[] = [
        {
          id: 1001,
          konu: "Python Programlama",
          ogretmen: "Ayşe Demir",
          tarih: "5 Ocak 2025",
          saat: "14:00",
          sure: "2",
          durum: "Tamamlandı",
          tip: "Online",
          tip_ders: "aldigim",
          degerlendirme: true,
          puan: 5,
        },
        {
          id: 1002,
          konu: "İngilizce Konuşma Pratiği",
          ogretmen: "Zeynep Kaya",
          tarih: "8 Ocak 2025",
          saat: "16:00",
          sure: "1.5",
          durum: "Tamamlandı",
          tip: "Online",
          tip_ders: "aldigim",
          degerlendirme: true,
          puan: 5,
        },
        {
          id: 1003,
          konu: "Adobe Photoshop Temel",
          ogretmen: "Mehmet Yılmaz",
          tarih: "12 Ocak 2025",
          saat: "10:00",
          sure: "2",
          durum: "Tamamlandı",
          tip: "Online",
          tip_ders: "aldigim",
          degerlendirme: true,
          puan: 4,
        },
        {
          id: 1004,
          konu: "Gitar Başlangıç",
          ogretmen: "Elif Şahin",
          tarih: "15 Ocak 2025",
          saat: "18:00",
          sure: "1",
          durum: "Tamamlandı",
          tip: "Online",
          tip_ders: "aldigim",
          degerlendirme: true,
          puan: 5,
        },
      ]

      dersler = [...dersler, ...ornekGecmisDersler]
      localStorage.setItem("dersler", JSON.stringify(dersler))
    }

    setTumDersler(dersler)
  }, [])

  const gelecekDersler = tumDersler.filter((d) => d.tip_ders === "aldigim" && !d.degerlendirme)
  const gecmisDersler = tumDersler.filter((d) => d.tip_ders === "aldigim" && d.degerlendirme === true)
  const verdigimDersler = tumDersler.filter((d) => d.tip_ders === "verdigim")

  const handleDegerlendirmeGonder = (dersId: number) => {
    if (secilenPuan === 0) {
      alert("Lütfen bir puan seçin!")
      return
    }

    const guncelDersler = tumDersler.map((ders) => {
      if (ders.id === dersId) {
        return { ...ders, degerlendirme: true, puan: secilenPuan }
      }
      return ders
    })

    setTumDersler(guncelDersler)
    localStorage.setItem("dersler", JSON.stringify(guncelDersler))

    alert(`Değerlendirme başarıyla kaydedildi! ${secilenPuan} yıldız verdiniz.`)
    setDegerlendirmeDialog(false)
    setSecilenPuan(0)
    setYorumMetni("")
  }

  const handleDersOnayla = (dersId: number) => {
    const guncelDersler = tumDersler.map((ders) => {
      if (ders.id === dersId) {
        return { ...ders, durum: "Onaylı" }
      }
      return ders
    })

    setTumDersler(guncelDersler)
    localStorage.setItem("dersler", JSON.stringify(guncelDersler))
    alert("Ders başarıyla onaylandı!")
  }

  const handleDersReddet = (dersId: number) => {
    if (confirm("Bu dersi reddetmek istediğinizden emin misiniz?")) {
      const guncelDersler = tumDersler.filter((ders) => ders.id !== dersId)
      setTumDersler(guncelDersler)
      localStorage.setItem("dersler", JSON.stringify(guncelDersler))
      alert("Ders reddedildi.")
    }
  }

  const handleDerseKatil = (dersId: number) => {
    alert("Video konferans başlatılıyor...")
  }

  const handleYeniDersPlanla = () => {
    if (!dersFormu.konu || !dersFormu.ogrenci || !dersFormu.tarih || !dersFormu.saat) {
      alert("Lütfen tüm zorunlu alanları doldurun!")
      return
    }

    const yeniDers: Ders = {
      id: Date.now(),
      konu: dersFormu.konu,
      ogrenci: dersFormu.ogrenci,
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
      tip_ders: "verdigim",
    }

    const guncelDersler = [...tumDersler, yeniDers]
    setTumDersler(guncelDersler)
    localStorage.setItem("dersler", JSON.stringify(guncelDersler))

    alert("Ders başarıyla planlandı!")
    setYeniDersDialog(false)
    setDersFormu({
      konu: "",
      ogrenci: "",
      tarih: "",
      saat: "",
      sure: "2",
      notlar: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Derslerim</h1>
              <p className="text-muted-foreground">Ders programını ve geçmişini yönet</p>
            </div>
            <Button
              className="mt-4 md:mt-0 gap-2 bg-gradient-to-r from-primary via-accent to-secondary"
              onClick={() => setYeniDersDialog(true)}
            >
              <CalendarIcon className="w-5 h-5" />
              Yeni Ders Planla
            </Button>
          </div>

          <Tabs defaultValue="gelecek" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="gelecek">Gelecek Dersler</TabsTrigger>
              <TabsTrigger value="gecmis">Geçmiş Dersler</TabsTrigger>
              <TabsTrigger value="verdigim">Verdiğim Dersler</TabsTrigger>
            </TabsList>

            {/* Gelecek Dersler */}
            <TabsContent value="gelecek" className="space-y-4">
              {gelecekDersler.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">Henüz gelecek dersiniz yok</p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gelecekDersler.map((ders) => (
                    <Card
                      key={ders.id}
                      className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-lg">{ders.konu}</h3>
                        <Badge className={`${ders.durum === "Onaylı" ? "bg-green-500" : "bg-yellow-500"} text-white`}>
                          {ders.durum}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{ders.ogretmen}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="text-sm">{ders.tarih}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{ders.saat}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Video className="w-4 h-4" />
                          <span className="text-sm">{ders.tip}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-primary to-accent"
                          onClick={() => handleDerseKatil(ders.id)}
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Katıl
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                          <Link href="/mesajlar">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Mesaj
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Geçmiş Dersler */}
            <TabsContent value="gecmis" className="space-y-4">
              {gecmisDersler.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">Henüz geçmiş dersiniz yok</p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gecmisDersler.map((ders) => (
                    <Card key={ders.id} className="p-6 hover:shadow-lg transition-all border-2">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-lg">{ders.konu}</h3>
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Değerlendirildi
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{ders.ogretmen}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="text-sm">{ders.tarih}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{ders.saat}</span>
                        </div>
                        {ders.puan && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${i < ders.puan! ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-bold">{ders.puan}/5</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Verdiğim Dersler */}
            <TabsContent value="verdigim" className="space-y-4">
              {verdigimDersler.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">Henüz verdiğiniz ders yok</p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verdigimDersler.map((ders) => (
                    <Card
                      key={ders.id}
                      className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-lg">{ders.konu}</h3>
                        <Badge className={`${ders.durum === "Onaylı" ? "bg-green-500" : "bg-yellow-500"} text-white`}>
                          {ders.durum}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span className="text-sm">Öğrenci: {ders.ogrenci}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="text-sm">{ders.tarih}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{ders.saat}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Video className="w-4 h-4" />
                          <span className="text-sm">{ders.tip}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {ders.durum === "Onaylı" ? (
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-primary to-accent"
                            onClick={() => handleDerseKatil(ders.id)}
                          >
                            <Video className="w-4 h-4 mr-1" />
                            Derse Başla
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => handleDersOnayla(ders.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Onayla
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent text-destructive"
                              onClick={() => handleDersReddet(ders.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reddet
                            </Button>
                          </>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={yeniDersDialog} onOpenChange={setYeniDersDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Ders Planla</DialogTitle>
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
              <Label>Öğrenci Adı *</Label>
              <Input
                placeholder="Öğrencinin adı"
                value={dersFormu.ogrenci}
                onChange={(e) => setDersFormu({ ...dersFormu, ogrenci: e.target.value })}
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
            <Button onClick={handleYeniDersPlanla} className="w-full bg-gradient-to-r from-primary to-accent">
              Dersi Planla
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
