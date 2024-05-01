import { DeleteIcon } from '@/assets/DeleteIcon'
import { orderColumns } from '@/constants'
import { getAllOrders } from '@/services'
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminOrder = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => getAllOrders(page),
    keepPreviousData: true,
    staleTime: 1000 * 10,
    retry: 1,
  })
  console.log('🚀 ~ AdminOrder ~ data:', data)
  const { result, totalPage } = !!data && data
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
        <Table
          aria-label="Example table with custom cells"
          selectionMode="single"
          bottomContent={
            totalPage >= 1 && (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  total={totalPage}
                  onChange={(page) => {
                    setPage(page)
                  }}
                />
              </div>
            )
          }
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
          <TableBody
            items={result || []}
            loadingState={isLoading || isFetching ? 'loading' : 'idle'}
            loadingContent={<Spinner />}
            emptyContent={'No data to display.'}
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

export default AdminOrder
