import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	OutlinedInput,
	Button,
	styled,
	SxProps,
	Theme,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { IAssembleData, IData, ITwinRegister } from '~/interfaces/data'
import { toast } from 'react-toastify'
import { createRangeDmemData } from '~/helpers/rangeDmemData'

const styles: { [key: string]: SxProps<Theme> } = {
	table: {
		minWidth: 650,
		maxWidth: 1000,
		'& .MuiTableCell-root': {
			// height: '2.5rem',
			padding: '0.15rem',
			border: '1px solid black',
			width: 'min-content',
		},
	},
}

const InputAddress = styled(OutlinedInput)`
	.MuiOutlinedInput-input {
		padding: 0.5rem 1rem;
	}
`

interface DisplayDataTableProps {
	data?: IData[]
	sx?: SxProps<Theme>
}

interface DisplayRegistersTableProps {
	data?: ITwinRegister[]
	sx?: SxProps<Theme>
}

export function DisplayDMemTable({ data, sx }: DisplayDataTableProps) {
	const [input, setInput] = useState('0x00000000')
	const [displayedData, setDisplayedData] = useState(
		createRangeDmemData(data || [], '0x00000000')
	)
	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const handleButtonClick = () => {
		// calculate start address
		const dec = parseInt(input, 16)
		const startDec = Math.floor(dec / 40) * 40
		const startHex = startDec.toString(16)

		const dMemData = createRangeDmemData(data || [], startHex)

		setDisplayedData(dMemData)
	}

	return (
		<>
			<div className='flex flex-row justify-center gap-2 mt-1 mb-3'>
				<p className='flex items-center font-bold'>Memory Address</p>
				<InputAddress
					placeholder='0x00000000'
					value={input}
					onChange={handleChangeInput}
				/>
				<Button
					sx={{ gap: '0.25rem' }}
					variant='contained'
					onClick={handleButtonClick}>
					{/* <SearchIcon /> */}
					Go
				</Button>
			</div>
			<TableContainer component={Paper} sx={sx}>
				<Table sx={styles.table} stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Memory Address</TableCell>
							<TableCell align='center'>Dec</TableCell>
							<TableCell align='center'>Hex</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{displayedData &&
							displayedData.length > 0 &&
							displayedData.map((value) => (
								<TableRow
									key={value.name}
									sx={
										value.value !== '0x00000000'
											? { backgroundColor: 'FFEED9' }
											: {}
									}>
									<TableCell>{value.name}</TableCell>
									<TableCell>
										{parseInt(value.value, 16)}
									</TableCell>
									<TableCell>{value.value}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export function DisplayRegisterTable({ data, sx }: DisplayRegistersTableProps) {
	return (
		<TableContainer component={Paper} sx={sx}>
			<Table sx={styles.table} stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Register</TableCell>
						{/* <TableCell align='center'>Dec</TableCell> */}
						<TableCell align='center'>Hex</TableCell>
						<TableCell align='center'>Register</TableCell>
						<TableCell align='center'>Hex</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.length > 0 &&
						data.map((value) => (
							<TableRow
								key={value.register1.name + value.register2.name}>
								<TableCell>{value.register1.name}</TableCell>
								{/* <TableCell>{parseInt(value.value, 16)}</TableCell> */}
								<TableCell>{value.register1.value}</TableCell>
								<TableCell>{value.register2.name}</TableCell>
								<TableCell>{value.register2.value}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export function DisplayInstructionTable({ data, sx }: DisplayDataTableProps) {
	return (
		<TableContainer component={Paper} sx={sx}>
			<Table sx={styles.table} stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Instruction Address</TableCell>
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
