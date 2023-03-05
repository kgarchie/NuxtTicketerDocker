import prisma from "~~/script"

export default defineEventHandler(async () => {
    // return all tickets from prisma database
    return prisma.ticket.findMany();
})