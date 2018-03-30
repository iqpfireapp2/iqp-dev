/**
 * Created by Nitin Gupta.
 */

import React, {Component} from "react";
import {Nav, NavItem, NavLink, TabContent} from "reactstrap";

import PrevRecords from './PrevRecords/PrevRecords'
import AddNew from './AddNew/AddNew'

var tabList = [
    {
        'name': 'Previous Records',
        'content': <PrevRecords/>
    },
    {
        'name': 'Add New',
        'content': <AddNew/>
    }
];

export default class MachineInfo extends Component {
    constructor(props) {
        super(props);
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        this.state = {
            mcid: params.get('mcid'),
            mtid: params.get('mtid'),
            tabList: tabList,
            currentTab: 0,
            indexPrevRecords : 0,
            indexAddNew: 1
        };
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(index, recentRecord) {
        var tabList = this.state.tabList;
        if(recentRecord.dispatchConfig === undefined){
            tabList[this.state.indexAddNew].content = React.cloneElement(this.state.tabList[this.state.indexAddNew].content, {recentRecord: recentRecord});
            this.setState({tabList: tabList});
            this.setState({currentTab: index});
        }else {
            if(this.state.tabList[this.state.indexAddNew].content.props.recentRecord !== undefined){
                tabList[this.state.indexAddNew].content = React.cloneElement(this.state.tabList[this.state.indexAddNew].content, {recentRecord: undefined});
                this.setState({tabList: tabList});
            }
            this.setState({currentTab: index});
        }
    }

    componentWillMount() {
        var tabList = this.state.tabList;
        tabList[this.state.indexPrevRecords].content = React.cloneElement(this.state.tabList[this.state.indexPrevRecords].content, {changeTab: this.changeTab, indexAddNew: this.state.indexAddNew});
        this.setState({tabList: tabList});
    }

    render() {
        return (
            <div className="animated fadeIn">
                <h3>Machine : {this.state.mcid}</h3>
                <h4>Maintenance History : {this.state.mtid}</h4>
            <br/>
                <Nav tabs>

                        {this.state.tabList.map(function (tab, index) {
                            return (
                                <NavItem key={index}>
                                    <NavLink className={(this.state.currentTab === index) ? 'active' : null} onClick={this.changeTab.bind(this, index)}>{tab.name}</NavLink>
                                </NavItem>
                            );
                        }.bind(this))}

                </Nav>
                <TabContent>
                    {React.cloneElement(this.state.tabList[this.state.currentTab].content, {id: this.state.mtid})}
                </TabContent>
            </div>
        );
    }
}