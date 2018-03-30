var App = React.createClass({
    getInitialState: function(){
      return {
        'city': '',
        'zip': '',
        'temp': ''
      }
    },
    getData: function(){
      $.ajax({
      url: 'http://api.weather-site.com/api/API_KEY/q/55555.json',
      dataType: 'jsonp',
      success: function(parsed_json){
        this.setState({city: parsed_json['cityName']});
        this.setState({zip: parsed_json['zipCode']});
        this.setState({temp: parsed_json['temperature']});
      }.bind(this)
      });
    },
    handleQuerySearch: function(e) {
      this.setState({zip: e.target.value});
    },
    handleSubmit: function(e) {
      e.preventDefaults();
      this.getData(this.state.zip):
    },
    render: function(){
      return(
        <div>
          <div className='search'>
            <h1>Search with a zip code</h1>
            <form className='search-form' on={this.handleSubmit}>
              <input
                type='text'
                placeholder='Zip Code'
                className='form-control'
                value={this.state.zip}
                onChange={this.handleQuerySearch}
              />
              <input type='submit' value='Search' />
            </form>
          </div>
        
          <div>
            <h3> {this.state.city} </h3>
          </div>
    
          <div>
            <h3> {this.state.temp} </h3>
          </div>
        </div>
       );
      }
  });
export default  App; 