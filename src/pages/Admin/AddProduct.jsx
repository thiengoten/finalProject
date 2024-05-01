import { supabase } from '@/config/supabaseClient'
import { createProduct, getProductById, updateProduct } from '@/services'
import { Input, RadioGroup, Radio, Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMatch, useParams } from 'react-router-dom'
const AddProduct = () => {
  const [image, setImage] = useState(null)
  const { id } = useParams()
  const isAddMode = useMatch('/admin/products/new')

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
    },
  })

  useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    onSuccess: (data) => {
      setValue('name', data.name)
      setValue('description', data.description)
      setValue('price', data.price)
      setValue('category', data.category)
      setImage(data.imageURL)
    },
  })
  const uploadImage = async (file) => {
    const { data, error } = await supabase.storage
      .from('products')
      .upload(file.name, file)
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }
  const onSummit = async (data) => {
    if (isAddMode) {
      const formData = {
        ...data,
        imageURL: image?.name
          ? `https://ahspekfrkxpnpkvmnwcd.supabase.co/storage/v1/object/public/products/${image.name}`
          : null,
      }

      const addStatus = await createProduct(formData)
      if (addStatus === 201) {
        reset()
        setImage(null)
        toast.success('Product added successfully')
      }
    } else {
      const updateStatus = await updateProduct(id, data)
      if (updateStatus === 204) {
        toast.success('Product updated successfully')
      }
    }
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        {id ? 'Edit Product' : 'Add Product'}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSummit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              isRequired
              type="text"
              label="Name"
              placeholder="ABC"
              labelPlacement="outside"
              size="md"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              isRequired
              type="text"
              label="Description"
              placeholder="This is a description"
              labelPlacement="outside"
              size="md"
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              isRequired
              type="number"
              label="Price"
              placeholder="100"
              labelPlacement="outside"
              size="md"
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} label="Categories" orientation="horizontal">
              <Radio value="keycap">Keycap</Radio>
              <Radio value="deskmats">Deskmats</Radio>
            </RadioGroup>
          )}
        />
        <p>Image</p>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {image ? (
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="preview"
                className="h-32 w-full rounded-lg object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setImage(file)
                  uploadImage(file)
                }
              }}
            />
          </label>
        </div>
        <Button className="w-11 flex-none" color="primary" type="submit">
          {id ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  )
}

export default AddProduct
