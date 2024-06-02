'use server';
import { Product, Size, Type } from '@/interfaces';
import prisma from './db';
import { Address, Country, Prisma } from '@prisma/client';
import { auth, signIn, signOut } from '@/auth.config';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { FormInputs } from '@/app/(shop)/checkout/address/ui/AddressForm';

interface GetProductsPayload {
  page?: number;
  limit?: number;
  gender?: 'men' | 'women' | 'kid' | 'unisex';
}

interface SlugPayload {
  slug: string;
}

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.address.delete({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error borrando dirección');
  }
};

export const saveUserAddress = async (address: FormInputs, userId: string) => {
  const updateOrCreateAddress = {
    ...address,
    country: {
      connect: {
        id: address.country,
      },
    },
    user: {
      connect: {
        id: userId,
      },
    },
  };

  const query: Prisma.AddressUpsertArgs = {
    create: updateOrCreateAddress,
    update: updateOrCreateAddress,
    where: {
      userId,
    },
  };

  try {
    await prisma.address.upsert(query);
  } catch (error) {
    console.log(error);
    throw new Error('Error guardando dirección');
  }
};

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.address.findUnique({
      where: {
        userId,
      },
      include: {
        country: true,
      },
    });

    if (!address) return null;

    return { ...address, country: address?.country.id };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCountries = async (): Promise<Country[]> => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStockBySlug = async ({ slug }: SlugPayload) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        inStock: true,
      },
    });
    if (!product) return 0;
    return product.inStock;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener stock por slug');
  }
};

export const getProduct = async ({
  slug,
}: SlugPayload): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { select: { url: true } },
        category: { select: { name: true } },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.images.map((image) => image.url),
      type: product.category.name as Type,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener producto por slug');
  }
};

export const getProducts = async ({
  page = 1,
  limit = 12,
  gender,
}: GetProductsPayload) => {
  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(limit))) limit = 12;
  if (page < 1) page = 1;
  if (limit < 1) limit = 12;

  try {
    const skip = (page - 1) * limit;

    let whereClause: Prisma.ProductWhereInput = {};

    if (gender) whereClause = { ...whereClause, gender };

    const [data, totalPages] = await prisma.$transaction([
      prisma.product.findMany({
        where: whereClause,
        include: {
          images: { select: { url: true } },
          category: { select: { name: true } },
        },
        take: limit,
        skip,
        orderBy: { title: 'asc' },
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    const products = data.reduce((acc, item) => {
      const product: Product = {
        ...item,
        images: item.images.map((image) => image.url),
        type: item.category.name as Type,
      };
      acc.push(product);
      return acc;
    }, [] as Product[]);

    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalPages / limit),
    };
  } catch (error) {
    console.log(error);
    return { products: [], totalPages: 0, currentPage: 1 };
  }
};

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
  callbackUrl: string
) => {
  try {
    // await sleep(3000);
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      // redirectTo: callbackUrl || '/',
      redirect: false,
    });
    return 'Success';
  } catch (error) {
    // console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidas.';
        default:
          return 'Algo fue mal...inténtelo más tarde';
      }
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    return 'CredentialsSignOut';
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: 'Usuario creado',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Algo fue mal...inténtelo más tarde',
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    // await sleep(3000);
    await signIn('credentials', {
      email,
      password,
      // redirectTo: callbackUrl || '/',
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    // console.log(error);
    if (error instanceof AuthError) {
      console.log(error);
      return {
        ok: false,
        message: 'No se pudo iniciar sesion',
      };
    }
    throw error;
  }
};

interface ProductToOrder {
  id: string;
  size: Size;
  quantity: number;
}

interface IAddress {
  name: string;
  lastName: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}

export const placeOrder = async (
  cartProducts: ProductToOrder[],
  address: IAddress
) => {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId)
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    };

  // Obtener los productos

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: cartProducts.map((product) => product.id),
      },
    },
  });

  let subTotal = 0;
  let itemsInOrder = 0;
  cartProducts.forEach((product) => {
    const item = products.find(
      (item) => item.id === product.id && item.sizes.includes(product.size)
    );
    if (item) {
      subTotal += item?.price * product.quantity;
      itemsInOrder += product.quantity;
    }
  });

  const tax = subTotal * 0.21;
  const total = tax + subTotal;

  const response = await prisma.$transaction(async (tx) => {
    cartProducts.forEach(async (product) => {
      const item = products.find(
        (item) => item.id === product.id && item.sizes.includes(product.size)
      );

      if (item) {
        if (item.inStock <= 0) {
          throw new Error('No hay stock del producto');
        }

        const updatedProduct = await tx.product.update({
          where: { id: item.id },
          data: {
            inStock: item.inStock - product.quantity,
          },
        });

        console.log({ updatedProduct });
      }
    });

    const order = await tx.order.create({
      data: {
        userId,
        subTotal,
        tax,
        total,
        itemsInOrder,
        OrderAddress: {
          create: {
            name: address.name,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            zip: address.zip,
            city: address.city,
            countryId: address.country,
            phone: address.phone,
            rememberAddress: address.rememberAddress,
          },
        },
        orderItem: {
          createMany: {
            data: cartProducts.map((product) => ({
              productId: product.id,
              size: product.size,
              quantity: product.quantity,
              price: products.find((item) => item.id === product.id)?.price!,
            })),
          },
        },
      },
    });

    if (order) return { ok: true, message: 'Orden creada', order };

    return {
      ok: false,
      message: 'No se pudo crear la orden',
    };
  });

  console.log({ response });

  return response;
};
