import { DeleteIcon } from '@/assets/DeleteIcon'
import { EyeIcon } from '@/assets/EyeIcon'
import { getAllOrders } from '@/services'
import { orderColumns } from '@/utils/helperFunction'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminOrder = () => {
  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getAllOrders(),
  })
  const navigate = useNavigate()
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey]
    switch (columnKey) {
      case 'id':
        return (
          <Tooltip color="foreground" content={cellValue}>
            <span className="cursor-pointer text-base text-primary active:opacity-50">
              <p className="max-w-[150px]  truncate text-default-400">
                {cellValue}
              </p>
            </span>
          </Tooltip>
        )
      case 'user':
        return (
          <div className="flex items-center gap-2">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        )
      case 'status':
        return (
          <p className="max-w-[250px]  truncate text-default-400">
            {cellValue}
          </p>
        )
      case 'total':
        return <p className="text-default-400">{cellValue}</p>
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete order">
              <span
                className="cursor-pointer text-lg text-danger active:opacity-50"
                onClick={() => {}}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">User Orders</h2>
      <div className="mt-4">
        {data && (
          <Table
            aria-label="Example table with custom cells"
            selectionMode="single"
            onRowAction={(row) => navigate(`/admin/user-orders/${row}`)}
          >
            <TableHeader columns={orderColumns}>
              {(column) => {
                return (
                  <TableColumn key={column.uid}>
                    {column.name.toUpperCase()}
                  </TableColumn>
                )
              }}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default AdminOrder
