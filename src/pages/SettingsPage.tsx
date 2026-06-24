import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Save, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { demoServices } from '@/data/demo'

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Диана Петрова',
    phone: '+7 (900) 999-99-99',
    city: 'Москва',
    description: 'Специалист по социальным выплатам и юридическим документам',
    workHours: 'Пн-Пт, 9:00-18:00',
  })

  const [services, setServices] = useState(demoServices)

  const toggleService = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Настройки</h1>
        <p className="text-muted-foreground text-sm">Управление профилем и услугами</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="services">Услуги и цены</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="channels">Каналы связи</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Профиль специалиста</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Имя специалиста</Label>
                  <Input value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Телефон</Label>
                  <Input value={profile.phone} onChange={e => setProfile(p => ({...p, phone: e.target.value}))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Город</Label>
                  <Input value={profile.city} onChange={e => setProfile(p => ({...p, city: e.target.value}))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Режим работы</Label>
                  <Input value={profile.workHours} onChange={e => setProfile(p => ({...p, workHours: e.target.value}))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Описание</Label>
                <Input value={profile.description} onChange={e => setProfile(p => ({...p, description: e.target.value}))} />
              </div>
              <Button className="bg-primary" onClick={() => toast.success('Профиль сохранён!')}>
                <Save className="w-4 h-4 mr-2" /> Сохранить
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Услуги и цены</CardTitle>
                <Button size="sm" variant="outline" onClick={() => toast.info('Добавление услуги')}>
                  <Plus className="w-4 h-4 mr-1" /> Добавить
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{s.name}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs cursor-pointer ${s.active ? 'bg-success-light text-success' : 'bg-muted text-muted-foreground'}`}
                          onClick={() => toggleService(s.id)}
                        >
                          {s.active ? 'Активна' : 'Не активна'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-sm">{s.price}</p>
                      <p className="text-xs text-muted-foreground">{s.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Шаблоны сообщений</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Приветствие', text: 'Здравствуйте! Спасибо за обращение. Я изучу ваш вопрос и свяжусь с вами в ближайшее время.' },
                { name: 'Запрос документов', text: 'Для продолжения работы мне понадобятся следующие документы: ...' },
                { name: 'Результат', text: 'По итогам проверки ваших документов сообщаю следующее: ...' },
              ].map(t => (
                <div key={t.name} className="p-4 rounded-lg bg-muted/30">
                  <p className="font-medium text-sm mb-1">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Каналы связи</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'WhatsApp', status: 'Подключён', active: true },
                { name: 'Telegram', status: 'Подключён', active: true },
                { name: 'Email', status: 'Не подключён', active: false },
                { name: 'SMS', status: 'Не подключён', active: false },
              ].map(c => (
                <div key={c.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.status}</p>
                  </div>
                  <Badge variant="outline" className={c.active ? 'bg-success-light text-success' : ''}>
                    {c.active ? 'Активен' : 'Выключен'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
