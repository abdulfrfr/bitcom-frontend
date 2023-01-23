import axios from "axios";
import { BsChevronDown } from "react-icons/bs";
import { useState, useEffect } from "react";
function NewPollingUnits() {
  const [details, setDetails] = useState({
    uniqueid: 8,
    polling_unit_id: 6,
    ward_id: 8,
    lga_id: 17,
    uniquewardid: 181,
    polling_unit_number: "DT1708006",
    polling_unit_name: "",
    lat: 5.59371889,
    long: 5.999311165,
  });
  const [prevPolls, setPrevPolls] = useState([]);
  const [showParties, setShowParties] = useState(false);
  const [parties, setParties] = useState([]);
  const [ward, setWard] = useState([]);
  const [lga, setLga] = useState([]);
  const [showLga, setShowLga] = useState(false);
  const [showWard, setShowWard] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/parties")
      .then((res) => {
        setParties(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/lga")
      .then((res) => {
        setLga(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/ward")
      .then((res) => {
        setWard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/allpolling")
      .then((res) => {
        setPrevPolls(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function newPollsDetails(event, lg, ward) {
    const pollName = event.target.value;
    const lastPrev = prevPolls.at(-1);
    setDetails((prev) => {
      return {
        uniqueid: 55,
        polling_unit_id: 35,
        ward_id: 67,
        lga_id: 27,
        uniquewardid: 192,
        polling_unit_number: "DT1708007",
        polling_unit_name: pollName,
        lat: 5.59371889,
        long: 5.999311165,
      };
    });
  }

  function newPoll() {
    axios
      .post("http://localhost:5000/newpoll", details)
      .then((res) => {
        console.log(res);
        console.log("add a new polling unit");
      })
      .catch((err) => console.log(err));
  }
  return (
    <section className="bg-gray-200 p-5 h-[500vh]">
      <div className="text-3xl font-bold">Add New Polling Unit</div>
      <div className="flex justify-start items-start mt-3">
        <div className="mr-5">
          <div
            onClick={() => setShowParties(!showParties)}
            className="cursor-pointer flex justify-start items-center"
          >
            Choose party <BsChevronDown className="ml-3" />
          </div>
          <div>
            {parties.map((party, index) => {
              return (
                <div
                  className={showParties ? "bg-white p-2 bx-border" : "hidden"}
                >
                  <div className="p-2">{party.partyname}</div>
                </div>
              );
            })}
            <button
              onClick={newPoll}
              className="box-border bg-green-500 rounded-xl p-2 mt-5"
            >
              ADD NEW POLLING UNIT
            </button>
          </div>
        </div>
        <div className="flex">
          <div>
            <div>Unit Name</div>
            <input
              onChange={newPollsDetails}
              type="text"
              name="polling_unit_name"
              placeholder="New Unit Name"
              value={details.polling_unit_name}
            />
          </div>
          <div>
            <div
              className="cursor-pointer"
              onClick={() => setShowLga(!showLga)}
            >
              Choose LGA
            </div>
            <div>
              {lga.map((lga, index) => {
                return (
                  <div
                    onClick={() => newPollsDetails(lga)}
                    className={
                      showLga
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
          <div>
            <div
              className="ml-10 cursor-pointer"
              onClick={() => setShowWard(!showWard)}
            >
              Choose Ward
            </div>
            <div>
              {ward.map((ward, index) => {
                return (
                  <div
                    onClick={() => newPollsDetails(ward)}
                    className={
                      showWard
                        ? "p-2 border-b-gray-200 border-b-2 cursor-pointer"
                        : "hidden"
                    }
                  >
                    {ward.ward_name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewPollingUnits;
