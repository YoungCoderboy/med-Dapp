import Loader from "./components/Loader";
import Navbar2 from "./components/Navbar-patient";

import { useEffect, useState } from "react";

const dietplan = () => {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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";
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState("65");
  const [height, setHeight] = useState("180");
  const [age, setAge] = useState("21");
  const [gender, setGender] = useState("male");
  const [county, setCounty] = useState();
  const [diet, setDiet] = useState("nonvegetarian");
  const [healthCondition, setHealthCondition] = useState("");

  async function getAnswer(query) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
    let data = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: query },
      ],
      temperature: 0.7,
    });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: data,
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }

  async function getAnswerToQuery(query) {
    try {
      const response = await getAnswer(query);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  const fun = (q) => {
    setLoading(true);
    setTimeout(() => {
      const prom = getAnswerToQuery(q);
      prom.then((response) => {
        setValue(response.choices[0].message.content);
        setLoading(false);
      });
    }, 10000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission, such as sending data to a server
    const q = `write the diet plan for ${gender} having age ${age} , height ${height} , weight ${weight} who live in county ${county} have ${diet} diet preferences and have health conditions as ${healthCondition} remove unwanted message and remove introduction`;

    fun(q);
  };
  const handelChange = (e) => {
    if (e.target.name === "age") {
      setAge(e.target.value);
    }

    if (e.target.name === "gender") {
      setGender(e.target.value);
    }

    if (e.target.name === "county") {
      setCounty(e.target.value);
    }

    if (e.target.name === "weight") {
      setWeight(e.target.value);
    }

    if (e.target.name === "height") {
      setHeight(e.target.value);
    }

    if (e.target.name === "dietPreference") {
      setDiet(e.target.value);
    }
    if (e.target.name === "healthCondition") {
      setHealthCondition(e.target.value);
    }

    console.log(e.target.name, e.target.value);
  };

  return (
    <div>
      <Navbar2 />
      {loading ? (
        <Loader />
      ) : value ? (
        <div className="m-10 shadow-xl p-5">
          <h2>Here is your diet plan</h2>
          <pre className="mt-5 whitespace-pre-wrap">
            <code className="w-3/4 language-plaintext whitespace-pre-wrap">
              {value}
            </code>
          </pre>
        </div>
      ) : (
        <div className="bg-gray-100 h-screen flex items-center justify-center mt-10">
          <div className="m-10 w-full p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Health Details Form</h2>

            <form>
              <div className="mb-4">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  for="age"
                  className="block text-sm font-medium text-gray-600"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handelChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  for="gender"
                  className="block text-sm font-medium text-gray-600"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handelChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="" disabled selected>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  for="county"
                  className="block text-sm font-medium text-gray-600"
                >
                  County
                </label>
                <input
                  type="text"
                  onChange={handelChange}
                  id="county"
                  name="county"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  for="weight"
                  className="block text-sm font-medium text-gray-600"
                >
                  Weight (kg)
                </label>
                <input
                  onChange={handelChange}
                  type="number"
                  id="weight"
                  name="weight"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  for="height"
                  className="block text-sm font-medium text-gray-600"
                >
                  Height (cm)
                </label>
                <input
                  type="number"
                  onChange={handelChange}
                  id="height"
                  name="height"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Diet Preference
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    onChange={handelChange}
                    id="vegetarian"
                    name="dietPreference"
                    value="vegetarian"
                    className="mr-2"
                    required
                  />
                  <label for="vegetarian">Vegetarian</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="nonVegetarian"
                    onChange={handelChange}
                    name="dietPreference"
                    value="nonVegetarian"
                    className="mr-2"
                    required
                  />
                  <label for="nonVegetarian">Non-Vegetarian</label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  for="healthCondition"
                  className="block text-sm font-medium text-gray-600"
                >
                  Health Condition
                </label>
                <textarea
                  id="healthCondition"
                  name="healthCondition"
                  onChange={handelChange}
                  rows="4"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default dietplan;
