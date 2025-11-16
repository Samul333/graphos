import { PrismaClient } from "./generated/prisma/client";


const prismaClientSingleTon = ()=>{
    return new PrismaClient()
}


type PrismaClientSingleton = ReturnType<typeof prismaClientSingleTon>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleTon()

export default prisma

if (process.env.NODE_ENV !=="production") globalForPrisma.prisma = prisma