"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search, Clock, CheckCheck, Paperclip } from "lucide-react"

interface Mesaj {
  id: number
  gonderenBen: boolean
  mesaj: string
  zaman: string
  okundu: boolean
}

interface Sohbet {
  id: number
  kullanici: string
  sonMesaj: string
  zaman: string
  okunmadi: number
  aktif: boolean
}

export default function MesajlarPage() {
  const [secilenSohbet, setSecilenSohbet] = useState(1)
  const [yeniMesaj, setYeniMesaj] = useState("")
  const [aramaMetni, setAramaMetni] = useState("")
  const [tumMesajlar, setTumMesajlar] = useState<Record<number, Mesaj[]>>({})
  const [sohbetListesi, setSohbetListesi] = useState<Sohbet[]>([
    {
      id: 1,
      kullanici: "Ayşe Demir",
      sonMesaj: "Yarın saat 10'da uygun musun?",
      zaman: "5 dk önce",
      okunmadi: 2,
      aktif: true,
    },
    {
      id: 2,
      kullanici: "Mehmet Yılmaz",
      sonMesaj: "Teşekkürler, çok yardımcı oldun!",
      zaman: "1 saat önce",
      okunmadi: 0,
      aktif: false,
    },
    {
      id: 3,
      kullanici: "Zeynep Kaya",
      sonMesaj: "Ders materyallerini gönderebilir misin?",
      zaman: "3 saat önce",
      okunmadi: 1,
      aktif: false,
    },
    {
      id: 4,
      kullanici: "Can Öztürk",
      sonMesaj: "Haftaya görüşürüz o zaman",
      zaman: "Dün",
      okunmadi: 0,
      aktif: false,
    },
  ])

  useEffect(() => {
    const kaydedilmisMesajlar = localStorage.getItem("tumMesajlar")
    const kaydedilmisSohbetler = localStorage.getItem("sohbetListesi")

    if (kaydedilmisMesajlar) {
      setTumMesajlar(JSON.parse(kaydedilmisMesajlar))
    } else {
      const baslangicMesajlar: Record<number, Mesaj[]> = {
        1: [
          {
            id: 1,
            gonderenBen: false,
            mesaj: "Merhaba! Python dersi için uygun olduğun zamanları öğrenebilir miyim?",
            zaman: "10:30",
            okundu: true,
          },
          {
            id: 2,
            gonderenBen: true,
            mesaj: "Merhaba! Bu hafta Salı ve Perşembe günleri müsaitim.",
            zaman: "10:35",
            okundu: true,
          },
        ],
        2: [
          {
            id: 1,
            gonderenBen: false,
            mesaj: "Web tasarım dersi harika geçti, teşekkürler!",
            zaman: "14:20",
            okundu: true,
          },
        ],
        3: [
          {
            id: 1,
            gonderenBen: false,
            mesaj: "Merhaba, ders materyallerini gönderebilir misin?",
            zaman: "09:15",
            okundu: true,
          },
        ],
        4: [
          {
            id: 1,
            gonderenBen: true,
            mesaj: "Bu hafta uygun bir zamanın var mı?",
            zaman: "16:00",
            okundu: true,
          },
        ],
      }
      setTumMesajlar(baslangicMesajlar)
      localStorage.setItem("tumMesajlar", JSON.stringify(baslangicMesajlar))
    }

    if (kaydedilmisSohbetler) {
      setSohbetListesi(JSON.parse(kaydedilmisSohbetler))
    }
  }, [])

  const handleMesajGonder = (e: React.FormEvent) => {
    e.preventDefault()
    if (yeniMesaj.trim()) {
      const yeniMesajObj: Mesaj = {
        id: Date.now(),
        gonderenBen: true,
        mesaj: yeniMesaj,
        zaman: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        okundu: false,
      }

      const guncelMesajlar = {
        ...tumMesajlar,
        [secilenSohbet]: [...(tumMesajlar[secilenSohbet] || []), yeniMesajObj],
      }

      setTumMesajlar(guncelMesajlar)
      localStorage.setItem("tumMesajlar", JSON.stringify(guncelMesajlar))

      // Sohbet listesini güncelle
      const guncelSohbetListesi = sohbetListesi.map((sohbet) =>
        sohbet.id === secilenSohbet ? { ...sohbet, sonMesaj: yeniMesaj, zaman: "Şimdi" } : sohbet,
      )

      setSohbetListesi(guncelSohbetListesi)
      localStorage.setItem("sohbetListesi", JSON.stringify(guncelSohbetListesi))

      setYeniMesaj("")
    }
  }

  const filtreliSohbetler = sohbetListesi.filter((sohbet) =>
    sohbet.kullanici.toLowerCase().includes(aramaMetni.toLowerCase()),
  )

  const secilenKisi = sohbetListesi.find((s) => s.id === secilenSohbet)
  const mesajlar = tumMesajlar[secilenSohbet] || []

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-6">Mesajlar</h1>

          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
            {/* Sohbet Listesi */}
            <Card className="lg:col-span-1 flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Sohbet ara..."
                    value={aramaMetni}
                    onChange={(e) => setAramaMetni(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filtreliSohbetler.map((sohbet) => (
                    <button
                      key={sohbet.id}
                      onClick={() => setSecilenSohbet(sohbet.id)}
                      className={`w-full p-4 rounded-lg mb-2 text-left transition-all hover:bg-muted/50 ${
                        secilenSohbet === sohbet.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                              {sohbet.kullanici[0]}
                            </div>
                            {sohbet.aktif && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold">{sohbet.kullanici}</h3>
                            <p className="text-sm text-muted-foreground truncate max-w-[150px]">{sohbet.sonMesaj}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-muted-foreground">{sohbet.zaman}</span>
                          {sohbet.okunmadi > 0 && (
                            <Badge className="bg-primary text-white px-2 py-0 h-5 min-w-5 flex items-center justify-center">
                              {sohbet.okunmadi}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Mesaj Alanı */}
            <Card className="lg:col-span-2 flex flex-col">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {secilenKisi?.kullanici[0]}
                    </div>
                    {secilenKisi?.aktif && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold">{secilenKisi?.kullanici}</h2>
                    <p className="text-sm text-muted-foreground">{secilenKisi?.aktif ? "Çevrimiçi" : "Çevrimdışı"}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Clock className="w-4 h-4" />
                  Ders Planla
                </Button>
              </div>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {mesajlar.map((mesaj) => (
                    <div key={mesaj.id} className={`flex ${mesaj.gonderenBen ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] ${mesaj.gonderenBen ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-4 rounded-2xl ${
                            mesaj.gonderenBen
                              ? "bg-gradient-to-r from-primary to-accent text-white"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{mesaj.mesaj}</p>
                        </div>
                        <div
                          className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${mesaj.gonderenBen ? "justify-end" : "justify-start"}`}
                        >
                          <span>{mesaj.zaman}</span>
                          {mesaj.gonderenBen && (
                            <CheckCheck className={`w-4 h-4 ${mesaj.okundu ? "text-primary" : ""}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <form onSubmit={handleMesajGonder} className="flex gap-2">
                  <Button type="button" variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    value={yeniMesaj}
                    onChange={(e) => setYeniMesaj(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="flex-shrink-0 bg-gradient-to-r from-primary to-accent"
                    disabled={!yeniMesaj.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
