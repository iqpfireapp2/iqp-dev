  import React from 'react';
  import MachineUpdateList from './MachineUpdateList';
  import { connect } from 'react-redux';
  import { fetchGames, deleteGame } from '../../../actions/actions';

  class MaintenaceUpdatePage extends React.Component {
    componentDidMount() {
      this.props.fetchGames();
    }

    render() {
      return (
        <div>
          <h1></h1>

          <MachineUpdateList games={this.props.games} deleteGame={this.props.deleteGame} />
        </div>
      );
    }
  }

  MaintenaceUpdatePage.propTypes = {
    games: React.PropTypes.array.isRequired,
    fetchGames: React.PropTypes.func.isRequired,
    deleteGame: React.PropTypes.func.isRequired
  }

  function mapStateToProps(state) {
    return {
      games: state.games
    }
  }

  export default connect(mapStateToProps, { fetchGames, deleteGame })(MaintenaceUpdatePage);
