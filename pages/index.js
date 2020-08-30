import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import {Grid, Paper , Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Card from '../components/Card';
import Column from '../components/Column';
import ColumnTest from '../components/ColumnTest';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: 'gray',
		height: '100vh',
	},
	title: {
		height: '10%'
	},
    column: {
        // height: '100%',
    }
}));

export default function Index() {
	const classes = useStyles();
	return (
	<Grid container spacing={3} className={classes.root}>
		<Grid item xs={1}></Grid>
		<Grid item container xs={10}>
			<Grid item container justify="center" alignItems="center" xs={12}>
				<h1>KanBan Board</h1>
			</Grid>
			<ColumnTest></ColumnTest>
			<ColumnTest></ColumnTest>
			<ColumnTest></ColumnTest>
		</Grid>
		<Grid item xs={1}></Grid>
	</Grid>
	);
}
