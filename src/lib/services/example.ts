

export const getAllExample = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
  
    let res = await fetch(`https://jsonplaceholder.typicode.com/comments`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          return res;
        } else {
          return false;
        }
      });
  
    return res;
}