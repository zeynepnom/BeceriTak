// localStorage yardımcı fonksiyonları

export interface KullaniciVerisi {
  id: string
  ad: string
  soyad: string
  email: string
  sifre: string
  universite?: string
  bolum?: string
  kayitTarihi: string
  saatBakiyesi: number
}

export interface BeceriVerisi {
  id: string
  kullaniciId: string
  ad: string
  seviye: string
  saatUcreti: number
  aciklama?: string
  kategori: string
}

export interface MesajVerisi {
  id: string
  gonderen: string
  alici: string
  mesaj: string
  tarih: string
  okundu: boolean
}

// Ders işlemleri
export interface DersVerisi {
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

// Kullanıcı işlemleri
export const kullaniciKaydet = (kullanici: Omit<KullaniciVerisi, "id" | "kayitTarihi" | "saatBakiyesi">) => {
  const yeniKullanici: KullaniciVerisi = {
    ...kullanici,
    id: Date.now().toString(),
    kayitTarihi: new Date().toISOString(),
    saatBakiyesi: 5, // Başlangıç bonusu
  }

  const kullanicilar = tumKullanicilariGetir()
  kullanicilar.push(yeniKullanici)
  localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar))

  return yeniKullanici
}

export const kullaniciGiris = (email: string, sifre: string) => {
  const kullanicilar = tumKullanicilariGetir()
  const kullanici = kullanicilar.find((k) => k.email === email && k.sifre === sifre)

  if (kullanici) {
    localStorage.setItem("aktifKullanici", JSON.stringify(kullanici))
    return kullanici
  }

  return null
}

export const aktifKullaniciGetir = (): KullaniciVerisi | null => {
  const kullaniciStr = localStorage.getItem("aktifKullanici")
  return kullaniciStr ? JSON.parse(kullaniciStr) : null
}

export const kullaniciCikis = () => {
  localStorage.removeItem("aktifKullanici")
}

export const tumKullanicilariGetir = (): KullaniciVerisi[] => {
  const kullanicilarStr = localStorage.getItem("kullanicilar")
  return kullanicilarStr ? JSON.parse(kullanicilarStr) : []
}

export const kullaniciBilgileriniGuncelle = (guncelKullanici: KullaniciVerisi) => {
  const kullanicilar = tumKullanicilariGetir()
  const index = kullanicilar.findIndex((k) => k.id === guncelKullanici.id)

  if (index !== -1) {
    kullanicilar[index] = guncelKullanici
    localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar))
    localStorage.setItem("aktifKullanici", JSON.stringify(guncelKullanici))
    return true
  }

  return false
}

// Beceri işlemleri
export const beceriEkle = (beceri: Omit<BeceriVerisi, "id">) => {
  const yeniBeceri: BeceriVerisi = {
    ...beceri,
    id: Date.now().toString(),
  }

  const beceriler = tumBecerileriGetir()
  beceriler.push(yeniBeceri)
  localStorage.setItem("beceriler", JSON.stringify(beceriler))

  return yeniBeceri
}

export const beceriSil = (beceriId: string) => {
  const beceriler = tumBecerileriGetir()
  const yeniBeceriler = beceriler.filter((b) => b.id !== beceriId)
  localStorage.setItem("beceriler", JSON.stringify(yeniBeceriler))
}

export const kullanicininBecerileriniGetir = (kullaniciId: string): BeceriVerisi[] => {
  const beceriler = tumBecerileriGetir()
  return beceriler.filter((b) => b.kullaniciId === kullaniciId)
}

export const tumBecerileriGetir = (): BeceriVerisi[] => {
  const becerilerStr = localStorage.getItem("beceriler")
  return becerilerStr ? JSON.parse(becerilerStr) : []
}

// Mesaj işlemleri
export const mesajGonder = (gonderen: string, alici: string, mesaj: string) => {
  const yeniMesaj: MesajVerisi = {
    id: Date.now().toString(),
    gonderen,
    alici,
    mesaj,
    tarih: new Date().toISOString(),
    okundu: false,
  }

  const mesajlar = tumMesajlariGetir()
  mesajlar.push(yeniMesaj)
  localStorage.setItem("mesajlar", JSON.stringify(mesajlar))

  return yeniMesaj
}

export const kullanicininMesajlariniGetir = (kullaniciId: string) => {
  const mesajlar = tumMesajlariGetir()
  return mesajlar.filter((m) => m.gonderen === kullaniciId || m.alici === kullaniciId)
}

export const tumMesajlariGetir = (): MesajVerisi[] => {
  const mesajlarStr = localStorage.getItem("mesajlar")
  return mesajlarStr ? JSON.parse(mesajlarStr) : []
}

// Ders işlemleri
export const dersEkle = (ders: DersVerisi) => {
  const dersler = tumDersleriGetir()
  dersler.push(ders)
  localStorage.setItem("dersler", JSON.stringify(dersler))
  return ders
}

export const tumDersleriGetir = (): DersVerisi[] => {
  const derslerStr = localStorage.getItem("dersler")
  return derslerStr ? JSON.parse(derslerStr) : []
}

export const dersGuncelle = (dersId: number, guncelBilgiler: Partial<DersVerisi>) => {
  const dersler = tumDersleriGetir()
  const index = dersler.findIndex((d) => d.id === dersId)

  if (index !== -1) {
    dersler[index] = { ...dersler[index], ...guncelBilgiler }
    localStorage.setItem("dersler", JSON.stringify(dersler))
    return true
  }

  return false
}
