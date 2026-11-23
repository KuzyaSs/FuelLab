import { Button, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import EmptyState from '../../common/components/EmptyState'
import ErrorAlert from '../../common/components/ErrorAlert'
import Loader from '../../common/components/Loader'
import type { Category } from '../../common/types'
import type { ProductSort } from './components/CatalogFilters'
import CatalogFilters from './components/CatalogFilters'
import ProductGrid from './components/ProductGrid'
import { fetchProducts } from './productsSlice'

export default function CatalogPage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState<ProductSort>('default')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    let list = items.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query),
    )

    if (category !== 'all') {
      list = list.filter((product) => product.category === category)
    }

    if (sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price)
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [items, search, category, sort])

  const resetFilters = () => {
    setSearch('')
    setCategory('all')
    setSort('default')
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
        Каталог
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Спортивное питание для силы и восстановления
      </Typography>

      <CatalogFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {(status === 'idle' || status === 'loading') && <Loader />}

      {status === 'failed' && (
        <Stack spacing={2}>
          <ErrorAlert message={error ?? 'Не удалось загрузить каталог'} />

          <Button
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
            onClick={() => dispatch(fetchProducts())}
          >
            Повторить
          </Button>
        </Stack>
      )}

      {status === 'succeeded' &&
        (visibleProducts.length > 0 ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <EmptyState
            title="Ничего не найдено"
            description="Попробуйте изменить фильтры или поисковый запрос."
            action={
              <Button variant="outlined" onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            }
          />
        ))}
    </>
  )
}
