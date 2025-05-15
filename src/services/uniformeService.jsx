import axios from "axios";

const API_URL = "http://localhost:8080/api/uniformes";

export const getAllUniformes = () => axios.get(API_URL);

export const createUniforme = (uniforme) => axios.post(API_URL, uniforme);

export const updateUniforme = (uniforme) => axios.put(`${API_URL}/${uniforme.id}`, uniforme);

export const deleteUniforme = (id) => axios.delete(`${API_URL}/${id}`);
