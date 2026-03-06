import { useEffect, useState } from 'react'
import countryService from './services/countryService'

const Country = ({country}) =>{
  return (<div>
      <h1>{country.name.common}</h1>
      {country.capital.map((capital) => {
        return <p key={capital} >Capital {capital}</p>
      })}
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        { Object.keys(country.languages).map((key) => {
          return <li key={key} >{country.languages[key]}</li>
        })}
      </ul>
      <img src={country.flag.png} alt={country.flag.alt}></img>
    </div>
  )
}


const Countries = ({countryData, isVisible, setIsVisible}) => {
  if (countryData.length >= 10) {
    return (<div>
      Too many matches, specify another filler.
    </div>)
  }

  if( countryData.length === 1) {
    const country = countryData[0]
    return <Country country={country}/>
  }

  if( countryData.length === 0) {
    return (<div>
      No countries found.  Try another filler.
    </div>)
  }

  const onShowClick = (index) => {
    setIsVisible(isVisible.map((element, i) => i === index ? true : element) )
  }

  return (<div>
    {countryData.map((country, index) => {
      return (<div key={country.name.common}>
        {country.name.common} <button onClick={() => onShowClick(index)}>Show</button>
        { isVisible[index] ? <Country  country={country}/> : null}
      </div>)
    })}
  </div>)

}


function App() {
  const [countryData, setCountryData] = useState([])
  const [filter, setFilter] = useState("")
  const [isVisible, setIsVisible] = useState(Array(10).fill(false))

  console.log("AllCountryData:", countryData)

  useEffect(() => {
    console.log("Using effect")

    countryService
      .downloadAllData()
      .then((data) => {
        console.log("All country data: ", data)

        setCountryData(data.map((entry) => {
            return { name: entry.name, flag: entry.flags, area: entry.area, capital: entry.capital, languages: entry.languages }
          })
        )
        
      })

  }, []) 

  const onChange = (event) => {
    console.log("Event: ", event)
    console.log(event.target.value)
    setFilter(event.target.value)
    setIsVisible((Array(10).fill(false)))
  }

  const filteredCountries = countryData.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const country = filteredCountries.find((country) => country.name.common.toLowerCase() === filter.toLowerCase())

  const countries = country ? [country] : filteredCountries 

  return (
    <>
      <div>
        <div>Find Countries: <input onChange={onChange} value={filter}></input></div>
        <Countries countryData={countries} isVisible={isVisible} setIsVisible={setIsVisible}/>
      </div>
    </>
  )
}

export default App
