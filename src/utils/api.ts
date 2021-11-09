import axios from "axios"



export const api = axios.create({
  baseURL : process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : 'https://www.selecttourviagens.com.br/api'
})
