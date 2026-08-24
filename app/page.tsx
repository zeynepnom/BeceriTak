import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import {
  Code,
  Palette,
  Languages,
  Music,
  BookOpen,
  Camera,
  TrendingUp,
  Users,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Becerini Paylaş,
              </span>
              <br />
              <span className="text-foreground">Zaman Kazan</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Öğrenciler için tasarlanmış yenilikçi beceri paylaşım platformu. Bildiğin konuyu öğret, öğrenmek istediğini
            öğren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-all text-lg px-8 animate-scale-pulse"
            >
              <Link href="/kayit">
                Hemen Başla
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
              <Link href="/beceri-ara">Becerileri Keşfet</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Nasıl Çalışır?</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">4 basit adımda beceri paylaşımına başla</p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Becerini Ekle",
                description: "Hangi konularda bilgili olduğunu ve öğretebileceğini belirt",
                icon: Sparkles,
                color: "from-primary to-accent",
              },
              {
                step: "2",
                title: "Ders Ver",
                description: "Diğer öğrencilere bilgini aktar ve saat kazan",
                icon: BookOpen,
                color: "from-accent to-secondary",
              },
              {
                step: "3",
                title: "Saat Biriktir",
                description: "Verdiğin her ders için saat bakiyeni arttır",
                icon: Clock,
                color: "from-secondary to-primary",
              },
              {
                step: "4",
                title: "Yeni Beceriler Öğren",
                description: "Biriktirdiğin saatlerle istediğin dersleri al",
                icon: TrendingUp,
                color: "from-primary to-secondary",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 relative overflow-hidden group"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`} />
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popüler Beceriler */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Popüler Beceriler</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">En çok aranan ve öğretilen konular</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                name: "Yazılım",
                icon: Code,
                count: "234",
                color: "bg-primary/10 text-primary border-primary/20",
              },
              {
                name: "Tasarım",
                icon: Palette,
                count: "189",
                color: "bg-accent/10 text-accent border-accent/20",
              },
              {
                name: "Dil",
                icon: Languages,
                count: "312",
                color: "bg-secondary/10 text-secondary border-secondary/20",
              },
              {
                name: "Müzik",
                icon: Music,
                count: "156",
                color: "bg-primary/10 text-primary border-primary/20",
              },
              {
                name: "Akademik",
                icon: BookOpen,
                count: "278",
                color: "bg-accent/10 text-accent border-accent/20",
              },
              {
                name: "Fotoğraf",
                icon: Camera,
                count: "142",
                color: "bg-secondary/10 text-secondary border-secondary/20",
              },
            ].map((skill, index) => {
              const Icon = skill.icon
              return (
                <Card
                  key={index}
                  className={`p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 ${skill.color}`}
                >
                  <Icon className="w-10 h-10 mb-3 mx-auto" />
                  <h3 className="font-bold text-center mb-1">{skill.name}</h3>
                  <p className="text-sm text-center text-muted-foreground">{skill.count} öğretici</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                value: "2,450+",
                label: "Aktif Öğrenci",
                icon: Users,
              },
              {
                value: "156",
                label: "Farklı Beceri",
                icon: Sparkles,
              },
              {
                value: "12,890",
                label: "Toplam Ders Saati",
                icon: Clock,
              },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Kullanıcı Yorumları */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Öğrenciler Ne Diyor?</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Topluluk üyelerinden geri bildirimler</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ayşe Demir",
                role: "Bilgisayar Mühendisliği",
                comment: "Python öğretirken İspanyolca öğrendim. Harika bir sistem!",
                rating: 5,
              },
              {
                name: "Mehmet Yılmaz",
                role: "Grafik Tasarım",
                comment: "Adobe programlarını öğretip matematik dersleri aldım. Çok verimli!",
                rating: 5,
              },
              {
                name: "Zeynep Kaya",
                role: "İngiliz Dili ve Edebiyatı",
                comment: "İngilizce öğretip gitar dersleri alıyorum. Muhteşem bir platform!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Hemen Becerini Paylaşmaya Başla
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Binlerce öğrenci seni bekliyor. Ücretsiz katıl ve toplulukla büyümeye başla.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 animate-scale-pulse">
            <Link href="/kayit">
              Ücretsiz Kayıt Ol
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">BeceriTak</h3>
              <p className="text-muted-foreground text-sm">Öğrenciler için beceri paylaşım platformu</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/beceri-ara" className="hover:text-primary">
                    Beceri Ara
                  </Link>
                </li>
                <li>
                  <Link href="/nasil-calisir" className="hover:text-primary">
                    Nasıl Çalışır?
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" className="hover:text-primary">
                    Hakkımızda
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Destek</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/yardim" className="hover:text-primary">
                    Yardım Merkezi
                  </Link>
                </li>
                <li>
                  <Link href="/sss" className="hover:text-primary">
                    SSS
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="hover:text-primary">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link href="/gizlilik" className="hover:text-primary">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/kullanim-kosullari" className="hover:text-primary">
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link href="/kvkk" className="hover:text-primary">
                    KVKK
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
            © 2025 BeceriTak. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  )
}
