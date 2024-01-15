import { FaPlusCircle } from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'

const Reminder = () => {
  var weekday = new Array(7)
  weekday[0] = 'Monday'
  weekday[1] = 'Tuesday'
  weekday[2] = 'Wednesday'
  weekday[3] = 'Thursday'
  weekday[4] = 'Friday'
  weekday[5] = 'Saturday'
  weekday[6] = 'Sunday'
  const [value, setValue] = useState([])
  const [time, setTime] = useState('12:00')
  const [date, setDate] = useState([])
  const [medName, setMedName] = useState('')
  async function fun(e) {
    const newArray = date.join(' ')
    // console.log(value);

    const x = medName + ' ' + time + ' ' + newArray
    const newVal = [...value]
    console.log(newVal)
    const newx = newVal.filter((it) => {
      return it !== x
    })
    newx.push(x)
    setValue(newx)
    // // setValue(value.concat(time+" "+newArray));
    // console.log(value);
    const resp = await axios.post('http://localhost:8000/rdata', {
      arr: x,
    })
    resp()
  }

  function medNameChange() {
    var MedName = document.getElementById('nameMed')
    setMedName(MedName)
  }

  function changeTime() {
    var timeInput = document.getElementById('time-input')
    // var clock = document.getElementById("clock");
    // clock.innerHTML = timeInput.value;
    setTime(timeInput.value)
  }

  // function changeDate() {
  //   var dateInput = document.getElementById("date-input");
  //   setDate(dateInput.value);
  // }
  const handleChange = (e) => {
    if (e.target.checked) {
      const x = []
      x.push(e.target.value)
      setDate(date.concat(x))
    } else {
      const newx = date.filter((it) => {
        return it !== e.target.value
      })
      setDate(newx)
    }
  }
  return (
    <div className="reminder-main">
      <input
        type="text"
        id="nameMed"
        value={medName}
        onChange={(e) => {
          setMedName(e.target.value)
        }}
      />
      <input
        type="time"
        id="time-input"
        value={time}
        onChange={() => changeTime()}
      />
      <div className="radio-btn">
        <ul className="time-ul">
          {weekday.map((ele, id) => {
            return (
              <label className="container" key={id}>
                {ele}
                <input value={ele} type="checkbox" onChange={handleChange} />
                <span className="checkmark"></span>
              </label>
            )
          })}
        </ul>
      </div>
      <button onClick={() => fun()} className="btn add-data">
        Add
      </button>

      <ul className="time-ul2">
        {value.map((element, id) => {
          return (
            <div className="time-list items" key={id}>
              {element}
            </div>
          )
        })}
      </ul>
    </div>
  )
}
export default Reminder
