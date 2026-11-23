import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import StarIcon from '@mui/icons-material/Star'
import { Alert, Box, Button, CardMedia, Chip, Divider, IconButton, Snackbar, Stack, Typography, } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ErrorAlert from '../../common/components/ErrorAlert'
import Loader from '../../common/components/Loader'
import { formatPrice } from '../../common/utils/format'
import { addItem } from '../cart/cartSlice'
import { fetchProductById } from './productsSlice'

export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selected, status, error } = useAppSelector((state) => state.products)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [id, dispatch])

  if (status === 'failed') {
    return (
      <Stack spacing={2}>
        <ErrorAlert message={error ?? 'Товар не найден'} />

        <Button sx={{ alignSelf: 'flex-start' }} onClick={() => navigate('/')}>
          В каталог
        </Button>
      </Stack>
    )
  }

  if (!selected || selected.id !== id) {
    return <Loader />
  }

  const product = selected

  const handleAdd = () => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        qty: qty,
      }),
    )
    setAdded(true)
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 3, md: 5 },
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        alignItems: 'start',
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          borderRadius: 3,
          bgcolor: 'grey.100',
        }}
      />

      <Box>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip label={product.category} size="small" />

          <Chip label={product.brand} size="small" variant="outlined" />
        </Stack>

        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          {product.name}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mb: 2, alignItems: 'center' }}
        >
          <StarIcon color="warning" fontSize="small" />

          <Typography>{product.rating}</Typography>

          <Typography color="text.secondary" sx={{ ml: 1 }}>
            · {product.weight}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, alignItems: 'baseline' }}
        >
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: 800 }}
          >
            {formatPrice(product.price)}
          </Typography>

          {product.oldPrice && (
            <Typography
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              {formatPrice(product.oldPrice)}
            </Typography>
          )}
        </Stack>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>

        {product.flavors.length > 0 && (
          <Typography sx={{ mb: 2 }}>
            <b>Вкусы:</b> {product.flavors.join(', ')}
          </Typography>
        )}

        <Typography
          sx={{ mb: 2 }}
          color={product.stock > 0 ? 'success.main' : 'error.main'}
        >
          {product.stock > 0
            ? `В наличии: ${product.stock} шт.`
            : 'Нет в наличии'}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <IconButton onClick={() => setQty((value) => Math.max(1, value - 1))}>
              <RemoveIcon />
            </IconButton>

            <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
              {qty}
            </Typography>

            <IconButton
              onClick={() =>
                setQty((value) => Math.min(product.stock, value + 1))
              }
            >
              <AddIcon />
            </IconButton>
          </Stack>

          <Button
            variant="contained"
            size="large"
            disabled={product.stock === 0}
            onClick={handleAdd}
          >
            В корзину
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={added}
        autoHideDuration={1500}
        onClose={() => setAdded(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setAdded(false)}
        >
          Добавлено в корзину
        </Alert>
      </Snackbar>
    </Box>
  )
}
