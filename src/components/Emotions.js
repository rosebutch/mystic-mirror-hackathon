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
        here's what i think:
        <ul>
          { allEmotions && allEmotions.length > 0 ? allEmotions.map( emotion=> <li key={emotion[0]} >{emotion[0]}: {Math.round(emotion[1]*100)}% </li>) : <li>i don't know. <br/>can you see your <br/>face in the mirror? <br/>if so, try again.</li>}
        </ul>
      </div>}
      <button onClick={toggleDetails}>{seeDetails?"hide ":"see "} reading details</button>
    </div>
  )
}

export default Emotions
