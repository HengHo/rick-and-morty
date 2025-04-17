const BASE_URL = `https://rickandmortyapi.com/api/location`;

export const getAllLocation = async (page: number = 1, name: String = '') => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // เพิ่ม page เข้ามาใน URL
  const res = await fetch(`${BASE_URL}?page=${page}&name=${name}`, requestOptions);
  const json = await res.json();

  if (json?.results) {
    return json; // ✅ คืนทั้ง json (มี results + info)
  } else {
    return false;
  }
};

export const getLocationById = async (id: number) => {


  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // เพิ่ม page เข้ามาใน URL
  const res = await fetch(`${BASE_URL}/${id}`, requestOptions);
  const json = await res.json();

  if (json?.id) {
    return json; // ✅ คืนทั้ง json (มี results + info)
  } else {
    return false;
  }
};
