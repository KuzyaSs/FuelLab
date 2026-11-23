import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import EmptyState from './EmptyState'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <EmptyState
      title="Страница не найдена"
      description="Похоже, такой страницы не существует."
      action={
        <Button variant="contained" onClick={() => navigate('/')}>
          На главную
        </Button>
      }
    />
  )
}
