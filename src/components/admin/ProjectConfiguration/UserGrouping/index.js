import React, { useState } from 'react'
import { connect } from 'react-redux'
import { adminSetProjectField, setTeamList } from 'Redux/actions';
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
  setTeamList,
  styles
}) => {
  const [newShGroup, setNewShGroup] = useState({})
  const [openShGroup, setOpenShGroup] = useState(false)
  const [newTeam, setNewTeam] = useState({})
  const [openTeam, setOpenTeam] = useState(false)
  const [newCG, setNewCG] = useState('')
  const [openCG, setOpenCG] = useState(false)
  const [dashboardThreshold, setDashboardThreshold] = useState(3)
  React.useEffect(() => {
    console.log(currentProject)
  })
  const addNewShGroup = () => {
    if (newShGroup.SHGroupName && newShGroup.responsePercent) {
      setProjectField('shGroup', [...(currentProject.shGroup || []), newShGroup])
      setNewShGroup({})
      setOpenShGroup(false)
    }
  }
  const newShGroupContent = () =>
    <div className={styles.column}>
      <Input
        className={styles.customGroup}
        value={newShGroup.SHGroupName}
        onChange={(value, e) => setNewShGroup({ ...newShGroup, SHGroupName: value })}
      />
      <div className={styles.completion}>
        <span className={styles.text}>Completion Threshold(%)</span>
        <Input
          className={styles.completion_input}
          value={newShGroup.responsePercent}
          onChange={(value, e) => setNewShGroup({ ...newShGroup, responsePercent: value })}
        />
      </div>
    </div>
  const addNewTeam = () => {
    if (newTeam.name) {
      setProjectField('projectTeam', [...(currentProject.projectTeam || []), newTeam])
      setNewTeam({})
      setOpenTeam(false)
    }
  }
  const newTeamContent = () =>
    <div className={styles.column}>
      <Input
        className={styles.customGroup}
        value={newTeam.name}
        onChange={(value, e) => setNewTeam({ ...newTeam, name: value })}
      />
    </div>
  const addNewCG = () => {
    if (newCG) {
      let keys = Object.keys(currentProject).filter((key, idx) => key.includes('customGroup') && currentProject[key] === '')
      let field = 'customGroup1'
      if (keys.length > 0) {
        field = keys[0]
      } else {
        setProjectField('customGroup2', '')
        setProjectField('customGroup3', '')
      }
      setProjectField(field, newCG)
      setNewCG('')
      setOpenCG(false)
    }
  }
  const newCGContent = () =>
    <div className={styles.column}>
      <Input
        className={styles.customGroup}
        value={newCG}
        onChange={(value, e) => setNewCG(value)}
      />
    </div>

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
        <div className={styles.anonymity}>
          <span>Dashboard Threshold&nbsp;</span>
          <Input type="number" className={styles.threshold} value={parseInt(dashboardThreshold)} onChange={(value, e) => setDashboardThreshold(value)} />
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
              type="number"
              className={styles.completion_input}
              value={((currentProject.shGroup || []).filter(sh => sh.SHGroupName === shgroup)[0] || {}).responsePercent || 0}
              onChange={(value, e) => {
                let temp = [...(currentProject.shGroup || [])]
                temp.filter(sh => sh.SHGroupName === shgroup)[0].responsePercent = value
                setProjectField('shGroup', temp)
              }}
            />
          </div>}
          <AddButton content={newShGroupContent} handleAdd={addNewShGroup} open={openShGroup} setOpen={() => setOpenShGroup(true)} setClose={() => setOpenShGroup(false)} />
        </div>
        <div className={styles.column}>
          <span className={styles.header}>Project Teams</span>
          <span className={styles.description}>Define the teams that will be used to
            categorise user responses. Users in different
            organisations can be in the same team.</span>
          {(currentProject.projectTeam || []).map((pt, idx) =>
            <Input
              key={`${idx}-select`}
              keyValue={`${idx}-select`}
              value={pt.name}
              onChange={(value) => {
                let temp = [...(currentProject.projectTeam || [])]
                temp[idx].name = value
                setProjectField('projectTeam', temp)
              }}
              className={styles.customGroup}
              onClickClose={() => {
                let temp = (currentProject.projectTeam || []).filter(p => p !== pt)
                setProjectField('projectTeam', temp)
              }}
            />
          )}
          <AddButton content={newTeamContent} handleAdd={addNewTeam} open={openTeam} setOpen={() => setOpenTeam(true)} setClose={() => setOpenTeam(false)} />
        </div>
        <div className={styles.column}>
          <span className={styles.header}>Custom Groups</span>
          <span className={styles.description}>Create up to three custom groups</span>
          {Object.keys(currentProject).length > 0 &&
            Object.keys(currentProject).filter(key => key.includes('customGroup')).map((key, idx) =>
              currentProject[key] !== '' && <Input
                type="text"
                key={`shGroup-${idx}`}
                className={styles.customGroup}
                value={currentProject[key]}
                onChange={(value, e) => {
                  setProjectField(`customGroup${idx + 1}`, value)
                }}
                onClickClose={() => {
                  setProjectField(`customGroup${idx + 1}`, '')
                }} />
            )}
          {Object.keys(currentProject || {}).filter(key => key.includes('customGroup') && currentProject[key] !== '').length < 3 &&
            <AddButton content={newCGContent} handleAdd={addNewCG} open={openCG} setOpen={() => setOpenCG(true)} setClose={() => setOpenCG(false)} />
          }
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
  setTeamList,
})(UserGrouping)