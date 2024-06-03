'use client';

import { Product, Size } from '@/interfaces';
import {
  MutateProductType,
  changeProductSizes,
  mutateProduct,
  mutateProductForm,
} from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  product: Product;
  categories: {
    name: string;
  }[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mutateProductForm),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      tags: product.tags,
      gender: product.gender,
      category: product.type,
      images: product.images,
      slug: product.title.split(' ').join('_').toLowerCase(),
    },
  });

  const onSubmit: SubmitHandler<MutateProductType> = async (data) => {
    const { ok, product: updatedProduct } = await mutateProduct(
      data,
      product.slug
    );

    if (ok) {
      router.replace(`/admin/product/${updatedProduct!.slug}`);
      return;
    }
  };

  const handleSizeChanged = async (size: Size) => {
    await changeProductSizes(size, product.slug);
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title')}
          />
          {errors.title && (
            <ErrorMessage error={errors.title.message || 'Error desconocido'} />
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug')}
            disabled
          />
          {errors.slug && (
            <ErrorMessage error={errors.slug.message || 'Error desconocido'} />
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description')}
          ></textarea>
          {errors.description && (
            <ErrorMessage
              error={errors.description.message || 'Error desconocido'}
            />
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <ErrorMessage error={errors.price.message || 'Error desconocido'} />
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags')}
          />
          {errors.tags && (
            <ErrorMessage error={errors.tags.message || 'Error desconocido'} />
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('gender')}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.gender && (
            <ErrorMessage
              error={errors.gender.message || 'Error desconocido'}
            />
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('category')}
            defaultValue={product.type}
          >
            {categories.map((cat) => (
              <option value={cat.name} key={cat.name} className="capitalize">
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <ErrorMessage
              error={errors.category.message || 'Error desconocido'}
            />
          )}
        </div>

        <button className="btn-primary w-full" type="submit">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                className={clsx(
                  'flex  items-center justify-center w-10 h-10 mr-2 border rounded-md',
                  {
                    'bg-blue-500 text-white': product.sizes.includes(
                      size as Size
                    ),
                  }
                )}
                onClick={() => handleSizeChanged(size as Size)}
              >
                <span>{size}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
            <div className="flex flex-wrap gap-2">
              {product.images.map((image) => (
                <Image
                  key={image}
                  src={`/products/${image}`}
                  alt={product.title}
                  width={250}
                  height={250}
                  className="w-28 h-28 object-cover m-2"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
