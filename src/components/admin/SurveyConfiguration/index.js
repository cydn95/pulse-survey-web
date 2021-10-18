import React, { useState, Fragment } from 'react'
import classnames from 'classnames'
import Question from './Question'
import styles from './styles.scss'
import Reorder from '../../../assets/img/admin/reorder.png'

const questions = [
  {
    text: "Does the team have enough experience to succeed?",
    controlType: 'Slider',
    driver: 'Sentiment',
    subDriver: 'Experience',
    SHGroup: ['Internal', 'Other']
  },
  {
    text: "Do you feel like management is supporting the project team?",
    controlType: 'Multi Options',
    driver: 'Support',
    subDriver: 'Experience',
    SHGroup: ['Other']
  },
  {
    text: "Do you feel like orgaisational politics is getting the way?",
    controlType: 'Two Options',
    driver: 'Politics',
    subDriver: 'Experience',
    SHGroup: ['External', 'Other']
  },
  {
    text: "What do you see as the main risks to the project?",
    controlType: 'Multi-Topic',
    driver: 'Politics',
    subDriver: 'Experience',
    SHGroup: ['Internal', 'External', 'Other']
  }
]

const SurveyConfiguration = () => {
  const temp = [];
  questions.map(question => {
    if (!temp.includes(question.driver)) {
      temp.push(question.driver)
    }
  })
  const [filter, setFilter] = useState(0)
  const [drivers, setDrivers] = useState(temp)
  const [currentDriver, setCurrentDriver] = useState(temp[0])
  return (
    <Fragment>
      <div className={styles.header}>
        <h2>Questions</h2>
        <div className={styles.rightPart}>
          <div>
            <span className={styles.image}>+</span>
            <span className={styles.text}>Add question</span>
          </div>
          <div>
            <span className={styles.image}><img src={Reorder} alt="reorder" /></span>
            <span className={styles.text}>Reorder</span>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.filters}>
          <div className={classnames(styles.filter, filter === 0 && styles.active)} onClick={() => setFilter(0)}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <rect x="-1" y="-1" width="22" height="22" fill="none" />
              </g>
              <g>
                <path d="m10.54 10.443c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                <path d="m16.69 18.803c-0.19-3.62-3.17-6.45-6.79-6.45s-6.6 2.83-6.79 6.45l-2-0.1c0.24-4.68 4.1-8.34 8.79-8.34 4.68 0 8.54 3.67 8.79 8.34l-2 0.1z" />
              </g>
            </svg>
            <span>About Me</span>
          </div>
          <div className={classnames(styles.filter, filter === 1 && styles.active)} onClick={() => setFilter(1)}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <rect x="-1" y="-1" width="22" height="22" fill="none" />
              </g>
              <g stroke="null">
                <path
                  d="m2.642 9.5924c0.50308 0 0.94019 0.18144 1.3031 0.55257s0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257-0.94019-0.18144-1.3031-0.55257-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257zm2.5484 2.3257v-0.93194h1.3938v0.93194h-1.3938zm12.066 1.3855c0.57731 0 1.0721 0.20618 1.4763 0.6103s0.6103 0.89895 0.6103 1.4763-0.20618 1.0721-0.6103 1.4763-0.89895 0.6103-1.4763 0.6103-1.0721-0.20618-1.4763-0.6103-0.6103-0.89895-0.6103-1.4763l0.032989-0.28865-2.3752-1.3608c-0.3134 0.3134-0.65978 0.54432-1.0474 0.70926s-0.79998 0.24742-1.2453 0.24742c-0.57731 0-1.1216-0.14845-1.6247-0.4371s-0.89895-0.68452-1.1876-1.1876-0.4371-1.0474-0.4371-1.6247c0-0.51958 0.11546-1.0062 0.34638-1.4515s0.54432-0.82473 0.93194-1.1299l-0.95668-2.0618h-0.09072c-0.57731 0-1.0721-0.20618-1.4763-0.6103s-0.6103-0.89895-0.6103-1.4763 0.20618-1.0721 0.6103-1.4763 0.89895-0.6103 1.4763-0.6103 1.0721 0.20618 1.4763 0.6103 0.6103 0.89895 0.6103 1.4763c0 0.61854-0.23917 1.1381-0.72576 1.567l0.95668 2.0041c0.23092-0.057731 0.46185-0.09072 0.69277-0.09072 0.57731 0 1.1216 0.14845 1.6247 0.4371s0.89895 0.68452 1.1876 1.1876 0.4371 1.0474 0.4371 1.6247c0 0.37113-0.065978 0.74225-0.20618 1.1299l2.2598 1.3113c0.40412-0.38762 0.88246-0.58556 1.4268-0.58556zm-9.7483-7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.30515 0.20618 0.49484 0.20618zm3.0185 7.8844c0.50308 0 0.94019-0.18144 1.3031-0.55257s0.55257-0.79998 0.55257-1.3031-0.18144-0.94019-0.55257-1.3031-0.79998-0.55257-1.3031-0.55257-0.94019 0.18144-1.3031 0.55257-0.55257 0.79998-0.55257 1.3031 0.18144 0.94019 0.55257 1.3031 0.79998 0.55257 1.3031 0.55257zm5.1628-4.7834-1.3938 1.0474-0.57731-0.7505 1.3938-1.0474 0.57731 0.7505zm1.7979-0.3134c-0.50308 0-0.94019-0.18144-1.3031-0.55257s-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257 0.94019 0.18144 1.3031 0.55257 0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257zm-0.23092 7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.2969 0.20618 0.49484 0.20618z"
                  stroke="null"
                />
              </g>
            </svg>
            <span>About Others</span>
          </div>
        </div>
      </div>
      <div className={styles.drivers}>
        {drivers.map((driver, idx) =>
          <span key={`${idx}-${driver}`} className={driver === currentDriver ? styles.active : ''} onClick={() => setCurrentDriver(driver)}>{driver}</span>
        )}
      </div>
      {questions.map((question, idx) => {
        if (question.driver !== currentDriver)
          return null;
        return (
          <Question question={question} key={`${idx}-${question.controlType}`} />
        )
      })}
    </Fragment>
  )
}

export default SurveyConfiguration