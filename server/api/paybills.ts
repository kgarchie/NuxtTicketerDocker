import prisma from "~~/script"

export default defineEventHandler(async () => {
    // return paybills from prisma database
    return prisma.paybill.findMany();
})