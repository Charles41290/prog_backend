import { ticketModel } from "../models/ticket.model.js";

const createTicket = async (data) => {
    return await ticketModel.create(data);

}

export default {
    createTicket
}
