
BeceriTak 🎓⏳

Becerini paylaş, zaman kazan.

BeceriTak, öğrencilerin sahip oldukları becerileri birbirleriyle paylaşmasını ve ihtiyaç duydukları konularda diğer öğrencilerden ders/mentorluk almasını amaçlayan bir beceri değişim ve öğrenci topluluk platformu prototipidir.

Platformun temel fikri, klasik para merkezli özel ders modelinin yerine zaman bazlı bir ekonomi koymaktır. Kullanıcılar bir beceri sunabilir, başka bir öğrenciden ders talep edebilir, derslerini ve mesajlarını yönetebilir ve saat bakiyelerini takip edebilir.

⚠️ Proje durumu: Bu repository bir frontend/prototip uygulamasıdır. Gerçek bir backend, gerçek ödeme altyapısı veya production seviyesinde kimlik doğrulama içermez. Kullanıcı ve uygulama verileri tarayıcıdaki localStorage üzerinde tutulur. Bu nedenle proje; UI/UX, frontend mimarisi, kullanıcı akışları ve ürün fikrinin prototiplenmesi amacıyla değerlendirilmelidir.

📌 İçindekiler

Proje Hakkında

Temel Özellikler

Kullanıcı Akışı

Sayfalar ve Rotalar

Teknoloji Yığını

Proje Mimarisi

Veri Modeli

LocalStorage Yapısı

Kurulum

Çalıştırma

Production Build

Örnek Kullanım

Önemli Teknik Notlar

Güvenlik ve Production Eksikleri

Geliştirme Fikirleri

Klasör Yapısı

Katkıda Bulunma

Lisans

🚀 Proje Hakkında

BeceriTak'ın amacı öğrenciler arasında karşılıklı bilgi ve beceri paylaşımını kolaylaştırmaktır.

Örneğin:

Bir öğrenci React biliyor ancak İngilizce konuşma pratiği yapmak istiyor.

Başka bir öğrenci İngilizce konusunda iyi ancak React öğrenmek istiyor.

BeceriTak üzerinde iki kullanıcı birbirini bulabilir ve ders/öğrenme süreci oluşturabilir.

Platformda zaman, temel değişim birimi olarak kullanılır. Yeni kayıt olan kullanıcıya başlangıçta 5 saatlik bonus bakiye tanımlanır.

Ana ürün yaklaşımı:

Beceri Paylaş
      ↓
Uzman Öğrenciyi Bul
      ↓
Ders Talep Et
      ↓
Saat Bakiyesi Kullan
      ↓
Dersi Planla
      ↓
Ders Geçmişini Takip Et
      ↓
Topluluk İçinde Yeni Beceriler Keşfet

✨ Temel Özellikler

👤 Kullanıcı Yönetimi

Kullanıcı kaydı

Kullanıcı girişi

Oturum bilgisinin tarayıcıda tutulması

Profil bilgilerini görüntüleme ve güncelleme

Çıkış yapma

Üniversite ve bölüm bilgilerinin saklanması

Yeni kullanıcılara başlangıç saat bakiyesi verilmesi

🔎 Beceri Keşfi

/beceri-ara sayfası üzerinden kullanıcılar farklı becerileri keşfedebilir.

Desteklenen kategori örnekleri:

Yazılım

Tasarım

Dil

Müzik

Finans

Akademik

Sanat

Sağlık

Ayrıca beceriler:

kategori,

seviye,

saat ücreti

gibi kriterlere göre filtrelenebilir.

🧑‍🏫 Eğitmen Profili

Her beceri sağlayıcısının detay sayfasında:

profil bilgileri,

becerileri,

değerlendirmeleri,

hakkında bölümü,

ders talep etme arayüzü

sunulur.

Dinamik rota:

/ogretmen/[id]

📚 Ders Yönetimi

/derslerim sayfasında:

gelecek dersler,

geçmiş dersler,

verilen dersler

ayrı şekilde görüntülenebilir.

Ayrıca yeni ders planlama formu üzerinden:

ders konusu,

öğrenci,

tarih,

saat,

süre,

notlar

girilerek ders kaydı oluşturulabilir.

💬 Mesajlaşma

Kullanıcılar arasında mesaj gönderme ve konuşmaları görüntüleme için /mesajlar sayfası bulunur.

Mesajlarda:

gönderen,

alıcı,

mesaj içeriği,

tarih,

okunma durumu

tutulur.

⏳ Saat Bakiyesi

/saat-bakiyesi sayfası kullanıcıların zaman ekonomisini takip etmesini sağlar.

Gösterilen bilgiler:

toplam bakiye,

kazanılan saat,

harcanan saat,

işlem geçmişi,

saat paketi seçenekleri.

🛒 Paketler ve Sepet

Platformda saat satın alma konsepti için:

paketler,

sepet,

ödeme

akışları oluşturulmuştur.

Bu bölümler şu anda frontend/demo seviyesindedir.

💳 Ödeme Arayüzü

/odeme sayfasında:

kredi/banka kartı,

mobil ödeme,

banka havalesi

seçenekleri için arayüz bulunmaktadır.

Gerçek ödeme sağlayıcısı entegrasyonu bulunmamaktadır.

⚙️ Ayarlar

/ayarlar sayfasında kullanıcı hesabıyla ilgili ayarlar ve çıkış işlemleri yönetilir.

📱 Responsive Tasarım

Navbar ve sayfa düzenleri mobil cihazlar için de uyarlanmıştır.

Mobil menü, responsive grid yapıları ve Tailwind CSS sınıfları kullanılmıştır.

🧭 Kullanıcı Akışı

1. Kayıt

Kullanıcı /kayit üzerinden hesap oluşturur.

Kayıt sırasında:

ad,

soyad,

e-posta,

şifre,

üniversite,

bölüm

gibi bilgiler alınır.

KVKK ve kullanım koşulları için kullanıcı onayı arayüzü de bulunmaktadır.

Başarılı kayıt sonrasında kullanıcıya:

5 saat başlangıç bakiyesi

tanımlanır.

2. Giriş

Kullanıcı /giris sayfasından e-posta ve şifresi ile giriş yapar.

Başarılı giriş sonrasında aktif kullanıcı bilgisi localStorage içine kaydedilir.

3. Beceri Arama

Kullanıcı /beceri-ara üzerinden becerileri keşfeder.

Örneğin:

Kategori: Yazılım
Seviye: Orta

gibi filtrelerle sonuçlar daraltılabilir.

4. Eğitmen Seçimi

Bir beceri seçildiğinde ilgili kullanıcı profilinin detay sayfasına gidilebilir:

/ogretmen/123

5. Ders Talebi

Eğitmen profilindeki Ders Talep Et arayüzü üzerinden ders:

konusu,

tarihi,

saati,

süresi,

notları

ile oluşturulabilir.

6. Ders Takibi

Oluşturulan dersler /derslerim sayfasında takip edilir.

7. Mesajlaşma

Kullanıcılar /mesajlar üzerinden iletişim kurabilir.

🗺️ Sayfalar ve Rotalar

Rota

Açıklama

/

Ana sayfa / landing page

/giris

Kullanıcı girişi

/kayit

Yeni kullanıcı kaydı

/sifremi-unuttum

Şifre yenileme arayüzü

/beceri-ara

Beceri keşfetme ve filtreleme

/ogretmen/[id]

Eğitmen/kullanıcı detay profili

/derslerim

Derslerin yönetimi

/mesajlar

Kullanıcı mesajları

/profil

Profil ve beceri yönetimi

/saat-bakiyesi

Saat bakiyesi ve işlem geçmişi

/paketler

Saat paketleri

/sepet

Sepet

/odeme

Ödeme arayüzü

/ayarlar

Hesap ayarları

Ana sayfada ayrıca ürünün tanıtımı için:

nasıl çalışır,

popüler beceriler,

kullanıcı yorumları,

SSS,

yardım,

iletişim,

gizlilik,

KVKK,

kullanım koşulları

gibi içerik bağlantıları için arayüzler bulunmaktadır.

🛠️ Teknoloji Yığını

Frontend

Next.js 16

React 19

TypeScript

Tailwind CSS 4

shadcn/ui yaklaşımı

Radix UI

Lucide React

Form ve Validasyon

React Hook Form

Zod

@hookform/resolvers

UI / UX

Radix UI primitives

Tailwind CSS

Tailwind Merge

Tailwind CSS Animate

Sonner

Vaul

React Day Picker

Embla Carousel

Grafik / Görselleştirme

Recharts

Tarih İşlemleri

date-fns

Analytics

Vercel Analytics

🏗️ Proje Mimarisi

Proje Next.js App Router mimarisini kullanmaktadır.

Genel yapı:

Next.js App Router
        │
        ├── app/
        │    ├── page.tsx
        │    ├── giris/
        │    ├── kayit/
        │    ├── beceri-ara/
        │    ├── ogretmen/[id]/
        │    ├── derslerim/
        │    ├── mesajlar/
        │    ├── profil/
        │    ├── saat-bakiyesi/
        │    ├── paketler/
        │    ├── sepet/
        │    ├── odeme/
        │    └── ayarlar/
        │
        ├── components/
        │    ├── ui/
        │    ├── navbar.tsx
        │    ├── hourglass-logo.tsx
        │    ├── scroll-to-top.tsx
        │    └── theme-provider.tsx
        │
        ├── hooks/
        │
        ├── lib/
        │    ├── storage.ts
        │    └── utils.ts
        │
        └── public/

💾 Veri Modeli

Backend olmadığı için uygulamadaki temel veri modelleri TypeScript interface'leriyle tanımlanmıştır.

Kullanıcı

interface KullaniciVerisi {
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

Beceri

interface BeceriVerisi {
  id: string
  kullaniciId: string
  ad: string
  seviye: string
  saatUcreti: number
  aciklama?: string
  kategori: string
}

Mesaj

interface MesajVerisi {
  id: string
  gonderen: string
  alici: string
  mesaj: string
  tarih: string
  okundu: boolean
}

Ders

interface DersVerisi {
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

🗄️ LocalStorage Yapısı

Uygulamanın veri katmanı lib/storage.ts içerisinde merkezi olarak yönetilmektedir.

Kullanılan temel storage anahtarları:

Anahtar

İçerik

kullanicilar

Tüm kullanıcılar

aktifKullanici

Oturum açmış kullanıcı

beceriler

Kullanıcıların sunduğu beceriler

mesajlar

Mesaj kayıtları

dersler

Ders kayıtları

Örneğin kullanıcı girişi:

localStorage.setItem(
  "aktifKullanici",
  JSON.stringify(kullanici)
)

şeklinde tutulmaktadır.

Bu yaklaşım küçük bir frontend prototipi için hızlıdır; ancak gerçek bir production uygulaması için uygun değildir.

📦 Kurulum

Gereksinimler

Bilgisayarınızda aşağıdakilerin kurulu olması gerekir:

Node.js

npm / pnpm / yarn

Git

Önerilen Node.js sürümü: LTS

Repository'yi klonlama

git clone <REPOSITORY_URL>
cd BeceriTak

Bağımlılıkları yükleme

pnpm kullanıyorsanız:

pnpm install

npm kullanıyorsanız:

npm install

▶️ Çalıştırma

Development sunucusunu başlatmak için:

pnpm dev

veya:

npm run dev

Ardından tarayıcıdan:

http://localhost:3000

adresini açabilirsiniz.

🏭 Production Build

Production build oluşturmak için:

pnpm build

veya:

npm run build

Build sonrasında production sunucusunu:

pnpm start

ile başlatabilirsiniz.

🧪 Kod Kalitesi

Projede ESLint script'i bulunmaktadır:

pnpm lint

veya:

npm run lint

TypeScript ve Next.js yapılandırması da projeye dahildir.

next.config.mjs içerisinde typescript.ignoreBuildErrors aktif durumdadır. Production'a geçmeden önce bu ayarın kaldırılması ve projedeki TypeScript hatalarının tamamen çözülmesi önerilir.

👨‍💻 Örnek Kullanım

Projeyi test etmek için temel senaryo:

1. Yeni hesap oluştur

/kayit

Örnek:

Ad: Ayşe
Soyad: Yılmaz
E-posta: ayse@example.com
Şifre: demo123
Üniversite: Örnek Üniversitesi
Bölüm: Bilgisayar Mühendisliği

Kayıt sonrasında kullanıcıya başlangıç olarak 5 saat verilir.

2. Giriş yap

/giris

Kayıt sırasında kullandığınız e-posta ve şifre ile giriş yapın.

3. Profil oluştur

/profil

Buradan kullanıcıya ait beceriler eklenebilir.

Örneğin:

Kategori: Yazılım
Beceri: JavaScript
Seviye: İleri
Saat Ücreti: 1

4. Beceri ara

/beceri-ara

Eklenen beceri, uygun filtreler kullanılarak keşfedilebilir.

5. Ders talep et

Eğitmen profilinden:

Ders Talep Et

seçeneği kullanılarak ders bilgileri girilebilir.

6. Dersleri takip et

/derslerim

üzerinden planlanan ve geçmiş dersler görüntülenebilir.

⚠️ Önemli Teknik Notlar

1. Backend bulunmuyor

Proje şu anda frontend ağırlıklı bir prototiptir.

Sunucu tarafında:

API,

veritabanı,

gerçek authentication,

gerçek authorization,

server-side session

bulunmamaktadır.

Tüm ana veriler browser localStorage üzerinden tutulmaktadır.

2. Kullanıcı şifreleri güvenli değil

KullaniciVerisi içerisinde sifre alanı doğrudan tutulmaktadır.

Bu yapı gerçek kullanıcı hesapları için kesinlikle kullanılmamalıdır.

Production uygulamasında:

Password
   ↓
Secure hashing
   ↓
Database

modeli kullanılmalıdır.

Örneğin Argon2 veya bcrypt gibi güvenli password hashing çözümleri tercih edilebilir.

3. LocalStorage kullanıcılar arasında izole değildir

Aynı browser profilindeki uygulama verileri aynı storage alanında tutulur.

Bu nedenle gerçek bir çok kullanıcılı sistem güvenliği sağlamaz.

4. Ödeme gerçek değildir

Ödeme sayfasında kart, mobil ödeme ve banka havalesi seçenekleri için UI bulunmasına rağmen gerçek bir ödeme sağlayıcısı ile işlem yapılmamaktadır.

Production için bir ödeme sağlayıcısı ve backend doğrulaması gereklidir.

5. Saat bakiyesi frontend tarafından yönetiliyor

Gerçek bir zaman ekonomisinde bakiye değişikliklerinin frontend tarafından yapılması güvenli değildir.

Bakiye işlemleri server-side transaction mantığıyla gerçekleştirilmelidir.

🔐 Güvenlik ve Production Eksikleri

Bu proje production'a çıkarılmadan önce aşağıdaki mimari iyileştirmeler yapılmalıdır:

Authentication

NextAuth/Auth.js veya özel authentication sistemi

Secure session/cookie

Password hashing

Email verification

Password reset token sistemi

Rate limiting

Brute-force protection

Backend

Örneğin:

Next.js
   ↓
API / Server Actions
   ↓
Service Layer
   ↓
PostgreSQL

şeklinde bir yapı kurulabilir.

Database

Aşağıdaki seçeneklerden biri kullanılabilir:

PostgreSQL

Supabase

Neon

MySQL

ORM olarak:

Prisma

Drizzle

tercih edilebilir.

Authorization

Her işlem için server-side kullanıcı yetkisi kontrol edilmelidir.

Örneğin:

Kullanıcı A
   ↓
Kullanıcı B'nin dersini
değiştirebilir mi?

kontrolü yalnızca frontend'e bırakılmamalıdır.

Payment

Gerçek ödeme sistemi için:

Frontend
   ↓
Backend
   ↓
Payment Provider
   ↓
Webhook
   ↓
Database
   ↓
Saat Bakiyesi

akışı uygulanmalıdır.

🧭 Gelecek Geliştirmeler

BeceriTak'ın production seviyesine taşınması için önerilen geliştirmeler:

🔴 Öncelikli

Backend API

PostgreSQL veritabanı

Güvenli authentication

Password hashing

Server-side authorization

Gerçek ödeme sistemi

Saat bakiyesi transaction sistemi

Kullanıcılar arası güvenli veri izolasyonu

🟡 Orta Öncelik

Gerçek zamanlı mesajlaşma

Bildirim sistemi

Email bildirimleri

Ders hatırlatıcıları

Kullanıcı değerlendirme sistemi

Eğitmen uygunluk takvimi

Gelişmiş arama

Favori eğitmenler

Ders iptal/erteleme sistemi

🟢 İleri Seviye

Video ders entegrasyonu

Google/Apple ile giriş

Rozet ve başarı sistemi

Öğrenci/eğitmen doğrulama

Moderasyon paneli

Admin dashboard

Şikayet ve raporlama sistemi

Dolandırıcılık / kötüye kullanım tespiti

Analitik dashboard

Mobil uygulama

Çoklu dil desteği

📁 Klasör Yapısı

BeceriTak/
│
├── app/
│   ├── ayarlar/
│   ├── beceri-ara/
│   ├── derslerim/
│   ├── giris/
│   ├── kayit/
│   ├── mesajlar/
│   ├── odeme/
│   ├── ogretmen/
│   │   └── [id]/
│   ├── paketler/
│   ├── profil/
│   ├── sepet/
│   ├── sifremi-unuttum/
│   ├── saat-bakiyesi/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── hourglass-logo.tsx
│   ├── navbar.tsx
│   ├── scroll-to-top.tsx
│   └── theme-provider.tsx
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/
│   ├── storage.ts
│   └── utils.ts
│
├── public/
│   ├── apple-icon.png
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   ├── icon.svg
│   └── ...
│
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md

🎨 UI / UX Yaklaşımı

BeceriTak'ın görsel dili modern bir öğrenci platformu yaklaşımı üzerine kuruludur.

Öne çıkan özellikler:

Gradient tabanlı marka dili

Yuvarlatılmış kartlar

Responsive layout

Mobil hamburger menü

Lucide ikonları

Radix UI tabanlı erişilebilir bileşenler

Hover ve transition animasyonları

Açık/koyu tema altyapısı

Loading state'leri

Form feedback'leri

Modern dashboard düzenleri

Logo ve marka kimliği özellikle kum saati / zaman fikri etrafında şekillendirilmiştir.

🧩 Tasarım Sistemi

UI bileşenlerinin önemli bölümü components/ui altında bulunmaktadır.

Bu klasörde örneğin:

Button

Card

Dialog

Input

Select

Checkbox

Calendar

Tabs

Accordion

Alert

Avatar

Badge

Dropdown Menu

Progress

Sheet

Sidebar

gibi tekrar kullanılabilir bileşenler bulunmaktadır.

Bu yapı sayesinde uygulama genelinde tutarlı bir UI oluşturulmuştur.

📊 Ürün Mantığı

BeceriTak'ın temel ürün döngüsü:

                  ┌─────────────────┐
                  │   Yeni Kullanıcı│
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  5 Saat Bonus   │
                  └────────┬────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
      ┌──────────────┐          ┌──────────────┐
      │ Beceri Ekle  │          │ Beceri Ara   │
      └──────┬───────┘          └──────┬───────┘
             │                         │
             ▼                         ▼
      ┌──────────────┐          ┌──────────────┐
      │ Ders Ver     │          │ Eğitmen Bul  │
      └──────┬───────┘          └──────┬───────┘
             │                         │
             └────────────┬────────────┘
                          ▼
                  ┌──────────────┐
                  │ Ders Talebi  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Ders Programı│
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Saat Ekonomisi│
                  └──────────────┘

🤝 Katkıda Bulunma

Projeye katkıda bulunmak için:

git clone <REPOSITORY_URL>
cd BeceriTak

Yeni bir branch oluşturun:

git checkout -b feature/yeni-ozellik

Değişikliklerinizi yapın ve test edin:

pnpm lint
pnpm build

Ardından commit oluşturun:

git add .
git commit -m "feat: yeni özellik eklendi"

Branch'i gönderin:

git push origin feature/yeni-ozellik

Daha sonra GitHub üzerinden Pull Request açabilirsiniz.

📝 Commit Önerileri

Proje geliştirilirken Conventional Commits yaklaşımı kullanılabilir:

feat: beceri filtreleme eklendi
fix: ders formu validasyonu düzeltildi
refactor: storage katmanı düzenlendi
style: navbar responsive tasarımı güncellendi
docs: readme güncellendi
chore: dependency güncellendi

🌱 Projenin Vizyonu

BeceriTak yalnızca bir ders platformu değil, öğrenciler arasında karşılıklı bilgi paylaşımını teşvik eden bir topluluk ekonomisi oluşturmayı hedeflemektedir.

Uzun vadede platform:

öğrencilerin yeteneklerini keşfetmesini,

deneyimlerini paylaşmasını,

yeni beceriler öğrenmesini,

sosyal ve akademik çevre oluşturmasını,

para yerine zaman ve bilgi üzerinden değer üretmesini

sağlayan bir ekosisteme dönüşebilir.

⚖️ Lisans

Bu repository'nin lisans bilgisi ayrıca belirtilmediği için proje sahibi tarafından belirlenmelidir.

GitHub'da açık kaynak olarak yayınlamadan önce uygun bir lisans eklenmesi önerilir.

Örneğin:

MIT

Apache-2.0

GPL-3.0

gibi lisanslardan biri tercih edilebilir.

⭐ Sonuç

BeceriTak, öğrencilerin birbirlerinden öğrenmesini ve kendi becerilerini paylaşmasını merkezine alan, modern Next.js teknolojileriyle hazırlanmış bir frontend prototipidir.

Proje özellikle:

modern React/Next.js geliştirme,

responsive UI/UX,

component-based architecture,

client-side state/data yönetimi,

kullanıcı akışları,

ürün prototipleme

konularını göstermek için güçlü bir örnek oluşturmaktadır.

Becerini paylaş, zaman kazan. — BeceriTak
