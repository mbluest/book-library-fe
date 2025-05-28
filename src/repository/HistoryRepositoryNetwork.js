import Http from "@/plugins/Http";
import Config from "@/config/Config.js";

const getHistoryByUser = async (payload) => {
    const url = `${Config.apiBackEnd}/booking/read-detail-user`;
    let response = await Http.get(url, payload)
    return response;
}

const HistoryRepositoryNetwork = {
    getHistoryByUser,
}

export default HistoryRepositoryNetwork