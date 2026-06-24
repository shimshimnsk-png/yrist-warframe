import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Inbox, Clock, FileCheck, UserCheck, CheckCircle, Timer, Eye } from 'lucide-react'
import { demoApplications, statusLabels, statusColors, probabilityLabels, probabilityColors, type ServiceCategory } from '@/data/demo'

const stats = [
  { label: 'Новые заявки', value: '3', icon: Inbox, color: 'text-indigo bg-indigo-light' },
  { label: 'В работе', value: '2', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: 'Документы готовы', value: '1', icon: FileCheck, color: 'text-success bg-success-light' },
  { label: 'Ожидают клиента', value: '1', icon: UserCheck, color: 'text-sky-600 bg-sky-50' },
  { label: 'Завершено за месяц', value: '12', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Сэкономлено часов', value: '48', icon: Timer, color: 'text-violet bg-violet-50' },
]

const categoryFilters: { value: string; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'benefits', label: 'Пособия' },
  { value: 'documents', label: 'Документы' },
  { value: 'court', label: 'Суд' },
  { value: 'business', label: 'ИП/Самозанятость' },
  { value: 'migration', label: 'Миграция' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? demoApplications
    : demoApplications.filter(a => a.category === filter)

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Кабинет специалиста</h1>
        <p className="text-muted-foreground text-sm">Управление заявками и клиентами</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Заявки</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categoryFilters.map(f => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map((app) => (
          <Card key={app.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/application/${app.id}`)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{app.clientName}</p>
                  <p className="text-sm text-muted-foreground">{app.service}</p>
                </div>
                <Badge className={statusColors[app.status]}>{statusLabels[app.status]}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>{app.date}</span>
                <Badge variant="outline" className={probabilityColors[app.probability]}>{probabilityLabels[app.probability]}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Клиент</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Услуга</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Статус</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Дата</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Источник</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Вероятность</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Действие</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-sm">{app.clientName}</p>
                      <p className="text-xs text-muted-foreground">{app.phone}</p>
                    </td>
                    <td className="p-4 text-sm">{app.service}</td>
                    <td className="p-4"><Badge className={statusColors[app.status]}>{statusLabels[app.status]}</Badge></td>
                    <td className="p-4 text-sm text-muted-foreground">{app.date}</td>
                    <td className="p-4 text-sm text-muted-foreground">{app.source}</td>
                    <td className="p-4"><Badge variant="outline" className={probabilityColors[app.probability]}>{probabilityLabels[app.probability]}</Badge></td>
                    <td className="p-4">
                      <Button size="sm" variant="outline" className="text-xs" onClick={() => navigate(`/application/${app.id}`)}>
                        <Eye className="w-3.5 h-3.5 mr-1" /> Открыть
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
