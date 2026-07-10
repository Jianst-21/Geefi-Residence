"use client";
import React, { useState } from "react";
import KprCalculator from "./Kprcalculator";
import KprAmortizationTable from "./KprAmortizationTable";

export default function KprCalculatorSection() {
  const [hargaRumah, setHargaRumah] = useState(50000000);
  const [uangMuka, setUangMuka] = useState(0);
  const [tenor, setTenor] = useState(1);
  const [bunga, setBunga] = useState(1);

  return (
    <>
      <KprCalculator 
        hargaRumah={hargaRumah} 
        setHargaRumah={setHargaRumah}
        uangMuka={uangMuka} 
        setUangMuka={setUangMuka}
        tenor={tenor} 
        setTenor={setTenor}
        bunga={bunga} 
        setBunga={setBunga}
      />
      <KprAmortizationTable 
        hargaRumah={hargaRumah}
        uangMuka={uangMuka}
        tenor={tenor}
        bunga={bunga}
      />
    </>
  );
}
