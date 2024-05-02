import { DeleteIcon } from '@/assets/DeleteIcon'
import { userOrderColumns } from '@/constants'
import { deleteOrder, getOrdersByUserId } from '@/services'
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const UserOrders = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrdersByUserId(id),
    enabled: !!id,
  })

  const deleteOrderMutation = useMutation({
    mutationFn: (id) => deleteOrder(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
      toast.success('Order deleted successfully')
    },
    onError: async (error) => {
      console.log(error)
    },
  })
  const handleDelete = (id) => {
    deleteOrderMutation.mutate(id)
  }

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
      case 'total_amount':
        return <p className="text-default-900">{cellValue}</p>
      case 'status':
        return (
          <p
            className={
              cellValue === 'Paid' ? 'text-success' : 'text-default-400'
            }
          >
            {cellValue}
          </p>
        )

      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete user">
              <span
                className="cursor-pointer text-lg text-danger active:opacity-50"
                onClick={() => {
                  handleDelete(item.id)
                }}
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
      <h1 className="text-bold text-3xl text-default-900">Users</h1>

      <div className="mt-4">
        <Table
          selectionMode="single"
          onRowAction={(row) => navigate(`/admin/user-orders/${row}`)}
        >
          <TableHeader columns={userOrderColumns}>
            {(column) => {
              return (
                <TableColumn key={column.uid}>
                  {column.name.toUpperCase()}
                </TableColumn>
              )
            }}
          </TableHeader>
          <TableBody
            items={data || []}
            loadingContent={<Spinner />}
            emptyContent={'No data to display.'}
            loadingState={
              !data ? 'loading' : data.length === 0 ? 'empty' : 'idle'
            }
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UserOrders
