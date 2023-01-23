import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";

function PollingUnitUnderLocal() {
  const [pollingUnit, setPollingUnit] = useState([]);
  const [lga, setLga] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/lga")
      .then((res) => {
        setLga(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getPollingUnit(lga_id) {
    axios
      .get("http://localhost:5000/units")
      .then((res) => {
        setPollingUnit(
          res.data.filter((poll, index) => poll.lga_id === lga_id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="bg-blue-300 h-[150vh] p-4">
      <div className="font-extrabold text-2xl">DELTA STATE</div>
      <div className="text-4xl">Find Polling Unit in your LGA</div>

      <div className="flex justify-start items-start">
        <div className="mr-5">
          <div
            onClick={() => setShow(!show)}
            className="mt-5 cursor-pointer box-border bg-white p-2 w-[10vw] text-2xl flex justify-between items-center"
          >
            select <BsChevronDown />
          </div>
          <div className="bg-white w-[10vw] box-border p-2">
            {lga.map((lga, index) => {
              return (
                <div
                  onClick={() => getPollingUnit(lga.lga_id)}
                  className={
                    show
                      ? "p-2 border-b-gray-200 border-b-2 cursor-pointer"
                      : "hidden"
                  }
                >
                  {lga.lga_name}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[80vw] bg-gray-200 h-[100vh] mt-5 box-border p-4">
          {pollingUnit.map((poll, index) => {
            return (
              <div className="flex flex-col justify-start items-start p2">
                <div>{poll.polling_unit_name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PollingUnitUnderLocal;
