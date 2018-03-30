  import React from 'react';
  import UpdateOperationalThresholdList from './UpdateOperationalThresholdList';
  import { connect } from 'react-redux';
  import PropTypes from 'prop-types';
  import { FetchMachineOperTheresholds } from '../../../../actions/actions';

  class UpdateOperationalThresholdPage extends React.Component {
    componentDidMount() {
      this.props.FetchMachineOperTheresholds();
    }

    render() {
      return (
        <div>
          <h1>Maintenance Details</h1>

          <UpdateOperationalThresholdList machineoperthresholds={this.props.machineoperthresholds}/>
        </div>
      );
    }
  }

  UpdateOperationalThresholdPage.propTypes = {
    machineoperthresholds: PropTypes.array.isRequired,
    FetchMachineOperTheresholds: PropTypes.func.isRequired
    
  }

  function mapStateToProps(state) {
    return {
      machineoperthresholds: state.machineoperthresholds
    }
  }

  export default connect(mapStateToProps, { FetchMachineOperTheresholds })(UpdateOperationalThresholdPage);
