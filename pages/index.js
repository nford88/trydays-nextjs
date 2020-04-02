import EventsNav from '../components/eventsNav'
import EventsMain from './events'
import { Jumbotron, Container } from 'reactstrap'

export default function Index() {
  return (
    <div>
      <EventsNav />
      <Jumbotron className="events-home-jumbotron">
        <Container>
          <h1>Trysdays</h1>
          <hr></hr>
          <h3>GraphQL Backend / React Frontend </h3>
        </Container>
      </Jumbotron>
      {/* <EventsMain /> */}
    </div>
  )
}
