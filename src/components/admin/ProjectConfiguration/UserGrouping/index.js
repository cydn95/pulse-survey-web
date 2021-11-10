import React from 'react'
import { connect } from 'react-redux'
import { adminSetProjectField } from 'Redux/actions';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Help from 'Assets/img/admin/help.svg'
import Input from 'Components/Input'
import Select from 'Components/Select'
import AddButton from 'Components/AddButton'

const UserGrouping = ({
  shgroup,
  setSHGroup,
  currentProject,
  setProjectField,
  teamList,
  styles
}) => {
  return (
    <div className={styles.row}>
      <h2>User Grouping</h2>
      <div className={styles.threshold_wrapper}>
        <div className={styles.anonymity}>
          <div className={styles.left_part}>
            <span>Anonymity Threshold&nbsp;</span>
            <TooltipComponent
              content="To ensure all responses remain safe and anonymous the minimum threshold is 3">
              <img src={Help} alt="help" />
            </TooltipComponent>
          </div>
          <Input type="number" className={styles.threshold} value={currentProject.anonymityThreshold} onChange={(value, e) => setProjectField('anonymityThreshold', value)} />
        </div>
      </div>
      <div className={styles.detailed}>
        <div className={styles.column}>
          <span className={styles.header}>Stakeholder Groups / Segments</span>
          <span className={styles.description}>Create meaningful groupings to specify which
            questions the users are asked.</span>
          <Select
            selected={shgroup}
            noSelected="Choose Group"
            setSelected={setSHGroup}
            items={(() => (currentProject.shGroup || []).map(sh => sh.SHGroupName))()}
            className={styles.withOutline}
          />
          {(currentProject.shGroup || []).filter(sh => sh.SHGroupName === shgroup).length > 0 && <div className={styles.completion}>
            <span className={styles.text}>Completion Threshold(%)</span>
            <Input
              className={styles.completion_input}
              value={((currentProject.shGroup || []).filter(sh => sh.SHGroupName === shgroup)[0] || {}).responsePercent || 0}
              onChange={(value, e) => {
                let temp = [...(currentProject.shGroup || [])]
                temp.filter(sh => sh.SHGroupName === shgroup)[0].responsePercent = value
                setProjectField('shGroup', temp)
              }}
            />
          </div>}
          <AddButton />
        </div>
        <div className={styles.column}>
          <span className={styles.header}>Project Teams</span>
          <span className={styles.description}>Define the teams that will be used to
            categorise user responses. Users in different
            organisations can be in the same team.</span>
          {(currentProject.projectTeam || []).map((pt, idx) =>
            <Select
              key={`${idx}-select`}
              keyValue={`${idx}-select`}
              selected={pt.name}
              noSelected="Choose Group"
              setSelected={(value) => {
                let temp = [...(currentProject.projectTeam || [])]
                temp[idx] = teamList.filter(team => team.name === value)[0] || {}
                setProjectField('projectTeam', temp)
              }}
              items={(teamList || []).filter(team => !(currentProject.projectTeam || []).map(pt => pt.name).includes(team.name)).map(team => team.name)}
              className={styles.withOutline}
              onClose={() => {
                let temp = (currentProject.projectTeam || []).filter(p => p !== pt)
                setProjectField('projectTeam', temp)
              }}
            />
          )}
          <AddButton />
        </div>
        <div className={styles.column}>
          <span className={styles.header}>Custom Groups</span>
          <span className={styles.description}>Create up to three custom groups</span>
          {Object.keys(currentProject) > 0 && Object.keys(currentProject).filter(key => key.includes('customGroup')).map((key, idx) =>
            currentProject[key] && <Input
              type="text"
              className={styles.customGroup}
              value={currentProject[key]}
              onChange={(value, e) => {
                setProjectField(`customGroup${idx + 1}`, value)
              }}
              onClickClose={() => {
                setProjectField(`customGroup${idx + 1}`, '')
              }} />
          )}
          {Object.keys(currentProject || {}).filter(key => key.includes('customGroup')).length > 2 && <AddButton />}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = ({ admin, settings, common }) => {
  const { currentProject } = admin
  const { teamList } = common
  return {
    currentProject,
    teamList,
  }
}

export default connect(mapStateToProps, {
  setProjectField: adminSetProjectField,
})(UserGrouping)