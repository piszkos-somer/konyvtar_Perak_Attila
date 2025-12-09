import React, { useState } from 'react';

const UjKonyv = () => {
  const [szerzo, setSzerzo] = useState("");
  const [cim, setCim] = useState("");
  const [mufaj, setMufaj] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ujKonyv = { szerzo, cim, mufaj };

    try {
      const res = await fetch("http://localhost:3001/ujkonyv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ujKonyv)
      });

      if (res.ok) {
        alert("Könyv sikeresen felvéve!");
        setSzerzo("");
        setCim("");
        setMufaj("");
      } else {
        alert("Hiba történt a mentés során.");
      }
    } catch (error) {
      console.error(error);
      alert("Szerver hiba!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Új könyv felvétele</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label className="form-label">Szerző</label>
          <input 
            type="text" 
            className="form-control" 
            value={szerzo}
            onChange={(e) => setSzerzo(e.target.value)}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cím</label>
          <input 
            type="text" 
            className="form-control" 
            value={cim}
            onChange={(e) => setCim(e.target.value)}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Műfaj</label>
          <input 
            type="text" 
            className="form-control" 
            value={mufaj}
            onChange={(e) => setMufaj(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Könyv hozzáadása
        </button>
      </form>
    </div>
  );
};

export default UjKonyv;
