import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Eye, Edit, Download, Copy, Trash2, FileText, File } from 'lucide-react'
import { toast } from 'sonner'
import { demoGeneratedDocuments } from '@/data/demo'

const filters = [
  { value: 'all', label: 'Все' },
  { value: 'Иск', label: 'Суд' },
  { value: 'Заявление', label: 'Заявления' },
  { value: 'Чек-лист', label: 'Чек-листы' },
  { value: 'draft', label: 'Черновики' },
  { value: 'ready', label: 'Готовые' },
]

export default function MyDocumentsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = demoGeneratedDocuments.filter(doc => {
    if (filter === 'all') return true
    if (filter === 'draft' || filter === 'ready') return doc.status === filter
    return doc.type === filter
  })

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Мои документы</h1>
          <p className="text-muted-foreground text-sm">Хранение и управление документами</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {filters.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Документы не найдены</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(doc => (
            <Card key={doc.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      doc.format === 'PDF' ? 'bg-error-light text-error' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>·</span>
                        <span>{doc.client}</span>
                        <span>·</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.status === 'ready' ? 'default' : 'outline'} className={doc.status === 'ready' ? 'bg-success text-white' : ''}>
                      {doc.status === 'ready' ? 'Готов' : 'Черновик'}
                    </Badge>
                    <Badge variant="outline">{doc.format}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
                  <Button size="sm" variant="ghost" className="text-xs h-8" onClick={() => toast.info('Предпросмотр документа')}>
                    <Eye className="w-3.5 h-3.5 mr-1" /> Открыть
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-8" onClick={() => toast.info('Редактирование')}>
                    <Edit className="w-3.5 h-3.5 mr-1" /> Редактировать
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-8" onClick={() => toast.success('Скачано!')}>
                    <Download className="w-3.5 h-3.5 mr-1" /> Скачать
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-8" onClick={() => toast.success('Дублировано!')}>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Дублировать
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-8 text-destructive hover:text-destructive" onClick={() => toast.success('Удалено!')}>
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Удалить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
