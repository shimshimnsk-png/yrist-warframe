import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Download, Send, UserPlus, ArrowLeft, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { documentCategories } from '@/data/demo'

type Phase = 'select' | 'form' | 'result'

const categoryIcons: Record<string, string> = {
  'Единое пособие': '👶', 'Материнский капитал': '👨‍👩‍👧', 'Пособие беременным': '🤰',
  'Самозанятость': '💼', 'ИП': '🏢', 'Исковое заявление': '⚖️', 'Возражение': '📝',
  'Ходатайство': '📋', 'РВП': '🛂', 'ВНЖ': '🏠', 'Гражданство РФ': '🇷🇺',
}

interface DocResult {
  name: string
  type: 'required' | 'additional' | 'request'
  deadline?: string
  comment?: string
}

const demoResults: Record<string, DocResult[]> = {
  'Единое пособие': [
    { name: 'Паспорт заявителя', type: 'required' },
    { name: 'СНИЛС заявителя', type: 'required' },
    { name: 'Свидетельства о рождении детей', type: 'required' },
    { name: 'Справка о доходах за 12 месяцев', type: 'required', deadline: '30 дней' },
    { name: 'Справка о составе семьи', type: 'required', deadline: '10 дней' },
    { name: 'Реквизиты банковского счёта', type: 'required' },
    { name: 'Свидетельство о браке/разводе', type: 'additional', comment: 'Если применимо' },
    { name: 'Справка об алиментах', type: 'additional', comment: 'При наличии' },
    { name: 'Выписка из ЕГРН', type: 'request', comment: 'Запрашивается через Росреестр' },
    { name: 'Справка о движимом имуществе', type: 'request', comment: 'Запрашивается через ГИБДД' },
  ],
  default: [
    { name: 'Паспорт заявителя', type: 'required' },
    { name: 'СНИЛС', type: 'required' },
    { name: 'ИНН', type: 'required' },
    { name: 'Заявление установленного образца', type: 'required' },
    { name: 'Документы, подтверждающие основание', type: 'additional' },
    { name: 'Справка о регистрации', type: 'request' },
  ],
}

const typeConfig = {
  required: { label: 'Обязательный', icon: CheckCircle2, color: 'text-success' },
  additional: { label: 'Дополнительный', icon: Clock, color: 'text-warning' },
  request: { label: 'Нужно запросить', icon: AlertTriangle, color: 'text-error' },
}

export default function DocumentsListPage() {
  const [phase, setPhase] = useState<Phase>('select')
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')

  const docs = demoResults[category] || demoResults['default']

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Генератор списка документов</h1>
        <p className="text-muted-foreground text-sm">Выберите услугу и получите персональный чек-лист документов</p>
      </div>

      {phase === 'select' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {documentCategories.map((cat) => (
            <Card
              key={cat}
              className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all border-0 shadow-sm"
              onClick={() => { setCategory(cat); setPhase('form') }}
            >
              <CardContent className="p-4 text-center">
                <span className="text-2xl mb-2 block">{categoryIcons[cat]}</span>
                <p className="text-sm font-medium">{cat}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {phase === 'form' && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setPhase('select')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-lg">{category} — уточнение</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Состав семьи</Label>
              <Select defaultValue="3"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 человек</SelectItem>
                  <SelectItem value="2">2 человека</SelectItem>
                  <SelectItem value="3">3 человека</SelectItem>
                  <SelectItem value="4">4 человека</SelectItem>
                  <SelectItem value="5">5 и более</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Регион</Label>
              <Input value={region} onChange={e => setRegion(e.target.value)} placeholder="Москва" />
            </div>
            <div className="space-y-2">
              <Label>Дополнительно</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Checkbox id="c1" /><label htmlFor="c1" className="text-sm">Есть инвалидность</label></div>
                <div className="flex items-center gap-2"><Checkbox id="c2" /><label htmlFor="c2" className="text-sm">Многодетная семья</label></div>
                <div className="flex items-center gap-2"><Checkbox id="c3" /><label htmlFor="c3" className="text-sm">Малоимущая семья</label></div>
              </div>
            </div>
            <Button className="w-full bg-primary" onClick={() => setPhase('result')}>
              Сформировать список
            </Button>
          </CardContent>
        </Card>
      )}

      {phase === 'result' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPhase('form')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold">Документы для: {category}</h2>
          </div>

          <div className="bg-warning-light border border-warning/20 rounded-xl p-4 text-sm text-warning">
            Результат носит предварительный характер. Окончательное решение принимает специалист после проверки документов и обстоятельств.
          </div>

          {(['required', 'additional', 'request'] as const).map(type => {
            const items = docs.filter(d => d.type === type)
            if (!items.length) return null
            const cfg = typeConfig[type]
            return (
              <div key={type}>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                  {cfg.label} ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map(doc => (
                    <Card key={doc.name} className="border shadow-sm">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          {doc.deadline && <p className="text-xs text-muted-foreground">Срок действия: {doc.deadline}</p>}
                          {doc.comment && <p className="text-xs text-muted-foreground">{doc.comment}</p>}
                        </div>
                        <Badge variant="outline" className="text-xs">{cfg.label}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="bg-primary flex-1" onClick={() => toast.success('PDF сохранён!')}>
              <Download className="w-4 h-4 mr-2" /> Скачать PDF
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => toast.success('Отправлено в WhatsApp!')}>
              <Send className="w-4 h-4 mr-2" /> Отправить в WhatsApp
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => toast.success('Заявка создана!')}>
              <UserPlus className="w-4 h-4 mr-2" /> Передать специалисту
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
