import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Copy, Save, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { documentTypes } from '@/data/demo'

type Phase = 'select' | 'wizard'

const typeIcons: Record<string, string> = {
  'Исковое заявление': '⚖️', 'Возражение': '🛡️', 'Ходатайство': '📋', 'Претензия': '✉️',
  'Жалоба': '📣', 'Заявление на пособие': '👶', 'Заявление на корректировку данных': '✏️',
  'Заявление для миграционной службы': '🛂',
}

const wizardSteps = ['Данные заявителя', 'Вторая сторона', 'Суть обращения', 'Дополнительно', 'Предпросмотр']

export default function DocumentGeneratorPage() {
  const [phase, setPhase] = useState<Phase>('select')
  const [docType, setDocType] = useState('')
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [applicant, setApplicant] = useState({ fullName: '', address: '', phone: '', email: '', passport: '' })
  const [respondent, setRespondent] = useState({ name: '', address: '', person: '', inn: '' })
  const [substance, setSubstance] = useState({ description: '', request: '', documents: '', eventDate: '', amount: '' })
  const [extras, setExtras] = useState({ restoreDeadline: false, attachDocs: false, withoutPresence: false, compensation: false, evidence: false })

  const progress = ((step + 1) / wizardSteps.length) * 100

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(4) }, 1500)
  }

  const generatedText = `В ${respondent.name || 'Ленинский районный суд г. Москвы'}
${respondent.address || 'г. Москва, ул. Ленина, д. 1'}

Истец: ${applicant.fullName || 'Иванова Анна Сергеевна'}
Адрес: ${applicant.address || 'г. Москва, ул. Пушкина, д. 10, кв. 5'}
Телефон: ${applicant.phone || '+7 (900) 123-45-67'}

${respondent.person ? `Ответчик: ${respondent.person}\n` : ''}
ИСКОВОЕ ЗАЯВЛЕНИЕ

${substance.description || 'Между мной и ответчиком был заключён договор оказания услуг. Ответчик не выполнил свои обязательства в полном объёме, чем причинил мне убытки.'}

На основании вышеизложенного, руководствуясь ст. 131, 132 ГПК РФ,

ПРОШУ:

${substance.request || '1. Взыскать с ответчика сумму в размере 150 000 рублей.\n2. Взыскать судебные расходы.'}
${extras.compensation ? '\n3. Взыскать компенсацию морального вреда.' : ''}
${extras.restoreDeadline ? '\n4. Восстановить пропущенный процессуальный срок.' : ''}

Приложения:
${substance.documents || '1. Копия договора\n2. Копия паспорта\n3. Квитанция об оплате госпошлины'}
${extras.attachDocs ? '\n4. Дополнительные документы' : ''}
${extras.evidence ? '\n5. Доказательства' : ''}

Дата: ${new Date().toLocaleDateString('ru-RU')}
Подпись: _____________ / ${applicant.fullName || 'Иванова А.С.'} /`

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Генератор юридических документов</h1>
        <p className="text-muted-foreground text-sm">Создайте документ по шаблону за несколько минут</p>
      </div>

      {phase === 'select' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {documentTypes.map((type) => (
            <Card
              key={type}
              className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all border-0 shadow-sm"
              onClick={() => { setDocType(type); setPhase('wizard'); setStep(0) }}
            >
              <CardContent className="p-4 text-center">
                <span className="text-2xl mb-2 block">{typeIcons[type]}</span>
                <p className="text-xs font-medium">{type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {phase === 'wizard' && (
        <>
          <div className="mb-4">
            <Button variant="ghost" size="sm" onClick={() => { setPhase('select'); setStep(0) }}>
              <ArrowLeft className="w-4 h-4 mr-1" /> К выбору типа
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Шаг {step + 1} из {wizardSteps.length}</span>
              <span className="text-muted-foreground">{wizardSteps[step]}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {loading && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">Генерация документа...</p>
              </CardContent>
            </Card>
          )}

          {!loading && step < 4 && (
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg">{wizardSteps[step]}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {step === 0 && (
                  <>
                    <div className="space-y-1.5"><Label>ФИО</Label><Input value={applicant.fullName} onChange={e => setApplicant(p => ({...p, fullName: e.target.value}))} placeholder="Иванова Анна Сергеевна" /></div>
                    <div className="space-y-1.5"><Label>Адрес</Label><Input value={applicant.address} onChange={e => setApplicant(p => ({...p, address: e.target.value}))} placeholder="г. Москва, ул. Пушкина, д. 10" /></div>
                    <div className="space-y-1.5"><Label>Телефон</Label><Input value={applicant.phone} onChange={e => setApplicant(p => ({...p, phone: e.target.value}))} placeholder="+7 (900) 123-45-67" /></div>
                    <div className="space-y-1.5"><Label>Email</Label><Input value={applicant.email} onChange={e => setApplicant(p => ({...p, email: e.target.value}))} placeholder="email@example.com" /></div>
                    <div className="space-y-1.5"><Label>Паспортные данные</Label><Input value={applicant.passport} onChange={e => setApplicant(p => ({...p, passport: e.target.value}))} placeholder="Серия и номер" /></div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div className="space-y-1.5"><Label>Название суда / ведомства</Label><Input value={respondent.name} onChange={e => setRespondent(p => ({...p, name: e.target.value}))} placeholder="Ленинский районный суд" /></div>
                    <div className="space-y-1.5"><Label>Адрес</Label><Input value={respondent.address} onChange={e => setRespondent(p => ({...p, address: e.target.value}))} placeholder="г. Москва, ул. Ленина, д. 1" /></div>
                    <div className="space-y-1.5"><Label>ФИО ответчика (если есть)</Label><Input value={respondent.person} onChange={e => setRespondent(p => ({...p, person: e.target.value}))} /></div>
                    <div className="space-y-1.5"><Label>ИНН (если есть)</Label><Input value={respondent.inn} onChange={e => setRespondent(p => ({...p, inn: e.target.value}))} /></div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="space-y-1.5"><Label>Что произошло</Label><Textarea value={substance.description} onChange={e => setSubstance(p => ({...p, description: e.target.value}))} placeholder="Опишите ситуацию" rows={4} /></div>
                    <div className="space-y-1.5"><Label>Что нужно получить</Label><Textarea value={substance.request} onChange={e => setSubstance(p => ({...p, request: e.target.value}))} placeholder="Ваши требования" rows={3} /></div>
                    <div className="space-y-1.5"><Label>Какие документы есть</Label><Textarea value={substance.documents} onChange={e => setSubstance(p => ({...p, documents: e.target.value}))} placeholder="Перечислите документы" rows={3} /></div>
                    <div className="space-y-1.5"><Label>Дата события</Label><Input type="date" value={substance.eventDate} onChange={e => setSubstance(p => ({...p, eventDate: e.target.value}))} /></div>
                    <div className="space-y-1.5"><Label>Сумма требований (₽)</Label><Input value={substance.amount} onChange={e => setSubstance(p => ({...p, amount: e.target.value}))} placeholder="150 000" /></div>
                  </>
                )}
                {step === 3 && (
                  <div className="space-y-3">
                    {[
                      { id: 'restoreDeadline', label: 'Добавить просьбу о восстановлении срока' },
                      { id: 'attachDocs', label: 'Добавить ходатайство о приобщении документов' },
                      { id: 'withoutPresence', label: 'Рассмотреть без участия заявителя' },
                      { id: 'compensation', label: 'Добавить требование о компенсации' },
                      { id: 'evidence', label: 'Добавить блок доказательств' },
                    ].map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Checkbox
                          id={item.id}
                          checked={extras[item.id as keyof typeof extras]}
                          onCheckedChange={(checked) => setExtras(p => ({...p, [item.id]: !!checked}))}
                        />
                        <label htmlFor={item.id} className="text-sm">{item.label}</label>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!loading && step === 4 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {docType}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-xl p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed mb-6">
                  {generatedText}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-primary" onClick={() => toast.success('DOCX скачан!')}>
                    <Download className="w-4 h-4 mr-2" /> Скачать DOCX
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => toast.success('PDF скачан!')}>
                    <Download className="w-4 h-4 mr-2" /> Скачать PDF
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => { navigator.clipboard.writeText(generatedText); toast.success('Скопировано!') }}>
                    <Copy className="w-4 h-4 mr-2" /> Скопировать
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => toast.success('Сохранено в заявку!')}>
                    <Save className="w-4 h-4 mr-2" /> Сохранить
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && step < 4 && (
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Назад
              </Button>
              <Button className="bg-primary" onClick={() => step === 3 ? handleGenerate() : setStep(s => s + 1)}>
                {step === 3 ? 'Сгенерировать' : 'Далее'} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
          {!loading && step === 4 && (
            <div className="mt-6">
              <Button variant="outline" onClick={() => { setPhase('select'); setStep(0) }}>Создать новый документ</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
