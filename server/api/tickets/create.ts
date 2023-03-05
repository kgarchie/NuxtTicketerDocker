import { URGENCY } from "@prisma/client";
import prisma from "~~/script";

export default defineEventHandler(async (event) => {
    // handle post request
    const ticket = await readBody(event)

    // check if reference is unique
    const ticketExists = await prisma.ticket.findUnique({
        where: {
            reference: ticket.reference
        }
    })

    if (ticketExists) {
        return {
            statusCode: 400,
            message: "Ticket reference already exists"
        }
    }

    // parse ticket data and change to DB compatible format
    ticket.transaction_date = new Date(ticket.transaction_date)
    ticket.amount = parseFloat(ticket.amount)
    ticket.paybill_no = ticket.paybill_no.toString()
    switch (ticket.urgency) {
        case "urgent":
            ticket.urgency = URGENCY.U;
            break;
        case "emergency":
            ticket.urgency = URGENCY.E;
        default:
            ticket.urgency = URGENCY.D;
    }


    // create ticket in prisma database
    const createdTicket = await prisma.ticket.create({
        data: ticket
    })

    // return created ticket and ok status
    if (createdTicket.id) {
        return {
            status: 200,
            id: createdTicket.id
        }
    } else {
        return {
            status: 500,
            message: "Could not create ticket"
        }
    }
})