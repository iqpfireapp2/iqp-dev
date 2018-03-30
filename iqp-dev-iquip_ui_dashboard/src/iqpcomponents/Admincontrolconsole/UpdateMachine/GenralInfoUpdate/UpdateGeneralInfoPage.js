  import React from 'react';
  import PropTypes from 'prop-types';
    import UpdateGeneralInfoList from './UpdateGeneralInfoList';
    import { connect } from 'react-redux';
    import { FetchMachineGenInfos } from '../../../../actions/actions';

    class UpdateGeneralInfoPage extends React.Component {
      componentDidMount() {
        this.props.FetchMachineGenInfos();
      }

      render() {
        return (
          <div>
            <h1>Maintenance Details</h1>

            <UpdateGeneralInfoList geninfos={this.props.geninfos}/>
          </div>
        );
      }
    }

    UpdateGeneralInfoPage.propTypes = {
      geninfos: PropTypes.array.isRequired,
      FetchMachineGenInfos: PropTypes.func.isRequired
      
    }

    function mapStateToProps(state) {
      return {
        geninfos: state.geninfos
      }
    }

    export default connect(mapStateToProps, { FetchMachineGenInfos })(UpdateGeneralInfoPage);
