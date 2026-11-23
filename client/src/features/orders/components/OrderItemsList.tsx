import { Box, CardMedia, Divider, Stack, Typography } from '@mui/material'
import type { OrderItem } from '../../../common/types'
import { formatPrice } from '../../../common/utils/format'

interface OrderItemsListProps {
  items: OrderItem[]
}

export default function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <Stack divider={<Divider />}>
      {items.map((item) => (
        <Stack
          key={item.productId}
          direction="row"
          spacing={2}
          sx={{ py: 1.5, alignItems: 'center' }}
        >
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{
              width: 56,
              height: 56,
              borderRadius: 1.5,
              objectFit: 'cover',
              bgcolor: 'grey.100',
            }}
          />

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography noWrap>{item.name}</Typography>

            <Typography variant="body2" color="text.secondary">
              {formatPrice(item.price)} × {item.qty}
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 700 }}>
            {formatPrice(item.price * item.qty)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
