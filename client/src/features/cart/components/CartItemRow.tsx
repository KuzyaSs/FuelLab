import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, CardMedia, IconButton, Stack, Typography, } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import type { CartItem } from '../../../common/types'
import { formatPrice } from '../../../common/utils/format'
import { removeItem, setQty } from '../cartSlice'

interface CartItemRowProps {
  item: CartItem
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useAppDispatch()

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ py: 2, alignItems: 'center' }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{
          width: 72,
          height: 72,
          borderRadius: 2,
          objectFit: 'cover',
          bgcolor: 'grey.100',
        }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
          {item.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {item.brand}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {formatPrice(item.price)}
        </Typography>
      </Box>

      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        <IconButton
          size="small"
          onClick={() =>
            dispatch(setQty({ productId: item.productId, qty: item.qty - 1 }))
          }
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <Typography sx={{ minWidth: 20, textAlign: 'center' }}>
          {item.qty}
        </Typography>

        <IconButton
          size="small"
          onClick={() =>
            dispatch(setQty({ productId: item.productId, qty: item.qty + 1 }))
          }
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Typography
        sx={{ minWidth: 100, textAlign: 'right', fontWeight: 700 }}
      >
        {formatPrice(item.price * item.qty)}
      </Typography>

      <IconButton
        color="error"
        onClick={() => dispatch(removeItem(item.productId))}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Stack>
  )
}
