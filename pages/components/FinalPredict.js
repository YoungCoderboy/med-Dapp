import samp from '../constants/sample.json'
const FinalPredict = () => {
  const arr = samp.samp
  return (
    <div className="pred">
      <ul>
        <li>
          {arr.map((i) => {
            return (
              <div key={i}>
                <h4>{i}</h4>
                <br />
              </div>
            )
          })}
        </li>
      </ul>
    </div>
  )
}
export default FinalPredict
