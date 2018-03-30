import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveMachineMaintInfo, FetchMachineMaintInfo, updateMachineMaintInfo } from '../../../../actions/actions';
import UpdateMaintenanceInfoForm from './UpdateMaintenanceInfoForm';

class UpdateMaintenanceInfoFormPage extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.maint_act_id) {
      this.props.FetchMachineMaintInfo(match.params.maint_act_id);
    }
  }

  saveInfo = ({ _id, act_id, activity_name, frequecy, last_serviced_date, mc_id }) => {
    if (_id) {
      return this.props.updateMachineMaintInfo({ _id,act_id, activity_name, frequecy, last_serviced_date, mc_id }).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
      return this.props.saveMachineMaintInfo({ act_id, activity_name, frequecy, last_serviced_date, mc_id }).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/updatemachine/maintinfoupdate" /> :
          <UpdateMaintenanceInfoForm
            machinemaintinfo={this.props.machinemaintinfo}
            saveInfo={this.saveInfo}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params._id) {
    return {
      machinemaintinfo: state.machinemaintinfos.find(item => item._id === match.params._id)
    }
  }

  return { machinemaintinfo: null };
}

export default connect(mapStateToProps, { saveMachineMaintInfo, FetchMachineMaintInfo, updateMachineMaintInfo })(UpdateMaintenanceInfoFormPage);
