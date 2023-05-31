export async function getUsers() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch or data parsing
    console.log("Error:", error);
    throw error;
  }
}
