import { Chip, MenuItem, Stack, TextField } from '@mui/material'
import { CATEGORIES } from '../../../common/constants'
import type { Category } from '../../../common/types'

export type ProductSort = 'default' | 'price-asc' | 'price-desc' | 'rating'

interface CatalogFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: Category | 'all'
  onCategoryChange: (value: Category | 'all') => void
  sort: ProductSort
  onSortChange: (value: ProductSort) => void
}

export default function CatalogFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: CatalogFiltersProps) {
  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          fullWidth
          placeholder="Поиск по названию или бренду"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <TextField
          select
          label="Сортировка"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as ProductSort)}
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="default">По умолчанию</MenuItem>
          <MenuItem value="price-asc">Сначала дешевле</MenuItem>
          <MenuItem value="price-desc">Сначала дороже</MenuItem>
          <MenuItem value="rating">По рейтингу</MenuItem>
        </TextField>
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Chip
          label="Все"
          clickable
          color={category === 'all' ? 'primary' : 'default'}
          onClick={() => onCategoryChange('all')}
        />

        {CATEGORIES.map((item) => (
          <Chip
            key={item}
            label={item}
            clickable
            color={category === item ? 'primary' : 'default'}
            onClick={() => onCategoryChange(item)}
          />
        ))}
      </Stack>
    </Stack>
  )
}
