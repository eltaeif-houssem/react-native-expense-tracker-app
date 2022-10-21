import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-native-course-9a0b8-default-rtdb.firebaseio.com",
});

export default instance;
