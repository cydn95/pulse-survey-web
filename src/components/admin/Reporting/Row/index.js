import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Select from 'Components/Select'
import {
  adminSetCurrentProject,
} from 'Redux/admin/actions'
import AddButton from 'Components/AddButton'
import styles from './styles.scss'

const Row = ({ 
  title, 
  avatar, 
  project, 
  type, 
  shgroupList, 
  teamList,
  currentProject,
  setCurrentProject
}) => {
  useEffect(() => {
    if (type === 0) {
      setFilter('shgroup')
      setList(shgroupList.map(d => d.SHGroupName))
    } else if (type === 1) {
      setFilter('team')
      setList(teamList.map(d => d.name))
    } else {
      setFilter('organization')
    }
    console.log('currentProject', currentProject)
    setSegments((currentProject.segments || {})[filter] || [])
  }, [type, currentProject, setCurrentProject])

  const [filter, setFilter] = useState('shgroup')
  const [segments, setSegments] = useState([])
  const [list, setList] = useState([])
  const setOpen = () => {
    let temp = [...segments]
    temp.push({})
    setSegments(temp)
    setCurrentProject({
      ...currentProject,
      segments: {
        ...currentProject.segments,
        [filter] : temp
      }
    })
  }

  const setSelected = (items, setItems, idx = 0) => (d) => {
    let temp = [...items];
    temp[idx] = d
    setItems(temp);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span><img src={avatar} alt={title} /></span>
        <h2>{title}</h2>
      </div>
      {segments.map((segment, idx) => (
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label>Segment name</label>
            <Select
              selected={segment.segmentName}
              setSelected={(value) => {
                let temp = {...segment}
                temp.segmentName = value
                segments[idx] = temp
                setSegments(segments)
              }}
              items={list}
              className={styles.select}
            />
          </div>
          <div className={styles.input}>
            <label>Permission Type</label>
            <Select
              selected={segment.permissionType}
              className={styles.select}
              items={['All Exception', 'Only']}
            />
          </div>
          <div className={styles.input}>
            <label>Dashbaords</label>
            {(segment.dashboards || []).map((dashboard, idx) =>
              <Select
                key={`${idx}-${dashboard}`}
                className={styles.select}
                selected={dashboard}
                onClose={() => console.log('close')}
                items={['Summary', 'Driver Analysis', 'Matrix', 'Key Themes', 'Advisor Insights']}
              />
            )}
            <AddButton />
          </div>
          <div className={styles.input}>
            <label>SH Group</label>
            {(segment.shGroups || []).map((shGroup, idx) =>
                <Select
                  key={`${idx}-${shGroup}`}
                  selected={shGroup}
                  className={styles.select}
                  onClose={() => console.log('close')}
                  items={list}
                />
            )}
            <AddButton />
          </div>
          <div className={styles.input}>
            <label>Teams</label>
            {(segment.teams || []).map((team, idx) =>
                <Select
                  className={styles.select}
                  key={`${idx}-${team}`}
                  onClose={() => console.log('close')}
                  selected={team}
                  items={list}
                />
              )
            }
            <AddButton />
          </div>
          <div className={styles.input}>
            <label>Organizations</label>
            {(segment.organizations || []).map((organization, idx) =>
                <Select
                  className={styles.select}
                  key={`${idx}-${organization}`}
                  onClose={() => console.log('close')}
                  selected={organization}
                />
              )
            }
            <AddButton />
          </div>
        </div>
      ))}
      <AddButton 
        setOpen={setOpen}
        className={styles.add}
      />
    </div>
  )
}

const mapStateToProps = ({ admin, common }) => {
  const { currentProject } = admin
  const { teamList, shgroupList } = common;
  return {
    currentProject,
    shgroupList,
    teamList
  }
}

export default connect(mapStateToProps, {
  setCurrentProject: adminSetCurrentProject,
})(Row);