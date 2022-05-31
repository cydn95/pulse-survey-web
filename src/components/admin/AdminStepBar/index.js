import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import styles from './styles.scss'

import Edit from 'Assets/img/admin/Edit.svg'
import EditActive from 'Assets/img/admin/Edit_active.svg'
import Setting from 'Assets/img/admin/Setting.svg'
import SettingActive from 'Assets/img/admin/Setting_active.svg'
import User from 'Assets/img/admin/User.svg'
import UserActive from 'Assets/img/admin/User_active.svg'
import Configuration from 'Assets/img/admin/Configuration.svg'
import ConfigurationActive from 'Assets/img/admin/Configuration_active.svg'
import Reporting from 'Assets/img/admin/Reporting.svg'
import ReportingActive from 'Assets/img/admin/Reporting_active.svg'
import Flag from 'Assets/img/admin/Flag.svg'
import FlagActive from 'Assets/img/admin/Flag_active.svg'
import Payment from 'Assets/img/admin/Payment.svg'
import PaymentActive from 'Assets/img/admin/Payment_active.svg'

const steps = [
  {
    icon: Edit,
    active: EditActive,
    text: 'Project Setup',
  },
  {
    icon: Setting,
    active: SettingActive,
    text: 'Project Configuration',
  },
  {
    icon: User,
    active: UserActive,
    text: 'User Administration',
  },
  {
    icon: Configuration,
    active: ConfigurationActive,
    text: 'Survey Configuration',
  },
  {
    icon: Reporting,
    active: ReportingActive,
    text: 'Reporting',
  },
  {
    icon: Flag,
    active: FlagActive,
    text: 'Flagged Responses'
  },
  {
    icon: Payment,
    active: PaymentActive,
    text: 'Subscription'
  }
]

const useResize = () => {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.clientWidth,
        height: window.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return dimensions;
};

const AdminStepBar = ({ currentStep, setCurrentStep, currentProject }) => {
  // const dimensions = useResize();

  const root = useRef(null);
  const container = useRef(null);
  const dragRef = useRef(null);

  const [dragData] = useState({
    dragStart: null,
    dragEnd: null,
    oldScroll: null,
    dragStartTimestamp: null,
  });

  const [chevronScrollInfo] = useState({
    chevronScrollAction: null,
    scrollAmount: 0,
  });

  // debounced scroll
  // const scrollPanel = (direction) => {
  //   if (chevronScrollInfo.chevronScrollAction) {
  //     clearTimeout(chevronScrollInfo.chevronScrollAction);
  //   }
  //   const sgn = direction === "left" ? -1 : 1;
  //   chevronScrollInfo.scrollAmount =
  //     2 * chevronScrollInfo.scrollAmount + root.current.clientWidth * 0.3 * sgn;
  //   chevronScrollInfo.chevronScrollAction = setTimeout(() => {
  //     root.current.scrollBy({
  //       left: chevronScrollInfo.scrollAmount,
  //       behavior: "smooth",
  //     });
  //     Object.assign(chevronScrollInfo, {
  //       chevronScrollAction: null,
  //       scrollAmount: 0,
  //     });
  //   }, 200);
  // };

  return (
    <div
      className={styles.wrapper}
      ref={root}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setDragImage(dragRef.current, 0, 0);
        dragData.dragStart = e.pageX;
        dragData.dragStartTimestamp = Date.now();
        dragData.oldScroll = root.current.scrollLeft;
      }}
      onDragOver={(e) => {
        const dragEnd = e.pageX;
        const distance = dragEnd - dragData.dragStart;
        root.current.scrollLeft = dragData.oldScroll - distance;
      }}
      onDragEnd={(e) => {
        const dragEnd = e.pageX;
        const distance = dragEnd - dragData.dragStart;
        const dragEndTimestamp = Date.now();
        const timeDelta = dragEndTimestamp - dragData.dragStartTimestamp;
        const factor = timeDelta > 800 ? 1 : Math.min(2000 / timeDelta, 10);
        const finalScroll = dragData.oldScroll - distance * factor;
        root.current.scrollTo({
          left: finalScroll,
          behavior: "smooth",
        });
      }}
    >
      <div className={styles.stepBar} ref={dragRef}>
        <div className={styles.centerLine}></div>
        {
          steps.map((step, index) =>
            (index !== 5 || (index === 5 && Object.keys(currentProject).length > 0)) && <div key={index} className={styles.step}>
              <div className={classnames(styles.imageWrapper, index === currentStep && styles.active)} onClick={() => setCurrentStep(index)}>
                <img src={index === currentStep ? step.active : step.icon} alt="step" />
              </div>
              <span className={index === currentStep ? styles.active : ''}>{step.text}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject } = admin
  return {
    currentProject
  }
}

export default connect(mapStateToProps, null)(AdminStepBar)