import React, { Component } from 'react'
import HeaderBar from '../CommonComponents/HeaderBar.js'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => {
    return { skuCountList: state.skuCountList };
};

class ConnectedSummaryPage extends Component {

    constructor(props) {
        super(props);
        this.getSkuTable.bind(this);
        this.hasSkuCount.bind(this);
    }

    hasSkuCount() {
        return this.props.skuCountList && Object.entries(this.props.skuCountList).length > 0;
    }

    getSkuTable() {
        if (this.hasSkuCount()) {
            return (
                <div>
                    <Table stickyHeader >
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">SKU ID</Typography></TableCell>
                                <TableCell><Typography variant="h6">Count</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(this.props.skuCountList).map((keys) =>
                                <TableRow key={keys[0]}>
                                    <TableCell>{keys[0]}</TableCell>
                                    <TableCell>{keys[1]}</TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </div>);
        }
    }

    render() {
        if (!this.hasSkuCount()) {
            return <Redirect push to="/" />;
        }
        return (
            <div>
                <HeaderBar title="Summary" />
                <div style={{ display: 'flex-vertical', flexGrow: 2, margin: 10 }}>
                    <Typography variant="h6">Final Counts</Typography>
                    <div>{this.getSkuTable()}</div>
                    <Link to="/scan" style={{ textDecoration: 'none' }}>
                        <Button style={{ width: '100%' }} fullWidth={true} variant="contained" color="secondary" >
                            Back
                    </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

const SummaryPage = connect(mapStateToProps)(ConnectedSummaryPage);
export default SummaryPage;