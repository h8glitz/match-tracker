import axios from "axios";

const BASE_URL = "https://app.ftoyd.com/fronttemp-service"; 

export async function fetchMatches() {
  try {
    const response = await axios.get(`${BASE_URL}/fronttemp`);
    console.log("API Response:", response.data); // Лог ответа API
    return response.data.data.matches || []; // Возвращаем только массив matches
  } catch (error) {
    console.error("Ошибка API:", error);
    throw new Error("Ошибка: не удалось загрузить информацию");
  }
}
