import React, {useState} from "react"
import "./Filter.css"


const Emotions = props => {
  const { allEmotions } = props
  const [seeDetails, setSeeDetails] = useState(false)

  const toggleDetails = () => {
    if (allEmotions) {
      setSeeDetails(!seeDetails)
    } else {
      setSeeDetails(false)
    }
  }

  return (
    <div className='card emotions'>
      {seeDetails && <div>
        here's what we think:
        <ul>
          {allEmotions.map( emotion=> <li key={emotion[0]} >{emotion[0]}: {Math.round(emotion[1]*100)}% </li>)}
        </ul>
      </div>}
      <button onClick={toggleDetails}>{seeDetails?"hide ":"see "} reading details</button>
    </div>
  )
}

export default Emotions
