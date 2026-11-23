import { Chip } from '@mui/material'
import { ORDER_STATUS_LABELS } from '../../../common/constants'
import type { OrderStatus } from '../../../common/types'

interface OrderStatusChipProps {
  status: OrderStatus
}

export default function OrderStatusChip({ status }: OrderStatusChipProps) {
  return <Chip label={ORDER_STATUS_LABELS[status]} color="primary" size="small" />
}
