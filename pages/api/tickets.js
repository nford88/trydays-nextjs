const querystring = require('querystring')
const fetch = require('node-fetch')
const isBefore = require('date-fns/isBefore')
import { groupBy, chain } from 'lodash'
import { dateRangesForTicketMasterApi } from '../../components/utils'
// import data from './events.json'
console.log(dateRangesForTicketMasterApi())

let dataS = []

const fetchApi = () => {
  const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?'
  const params = {
    apikey: 'bQ8tC2OMgdsB5mWdbNGEGR3d1V1bTc5v',
    sort: 'date,name,asc',
    size: '200',
    geoPoint: 'gc7x7q',
    radius: '15',
    unit: 'km',
    localStartDateTime: '2020-03-29T00:00:00,2020-04-13T00:00:00'
  }
  let queryString = querystring.stringify(params)
  console.log(queryString)
  if (dataS.length === 0) {
    dataS = fetch(API_URL + queryString).then(r => r.json()).catch(e => console.log(e))
    console.log(dataS)
    return dataS
  } else {
    return dataS
  }
}

const formatEventResults = data => {
  const filteredEvents = data['_embedded'].events.filter(event => {
    return isBefore(new Date(), new Date(event.dates.start.dateTime))
  })

  const sorted = chain(filteredEvents)
    .groupBy(result => result.dates.start.localDate)
    .map((events, key) => ({ date: key, events: events }))
    .value()

  // sorted.map(d => {
  //   return console.log('day =', d)
  // })

  return sorted
}

const handler = async (req, res) => {
  const data = await fetchApi()
  if (data.errors) {
    return res.status(404).json(modifdata.errorsiedData)
  }
  else {
    const modifiedData = await formatEventResults(data)
    return res.status(200).json(modifiedData)
  }  // const modifiedData = data
}
export default handler
