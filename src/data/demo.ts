export type ApplicationStatus = 'new' | 'check' | 'in_progress' | 'waiting_docs' | 'doc_ready' | 'completed'
export type Probability = 'high' | 'medium' | 'low' | 'needs_check'
export type ServiceCategory = 'benefits' | 'documents' | 'court' | 'business' | 'migration'

export interface Application {
  id: string
  clientName: string
  phone: string
  city: string
  service: string
  category: ServiceCategory
  status: ApplicationStatus
  probability: Probability
  date: string
  source: string
  answers?: Record<string, string>
  documents?: DocumentItem[]
}

export interface DocumentItem {
  name: string
  received: boolean | null
}

export interface ServiceItem {
  id: string
  name: string
  description: string
  price: string
  duration: string
  active: boolean
  category: ServiceCategory
}

export interface GeneratedDocument {
  id: string
  name: string
  type: string
  client: string
  date: string
  status: 'draft' | 'ready'
  format: string
}

export const statusLabels: Record<ApplicationStatus, string> = {
  new: 'Новая',
  check: 'Нужна проверка',
  in_progress: 'В работе',
  waiting_docs: 'Ждём документы',
  doc_ready: 'Документ готов',
  completed: 'Завершена',
}

export const statusColors: Record<ApplicationStatus, string> = {
  new: 'bg-indigo-light text-indigo',
  check: 'bg-warning-light text-warning',
  in_progress: 'bg-blue-50 text-blue-600',
  waiting_docs: 'bg-warning-light text-warning',
  doc_ready: 'bg-success-light text-success',
  completed: 'bg-gray-100 text-gray-600',
}

export const probabilityLabels: Record<Probability, string> = {
  high: 'Высокая',
  medium: 'Средняя',
  low: 'Низкая',
  needs_check: 'Нужна проверка',
}

export const probabilityColors: Record<Probability, string> = {
  high: 'bg-success-light text-success',
  medium: 'bg-warning-light text-warning',
  low: 'bg-error-light text-error',
  needs_check: 'bg-gray-100 text-gray-600',
}

export const demoApplications: Application[] = [
  {
    id: '1',
    clientName: 'Анна Смирнова',
    phone: '+7 (900) 123-45-67',
    city: 'Москва',
    service: 'Единое пособие',
    category: 'benefits',
    status: 'new',
    probability: 'high',
    date: '2024-03-15',
    source: 'AI-секретарь',
    answers: {
      'Семейное положение': 'Замужем',
      'Количество детей': '2',
      'Возраст детей': '3 года, 7 лет',
      'Доход семьи': '45 000 ₽',
      'Официальная работа': 'Да',
    },
    documents: [
      { name: 'Паспорт', received: true },
      { name: 'СНИЛС', received: true },
      { name: 'Свидетельства о рождении детей', received: false },
      { name: 'Справка о доходах', received: null },
      { name: 'Реквизиты счёта', received: false },
    ],
  },
  {
    id: '2',
    clientName: 'Мария Волкова',
    phone: '+7 (900) 234-56-78',
    city: 'Санкт-Петербург',
    service: 'Материнский капитал',
    category: 'benefits',
    status: 'waiting_docs',
    probability: 'medium',
    date: '2024-03-12',
    source: 'Подборщик пособий',
    answers: {
      'Количество детей': '1',
      'Возраст ребёнка': '1 год',
      'Использован ли сертификат': 'Нет',
    },
    documents: [
      { name: 'Паспорт', received: true },
      { name: 'Свидетельство о рождении', received: true },
      { name: 'СНИЛС матери', received: false },
      { name: 'СНИЛС ребёнка', received: null },
    ],
  },
  {
    id: '3',
    clientName: 'Алина Каримова',
    phone: '+7 (900) 345-67-89',
    city: 'Казань',
    service: 'ВНЖ',
    category: 'migration',
    status: 'in_progress',
    probability: 'needs_check',
    date: '2024-03-10',
    source: 'AI-секретарь',
    answers: {
      'Гражданство': 'Узбекистан',
      'Текущий статус': 'РВП',
      'Дата въезда': '2022-06-15',
      'Регистрация': 'Есть',
    },
    documents: [
      { name: 'Паспорт', received: true },
      { name: 'РВП', received: true },
      { name: 'Регистрация', received: true },
      { name: 'Медицинское заключение', received: false },
      { name: 'Сертификат по русскому языку', received: null },
    ],
  },
  {
    id: '4',
    clientName: 'Сергей Иванов',
    phone: '+7 (900) 456-78-90',
    city: 'Новосибирск',
    service: 'Открытие ИП',
    category: 'business',
    status: 'doc_ready',
    probability: 'high',
    date: '2024-03-08',
    source: 'Генератор документов',
    answers: {
      'Вид деятельности': 'IT-услуги',
      'Система налогообложения': 'УСН 6%',
      'Нужен расчётный счёт': 'Да',
    },
    documents: [
      { name: 'Паспорт', received: true },
      { name: 'ИНН', received: true },
      { name: 'Заявление Р21001', received: true },
      { name: 'Квитанция госпошлины', received: true },
    ],
  },
  {
    id: '5',
    clientName: 'Наталья Орлова',
    phone: '+7 (900) 567-89-01',
    city: 'Екатеринбург',
    service: 'Исковое заявление',
    category: 'court',
    status: 'check',
    probability: 'medium',
    date: '2024-03-05',
    source: 'AI-секретарь',
    answers: {
      'Тип дела': 'Гражданское',
      'Заявитель': 'Физическое лицо',
      'Вторая сторона': 'ООО "Рассвет"',
      'Сумма требований': '150 000 ₽',
    },
    documents: [
      { name: 'Паспорт', received: true },
      { name: 'Договор', received: true },
      { name: 'Переписка', received: false },
      { name: 'Чеки/квитанции', received: null },
    ],
  },
]

export const demoServices: ServiceItem[] = [
  { id: '1', name: 'Подбор пособия', description: 'Определение доступных пособий и выплат', price: '1 500 ₽', duration: '1-2 дня', active: true, category: 'benefits' },
  { id: '2', name: 'Оформление единого пособия', description: 'Полное сопровождение оформления', price: '5 000 ₽', duration: '5-7 дней', active: true, category: 'benefits' },
  { id: '3', name: 'Материнский капитал', description: 'Консультация и оформление', price: '7 000 ₽', duration: '7-14 дней', active: true, category: 'benefits' },
  { id: '4', name: 'Самозанятость', description: 'Регистрация и консультация', price: '2 000 ₽', duration: '1 день', active: true, category: 'business' },
  { id: '5', name: 'Открытие ИП', description: 'Полное оформление ИП', price: '5 000 ₽', duration: '3-5 дней', active: true, category: 'business' },
  { id: '6', name: 'Исковое заявление', description: 'Составление иска', price: '8 000 ₽', duration: '3-5 дней', active: true, category: 'court' },
  { id: '7', name: 'Возражение', description: 'Составление возражения на иск', price: '6 000 ₽', duration: '2-3 дня', active: true, category: 'court' },
  { id: '8', name: 'Ходатайство', description: 'Составление ходатайства', price: '4 000 ₽', duration: '1-2 дня', active: true, category: 'court' },
  { id: '9', name: 'РВП', description: 'Оформление разрешения на временное проживание', price: '15 000 ₽', duration: '14-30 дней', active: true, category: 'migration' },
  { id: '10', name: 'ВНЖ', description: 'Оформление вида на жительство', price: '20 000 ₽', duration: '14-30 дней', active: true, category: 'migration' },
  { id: '11', name: 'Гражданство РФ', description: 'Сопровождение получения гражданства', price: '25 000 ₽', duration: '30-60 дней', active: true, category: 'migration' },
]

export const demoGeneratedDocuments: GeneratedDocument[] = [
  { id: '1', name: 'Исковое заявление — Орлова Н.', type: 'Иск', client: 'Наталья Орлова', date: '2024-03-05', status: 'draft', format: 'DOCX' },
  { id: '2', name: 'Заявление Р21001 — Иванов С.', type: 'Заявление', client: 'Сергей Иванов', date: '2024-03-08', status: 'ready', format: 'PDF' },
  { id: '3', name: 'Список документов — Смирнова А.', type: 'Чек-лист', client: 'Анна Смирнова', date: '2024-03-15', status: 'ready', format: 'PDF' },
  { id: '4', name: 'Заявление на ВНЖ — Каримова А.', type: 'Заявление', client: 'Алина Каримова', date: '2024-03-10', status: 'draft', format: 'DOCX' },
]

export const documentCategories = [
  'Единое пособие', 'Материнский капитал', 'Пособие беременным',
  'Самозанятость', 'ИП', 'Исковое заявление', 'Возражение',
  'Ходатайство', 'РВП', 'ВНЖ', 'Гражданство РФ',
] as const

export const documentTypes = [
  'Исковое заявление', 'Возражение', 'Ходатайство', 'Претензия',
  'Жалоба', 'Заявление на пособие', 'Заявление на корректировку данных',
  'Заявление для миграционной службы',
] as const
