import axios from "axios"
const baseUrl = "http://localhost:3001/data"

const reqServer = {
	create: (newObj) => axios.post(`${baseUrl}/create`, newObj).then((res) => res.data),
	read: () => axios.get(`${baseUrl}/users`).then((res) => res.data),
	update: (id, updatedObj) =>
		axios.put(`${baseUrl}/update/${id}`, updatedObj).then((res) => console.log(res)),
	remove: (id) => axios.delete(`${baseUrl}/remove/${id}`).then((res) => console.log(res)),
}

export default reqServer
