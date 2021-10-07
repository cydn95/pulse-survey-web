import React, { useState, useEffect } from 'react'
import styles from './styles.scss'

const Select = ({ selected, setSelected, items }) => {
	const [open, setOpen] = useState(false)
	useEffect(() => {
		setOpen(false);
	}, [selected])
	return (
		<div className={styles.wrapper} onClick={() => setOpen(!open)}>
			<div className={styles.select}>
				<span>{selected}</span><span className={open ? styles.open : styles.close}>{`>`}</span>
			</div>
			{open && <div className={styles.dropdown}>
				{items.map((item, index) => <div onClick={() => setSelected(item)} className={styles.item}>{item}</div>)}
			</div>}
		</div>
	)
}

export default Select