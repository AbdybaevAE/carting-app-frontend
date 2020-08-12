import axios from "axios";

const GATEWAY_API = process.env.API as string;
const apiUrl = `${GATEWAY_API}/api/users`;
type TUpdateUserTimeDto = {
  id: string;
  time: number;
};
type TAddUserDto = {
  username: string;
  time: number;
  email: string;
};
export class ApiService {
  static async updateUserTime(userData: TUpdateUserTimeDto) {
    const url = `${apiUrl}/update/${userData.id}`;
    return axios.put(url, {
      time: userData.time,
    });
  }
  static async addUser(userData: TAddUserDto) {
    const url = `${apiUrl}`;
    return axios.post(url, userData);
  }
  static async fetchUsers(page: number) {}
}
