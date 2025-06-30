import axios from "axios"
export const deleteItem = async ({ type, id }) => {
    try {
        const response=axios.post(`http://localhost:5000/document/delete/${type}`,{fileId:id})
        return response.data
    } catch (error) {
        throw error
    }
}