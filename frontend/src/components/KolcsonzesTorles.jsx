import React, { useEffect, useState } from 'react';

const KolcsonzesTorles = () => {

  const [kolcsonzesek, setKolcsonzesek] = useState([]);
  const [kivalasztott, setKivalasztott] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/kolcsonzesek")
      .then(res => res.json())
      .then(data => setKolcsonzesek(data))
      .catch(err => console.error(err));
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kivalasztott) {
      alert("Válassz ki egy kölcsönzést!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/torles/${kivalasztott}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Kölcsönzés törölve, könyv visszahozva!");
        setKivalasztott("");

        setKolcsonzesek(prev => prev.filter(k => k.kolcsonzes_id !== parseInt(kivalasztott)));
      } else {
        alert("Hiba törlés közben.");
      }
    } catch (error) {
      console.error(error);
      alert("Szerver hiba történt.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Kölcsönzés törlése (könyv visszahozása)</h2>

      <form onSubmit={handleSubmit} className="mt-3">

        <div className="mb-3">
          <label className="form-label">Válaszd ki a visszahozott kölcsönzést</label>
          <select
            className="form-select"
            value={kivalasztott}
            onChange={(e) => setKivalasztott(e.target.value)}
            required
          >
            <option value="">-- Válassz --</option>
            {kolcsonzesek.map(k => (
              <option key={k.kolcsonzes_id} value={k.kolcsonzes_id}>
                {k.nev} - {k.osztaly} | dátum: {k.datum}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-danger">
          Kölcsönzés törlése
        </button>

      </form>
    </div>
  );
};

export default KolcsonzesTorles;
