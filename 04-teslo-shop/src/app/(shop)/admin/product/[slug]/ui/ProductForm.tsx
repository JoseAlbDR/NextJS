'use client';

import { Product, Size } from '@/interfaces';
import { MutateProductType, mutateProductForm } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  product: Product;
  categories: {
    name: string;
  }[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductForm = ({ product, categories }: Props) => {
  console.log({ product });

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
    console.log(data);
  };

  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title')}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug')}
            disabled
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description')}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price')}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags')}
          />
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
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('category')}
            defaultValue={product.type}
          >
            {categories.map((cat) => (
              <option value={cat.name} key={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className={clsx(
                  'flex  items-center justify-center w-10 h-10 mr-2 border rounded-md',
                  {
                    'bg-blue-500 text-white': product.sizes.includes(
                      size as Size
                    ),
                  }
                )}
              >
                <span>{size}</span>
              </div>
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
