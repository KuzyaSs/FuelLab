import StarIcon from '@mui/icons-material/Star'
import { Alert, Button, Card, CardContent, CardMedia, Chip, Snackbar, Stack, Typography, } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../app/hooks'
import type { Product } from '../../../common/types'
import { formatPrice } from '../../../common/utils/format'
import { addItem } from '../../cart/cartSlice'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        qty: 1,
      }),
    )
    setAdded(true)
  }

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: 200, objectFit: 'cover', bgcolor: 'grey.100' }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Chip label={product.category} size="small" variant="outlined" />

            <Stack
              direction="row"
              spacing={0.5}
              sx={{ alignItems: 'center' }}
            >
              <StarIcon fontSize="small" color="warning" />

              <Typography variant="body2">{product.rating}</Typography>
            </Stack>
          </Stack>

          <Typography variant="subtitle2" color="text.secondary">
            {product.brand}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.weight}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 'auto', pt: 1, alignItems: 'baseline' }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 800 }}
            >
              {formatPrice(product.price)}
            </Typography>

            {product.oldPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {formatPrice(product.oldPrice)}
              </Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              Подробнее
            </Button>

            <Button
              size="small"
              variant="contained"
              disabled={product.stock === 0}
              onClick={handleAdd}
            >
              {product.stock === 0 ? 'Нет в наличии' : 'В корзину'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

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
    </>
  )
}
