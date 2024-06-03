import { z } from 'zod';

export const mutateProductForm = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .max(50, 'El título debe tener un máximo de 50 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(1000, 'La descripción debe tener un máximo de 1000 caracteres'),
  price: z
    .number()
    .min(0, 'El precio debe ser mayor o igual a 0')
    .max(100000, 'El precio debe ser menor o igual a 100000'),
  tags: z.array(z.string()),
  gender: z.enum(['men', 'women', 'kid', 'unisex'], {
    errorMap: () => ({ message: 'El genero es requerido' }),
  }),
  category: z.enum(['shirts', 'pants', 'hoodies', 'hats'], {
    errorMap: () => ({ message: 'La categoria es requerida' }),
  }),

  // images: z.array(z.string().url({ message: 'La imagen es requerida' })),
  // sizes: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL'], {
  //   errorMap: () => ({ message: 'Las tallas son requeridas' }),
  // }),
});

export type MutateProductType = z.infer<typeof mutateProductForm>;
