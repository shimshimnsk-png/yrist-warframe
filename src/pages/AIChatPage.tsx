import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot, User, Calendar, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
  buttons?: string[]
}

const quickButtons = [
  'Хочу оформить пособие',
  'Нужен маткапитал',
  'Нужно открыть ИП',
  'Нужно составить иск',
  'Нужно РВП / ВНЖ / гражданство',
  'Мне отказали, хочу обжаловать',
]

const chatScripts: Record<string, { questions: string[]; result: string }> = {
  'Хочу оформить пособие': {
    questions: [
      'Сколько вам лет?',
      'Есть ли у вас дети? Если да, сколько и какого возраста?',
      'Какой общий доход семьи в месяц?',
      'Вы работаете официально?',
      'В каком городе вы проживаете?',
    ],
    result: 'По вашим ответам вам может подойти оформление единого пособия. Нужно проверить доход, имущество и состав семьи. Я подготовил заявку для специалиста.',
  },
  'Нужен маткапитал': {
    questions: [
      'Сколько у вас детей?',
      'Какой год рождения последнего ребёнка?',
      'Получали ли вы ранее сертификат на маткапитал?',
      'На что планируете использовать средства?',
    ],
    result: 'Похоже, вы можете претендовать на материнский капитал. Необходимо проверить, не был ли ранее использован сертификат. Заявка подготовлена для специалиста.',
  },
  default: {
    questions: [
      'Расскажите подробнее о вашей ситуации.',
      'Есть ли у вас документы, подтверждающие обстоятельства?',
      'В каком городе вы находитесь?',
      'Обращались ли вы ранее за подобной помощью?',
    ],
    result: 'Спасибо за ответы! Я передам вашу заявку специалисту. Он свяжется с вами в ближайшее время для уточнения деталей.',
  },
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: 'bot',
      text: 'Здравствуйте! Я помогу определить, какая услуга вам нужна. Ответьте на несколько вопросов, а специалист уже получит готовую заявку.',
      buttons: quickButtons,
    },
  ])
  const [input, setInput] = useState('')
  const [script, setScript] = useState<{ questions: string[]; result: string } | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = (from: 'bot' | 'user', text: string, buttons?: string[]) => {
    setMessages(prev => [...prev, { id: prev.length, from, text, buttons }])
  }

  const handleUserMessage = (text: string) => {
    addMessage('user', text)
    setInput('')

    if (!script) {
      const s = chatScripts[text] || chatScripts['default']
      setScript(s)
      setQuestionIndex(0)
      setTimeout(() => addMessage('bot', s.questions[0]), 800)
      return
    }

    if (questionIndex < script.questions.length - 1) {
      const nextIdx = questionIndex + 1
      setQuestionIndex(nextIdx)
      setTimeout(() => addMessage('bot', script.questions[nextIdx]), 800)
    } else {
      setTimeout(() => {
        addMessage('bot', script.result)
        setTimeout(() => {
          addMessage('bot', 'Что бы вы хотели сделать дальше?', ['Записаться к специалисту', 'Передать заявку', 'Начать заново'])
        }, 600)
      }, 1000)
    }
  }

  const handleButtonClick = (text: string) => {
    if (text === 'Начать заново') {
      setMessages([{
        id: 0, from: 'bot',
        text: 'Здравствуйте! Я помогу определить, какая услуга вам нужна. Выберите тему.',
        buttons: quickButtons,
      }])
      setScript(null)
      setQuestionIndex(0)
      return
    }
    if (text === 'Записаться к специалисту' || text === 'Передать заявку') {
      addMessage('user', text)
      setTimeout(() => {
        addMessage('bot', 'Отлично! Ваша заявка передана специалисту. Он свяжется с вами в ближайшее время.')
        toast.success('Заявка передана специалисту!')
      }, 600)
      return
    }
    handleUserMessage(text)
  }

  const handleSend = () => {
    if (!input.trim()) return
    handleUserMessage(input.trim())
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-screen">
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo to-violet flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold">AI-секретарь</h1>
            <p className="text-xs text-muted-foreground">Онлайн</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.from === 'bot' ? 'bg-indigo-light' : 'bg-muted'
                }`}>
                  {msg.from === 'bot' ? <Bot className="w-4 h-4 text-indigo" /> : <User className="w-4 h-4" />}
                </div>
                <div>
                  <div className={`rounded-2xl px-4 py-3 text-sm ${
                    msg.from === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-card border rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.buttons && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.buttons.map(btn => (
                        <Button key={btn} variant="outline" size="sm" className="text-xs h-auto py-1.5 px-3" onClick={() => handleButtonClick(btn)}>
                          {btn}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="p-4 border-t bg-card">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Напишите сообщение..."
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-primary shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
