import axios from 'axios'
import queryString from 'query-string'

const buildResponse = (res) => {
    return res.data
}

const buildErrorResponse = () => {
    return {
        code: 500,
        message: "An error occurred",
        data: null,
    }
}

const setHeaderAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = `${token}`
}

const clearHeaderAuthorization = () =>{
    axios.defaults.headers.common['Authorization'] = null;
}

const get = async (url, payload) =>{
    try{
        let query = queryString.stringify(payload || {})
        if (query) {
            url += '?' + query
        }
        let result = buildResponse(await axios.get(url))
        return result
    }catch (error) {
        return buildErrorResponse(error)
    }
    
}

const post = async (url, payload, query = null) => {
    try{
        if(query){
            let haveQuery = queryString.stringify(query || {})
            if (haveQuery) {
                url += '?' + haveQuery
            }
        }
        let result = buildResponse(await axios.post(url, payload))
        return result
    }catch (error) {
        return buildErrorResponse(error)
    }
}

const put = async (url, payload, query = null) => {
    try{
        if(query){
            let haveQuery = queryString.stringify(query || {})
            if (haveQuery) {
                url += '?' + haveQuery
            }
        }
        let result = buildResponse(await axios.put(url, payload))
        return result
    }catch (error) {
        return buildErrorResponse(error)
    }
}

const remove = async (url, payload, query = null) => {
    try{
        if(query){
            let haveQuery = queryString.stringify(query || {})
            if (haveQuery) {
                url += '?' + haveQuery
            }
        }
        let result = buildResponse(await axios.delete(url, { data: payload }))
        return result
    }catch (error) {
        return buildErrorResponse(error)
    }
}

const Http = {
    setHeaderAuthorization,
    get,
    post,
    put,
    remove,
    clearHeaderAuthorization
}

export default Http