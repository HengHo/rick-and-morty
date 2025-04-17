const BASE_URL = `https://rickandmortyapi.com/api/character`;

export const getAllCharacter = async (
  page: number = 1,
  name: string = '',
  status: string = '',  // เพิ่ม parameter สำหรับ status
  gender: string = ''   // เพิ่ม parameter สำหรับ gender
) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // สร้าง URL โดยเพิ่ม query parameters สำหรับ status และ gender
  let url = `${BASE_URL}?page=${page}&name=${encodeURIComponent(name)}`;

  if (status) {
    url += `&status=${encodeURIComponent(status)}`;
  }

  if (gender) {
    url += `&gender=${encodeURIComponent(gender)}`;
  }

  // ดึงข้อมูลจาก API
  const res = await fetch(url, requestOptions);
  const json = await res.json();
  console.log(status,gender);
  if (json?.results) {
    return json; // คืนข้อมูลที่มี results + info
  } else {
    return false; // คืน false ถ้าไม่มีข้อมูล
  }
};


export const getCharacterById = async (id: number) => {


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
