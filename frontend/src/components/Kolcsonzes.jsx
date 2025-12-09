import React, { useEffect, useState } from "react";

const Kolcsonzes = () => {
  const [konyvek, setKonyvek] = useState([]);
  const [nev, setNev] = useState("");
  const [osztaly, setOsztaly] = useState("");
  const [kivalasztottKonyv, setKivalasztottKonyv] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/konyvek")
      .then((res) => res.json())
      .then((data) => setKonyvek(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nev || !osztaly || !kivalasztottKonyv) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    const ujKolcsonzes = {
        nev,
        osztaly,
        konyv_id: kivalasztottKonyv   
      };
      

    try {
      const res = await fetch("http://localhost:3001/ujkolcsonzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ujKolcsonzes),
      });

      if (res.ok) {
        alert("Sikeres kölcsönzés!");
        setNev("");
        setOsztaly("");
        setKivalasztottKonyv("");
      } else {
        alert("Hiba történt a kölcsönzés során.");
      }
    } catch (error) {
      console.error(error);
      alert("Szerver hiba.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Könyv kölcsönzése</h2>

      <form className="mt-3" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Név</label>
          <input
            type="text"
            className="form-control"
            value={nev}
            onChange={(e) => setNev(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Osztály</label>
          <input
            type="text"
            className="form-control"
            value={osztaly}
            onChange={(e) => setOsztaly(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Kiválasztott könyv</label>
          <select
  className="form-select"
  value={kivalasztottKonyv}
  onChange={(e) => setKivalasztottKonyv(e.target.value)}
  required
>
  <option value="">-- Válassz könyvet --</option>
  {konyvek.map(k => (
    <option key={k.konyv_id} value={k.konyv_id}>
      {k.szerzo} - {k.cim} ({k.mufaj})
    </option>
  ))}
</select>

        </div>

        <button type="submit" className="btn btn-success">
          Könyv kikölcsönzése
        </button>
      </form>
    </div>
  );
};

export default Kolcsonzes;
