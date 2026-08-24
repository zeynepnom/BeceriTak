"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search, Star, Clock, MapPin, Filter } from "lucide-react"
import Link from "next/link"

const ornekOgretmenler = [
  {
    id: 1,
    ad: "Ayşe Demir",
    universite: "Boğaziçi Üniversitesi",
    bolum: "Bilgisayar Mühendisliği",
    beceri: "Python Programlama",
    kategori: "yazilim",
    seviye: "İleri",
    saat: 3,
    puan: 5.0,
    degerlendirme: 24,
    ders: 42,
  },
  {
    id: 2,
    ad: "Mehmet Yılmaz",
    universite: "ODTÜ",
    bolum: "Grafik Tasarım",
    beceri: "Adobe Photoshop",
    kategori: "tasarim",
    seviye: "İleri",
    saat: 4,
    puan: 4.9,
    degerlendirme: 18,
    ders: 35,
  },
  {
    id: 3,
    ad: "Zeynep Kaya",
    universite: "Hacettepe Üniversitesi",
    bolum: "İngiliz Dili",
    beceri: "İngilizce Konuşma",
    kategori: "dil",
    seviye: "İleri",
    saat: 2,
    puan: 5.0,
    degerlendirme: 31,
    ders: 56,
  },
  {
    id: 4,
    ad: "Can Öztürk",
    universite: "İTÜ",
    bolum: "Matematik",
    beceri: "Kalkülüs",
    kategori: "akademik",
    seviye: "Orta",
    saat: 3,
    puan: 4.8,
    degerlendirme: 15,
    ders: 28,
  },
  {
    id: 5,
    ad: "Elif Şahin",
    universite: "Bilkent Üniversitesi",
    bolum: "Müzik",
    beceri: "Gitar Dersleri",
    kategori: "muzik",
    seviye: "Orta",
    saat: 2,
    puan: 4.9,
    degerlendirme: 22,
    ders: 40,
  },
  {
    id: 6,
    ad: "Burak Arslan",
    universite: "Koç Üniversitesi",
    bolum: "Ekonomi",
    beceri: "Excel & Veri Analizi",
    kategori: "finans",
    seviye: "İleri",
    saat: 3,
    puan: 4.7,
    degerlendirme: 12,
    ders: 24,
  },
  {
    id: 7,
    ad: "Selin Korkmaz",
    universite: "Mimar Sinan Güzel Sanatlar",
    bolum: "Resim",
    beceri: "Sulu Boya Resim",
    kategori: "sanat",
    seviye: "İleri",
    saat: 4,
    puan: 4.8,
    degerlendirme: 19,
    ders: 33,
  },
  {
    id: 8,
    ad: "Emre Demir",
    universite: "Ankara Üniversitesi",
    bolum: "İşletme",
    beceri: "Girişimcilik ve İş Planlama",
    kategori: "finans",
    seviye: "İleri",
    saat: 5,
    puan: 4.9,
    degerlendirme: 16,
    ders: 29,
  },
  {
    id: 9,
    ad: "Deniz Aydın",
    universite: "İstanbul Üniversitesi",
    bolum: "Fransızca Öğretmenliği",
    beceri: "Fransızca Konuşma",
    kategori: "dil",
    seviye: "İleri",
    saat: 3,
    puan: 5.0,
    degerlendirme: 27,
    ders: 48,
  },
  {
    id: 10,
    ad: "Ahmet Yıldız",
    universite: "Bilkent Üniversitesi",
    bolum: "Müzik",
    beceri: "Piyano Dersleri",
    kategori: "muzik",
    seviye: "İleri",
    saat: 4,
    puan: 4.9,
    degerlendirme: 21,
    ders: 37,
  },
  {
    id: 11,
    ad: "Gamze Özen",
    universite: "Sabancı Üniversitesi",
    bolum: "Endüstri Mühendisliği",
    beceri: "React ve Next.js",
    kategori: "yazilim",
    seviye: "İleri",
    saat: 4,
    puan: 4.8,
    degerlendirme: 14,
    ders: 26,
  },
  {
    id: 12,
    ad: "Cem Tuncer",
    universite: "Ege Üniversitesi",
    bolum: "Güzel Sanatlar",
    beceri: "Heykel ve Seramik",
    kategori: "sanat",
    seviye: "Orta",
    saat: 3,
    puan: 4.7,
    degerlendirme: 11,
    ders: 22,
  },
  {
    id: 13,
    ad: "Sudenur Gürlek",
    universite: "İstanbul Üniversitesi",
    bolum: "İşletme",
    beceri: "Muhasebe ve Mali Analiz",
    kategori: "finans",
    seviye: "İleri",
    saat: 3,
    puan: 4.9,
    degerlendirme: 20,
    ders: 38,
  },
  {
    id: 14,
    ad: "Efkan Yıldırım",
    universite: "Hacettepe Üniversitesi",
    bolum: "Beslenme ve Diyetetik",
    beceri: "Sağlıklı Beslenme ve Yaşam",
    kategori: "saglik",
    seviye: "İleri",
    saat: 2,
    puan: 5.0,
    degerlendirme: 25,
    ders: 45,
  },
]

export default function BeceriAraPage() {
  const [aramaMetni, setAramaMetni] = useState("")
  const [kategori, setKategori] = useState("tumu")
  const [seviye, setSeviye] = useState("tumu")
  const [minPuan, setMinPuan] = useState([0])
  const [maxSaat, setMaxSaat] = useState([10])
  const [filtreliOgretmenler, setFiltreliOgretmenler] = useState(ornekOgretmenler)

  useEffect(() => {
    localStorage.setItem("ogretmenler", JSON.stringify(ornekOgretmenler))
  }, [])

  const handleArama = () => {
    let sonuc = ornekOgretmenler

    // Arama metni filtresi
    if (aramaMetni) {
      sonuc = sonuc.filter(
        (ogr) =>
          ogr.ad.toLowerCase().includes(aramaMetni.toLowerCase()) ||
          ogr.beceri.toLowerCase().includes(aramaMetni.toLowerCase()) ||
          ogr.bolum.toLowerCase().includes(aramaMetni.toLowerCase()),
      )
    }

    // Kategori filtresi
    if (kategori !== "tumu") {
      sonuc = sonuc.filter((ogr) => ogr.kategori === kategori)
    }

    // Seviye filtresi
    if (seviye !== "tumu") {
      sonuc = sonuc.filter((ogr) => ogr.seviye.toLowerCase() === seviye)
    }

    // Puan filtresi
    sonuc = sonuc.filter((ogr) => ogr.puan >= minPuan[0])

    // Saat ücreti filtresi
    sonuc = sonuc.filter((ogr) => ogr.saat <= maxSaat[0])

    setFiltreliOgretmenler(sonuc)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Başlık ve Arama */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Beceri Ara
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">Öğrenmek istediğin konuda uzman öğrencileri keşfet</p>

            {/* Arama Çubuğu */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Beceri, öğretici veya bölüm ara..."
                    value={aramaMetni}
                    onChange={(e) => setAramaMetni(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleArama()}
                    className="pl-12 py-6 text-lg"
                  />
                </div>
                <Button
                  size="lg"
                  onClick={handleArama}
                  className="px-8 bg-gradient-to-r from-primary via-accent to-secondary"
                >
                  Ara
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filtre Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5" />
                  <h2 className="text-xl font-bold">Filtreler</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select value={kategori} onValueChange={setKategori}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tumu">Tümü</SelectItem>
                        <SelectItem value="yazilim">Yazılım</SelectItem>
                        <SelectItem value="tasarim">Tasarım</SelectItem>
                        <SelectItem value="dil">Dil</SelectItem>
                        <SelectItem value="muzik">Müzik</SelectItem>
                        <SelectItem value="finans">Finans</SelectItem>
                        <SelectItem value="akademik">Akademik</SelectItem>
                        <SelectItem value="sanat">Sanat</SelectItem>
                        <SelectItem value="saglik">Sağlık</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seviye */}
                  <div className="space-y-2">
                    <Label>Seviye</Label>
                    <Select value={seviye} onValueChange={setSeviye}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tumu">Tümü</SelectItem>
                        <SelectItem value="baslangic">Başlangıç</SelectItem>
                        <SelectItem value="orta">Orta</SelectItem>
                        <SelectItem value="ileri">İleri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minimum Puan */}
                  <div className="space-y-2">
                    <Label>Minimum Puan: {minPuan[0]}</Label>
                    <Slider min={0} max={5} step={0.5} value={minPuan} onValueChange={setMinPuan} className="mt-2" />
                  </div>

                  {/* Maksimum Saat Ücreti */}
                  <div className="space-y-2">
                    <Label>Maksimum Saat Ücreti: {maxSaat[0]} saat</Label>
                    <Slider min={1} max={10} step={1} value={maxSaat} onValueChange={setMaxSaat} className="mt-2" />
                  </div>

                  {/* Filtre Uygula */}
                  <Button
                    onClick={handleArama}
                    className="w-full bg-gradient-to-r from-primary via-accent to-secondary"
                  >
                    Filtreleri Uygula
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sonuçlar */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{filtreliOgretmenler.length} Öğretici Bulundu</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filtreliOgretmenler.map((ogretmen) => (
                  <Card
                    key={ogretmen.id}
                    className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                        {ogretmen.ad[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1">{ogretmen.ad}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{ogretmen.universite}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{ogretmen.bolum}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-bold text-primary mb-2">{ogretmen.beceri}</h4>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${ogretmen.seviye === "İleri" ? "bg-primary" : ogretmen.seviye === "Orta" ? "bg-accent" : "bg-secondary"}`}
                        >
                          {ogretmen.seviye}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{ogretmen.saat} saat/ders</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(ogretmen.puan) ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="font-bold">{ogretmen.puan}</span>
                        <span className="text-sm text-muted-foreground">({ogretmen.degerlendirme})</span>
                      </div>
                      <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent">
                        <Link href={`/ogretmen/${ogretmen.id}`}>Profil</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filtreliOgretmenler.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">Sonuç Bulunamadı</h3>
                  <p className="text-muted-foreground">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
