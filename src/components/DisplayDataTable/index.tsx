import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	SxProps,
	Theme,
} from '@mui/material'
import {IAssembleData, IData} from '~/interfaces/data'

const styles: {[key: string]: SxProps<Theme>} = {
	table: {
		minWidth: 650,
		'& .MuiTableCell-root': {
			border: '1px solid black',
		},
	},
}

interface DisplayDataTableProps {
	data?: IData[]
	sx?: SxProps<Theme>
}

export function DisplayDMemTable({data, sx}: DisplayDataTableProps) {
	return (
		<TableContainer component={Paper} sx={sx}>
			<Table sx={styles.table} stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Address</TableCell>
						<TableCell align='center'>Dec</TableCell>
						<TableCell align='center'>Hex</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.length > 0 &&
						data.map((value) => (
							<TableRow key={value.name}>
								<TableCell>{value.name}</TableCell>
								<TableCell>{parseInt(value.value, 16)}</TableCell>
								<TableCell>{value.value}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export function DisplayRegisterTable({data, sx}: DisplayDataTableProps) {
	return (
		<TableContainer component={Paper} sx={sx}>
			<Table sx={styles.table} stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Register</TableCell>
						<TableCell align='center'>Dec</TableCell>
						<TableCell align='center'>Hex</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.length > 0 &&
						data.map((value) => (
							<TableRow key={value.name}>
								<TableCell>{value.name}</TableCell>
								<TableCell>{parseInt(value.value, 16)}</TableCell>
								<TableCell>{value.value}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export function DisplayInstructionTable({data, sx}: DisplayDataTableProps) {
	return (
		<TableContainer component={Paper} sx={sx}>
			<Table sx={styles.table} stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell align='center'>PC</TableCell>
						<TableCell align='center'>Instruction</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.length > 0 &&
						data.map((value) => (
							<TableRow key={value.name}>
								<TableCell>{value.name}</TableCell>
								<TableCell>{value.value}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
