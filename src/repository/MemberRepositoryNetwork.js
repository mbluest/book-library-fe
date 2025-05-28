import Http from "@/plugins/Http";
import Config from "@/config/Config.js";

const login = async (payload) => {
    const url = `${Config.apiBackEnd}/member/login`;
    let response = await Http.post(url, payload)
    return response;
}

const createMember = async (payload) => {
    const url = `${Config.apiBackEnd}/member/create`;
    let response = await Http.post(url, payload)
    return response;
}

const getProfile = async (payload) => {
    const url = `${Config.apiBackEnd}/member/read-detail`;
    let response = await Http.get(url, payload)
    delete response.data.password;
    return response;
}

const getAllMembers = async (payload) => {
    const url = `${Config.apiBackEnd}/member/read`;
    let response = await Http.get(url, payload)
    return response;
}

const editMember = async (payload) => {
    const url = `${Config.apiBackEnd}/member/update`;
    let response = await Http.put(url, payload)
    return response;
}

const removeMember = async (payload, query = null) => {
    const url = `${Config.apiBackEnd}/member/remove`;
    let response = await Http.remove(url, payload, query)
    return response;
}

const activeMember = async (payload) => {
    const url = `${Config.apiBackEnd}/member/update`;
    let response = await Http.put(url, payload)
    return response;
}

const MemberRepositoryNetwork = {
    login,
    createMember,
    getProfile,
    getAllMembers,
    editMember,
    removeMember,
    activeMember
}

export default MemberRepositoryNetwork