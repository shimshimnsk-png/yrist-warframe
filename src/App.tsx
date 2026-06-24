import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import BenefitsWizardPage from '@/pages/BenefitsWizardPage'
import DocumentsListPage from '@/pages/DocumentsListPage'
import DocumentGeneratorPage from '@/pages/DocumentGeneratorPage'
import AIChatPage from '@/pages/AIChatPage'
import DashboardPage from '@/pages/DashboardPage'
import ApplicationDetailPage from '@/pages/ApplicationDetailPage'
import MyDocumentsPage from '@/pages/MyDocumentsPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/benefits" element={<BenefitsWizardPage />} />
          <Route path="/documents-list" element={<DocumentsListPage />} />
          <Route path="/document-generator" element={<DocumentGeneratorPage />} />
          <Route path="/chat" element={<AIChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/application/:id" element={<ApplicationDetailPage />} />
          <Route path="/my-documents" element={<MyDocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}
