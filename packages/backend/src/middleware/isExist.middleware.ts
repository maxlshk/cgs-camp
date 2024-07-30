import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma, Todo, User } from '@prisma/client';

type PrismaModelDelegate = {
    [K in keyof PrismaClient]: PrismaClient[K] extends {
        findUnique: (args: { where: { id: number } }) => Promise<unknown>;
    }
    ? PrismaClient[K]
    : never;
};
const prisma = new PrismaClient();

export const isExist = <T extends keyof PrismaModelDelegate>(model: T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);
        const modelDelegate = prisma[model] as PrismaModelDelegate[T];
        const item = await modelDelegate.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ error: `Item not found` });
        }
        next();
    };
};

// type PrismaModelDelegate = {
//     [K in keyof PrismaClient]: PrismaClient[K] extends {
//         findUnique: (args: { where: { id: number } }) => Promise<unknown>;
//     }
//     ? PrismaClient[K]
//     : never;
// };

// export async function entityIsExist<T extends keyof PrismaModelDelegate>(
//     id: number,
//     model: T,
// ): Promise<void | PrismaModelType<T>> {
//     const delegateModel = prisma[model] as PrismaModelDelegate[T];
//     const result = await delegateModel.findUnique({
//         where: { id },
//     });

//     if (!result)
//         throw ApiError.NotFoundError(ErrorMessages.notFound(model as string));

//     return result as PrismaModelType<T>;
// }