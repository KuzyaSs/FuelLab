import { Button, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import EmptyState from '../../common/components/EmptyState'
import ErrorAlert from '../../common/components/ErrorAlert'
import Loader from '../../common/components/Loader'
import OrderCard from './components/OrderCard'
import { fetchOrders } from './ordersSlice'

export default function OrdersPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, status, error } = useAppSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
        Мои заказы
      </Typography>

      {(status === 'idle' || status === 'loading') && <Loader />}

      {status === 'failed' && (
        <Stack spacing={2}>
          <ErrorAlert message={error ?? 'Не удалось загрузить заказы'} />

          <Button
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
            onClick={() => dispatch(fetchOrders())}
          >
            Повторить
          </Button>
        </Stack>
      )}

      {status === 'succeeded' &&
        (items.length === 0 ? (
          <EmptyState
            title="Заказов пока нет"
            description="Оформите первый заказ из каталога."
            action={
              <Button variant="contained" onClick={() => navigate('/')}>
                В каталог
              </Button>
            }
          />
        ) : (
          <Stack spacing={2}>
            {items.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Stack>
        ))}
    </>
  )
}
