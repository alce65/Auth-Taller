import { useEffect, useState } from "react";

const apiUrl = "http://localhost:3000/phones";
export function Phones() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(apiUrl, { mode: "cors" });
      const data = await res.json();
      setPhones(data);
    };

    // fetch(apiUrl, { mode: "cors" })
    //   .then((res) => res.json())
    //   .then((data) => setPhones(data));

    getData();
  }, []);

  return (
    <>
      <h1>hello</h1>
      <ul>
        {phones.map((phone) => (
          <li key={phone.id}>{phone.name}</li>
        ))}
      </ul>
    </>
  );
}
