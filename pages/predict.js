import search_animal from "./components/search";
import axios from "axios";
import { createRef, useRef, useState } from "react";
import sympthons from "./components/sympthons";
import FinalPredict from "./components/FinalPredict";

const Prediction = () => {
  // const [checked, setChecked] = useState(false);
  const [values, setValues] = useState([]);
  const [pred, setPred] = useState(false);
  const handleChange = (e) => {
    if (e.target.checked) {
      const x = [];
      x.push(e.target.value);
      setValues(values.concat(x));
    } else {
      const newx = values.filter((it) => {
        return it !== e.target.value;
      });
      setValues(newx);
    }
  };
  // console.log(values);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      const resp = await axios.post("http://localhost:8005/prediction-data", {
        arr: values,
      });
      if (resp.data == "200") {
        setTimeout(() => {
          alert("Action Done!!!")
          setPred(true);
        }, 45000);
      } else {
        console.error("Something went wrong!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {pred === true ? (
        <FinalPredict />
      ) : (
        <div className="docupload">
          <input
            id="searchbar"
            onKeyUp={() => search_animal()}
            type="text"
            name="search"
            placeholder="Search animals.."
          />
          <div className="selectedItems">
            {values.map((element, id) => {
              return (
                <div className="items" key={id}>
                  {element}
                </div>
              );
            })}
          </div>
          <div className="submit-btn">
            <input
              type="button"
              className="btn"
              name="submit"
              value="submit"
              onClick={handleSubmit}
            />
          </div>
          <ul id="list">
            <form onSubmit={handleSubmit}>
              {sympthons.map((element, id) => {
                return (
                  <div className="animals" key={id}>
                    <input
                      type="checkbox"
                      id={id}
                      name={element}
                      value={element}
                      onChange={handleChange}
                    />
                    <label for={id}>{element}</label>
                  </div>
                );
              })}
            </form>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Prediction;
