import Http from "@/plugins/Http";
import Config from "@/config/Config.js";

const addBook = async (payload, category, author) => {
    if (category.length > 0) {
        payload.category = category.join(' | ');
    }
    if (author.length > 0) {
        payload.author = author.join(' | ');
    }
    const url = `${Config.apiBackEnd}/book/create`;
    let response = await Http.post(url, payload)
    return response;
}

const editBook = async (payload, category, author) => {
    if (category.length > 0) {
        payload.category = category.join(' | ');
    }
    if (author.length > 0) {
        payload.author = author.join(' | ');
    }
    const url = `${Config.apiBackEnd}/book/update`;
    let response = await Http.put(url, payload)
    return response;
}

const getAllBooks = async (payload) => {
    const url = `${Config.apiBackEnd}/book/read`;
    let response = await Http.get(url, payload)
    return response;
}

const getBookById = async (payload) => {
    const url = `${Config.apiBackEnd}/book/read-detail`;
    let response = await Http.get(url, payload)
    return response;
}

const doBooking = async (payload) => {
    const url = `${Config.apiBackEnd}/booking/create`;
    let response = await Http.post(url, null, payload)
    return response;
}

const checkUserBooking = async (payload) => {
    const url = `${Config.apiBackEnd}/booking/find-book-user`;
    let response = await Http.get(url, payload)
    return response;
}

const addCategories = async (payload) => {
    const url = `${Config.apiBackEnd}/category/create`;
    let response = await Http.post(url, payload)
    return response;
}

const getAllCategories = async (payload) => {
    const url = `${Config.apiBackEnd}/category/read`;
    let response = await Http.get(url, payload)
    return response;
}

const getCategoryById = async (payload) => {
    const url = `${Config.apiBackEnd}/category/read-detail`;
    let response = await Http.get(url, payload)
    return response;
}

const editCategories = async (payload) => {
    const url = `${Config.apiBackEnd}/category/update`;
    let response = await Http.put(url, payload)
    return response;
}

const getAuthors = async (payload) => {
    const url = `${Config.apiBackEnd}/author/read`;
    let response = await Http.get(url, payload)
    return response;
}

const getAuthorById = async (payload) => {
    const url = `${Config.apiBackEnd}/author/read-detail`;
    let response = await Http.get(url, payload)
    return response;
}

const addAuthor = async (payload) => {
    const url = `${Config.apiBackEnd}/author/create`;
    let response = await Http.post(url, payload)
    return response;
}

const editAuthor = async (payload) => {
    const url = `${Config.apiBackEnd}/author/update`;
    let response = await Http.put(url, payload)
    return response;
}


const BookRepositoryNetwork = {
    addBook,
    editBook,
    getAllBooks,
    getBookById,
    doBooking,
    checkUserBooking,
    addCategories,
    getAllCategories,
    getCategoryById,
    editCategories,
    getAuthors,
    addAuthor,
    editAuthor,
    getAuthorById
}

export default BookRepositoryNetwork