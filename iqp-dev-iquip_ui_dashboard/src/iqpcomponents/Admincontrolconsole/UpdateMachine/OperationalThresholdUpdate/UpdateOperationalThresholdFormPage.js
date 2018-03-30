import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveMachineTechInfo, FetchMachineOperThereshold, updateMachineMaintInfo } from '../../../../actions/actions';
import UpdateOperationsThresholdForm from './UpdateOperationsThresholdForm';

class UpdateOperationalThresholdFormPage extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.mc_tech_id) {
      this.props.FetchMachineOperThereshold(match.params.mc_tech_id);
    }
  }

  saveInfo = ({ _id, mc_id , parm_name , scenario_type , min , max , critical  }) => {
    if (_id) {
      return this.props.updateMachineMaintInfo({ _id, mc_id , parm_name , scenario_type , min , max , critical }).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
      return this.props.saveMachineMaintInfo({  mc_id , parm_name , scenario_type , min , max , critical }).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/maintinfoupdate" /> :
          <UpdateOperationsThresholdForm
            machineoperthreshold={this.props.machineoperthreshold}
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
      machineoperthreshold: state.machineoperthresholds.find(item => item._id === match.params._id)
    }
  }

  return { machineoperthreshold: null };
}

export default connect(mapStateToProps, { saveMachineTechInfo, FetchMachineOperThereshold, updateMachineMaintInfo })(UpdateOperationalThresholdFormPage);
