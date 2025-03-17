import DocumentPage from '@/page-components/document-page'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Route = createLazyFileRoute('/')({
  component: DocumentPage,
})


