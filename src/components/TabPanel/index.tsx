export function createProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
	className?: string
}

function TabPanel({children, value, index, className}: TabPanelProps) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			className={className}>
			{value === index && children}
		</div>
	)
}

export default TabPanel