import { NavLink, Outlet } from 'react-router-dom'
import { Home, Search, FileText, MessageCircle, LayoutDashboard, Settings, FolderOpen, Scale } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/benefits', icon: Search, label: 'Подбор' },
  { to: '/documents-list', icon: FileText, label: 'Документы' },
  { to: '/chat', icon: MessageCircle, label: 'Чат' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Кабинет' },
]

const sidebarItems = [
  ...navItems,
  { to: '/document-generator', icon: Scale, label: 'Генератор документов' },
  { to: '/my-documents', icon: FolderOpen, label: 'Мои документы' },
  { to: '/settings', icon: Settings, label: 'Настройки' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border fixed h-full z-40">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo to-violet bg-clip-text text-transparent">
            Социальный юрист
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 lg:ml-64 pb-20 lg:pb-6">
        <Outlet />
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
