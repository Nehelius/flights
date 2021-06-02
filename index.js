const express = require('express')
const path = require('path')
const axios = require('axios')

const app = express()
const port = 3001


app.use(express.static('public'))

app.get('/api', (req, res) => {
    axios.get('https://data.rb24.com/live?airline=&station=&aircraft=&airport=&fn=&far=&fms=&zoom=20&flightid=&timestamp=false&bounds=80,180,-80,-180&designator=icao&ff=false&os=web&adsb=true&adsbsat=true&asdi=true&ocea=true&mlat=true&sate=true&uat=true&hfdl=true&esti=true&asdex=true&diverted=false&delayed=false&isga=false&ground=true&onair=true', {
      headers: {
        'Origin': 'default'
      }
    })
      .then(result => {
        const flights = result.data[0]

        let ptFlights = {}

        for (const flightID in flights) {
          if (flights[flightID][10].startsWith("LP") || flights[flightID][11].startsWith("LP")) {
            ptFlights[flightID] = flights[flightID]
          }
        }        

        res.json(ptFlights)
      })
      .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})