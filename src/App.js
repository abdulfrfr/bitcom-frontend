import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPollingUnitResult from "./Components/AllPollingUnitResult";
import NewPollingUnits from "./Components/NewPollingUnits";
import PollingUnitUnderLocal from "./Components/PollingUnitUnderLocal";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllPollingUnitResult />} />
          <Route path="/newpollingunit" element={<NewPollingUnits />} />
          <Route
            path="/pollingunitunderlocal"
            element={<PollingUnitUnderLocal />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
