import React from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Results from './Results.jsx'
import { AutoComplete } from 'material-ui'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const maxSuggestions = 10
const maxResults = 20
const minCharacters = 3

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      all: [],
      suggestions: [],
      results: [],
      total: 0,
    }
  }

  onUpdateInput = (prefix) => {
    if(prefix.length >= minCharacters) {
      axios.get(`/search?q=${prefix}`)
        .then(({data}) => {
          this.setState({
            all: data.results,
            suggestions: data.results.slice(0, maxSuggestions)
          })
        })

    } else {
      this.setState({
        suggestions: []
      })
    }
  }

  onNewRequest = (url) => {
    if(this.state.suggestions.includes(url)) {
      window.open(`http://${url}`, "_blank")
    } else {
      this.setState({
        results: this.state.all.slice(0, maxResults),
        total: this.state.all.length
      })
    }
  }

  render() {
    return (
        <MuiThemeProvider>
          <Grid>
              <Col lg={12}>
                <Jumbotron>
                  <h1>Domain Search</h1>
                  <AutoComplete
                    dataSource={this.state.suggestions}
                    hintText="Search Domains..."
                    onUpdateInput={this.onUpdateInput}
                    onNewRequest={this.onNewRequest}
                    fullWidth
                  />
                </Jumbotron>
                <Results
                  results={this.state.results}
                  total={this.state.total}
                />
              </Col>
          </Grid>
        </MuiThemeProvider>
    )
  }
}
