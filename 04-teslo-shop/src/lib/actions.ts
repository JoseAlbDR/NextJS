'use server';
import { Product, Size, Type, PaypalResponse } from '@/interfaces';
import prisma from './db';
import { Address, Country, Prisma } from '@prisma/client';
import { auth, signIn, signOut } from '@/auth.config';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { FormInputs } from '@/app/(shop)/checkout/address/ui/AddressForm';
import { revalidatePath } from 'next/cache';

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

export const getProduct = async ({ slug }: SlugPayload) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { select: { url: true, id: true } },
        category: { select: { name: true } },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.images.map((image) => ({ url: image.url, id: image.id })),
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

  try {
    const response = await prisma.$transaction(async (tx) => {
      const updatedProductsPromises = products.map((product) => {
        // Acumular los valores
        const productQuantity = cartProducts
          .filter((p) => p.id === product.id)
          .reduce((acc, p) => acc + p.quantity, 0);

        if (productQuantity === 0)
          throw new Error(`${product.id} no tiene cantidad definida`);

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock <= 0)
          throw new Error(`${product.title} no tiene stock`);
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

    return {
      ok: response.ok,
      order: response.order,
      message: response.message,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};

export const getOrder = async (id: string) => {
  const session = await auth();

  if (!session) {
    return {
      ok: false,
      message: 'No hay una sesion activa',
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        orderItem: {
          include: {
            product: {
              include: {
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error('No se encontro la orden');

    if (session.user.role === 'user')
      if (session.user.id !== order.userId)
        throw new Error('No tienes permisos para ver esta orden');

    return { ok: true, order, message: 'Orden encontrada' };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    };
  }
};

export const getUserOrders = async () => {
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      message: 'No hay una sesion activa',
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
    });
    return { ok: true, orders, message: 'Ordenes encontradas' };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    };
  }
};

export const saveTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  const session = await auth();

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('No se encontro la orden');

    if (order.userId !== session?.user.id)
      throw new Error('No tienes permisos para realizar esta accion');

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    return { ok: true, message: 'Transaccion guardada' };
  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      message: error?.message || 'No se pudo realizar la transacción',
    };
  }
};

export const checkPaypalPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo verificar la transacción',
    };
  }

  const data = await verifyPaypalPayment(transactionId, authToken);
  if (!data)
    return { ok: false, message: 'No se pudo verificar la transacción' };

  return { ok: true, message: 'Transacción verificada', order: data };
};

const getPaypalBearerToken = async () => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append(
    'Authorization',
    `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
      'utf-8'
    ).toString('base64')}`
  );
  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(process.env.PAYPAL_OAUTH_URL!, {
      ...requestOptions,
      cache: 'no-store',
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (transactionId: string, token: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      { ...requestOptions, cache: 'no-store' }
    );
    const data: PaypalResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateOrderStatus = async (orderId: string, status: boolean) => {
  try {
    if (status) {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: status,
          paidAt: new Date(),
        },
      });
      revalidatePath(`/orders/${orderId}`);
      // revalidatePath('/orders');
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const getOrderStatus = async (orderId: string) => {
  try {
    const orderStatus = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        isPaid: true,
      },
    });

    if (!orderStatus) throw new Error('Error objteniendo estado de la orden');

    return { ok: true, status: orderStatus?.isPaid };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

interface PaginatedOrdersPayload {
  page?: number;
  limit?: number;
}

export const getPaginatedOrders = async ({ page = 1, limit = 10 }) => {
  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(limit))) limit = 12;
  if (page < 1) page = 1;
  if (limit < 1) limit = 12;

  const session = await auth();

  console.log({ session });

  if (session && session.user.role !== 'admin')
    return { orders: [], totalPages: 0, currentPage: 1 };

  try {
    const orders = await prisma.order.findMany({
      include: {
        OrderAddress: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    console.log({ orders });

    return {
      orders,
      totalPages: Math.ceil((await prisma.order.count()) / limit),
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    return { orders: [], totalPages: 0, currentPage: 1 };
  }
};

export const getPaginatedUsers = async ({ page = 1, limit = 10 }) => {
  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(limit))) limit = 12;
  if (page < 1) page = 1;
  if (limit < 1) limit = 12;

  const session = await auth();

  console.log({ session });

  if (session && session.user.role !== 'admin')
    return { users: [], totalPages: 0, currentPage: 1 };

  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    console.log({ users });

    return {
      users,
      totalPages: Math.ceil((await prisma.order.count()) / limit),
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
    return { users: [], totalPages: 0, currentPage: 1 };
  }
};
