import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import debounce from "lodash.debounce";
import { BASE_API } from ".";

const Converter = () => {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("UZS");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [resultValue, setResultValue] = useState(0);
  const [load, setLoad] = useState(false);
  const [currency, setCurrency] = useState({});
  const { query, setQuery, debouncedQuery } = useDebounce("", 700);
  const [filteredRates, setFilteredRates] = useState({});
  const [input, setInput] = useState("");

  const handleInputChange = debounce((e) => {
    const value = e.target.value.toUpperCase();
    setInput(value);

    const filtered = Object.entries(currency)
      .filter(([key]) => key.includes(value))
      .reduce((acc, [key, rate]) => {
        acc[key] = rate;
        return acc;
      }, {});
    setFilteredRates(filtered);
  }, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setLoad(true);
      axios
        .get(`${BASE_API}/pair/${base}/${target}/${debouncedQuery}`)
        .then((res) => {
          setResultValue(res?.data);
          setLoad(false);
        });
    }
  }, [debouncedQuery, base, target]);

  useEffect(() => {
    if (open || open2) {
      axios.get(`${BASE_API}/latest/${base}`).then((res) => {
        setCurrency(res?.data?.conversion_rates);
        setFilteredRates(res?.data?.conversion_rates);
        console.log(res);
        setLoad(false);
      });
    }
  }, [open, open2]);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  return (
    <div>
      <div className="w-full  text-white  border bg-[#006bff] rounded-xl overflow-hidden shadow flex">
        <div className="lg:w-[93%] w-[82%]">
          <input
            placeholder="0.00"
            type="number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="lg:h-36 h-20 w-full p-2 bg-transparent placeholder:text-white  lg:text-[60px] text-[40px] outline-none appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
          />
          <h2 className="px-3 py-2 text-gray-200 lg:text-xl">
            Miqdorni kiriting
          </h2>
        </div>

        <div
          onClick={handleOpen}
          className="bg-white cursor-pointer lg:w-[7%] w-[18%] lg:text-3xl flex items-center justify-center text-[#006bff]"
        >
          {base}
        </div>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="pb-1 flex flex-col items-start">
            <Input
              onChange={handleInputChange}
              label="Search"
              placeholder="Search"
            />
            <h4 className="pt-7 text-[18px] text-gray-500">Valyutalar</h4>
          </DialogHeader>
          <DialogBody className="max-h-40 pt-2 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(filteredRates).map((key, index) => (
                <Button
                  key={index}
                  variant="gradient"
                  className="bg-none text-black shadow border"
                  onClick={() => {
                    setBase(key);
                    handleOpen();
                  }}
                >
                  {key}
                </Button>
              ))}
            </div>
          </DialogBody>
        </Dialog>
      </div>

      <div
        className={`text-[#006bff] transition-all flex justify-center items-center overflow-hidden ${
          load ? "h-16" : "h-0"
        }`}
      >
        <RefreshCcw size={50} className="animated-refresh-icon" />
      </div>

      {!resultValue || (
        <h1 className="text-xl py-4">
          1 {base} = {resultValue?.conversion_rate} {target}
        </h1>
      )}

      <div
        className={`w-full border ${
          load ? "opacity-40" : null
        }  text-[#006bff]   rounded-xl overflow-hidden shadow flex`}
      >
        <div className="lg:w-[93%] w-[82%]">
          <input
            placeholder="0.00"
            type="number"
            readOnly
            value={resultValue?.conversion_result}
            className="lg:h-36 h-20 w-full p-2 bg-transparent placeholder:text-[#006bff]  lg:text-[60px] text-[40px] outline-none appearance-none  [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
          />
          <h2 className="px-3 py-2 text-gray-600 lg:text-xl">
            Konvertatsiya qilingan holati
          </h2>
        </div>

        <div
          onClick={handleOpen2}
          className="bg-[#006bff] cursor-pointer lg:w-[7%] w-[18%] lg:text-3xl flex items-center justify-center text-white"
        >
          {target}
        </div>

        <Dialog open={open2} handler={handleOpen2}>
          <DialogHeader className="pb-1 flex flex-col items-start">
            <Input
              onChange={handleInputChange}
              label="Search"
              placeholder="Search"
            />
            <h4 className="pt-7 text-[18px] text-gray-500">Valyutalar</h4>
          </DialogHeader>
          <DialogBody className="max-h-40 pt-2 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(filteredRates).map((key, index) => (
                <Button
                  key={index}
                  variant="gradient"
                  className="bg-none text-black shadow border"
                  onClick={() => {
                    setTarget(key);
                    handleOpen2();
                  }}
                >
                  {key}
                </Button>
              ))}
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
};

export default Converter;
