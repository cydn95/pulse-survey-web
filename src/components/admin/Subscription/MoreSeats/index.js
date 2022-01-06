import React, {useState} from 'react'
import {connect} from 'react-redux'
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './index.scss'

const MoreSeats = ({setMoreSeats, usedSeats, totalSeats}) => {
    const [add, setAdd] = useState(1)
    const onAdd = () => {
        setAdd(add + 1)
    }
    const onMinus = () => {
        if(add <= 1)
            return;
        setAdd(add - 1)
    }
    return (
        <div className={styles.wrapper} onClick={() => setMoreSeats(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.header} ${styles.primary}`}>
                    <h2>Buy more seats</h2>
                    <FontAwesomeIcon icon={faTimes} size="lg" color="#838E94" onClick={() => setMoreSeats(false)} />
                </div>
                <div className={styles.content}>
                    <span className={`${styles.primary} ${styles.description}`}>Add more seats</span>
                    <div className={styles.btnGroups}>
                        <span className={styles.smBtn} onClick={onMinus}>
                            <FontAwesomeIcon icon={faMinus} size="sm" color={add > 1 ? '#18AAF3': '#838E94'} />
                        </span>
                        <span className={`${styles.smBtn} ${styles.primary}`}>{add}</span>
                        <span className={styles.smBtn} onClick={onAdd}>
                            <FontAwesomeIcon icon={faPlus} size="sm" color="#18AAF3" />
                        </span>
                    </div>
                    <span className={`${styles.secondary} ${styles.smDescription}`}>x $14.99 per seat/month</span>
                </div>
                <div className={styles.actions}>
                    <span onClick={() => setMoreSeats(false)} className={styles.cancelBtn}>Cancel</span>
                    <span className={styles.okBtn}>Next</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({admin}) => {
    return {
      totalSeats: (admin.currentProject || {}).seatsPurchased,
      usedSeats: (admin.currentProject || {}).totalInvited
    }
}

export default connect(mapStateToProps, null)(MoreSeats)