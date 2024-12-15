import React from "react";
import Converter from "./Converter";

export const BASE_API =
  "https://v6.exchangerate-api.com/v6/2ea9c57dbd23a32feed75494";

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
