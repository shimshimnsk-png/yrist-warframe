import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, FileText, MessageCircle, Baby, Briefcase, Scale, Globe, Clock, ClipboardList, Eye, Send } from 'lucide-react'

const services = [
  {
    icon: Baby,
    title: 'Пособия и выплаты',
    description: 'Единое пособие, выплаты беременным, материнский капитал, выплаты на детей',
    color: 'from-indigo to-violet',
    link: '/benefits',
  },
  {
    icon: Briefcase,
    title: 'Самозанятость и ИП',
    description: 'Оформление, корректировка данных, закрытие, выбор режима',
    color: 'from-emerald-500 to-teal-500',
    link: '/documents-list',
  },
  {
    icon: Scale,
    title: 'Суды и заявления',
    description: 'Иски, возражения, ходатайства, претензии и жалобы',
    color: 'from-amber-500 to-orange-500',
    link: '/document-generator',
  },
  {
    icon: Globe,
    title: 'Миграционные документы',
    description: 'РВП, ВНЖ, гражданство РФ, паспорт РФ',
    color: 'from-sky-500 to-blue-500',
    link: '/documents-list',
  },
]

const trustItems = [
  { icon: Clock, text: 'Экономия времени на первичной консультации' },
  { icon: ClipboardList, text: 'Персональный список документов' },
  { icon: Eye, text: 'Понятные шаги без юридического языка' },
  { icon: Send, text: 'Передача заявки специалисту' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <section className="text-center py-8 md:py-12">
        <div className="inline-flex items-center gap-2 bg-indigo-light text-indigo px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Scale className="w-4 h-4" />
          Социальный юрист
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
          Узнайте, какие выплаты и документы{' '}
          <span className="bg-gradient-to-r from-indigo to-violet bg-clip-text text-transparent">
            вам доступны
          </span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8">
          Ответьте на несколько вопросов — система подскажет, что можно оформить, какие документы нужны и куда обратиться дальше
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-indigo to-violet hover:opacity-90 text-white shadow-lg shadow-indigo/25" onClick={() => navigate('/benefits')}>
            <Search className="w-5 h-5 mr-2" />
            Подобрать пособие
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/documents-list')}>
            <FileText className="w-5 h-5 mr-2" />
            Список документов
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/chat')}>
            <MessageCircle className="w-5 h-5 mr-2" />
            Задать вопрос AI-секретарю
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((s) => (
          <Card
            key={s.title}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm overflow-hidden group"
            onClick={() => navigate(s.link)}
          >
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="bg-card rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-center">Почему это удобно</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-start gap-3 p-4 rounded-xl bg-background">
              <div className="w-10 h-10 rounded-lg bg-indigo-light flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-indigo" />
              </div>
              <p className="text-sm font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
