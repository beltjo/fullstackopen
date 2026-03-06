import { useEffect, useState } from 'react'
import countryService from './services/countryService'

const Countries = ({countryData}) => {
  if (countryData.length >= 10) {
    return (<div>
      Too many matches, specify another filler.
    </div>)
  }

  if( countryData.length === 1) {
    const country = countryData[0]
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
    </div>)
  }

  if( countryData.length === 0) {
    return (<div>
      No countries found.  Try another filler.
    </div>)
  }

  return (<div>
    {countryData.map((country) => {
      return (<p key={country.name.common}>
        {country.name.common}
      </p>)
    })}
  </div>)

}


function App() {
  const [countryData, setCountryData] = useState([])
  const [filter, setFilter] = useState("")
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
  }

  const filteredCountries = countryData.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const country = filteredCountries.find((country) => country.name.common.toLowerCase() === filter.toLowerCase())

  const countries = country ? [country] : filteredCountries 

  return (
    <>
      <div>
        <div>Find Countries: <input onChange={onChange} value={filter}></input></div>
        <Countries countryData={countries} />
      </div>
    </>
  )
}

export default App
