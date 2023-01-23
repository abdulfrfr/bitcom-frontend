import { useState, useEffect } from "react";
import axios from "axios";

function AllPollingUnitResult() {
  const [pollingUnitObject, setPollingUnitObject] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allpolling")
      .then((res) => {
        setPollingUnitObject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/units")
      .then((res) => {
        setUnits(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="bg-green-300 w-screen p-5 overflow-x-hidden overflow-y-scroll">
      <div className="font-extrabold text-2xl">DELTA STATE</div>
      <div>
        <div className="p-4 text-6xl align-left">
          All Polling Unit Result and Party Results
        </div>
        <div>
          {units
            .filter((un, index) => un.uniqueid <= 27)
            .map((obj, index) => {
              return (
                <div className="flex py-2">
                  <div className="flex w-[20vw]">
                    <div className="box-border p-2">{obj.uniqueid}</div>
                    <div className="box-border p-2">
                      {obj.polling_unit_name}
                    </div>
                  </div>

                  <div className="flex">
                    {pollingUnitObject
                      .filter(
                        (unit, index) =>
                          unit.polling_unit_uniqueid === obj.uniqueid
                      )
                      .map((par, index) => {
                        return (
                          <div className="flex flex-col justify-center items-center bg-gray-200 p-2 m-2 box-border rounded-xl">
                            <div className="p-2">{par.party_abbreviation}</div>
                            <div>{par.party_score}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default AllPollingUnitResult;
