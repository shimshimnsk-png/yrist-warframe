import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, FileText, Send, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'

const steps = ['Кто обращается', 'Дети и семья', 'Доход', 'Имущество', 'Результат']

interface FormData {
  fullName: string; phone: string; city: string; citizenship: string; maritalStatus: string
  hasChildren: string; childrenCount: string; childrenAges: string; pregnancy: string; singleMother: string
  familyIncome: string; familyMembers: string; officialWork: string; selfEmployed: string; hasIP: string; existingBenefits: string
  apartment: string; house: string; car: string; land: string; extraProperty: string
}

const initialForm: FormData = {
  fullName: '', phone: '', city: '', citizenship: 'РФ', maritalStatus: '',
  hasChildren: '', childrenCount: '', childrenAges: '', pregnancy: '', singleMother: '',
  familyIncome: '', familyMembers: '', officialWork: '', selfEmployed: '', hasIP: '', existingBenefits: '',
  apartment: '', house: '', car: '', land: '', extraProperty: '',
}

const results = [
  { title: 'Единое пособие', probability: 'high' as const, reason: 'Доход семьи может подходить под критерии' },
  { title: 'Материнский капитал', probability: 'medium' as const, reason: 'Нужно проверить год рождения ребёнка и ранее использованный сертификат' },
  { title: 'Пособие беременным', probability: 'low' as const, reason: 'Не хватает данных о сроке беременности и постановке на учёт' },
]

const probConfig = {
  high: { label: 'Высокая вероятность', color: 'bg-success-light text-success', icon: CheckCircle, barColor: 'bg-success', percent: 85 },
  medium: { label: 'Возможно доступно', color: 'bg-warning-light text-warning', icon: AlertCircle, barColor: 'bg-warning', percent: 55 },
  low: { label: 'Нужно уточнение', color: 'bg-error-light text-error', icon: HelpCircle, barColor: 'bg-error', percent: 25 },
}

export default function BenefitsWizardPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [showResults, setShowResults] = useState(false)

  const set = (key: keyof FormData, val: string) => setForm(prev => ({ ...prev, [key]: val }))
  const progress = ((step + 1) / steps.length) * 100

  const next = () => {
    if (step < steps.length - 2) setStep(s => s + 1)
    else { setStep(steps.length - 1); setShowResults(true) }
  }
  const prev = () => { if (step > 0) setStep(s => s - 1); setShowResults(false) }

  const Field = ({ label, hint, id, value, onChange, type = 'text' }: { label: string; hint?: string; id: keyof FormData; value: string; onChange: (v: string) => void; type?: string }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={hint} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )

  const SelectField = ({ label, id, value, onChange, options }: { label: string; id: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(v) => { if (v) onChange(v) }}>
        <SelectTrigger><SelectValue placeholder="Выберите" /></SelectTrigger>
        <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Подбор пособий и выплат</h1>
        <p className="text-muted-foreground text-sm">Ответьте на вопросы, чтобы узнать, какие выплаты вам доступны</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Шаг {step + 1} из {steps.length}</span>
          <span className="text-muted-foreground">{steps[step]}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg">{steps[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <Field label="ФИО" id="fullName" value={form.fullName} onChange={v => set('fullName', v)} hint="Иванова Анна Сергеевна" />
              <Field label="Телефон" id="phone" value={form.phone} onChange={v => set('phone', v)} hint="+7 (900) 123-45-67" type="tel" />
              <Field label="Город" id="city" value={form.city} onChange={v => set('city', v)} hint="Москва" />
              <SelectField label="Гражданство" id="citizenship" value={form.citizenship} onChange={v => set('citizenship', v)} options={['РФ', 'Иное']} />
              <SelectField label="Семейное положение" id="maritalStatus" value={form.maritalStatus} onChange={v => set('maritalStatus', v)} options={['Не замужем / не женат', 'В браке', 'Разведён(а)', 'Вдовец / вдова']} />
            </>
          )}
          {step === 1 && (
            <>
              <SelectField label="Есть ли дети?" id="hasChildren" value={form.hasChildren} onChange={v => set('hasChildren', v)} options={['Да', 'Нет']} />
              {form.hasChildren === 'Да' && (
                <>
                  <Field label="Количество детей" id="childrenCount" value={form.childrenCount} onChange={v => set('childrenCount', v)} type="number" />
                  <Field label="Возраст каждого ребёнка" id="childrenAges" value={form.childrenAges} onChange={v => set('childrenAges', v)} hint="Например: 3, 7, 12" />
                </>
              )}
              <SelectField label="Беременность" id="pregnancy" value={form.pregnancy} onChange={v => set('pregnancy', v)} options={['Нет', 'Да, на учёте', 'Да, не на учёте']} />
              <SelectField label="Статус матери-одиночки" id="singleMother" value={form.singleMother} onChange={v => set('singleMother', v)} options={['Нет', 'Да']} />
            </>
          )}
          {step === 2 && (
            <>
              <Field label="Общий доход семьи в месяц (₽)" id="familyIncome" value={form.familyIncome} onChange={v => set('familyIncome', v)} type="number" hint="Укажите сумму в рублях" />
              <Field label="Количество членов семьи" id="familyMembers" value={form.familyMembers} onChange={v => set('familyMembers', v)} type="number" />
              <SelectField label="Официальная работа" id="officialWork" value={form.officialWork} onChange={v => set('officialWork', v)} options={['Да', 'Нет']} />
              <SelectField label="Самозанятость" id="selfEmployed" value={form.selfEmployed} onChange={v => set('selfEmployed', v)} options={['Да', 'Нет']} />
              <SelectField label="ИП" id="hasIP" value={form.hasIP} onChange={v => set('hasIP', v)} options={['Да', 'Нет']} />
              <Field label="Пособия, которые уже получаете" id="existingBenefits" value={form.existingBenefits} onChange={v => set('existingBenefits', v)} hint="Перечислите через запятую" />
            </>
          )}
          {step === 3 && (
            <>
              <SelectField label="Квартира" id="apartment" value={form.apartment} onChange={v => set('apartment', v)} options={['Нет', 'Одна', 'Две и более']} />
              <SelectField label="Дом" id="house" value={form.house} onChange={v => set('house', v)} options={['Нет', 'Один', 'Два и более']} />
              <SelectField label="Автомобиль" id="car" value={form.car} onChange={v => set('car', v)} options={['Нет', 'Один', 'Два и более']} />
              <SelectField label="Земельный участок" id="land" value={form.land} onChange={v => set('land', v)} options={['Нет', 'Один', 'Два и более']} />
              <SelectField label="Дополнительная недвижимость" id="extraProperty" value={form.extraProperty} onChange={v => set('extraProperty', v)} options={['Нет', 'Есть']} />
            </>
          )}
          {step === 4 && showResults && (
            <div className="space-y-4">
              <div className="bg-warning-light border border-warning/20 rounded-xl p-4 text-sm text-warning">
                Результат носит предварительный характер. Окончательное решение принимает специалист после проверки документов и обстоятельств.
              </div>
              {results.map((r) => {
                const cfg = probConfig[r.probability]
                return (
                  <Card key={r.title} className="border shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-base">{r.title}</h3>
                        <Badge className={cfg.color}>{cfg.label}</Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <cfg.icon className="w-4 h-4" />
                          <span className="text-sm text-muted-foreground">{r.reason}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                          <div className={`h-2 rounded-full ${cfg.barColor}`} style={{ width: `${cfg.percent}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success('Переход к списку документов')}>
                          <FileText className="w-3.5 h-3.5 mr-1" /> Список документов
                        </Button>
                        <Button size="sm" className="text-xs bg-primary" onClick={() => toast.success('Заявка передана специалисту!')}>
                          <Send className="w-3.5 h-3.5 mr-1" /> Передать специалисту
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {step < 4 && (
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Назад
          </Button>
          <Button onClick={next} className="bg-primary">
            {step === 3 ? 'Показать результат' : 'Далее'} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
      {step === 4 && (
        <div className="mt-6">
          <Button variant="outline" onClick={() => { setStep(0); setShowResults(false); setForm(initialForm) }}>
            Начать заново
          </Button>
        </div>
      )}
    </div>
  )
}
