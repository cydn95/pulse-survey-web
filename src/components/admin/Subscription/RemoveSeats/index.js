import React, {useState} from 'react'
import {connect} from 'react-redux'
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './index.scss'

const RemoveSeats = ({setRemoveSeats, seats, setSeats, usedSeats, totalSeats}) => {
    const [remove, setRemove] = useState(1)
    const onAdd = () => {
        if(totalSeats - usedSeats - remove <= 0)
            return;
        setRemove(remove + 1)
    }
    const onMinus = () => {
        if(remove <= 1)
            return;
        setRemove(remove - 1)
    }
    return (
        <div className={styles.wrapper} onClick={() => setRemoveSeats(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.header} ${styles.primary}`}>
                    <h2>Remove unused seats</h2>
                    <FontAwesomeIcon icon={faTimes} size="lg" color="#838E94" onClick={() => setRemoveSeats(false)} />
                </div>
                <div className={styles.content}>
                    <div className={styles.userActions}>
                        <div className={styles.btnGroups}>
                            <span className={styles.smBtn} onClick={onMinus}>
                                <FontAwesomeIcon icon={faMinus} size="sm" color={remove > 1 ? '#18AAF3': '#838E94'} />
                            </span>
                            <span className={`${styles.smBtn} ${styles.primary}`}>{remove}</span>
                            <span className={styles.smBtn} onClick={onAdd}>
                                <FontAwesomeIcon icon={faPlus} size="sm" color={ (totalSeats - usedSeats - remove > 0) ? "#18AAF3": '#838E94'} />
                            </span>
                        </div>
                        <span className={`${styles.secondary} ${styles.smDescription}`}>of {seats}</span>
                    </div>
                    <span className={styles.info}>There are no refunds for removed seats</span>
                </div>
                <div className={styles.actions}>
                    <span onClick={() => setRemoveSeats(false)} className={styles.cancelBtn}>Cancel</span>
                    <span className={styles.okBtn}>Save</span>
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

export default connect(mapStateToProps, null)(RemoveSeats)