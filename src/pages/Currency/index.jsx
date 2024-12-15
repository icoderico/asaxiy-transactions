import React from "react";
import Converter from "./Converter";

const CurrencyPage = () => {
  return (
    <div>
      <h1 className="text-3xl py-5 ">Valyuta kursi</h1>
      <div>
        <Converter />
      </div>
    </div>
  );
};

export default CurrencyPage;
