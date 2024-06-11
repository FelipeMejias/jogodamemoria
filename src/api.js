import axios from "axios"

const api = axios.create({
  //baseURL:'http://localhost:4000'
  baseURL: 'https://pneus-back-1.onrender.com'
})
export const postJogo = async (tema,rep,pares,nome) => {
  return api.post(`/jogo`,{tema,rep,pares,nome})
}
export const putJogo = async (codigo,nome) => {
  return api.put(`/jogo`,{codigo,nome})
}
export const getJogos = async () => {
  return api.get(`/jogo`)
}
export const getJogo = async (codigo) => {
  return api.get(`/jogo/${codigo}`)
}
export const jogar = async (codigo,num) => {
  return api.put(`/jogo/${codigo}`,{num})
}