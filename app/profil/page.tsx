"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Edit, Plus, Clock, GraduationCap, MapPin, Calendar, Trash2, Award } from "lucide-react"
import {
  aktifKullaniciGetir,
  kullanicininBecerileriniGetir,
  beceriEkle,
  beceriSil,
  kullaniciBilgileriniGuncelle,
  type BeceriVerisi,
  type KullaniciVerisi,
} from "@/lib/storage"

export default function ProfilPage() {
  const router = useRouter()
  const [kullanici, setKullanici] = useState<KullaniciVerisi | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [beceriler, setBeceriler] = useState<BeceriVerisi[]>([])
  const [yeniBeceri, setYeniBeceri] = useState({
    ad: "",
    seviye: "",
    saatUcreti: 3,
    aciklama: "",
    kategori: "yazilim",
  })
  const [profilForm, setProfilForm] = useState({
    ad: "",
    soyad: "",
    email: "",
    universite: "",
    bolum: "",
  })

  useEffect(() => {
    const aktifKul = aktifKullaniciGetir()
    if (!aktifKul) {
      router.push("/giris")
      return
    }

    setKullanici(aktifKul)
    setProfilForm({
      ad: aktifKul.ad,
      soyad: aktifKul.soyad,
      email: aktifKul.email,
      universite: aktifKul.universite || "",
      bolum: aktifKul.bolum || "",
    })

    const kullaniciBeceriler = kullanicininBecerileriniGetir(aktifKul.id)
    setBeceriler(kullaniciBeceriler)
  }, [router])

  const [yorumlar] = useState([
    {
      id: 1,
      kullanici: "Ayşe Demir",
      puan: 5,
      yorum: "Harika bir öğretici! Python konusunda çok yardımcı oldu.",
      tarih: "15 Ocak 2025",
    },
    {
      id: 2,
      kullanici: "Mehmet Yılmaz",
      puan: 5,
      yorum: "Web tasarım derslerini çok beğendim. Açıklayıcı ve pratik.",
      tarih: "12 Ocak 2025",
    },
    {
      id: 3,
      kullanici: "Zeynep Kaya",
      puan: 4,
      yorum: "İngilizce konuşma pratiği için çok faydalı oldu.",
      tarih: "8 Ocak 2025",
    },
  ])

  const handleDeleteSkill = (id: string) => {
    if (confirm("Bu beceriyi silmek istediğinizden emin misiniz?")) {
      beceriSil(id)
      setBeceriler(beceriler.filter((b) => b.id !== id))
      alert("Beceri başarıyla silindi!")
    }
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()

    if (!kullanici) return

    if (!yeniBeceri.ad || !yeniBeceri.seviye) {
      alert("Lütfen tüm alanları doldurun!")
      return
    }

    const eklenecekBeceri = beceriEkle({
      kullaniciId: kullanici.id,
      ad: yeniBeceri.ad,
      seviye: yeniBeceri.seviye,
      saatUcreti: yeniBeceri.saatUcreti,
      aciklama: yeniBeceri.aciklama,
      kategori: yeniBeceri.kategori,
    })

    setBeceriler([...beceriler, eklenecekBeceri])
    setIsAddingSkill(false)
    setYeniBeceri({
      ad: "",
      seviye: "",
      saatUcreti: 3,
      aciklama: "",
      kategori: "yazilim",
    })
    alert("Beceri başarıyla eklendi!")
  }

  const handleProfilGuncelle = (e: React.FormEvent) => {
    e.preventDefault()

    if (!kullanici) return

    const guncelKullanici: KullaniciVerisi = {
      ...kullanici,
      ad: profilForm.ad,
      soyad: profilForm.soyad,
      email: profilForm.email,
      universite: profilForm.universite,
      bolum: profilForm.bolum,
    }

    if (kullaniciBilgileriniGuncelle(guncelKullanici)) {
      setKullanici(guncelKullanici)
      setIsEditingProfile(false)
      alert("Profil başarıyla güncellendi!")
    } else {
      alert("Profil güncellenirken bir hata oluştu!")
    }
  }

  if (!kullanici) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Profil Kartı */}
          <Card className="p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/80 via-accent/80 to-secondary/80" />

            <div className="relative flex flex-col md:flex-row gap-6 items-start pt-8">
              {/* Profil Fotoğrafı */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-5xl font-bold border-4 border-background shadow-xl">
                  {kullanici.ad[0]}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors shadow-lg">
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              {/* Profil Bilgileri */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {kullanici.ad} {kullanici.soyad}
                    </h1>
                    <div className="flex flex-wrap gap-3 text-muted-foreground mb-3">
                      {kullanici.bolum && (
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          <span>{kullanici.bolum}</span>
                        </div>
                      )}
                      {kullanici.universite && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{kullanici.universite}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-2xl">5.0</span>
                          <span className="text-muted-foreground text-sm">(24 değerlendirme)</span>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
                    </div>
                  </div>

                  <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Edit className="w-4 h-4" />
                        Profili Düzenle
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Profili Düzenle</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleProfilGuncelle} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="editAd">Ad</Label>
                            <Input
                              id="editAd"
                              value={profilForm.ad}
                              onChange={(e) => setProfilForm({ ...profilForm, ad: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="editSoyad">Soyad</Label>
                            <Input
                              id="editSoyad"
                              value={profilForm.soyad}
                              onChange={(e) => setProfilForm({ ...profilForm, soyad: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editEmail">E-posta</Label>
                          <Input
                            id="editEmail"
                            type="email"
                            value={profilForm.email}
                            onChange={(e) => setProfilForm({ ...profilForm, email: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editUniversite">Üniversite</Label>
                          <Input
                            id="editUniversite"
                            value={profilForm.universite}
                            onChange={(e) => setProfilForm({ ...profilForm, universite: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editBolum">Bölüm</Label>
                          <Input
                            id="editBolum"
                            value={profilForm.bolum}
                            onChange={(e) => setProfilForm({ ...profilForm, bolum: e.target.value })}
                          />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-primary via-accent to-secondary">
                          Kaydet
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <p className="text-muted-foreground mb-4">
                  Yazılım geliştirme ve web tasarımı konusunda deneyimim var. Öğrenmeyi ve öğretmeyi seviyorum.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Saat Bakiyesi</div>
                      <div className="font-bold text-primary">{kullanici.saatBakiyesi} saat</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg">
                    <Award className="w-5 h-5 text-accent" />
                    <div>
                      <div className="text-sm text-muted-foreground">Verilen Dersler</div>
                      <div className="font-bold text-accent">42 ders</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Üyelik</div>
                      <div className="font-bold text-secondary">6 ay</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="beceriler" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="beceriler">Becerilerim</TabsTrigger>
              <TabsTrigger value="yorumlar">Yorumlar</TabsTrigger>
              <TabsTrigger value="musaitlik">Müsaitlik</TabsTrigger>
            </TabsList>

            {/* Beceriler Tab */}
            <TabsContent value="beceriler" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Becerilerim</h2>
                <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-gradient-to-r from-primary via-accent to-secondary">
                      <Plus className="w-4 h-4" />
                      Beceri Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yeni Beceri Ekle</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddSkill} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="kategori">Kategori</Label>
                        <Select
                          value={yeniBeceri.kategori}
                          onValueChange={(value) => setYeniBeceri({ ...yeniBeceri, kategori: value })}
                        >
                          <SelectTrigger id="kategori">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yazilim">Yazılım</SelectItem>
                            <SelectItem value="tasarim">Tasarım</SelectItem>
                            <SelectItem value="dil">Dil</SelectItem>
                            <SelectItem value="muzik">Müzik</SelectItem>
                            <SelectItem value="finans">Finans</SelectItem>
                            <SelectItem value="akademik">Akademik</SelectItem>
                            <SelectItem value="diger">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="beceriAdi">Beceri Adı</Label>
                        <Input
                          id="beceriAdi"
                          placeholder="Örn: Python Programlama"
                          value={yeniBeceri.ad}
                          onChange={(e) => setYeniBeceri({ ...yeniBeceri, ad: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seviye">Seviye</Label>
                        <Select
                          value={yeniBeceri.seviye}
                          onValueChange={(value) => setYeniBeceri({ ...yeniBeceri, seviye: value })}
                        >
                          <SelectTrigger id="seviye">
                            <SelectValue placeholder="Seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                            <SelectItem value="Orta">Orta</SelectItem>
                            <SelectItem value="İleri">İleri</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="saatUcreti">Saat Ücreti (Saat cinsinden)</Label>
                        <Input
                          id="saatUcreti"
                          type="number"
                          placeholder="3"
                          value={yeniBeceri.saatUcreti}
                          onChange={(e) =>
                            setYeniBeceri({ ...yeniBeceri, saatUcreti: Number.parseInt(e.target.value) })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aciklama">Açıklama</Label>
                        <Textarea
                          id="aciklama"
                          placeholder="Bu beceri hakkında kısa bir açıklama yazın..."
                          rows={4}
                          value={yeniBeceri.aciklama}
                          onChange={(e) => setYeniBeceri({ ...yeniBeceri, aciklama: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-primary via-accent to-secondary">
                        Beceri Ekle
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {beceriler.length === 0 ? (
                  <Card className="p-8 text-center col-span-2">
                    <p className="text-muted-foreground">Henüz beceri eklenmemiş. Hemen beceri ekleyerek başlayın!</p>
                  </Card>
                ) : (
                  beceriler.map((beceri) => (
                    <Card key={beceri.id} className="p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-2">{beceri.ad}</h3>
                          <Badge
                            className={`${
                              beceri.seviye === "İleri"
                                ? "bg-primary"
                                : beceri.seviye === "Orta"
                                  ? "bg-accent"
                                  : "bg-secondary"
                            }`}
                          >
                            {beceri.seviye}
                          </Badge>
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(beceri.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="w-4 h-4" />
                        <span>{beceri.saatUcreti} saat/ders</span>
                      </div>
                      {beceri.aciklama && <p className="text-sm text-muted-foreground">{beceri.aciklama}</p>}
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Yorumlar Tab */}
            <TabsContent value="yorumlar" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Aldığım Yorumlar</h2>
              <div className="space-y-4">
                {yorumlar.map((yorum) => (
                  <Card key={yorum.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                          {yorum.kullanici[0]}
                        </div>
                        <div>
                          <h4 className="font-bold">{yorum.kullanici}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < yorum.puan ? "fill-primary text-primary" : "text-muted"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{yorum.tarih}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{yorum.yorum}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Müsaitlik Tab */}
            <TabsContent value="musaitlik" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Müsait Zamanlar</h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-6">
                  Ders verebileceğin zamanları belirle. Öğrenciler bu saatlerde seninle iletişime geçebilir.
                </p>
                <div className="space-y-4">
                  {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"].map((gun) => (
                    <div key={gun} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-32 font-bold">{gun}</div>
                      <div className="flex-1 flex gap-2">
                        <Input type="time" defaultValue="09:00" />
                        <span className="flex items-center">-</span>
                        <Input type="time" defaultValue="17:00" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-6 w-full bg-gradient-to-r from-primary via-accent to-secondary">
                  Müsaitlik Saatlerini Kaydet
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
