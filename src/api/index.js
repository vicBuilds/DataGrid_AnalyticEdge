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

export async function getPosts(si, ei) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/?_start=${si}&_end=${ei}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch or data parsing
    console.log("Error deer:", error);
    throw error;
  }
}

export async function getComments(si, ei) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/?_start=${si}&_end=${ei}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch or data parsing
    console.log("Error:", error);
    throw error;
  }
}
