import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import {Grid, Paper , Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Card from '../components/Card';
import Column from '../components/Column';
import ColumnTest from '../components/ColumnTest';

const useStyles = makeStyles((theme) => {
	root: {

	}
});

export default function Index() {
	const classes = useStyles();
	return (
	<Grid container spacing={3}>
		<Grid item container xs={12} justify='center' alignItems="center">
			<h1>Title</h1>
		</Grid>
		<Grid item container xs={12}>
			<ColumnTest></ColumnTest>
			<ColumnTest></ColumnTest>
			<ColumnTest></ColumnTest>
			{/* <Grid item xs={4}>
				<Paper>section title</Paper>
				<Column>
					<Card></Card>
				</Column>
			</Grid>
			<Grid item xs={4}>
				<Paper>section title</Paper>
				<Column></Column>
			</Grid>
			<Grid item xs={4}>
				<Paper>section title</Paper>
				<Column></Column>
			</Grid> */}
		</Grid>
	</Grid>
	);
}
