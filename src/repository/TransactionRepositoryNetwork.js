import Http from "@/plugins/Http";
import Config from "@/config/Config.js";

const toBackendDateTime = (dateString, time = '00:00:00') => {
  return `${dateString}T${time}`;
}

const getAllTransaction = async (payload) => {
    if(payload.forStartDate){
        payload.startDate = toBackendDateTime(payload.forStartDate, '00:00:00.000000')
    }
    if(payload.forEndDate){
        payload.endDate = toBackendDateTime(payload.forEndDate, '00:00:00.000000')
    }
    const url = `${Config.apiBackEnd}/booking/read`;
    let response = await Http.get(url, payload)
    return response;
}

const approveBooking = async (payload) => {
    const url = `${Config.apiBackEnd}/booking/approve`;
    let response = await Http.put(url, payload)
    return response;
}

const rejectBooking = async (payload) => {
    const url = `${Config.apiBackEnd}/booking/reject`;
    let response = await Http.put(url, payload)
    return response;
}

const returningBook = async (payload) => {
    const url = `${Config.apiBackEnd}/booking/returning`;
    let response = await Http.put(url, payload)
    return response;
}

const TransactionRepositoryNetwork = {
    getAllTransaction,
    approveBooking,
    rejectBooking,
    returningBook
}

export default TransactionRepositoryNetwork