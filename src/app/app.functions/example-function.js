exports.main = async (context = {}) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const demoProducts = await response.json()
    return { status: 200, response: demoProducts }; // Returning an array directly
  } catch (error) {
    console.error("Error fetching products:", error);
    return { status: 404, response: "Failed to fetch products" };
  }
};




















// exports.main = async (context = {}) => {
//   try {
//     // const demoProducts = [
//     //   { id: 1, name: "Demo Product 1" },
//     //   { id: 2, name: "Demo Product 2" },
//     //   { id: 3, name: "Demo Product 3" },
//     // ];
//     const demoProducts = fetch('https://jsonplaceholder.typicode.com/posts')
//       .then(response => response.json())
//       .then(json => console.log(json))
//     return { status: 200, response: demoProducts }; // Returning an array directly
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return { status: 404, response: "Failed to fetch products" };
//   }
// };