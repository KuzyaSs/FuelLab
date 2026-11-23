const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export const formatPrice = (value: number) => priceFormatter.format(value)

export const formatDate = (value: string) => dateFormatter.format(new Date(value))
