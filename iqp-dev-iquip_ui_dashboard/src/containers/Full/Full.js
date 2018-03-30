import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

//Components
import Header from '../../iqpcomponents/frameworks/Header/';
import Sidebar from '../../iqpcomponents/frameworks/Header/Sidebar/';
// import Breadcrumb from '../../iqpcomponents/frameworks/Breadcrumb/';
// import Footer from '../../iqpcomponents/frameworks/Footer/';

// Components
import Dashboard from '../../iqpcomponents/frameworks/PageComponent/FactoryDashboard';
import ProcessinglineDashboard from '../../iqpcomponents/frameworks/PageComponent/ProcessinglineDashboard';
import MachineDashboard from '../../iqpcomponents/frameworks/PageComponent/MachineDashboard';
import MachineInfo from '../../iqpcomponents/frameworks/PageComponent/MachineInfo';
import MaintenanceInfo from '../../iqpcomponents/general/MaintenanceInfo/MaintenanceInfo';
import AdmincntrolconsoleMaster from '../../iqpcomponents/Admincontrolconsole/AdmicontrolconsoleMaster';
import ProcessingLineDlelete from '../../iqpcomponents/Admincontrolconsole/DeleteMachine/ProcessingLineDlelete'
import MachineDeletePage from '../../iqpcomponents/Admincontrolconsole/DeleteMachine/MachineDeletePage';
import UpdateMachineMaintInfoLayout from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/MaintenanceInfoUpdate/UpdateMachineMaintInfoLayout';
import UpdateOperationalThresoldLayout from  '../../iqpcomponents/Admincontrolconsole/UpdateMachine/OperationalThresholdUpdate/UpdateOperationalThresoldLayout';
import UpdateMachineGenInfoLayout from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/GenralInfoUpdate/UpdateMachineGenInfoLayout';
import LoginForm from '../../iqpcomponents/Auth/LoginForm';
// import GameFormPage from '../../iqpcomponents/Admincontrolconsole/GameFormPage';
// import UpdateMachineMaster from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/UpdateMachineMaster';
// import MaintenaceUpdatePage from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/MaintenaceUpdatePage';
// import UpdateLayoutPage from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/UpdateLayoutPage';
// import GeneralInfoFormPage from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/GeneralInfoFormPage';
// import MaintananceInfoForm from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/MaintananceInfoForm';
// import DeleteMachineMaintInfoLayout from '../../iqpcomponents/Admincontrolconsole/UpdateMachine/MaintenanceInfoUpdate/DeleteMachineMaintInfoLayout';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            {/*<Breadcrumb />*/}
            <Container fluid style={{"paddingTop": "10px"}}>
              <Switch>
                <Route path="/maintenance_info" name="Maintenance Info" component={MaintenanceInfo}/>
                <Route path="/dashboard/processingline_dashboard/:pl_id/machine_dashboard/:mc_id/machine_info" name="Machine Info" component={MachineInfo}/>
                <Route path="/dashboard/processingline_dashboard/:pl_id/machine_dashboard/:mc_id" name="Machine Dashboard" component={MachineDashboard}/>
                <Route path="/dashboard/processingline_dashboard/:pl_id" name="Processingline Dashboard" component={ProcessinglineDashboard}/>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/admincntrolconsole" name="AdminCntrol Console" component={AdmincntrolconsoleMaster}/>
                <Route path="/deletelines" name="Delete Lines" component={ProcessingLineDlelete}/>
                <Route path="/deletemachine" name="Delete Machine" component={MachineDeletePage}/>
                <Route path="/geninfoupdate" name="Updte Machine" component={UpdateMachineGenInfoLayout}/>
                <Route path="/maintinfoupdate" name="Updte Machine Maint. Info" component={UpdateMachineMaintInfoLayout}/>
                <Route path="/operatthreupdate" name="Updte Oper. Info. Update" component={UpdateOperationalThresoldLayout}/>
                <Route path="/LoginForm" name="LoginForm" component={LoginForm}/>
                {/*<Route path="/deletemachine" name="Updte Machine Maint. Info" component={DeleteMachineMaintInfoLayout}/>*/}
                {/*<Redirect from="/" to="/dashboard"/>*/}
                <Redirect from="/" to="/LoginForm"/>
              </Switch>
            </Container>
          </main>
        </div>
        {/*<Footer/>*/}
      </div>
    );
  }
}

export default Full;
