import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Spinner,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import { deleteProduct, paginateProducts } from '@/services'
import { EditIcon } from '@/assets/EditIcon'
import { DeleteIcon } from '@/assets/DeleteIcon'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { columns } from '@/constants'
import toast from 'react-hot-toast'

const AdminProduct = () => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery(
    ['products', page],
    () => paginateProducts(page),
    {
      keepPreviousData: true,
      staleTime: 1000 * 10,
    },
  )
  const deleteProductMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['products', page],
      })
      toast.success('Product deleted successfully')
    },
    onError: async (error) => {
      console.log(error)
    },
  })

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id)
  }

  const { result, totalPage } = !!data && data

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
      case 'name':
        return (
          <div className="flex items-center gap-2">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        )
      case 'description':
        return (
          <p className="max-w-[250px]  truncate text-default-400">
            {cellValue}
          </p>
        )
      case 'price':
        return <p className="text-default-400">{cellValue}</p>
      case 'image':
        return (
          <img
            className="h-auto w-32 rounded-sm object-cover"
            src={item.imageURL}
            alt="products"
          />
        )
      case 'category':
        return <p className="text-default-400">{cellValue}</p>
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <Link
                className="cursor-pointer text-lg text-default-400 active:opacity-50"
                to={`${item.id}`}
              >
                <EditIcon />
              </Link>
            </Tooltip>
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
      <h2 className="text-2xl font-bold">Products</h2>
      <div className="mt-4 flex justify-end gap-4 ">
        <Button
          color="primary"
          endContent={<Icon icon="gravity-ui:plus" />}
          onClick={() => navigate('new')}
        >
          Add Product
        </Button>
      </div>
      <div className="mt-4">
        <Table
          aria-label="Example table with custom cells"
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
        >
          <TableHeader columns={columns}>
            {(column) => {
              return (
                <TableColumn key={column.uid}>
                  {column.name.toUpperCase()}
                </TableColumn>
              )
            }}
          </TableHeader>
          <TableBody
            items={result ?? []}
            loadingState={isLoading || isFetching ? 'loading' : 'idle'}
            emptyContent={'No data to display.'}
            loadingContent={<Spinner />}
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

export default AdminProduct
