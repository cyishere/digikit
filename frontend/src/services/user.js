import axios from "axios";

// export const createUser = async (userInfo) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3001/api/register",
//       userInfo
//     );
//     console.log("response in service:", response);
//   } catch (error) {
//     console.log("error in service:", error);
//   }
// };

export const createUser = (userInfo) => {
  return fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      console.log("response in service:", response);
      return response.json();
    })
    .then((json) => {
      console.log("json in service:", json);
      return json;
    })
    .catch((error) => {
      console.log("error in service:", error);
    });
};
