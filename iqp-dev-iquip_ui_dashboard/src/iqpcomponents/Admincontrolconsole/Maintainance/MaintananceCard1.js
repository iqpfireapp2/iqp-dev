import React from 'react';
import {Link} from 'react-router-dom';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class MaintananceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            _id: this.props.game ? this.props._id : null,
            title: this.props.game ? this.props.title : '',
            cover: this.props.game ? this.props.cover : '',
            modal: false
        };
    }

    updateGame() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const item = this.props.item;
        const deleteItem = this.props.deleteItem;
        const updateGame = this.props.updateGame;
        return (
            <tr>
                <td>{item.activity}</td>
                <td>{item.resposible_peson}</td>
                <td>{item.last_serviced_date}</td>
                <td>{item.duration}</td>
                <td>{item.remarks}</td>
                <td><Button className="btn- btn-danger btn-xs" size="sm" key={item._id}>Edit </Button>
                </td>
                <td>
                    {/*<Button className="btn- btn-danger btn-xs"  size="sm"  onClick={this.modalDeleteShow} data-id={game._id} data-title={game.title}>Delete</Button>*/}
                    <Button className="btn- btn-danger btn-xs" size="sm" onClick={()=> deleteItem(item._id)}>Delete </Button>
                </td>
            </tr>
        );
    }
}

MaintananceCard.propTypes = {
    item: PropTypes.object.isRequired
};

export default connect()(MaintananceCard);