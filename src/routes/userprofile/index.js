import React from 'react';

import styles from './styles.scss';

import classnames from "classnames";

import { ResponsiveDonut as Donut} from 'Components/Donut';
import SurveyLineGraph from 'Components/SurveyLineGraph';

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
		return (
			<div className={ styles.root }>
				<div className={ styles.left }>
					<div className="row">
						<div className={ styles.notice }>
							<div className={ classnames("panel", styles.info, styles.positive) }>
								<h2>Top Positive</h2>
								<div className={ styles.content }>
									<a href="#maria" className={ styles['content-item'] }>1. Maria Robinson</a>
									<a href="#maria" className={ styles['content-item'] }>2. James Williams</a>
									<a href="#maria" className={ styles['content-item'] }>3. Elena Hauf</a>
								</div>
							</div>
							<div className={ classnames("panel", styles.info, styles.negative) }>
								<h2>Top Negative</h2>
								<div className={ styles.content }>
									<a href="#maria" className={ styles['content-item'] }>1. Maria Robinson</a>
									<a href="#maria" className={ styles['content-item'] }>2. James Williams</a>
									<a href="#maria" className={ styles['content-item'] }>3. Elena Hauf</a>
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
		);
	}
}

export default UserProfile;