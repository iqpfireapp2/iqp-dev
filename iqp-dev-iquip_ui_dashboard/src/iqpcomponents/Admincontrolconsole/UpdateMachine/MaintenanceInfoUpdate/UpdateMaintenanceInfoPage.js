  import React from 'react';
    import UpdateMaintenanceInfoList from './UpdateMaintenanceInfoList';
    import { connect } from 'react-redux';
  import PropTypes from 'prop-types';
    import { FetchMachineMaintInfos } from '../../../../actions/actions';

    class UpdateMaintenanceInfoPage extends React.Component {
      componentDidMount() {
        this.props.FetchMachineMaintInfos();
      }

      render() {
        return (
          <div>
            <h1>Maintenance Details</h1>

            <UpdateMaintenanceInfoList machinemaintinfos={this.props.machinemaintinfos}/>
          </div>
        );
      }
    }

    UpdateMaintenanceInfoPage.propTypes = {
      machinemaintinfos: PropTypes.array.isRequired,
      FetchMachineMaintInfos: PropTypes.func.isRequired
      
    }

    function mapStateToProps(state) {
      return {
        machinemaintinfos: state.machinemaintinfos
      }
    }

    export default connect(mapStateToProps, { FetchMachineMaintInfos })(UpdateMaintenanceInfoPage);
