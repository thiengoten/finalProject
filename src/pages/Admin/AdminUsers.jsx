/* eslint-disable no-extra-semi */
import { DeleteIcon } from '@/assets/DeleteIcon'
import { userColumns } from '@/constants'
import { getProfiles } from '@/services'
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
//TODO: Thêm nhấn vào mỗi user để xem các đơn hàng của user đó
const AdminUsers = () => {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['profiles', page],
    queryFn: () => getProfiles(page),
  })

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
      case 'email':
        return (
          <p className="max-w-[250px]  truncate text-default-400">
            {cellValue}
          </p>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete user">
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
      <h1 className="text-bold text-3xl text-default-900">Users</h1>

      <div className="mt-4">
        <Table
          bottomContent={
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
          }
        >
          <TableHeader columns={userColumns}>
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
            loadingContent={<Spinner />}
            emptyContent={'No data to display.'}
            loadingState={
              !result ? 'loading' : data.length === 0 ? 'empty' : 'idle'
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

export default AdminUsers
