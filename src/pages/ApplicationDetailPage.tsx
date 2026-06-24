import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Phone, MapPin, Calendar, FileText, Send, Edit, Download, CheckCircle, XCircle, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { demoApplications, statusLabels, statusColors, probabilityLabels, probabilityColors } from '@/data/demo'

export default function ApplicationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const app = demoApplications.find(a => a.id === id)

  if (!app) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Заявка не найдена</p>
        <Button className="mt-4" onClick={() => navigate('/dashboard')}>Вернуться</Button>
      </div>
    )
  }

  const docIcon = (received: boolean | null) => {
    if (received === true) return <CheckCircle className="w-4 h-4 text-success" />
    if (received === false) return <XCircle className="w-4 h-4 text-error" />
    return <HelpCircle className="w-4 h-4 text-warning" />
  }

  const docLabel = (received: boolean | null) => {
    if (received === true) return 'Получено'
    if (received === false) return 'Не получено'
    return 'Нужно уточнить'
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Карточка заявки</h1>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{app.clientName}</h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{app.phone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{app.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{app.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className={statusColors[app.status]}>{statusLabels[app.status]}</Badge>
              <Badge variant="outline" className={probabilityColors[app.probability]}>{probabilityLabels[app.probability]}</Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Услуга:</span> <span className="font-medium">{app.service}</span></div>
            <div><span className="text-muted-foreground">Источник:</span> <span className="font-medium">{app.source}</span></div>
          </div>
        </CardContent>
      </Card>

      {app.answers && (
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="text-base">Ответы клиента</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(app.answers).map(([key, value]) => (
                <div key={key} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{key}</p>
                  <p className="text-sm font-medium mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm bg-indigo-light/30">
        <CardHeader><CardTitle className="text-base">Рекомендация системы</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm">
            Система определила <strong>{probabilityLabels[app.probability].toLowerCase()}</strong> вероятность оформления услуги «{app.service}».
            Нужно дополнительно проверить предоставленные данные и запросить недостающие документы.
          </p>
        </CardContent>
      </Card>

      {app.documents && (
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="text-base">Документы</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {app.documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {docIcon(doc.received)}
                    <span className="text-sm">{doc.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{docLabel(doc.received)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-sm">
        <CardHeader><CardTitle className="text-base">Действия специалиста</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start" onClick={() => toast.success('Список документов сгенерирован')}>
              <FileText className="w-4 h-4 mr-2" /> Сгенерировать список документов
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.success('Переход к генератору')}>
              <Edit className="w-4 h-4 mr-2" /> Создать заявление
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.success('Сообщение отправлено клиенту')}>
              <Send className="w-4 h-4 mr-2" /> Написать клиенту
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.success('Статус изменён')}>
              <Edit className="w-4 h-4 mr-2" /> Изменить статус
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.success('Карточка скачана')}>
              <Download className="w-4 h-4 mr-2" /> Скачать карточку заявки
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
