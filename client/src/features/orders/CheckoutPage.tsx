import { Box, Button, Card, CardContent, Divider, MenuItem, Stack, TextField, Typography, } from '@mui/material'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import EmptyState from '../../common/components/EmptyState'
import ErrorAlert from '../../common/components/ErrorAlert'
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from '../../common/constants'
import type { DeliveryMethod, PaymentMethod } from '../../common/types'
import { formatPrice } from '../../common/utils/format'
import { clear } from '../cart/cartSlice'
import { createOrder } from './ordersSlice'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useAppSelector((state) => state.cart.items)
  const { status, error } = useAppSelector((state) => state.orders)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [delivery, setDelivery] = useState<DeliveryMethod>('courier')
  const [payment, setPayment] = useState<PaymentMethod>('card')

  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0,)
  const deliveryFee = DELIVERY_OPTIONS.find((option) => option.value === delivery)?.fee ?? 0
  const total = itemsTotal + deliveryFee

  if (items.length === 0) {
    return (
      <EmptyState
        title="Корзина пуста"
        description="Добавьте товары, чтобы оформить заказ."
        action={
          <Button variant="contained" onClick={() => navigate('/')}>
            В каталог
          </Button>
        }
      />
    )
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const result = await dispatch(
      createOrder({
        items: items.map((item) => ({
          productId: item.productId,
          qty: item.qty,
        })),
        customer: { name, phone, address, comment },
        delivery: delivery,
        payment: payment,
      }),
    )

    if (createOrder.fulfilled.match(result)) {
      dispatch(clear())
      navigate(`/orders/${result.payload.id}`)
    }
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
        Оформление заказа
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          alignItems: 'start',
        }}
      >
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {error && <ErrorAlert message={error} />}
                <TextField
                  label="Имя и фамилия"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Телефон"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  select
                  label="Доставка"
                  value={delivery}
                  onChange={(event) =>
                    setDelivery(event.target.value as DeliveryMethod)
                  }
                  fullWidth
                >
                  {DELIVERY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                {delivery === 'courier' && (
                  <TextField
                    label="Адрес доставки"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                    fullWidth
                  />
                )}

                <TextField
                  select
                  label="Оплата"
                  value={payment}
                  onChange={(event) =>
                    setPayment(event.target.value as PaymentMethod)
                  }
                  fullWidth
                >
                  {PAYMENT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Комментарий к заказу"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  multiline
                  minRows={2}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={status === 'loading'}
                >
                  {status === 'loading'
                    ? 'Оформляем…'
                    : 'Подтвердить заказ'}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              Ваш заказ
            </Typography>

            <Stack divider={<Divider />} sx={{ mb: 2 }}>
              {items.map((item) => (
                <Stack
                  key={item.productId}
                  direction="row"
                  spacing={1}
                  sx={{ py: 1, justifyContent: 'space-between' }}
                >
                  <Typography variant="body2">
                    {item.name} × {item.qty}
                  </Typography>

                  <Typography variant="body2">
                    {formatPrice(item.price * item.qty)}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2">Товары</Typography>

                <Typography variant="body2">
                  {formatPrice(itemsTotal)}
                </Typography>
              </Stack>

              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2">Доставка</Typography>

                <Typography variant="body2">
                  {deliveryFee === 0
                    ? 'Бесплатно'
                    : formatPrice(deliveryFee)}
                </Typography>
              </Stack>

              <Divider />

              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">Итого</Typography>

                <Typography variant="h6">{formatPrice(total)}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
