import React from 'react';
import { connect } from "react-redux";

import styles from './styles.scss';

import classnames from "classnames";

import { ResponsiveDonut as Donut} from 'Components/Donut';
import SurveyLineGraph from 'Components/SurveyLineGraph';

import TopNav from 'Containers/TopNav';

const donutData = [
	{ name: "Pie1", count: 15 },
	{ name: "Pie2", count: 20 },
	{ name: "Pie3", count: 80 }
];

const surveyData = [
	{ name: "Question 1", yourAnswer: 15, teamAnswer: 20 },
	{ name: "Question 2", yourAnswer: 20, teamAnswer: 80 },
	{ name: "A very long Question, must break at 200px ", yourAnswer: 80, teamAnswer: 45 },
	{ name: "Question 3", yourAnswer: 15, teamAnswer: 20 },
	{ name: "Question 4", yourAnswer: 20, teamAnswer: 80 },
	{ name: "A very long Question, must break at 200px ", yourAnswer: 80, teamAnswer: 45 }
]

class UserProfile extends React.Component {

	render() {

		const { history, projectTitle } = this.props;

		return (
			<div className={ styles.root }>
				<div className={styles.topbar }>
          <TopNav history={ history } menuTitle="Dashboard" >
						<div className={ styles.section }>
							<h2 className={ styles['page-title'] }>My Profile</h2>
							<h2 className={ styles['project-name'] }>{projectTitle}</h2>
						</div>
					</TopNav>
        </div>
				<div className={ styles['main-content'] }>
					<div className={ styles.left }>
						<div className="row">
							<div className={ styles.notice }>
								<div className={ classnames("panel", styles.info, styles.positive) }>
									<h2>Top Positive</h2>
									<div className={ styles.content }>
										<a href="#maria" className={ styles['content-item'] }>1. <span className={styles.green}>SMP Team Culture</span></a>
										<a href="#maria" className={ styles['content-item'] }>2. <span className={styles.green}>Schedule Performance</span></a>
										<a href="#maria" className={ styles['content-item'] }>3. <span className={styles.green}>Safety Record</span></a>
									</div>
								</div>
								<div className={ classnames("panel", styles.info, styles.negative) }>
									<h2>Top Negative</h2>
									<div className={ styles.content }>
										<a href="#maria" className={ styles['content-item'] }>1. <span className={styles.orange}>Subcontractor performance</span></a>
										<a href="#maria" className={ styles['content-item'] }>2. <span className={styles.orange}>Coronavirus spread</span></a>
										<a href="#maria" className={ styles['content-item'] }>3. <span className={styles.orange}>Supply chain interruptions with China</span></a>
									</div>
								</div>
							</div>
							</div>
						<div className="row">
							<div className="panel">
								<div className={ styles.linegraph }>
									<SurveyLineGraph 
										keySelector={d => d.name}
										questionNameSelector={d => d.name}
										yourAnswerSelector={d => d.yourAnswer}
										teamsAnswerSelector={d => d.teamAnswer}
										data={ surveyData }
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={ classnames(styles.right) }>
						<div className={ classnames("row", styles['donut-container']) }>
							
							<h2 className={ styles.title }>My Profile</h2>

							<Donut 
								className={ styles.donut }
								keySelector={d => d.name}
								valueSelector={d => d.count}
								sentiment={'happy'}
								data={ donutData }
							/>
							<div className={styles.info}>
								<h3>Total Questions Answered</h3>
								<h2>80%</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}

const mapStateToProps = ({ authUser }) => {
  const { projectTitle } = authUser;

  return {
    projectTitle
  };
};

export default connect(mapStateToProps, {})(UserProfile);
