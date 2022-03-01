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
  organizationList,
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
      setList(organizationList.map(d => d.name))
    }
    console.log('currentProject', currentProject)
    setSegments((currentProject.segments || {})[filter] || [])
  }, [type, currentProject, setCurrentProject])

  const [filter, setFilter] = useState('shgroup')
  const [segments, setSegments] = useState([])
  const [list, setList] = useState([])
  const setOpen = () => {
    let temp = [...segments]
    console.log(temp.length, list.length)
    console.log(temp, list)
    console.log(temp.length >= list.length)
    if (temp.length >= list.length || (temp.length !== 0 && (!temp[temp.length - 1].segmentName || temp[temp.length - 1].segmentName === ''))) {
      return;
    }
    temp.push({})
    setCurrentProject({
      ...currentProject,
      segments: {
        ...currentProject.segments,
        [filter] : temp
      }
    })
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
                let temp = [...segments]
                temp[idx].segmentName = value
                setCurrentProject({
                  ...currentProject,
                  segments: {
                    ...currentProject.segments,
                    [filter] : temp
                  }
                })
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
              setSelected={(value) => {
                let temp = [...segments]
                temp[idx].permissionType = value
                setCurrentProject({
                  ...currentProject,
                  segments: {
                    ...currentProject.segments,
                    [filter] : temp
                  }
                })
              }}
            />
          </div>
          <div className={styles.input}>
            <label>Dashbaords</label>
            {(segment.dashboards || []).map((dashboard, index) =>
              <Select
                key={`${idx}-${dashboard}`}
                className={styles.select}
                selected={dashboard}
                onClose={() => {
                  let temp = [...segments]
                  delete temp[idx].dashboards[index]
                  setCurrentProject({
                    ...currentProject,
                    segments: {
                      ...currentProject.segments,
                      [filter] : temp
                    }
                  })
                }}
                items={['Summary', 'Driver Analysis', 'Matrix', 'Key Themes', 'Advisor Insights']}
                setSelected={(value) => {
                  let temp = [...segments]
                  temp[idx].dashboards[index] = value
                  setCurrentProject({
                    ...currentProject,
                    segments: {
                      ...currentProject.segments,
                      [filter] : temp
                    }
                  })
                }}
              />
            )}
            <AddButton
             setOpen={() => {
                let temp = [...segments]
                if(temp[idx].dashboards) {
                  temp[idx].dashboards.push('')
                } else {
                  let temp2 = ['']
                  temp[idx].dashboards = temp2
                }
                setCurrentProject({
                  ...currentProject,
                  segments: {
                    ...currentProject.segments,
                    [filter] : temp
                  }
                })
              }} 
            />
          </div>
          <div className={styles.input}>
            <label>SH Group</label>
            {(segment.shGroups || []).map((shGroup, index) =>
                <Select
                  key={`${idx}-${shGroup}`}
                  selected={shGroup}
                  className={styles.select}
                  onClose={() => console.log('close')}
                  items={shgroupList.map(d => d.name)}
                  setSelected={(value) => {
                    let temp = [...segments]
                    temp[idx].shGroups[index] = value
                    setCurrentProject({
                      ...currentProject,
                      segments: {
                        ...currentProject.segments,
                        [filter] : temp
                      }
                    })
                  }}
                />
            )}
            <AddButton
              setOpen={() => {
                let temp = [...segments]
                if(temp[idx].shGroups) {
                  temp[idx].shGroups.push('')
                } else {
                  let temp2 = ['']
                  temp[idx].shGroups = temp2
                }
                setCurrentProject({
                  ...currentProject,
                  segments: {
                    ...currentProject.segments,
                    [filter] : temp
                  }
                })
              }} 
            />
          </div>
          <div className={styles.input}>
            <label>Teams</label>
            {(segment.teams || []).map((team, index) =>
                <Select
                  className={styles.select}
                  key={`${idx}-${team}`}
                  onClose={() => console.log('close')}
                  selected={team}
                  items={teamList.map(d => d.name)}
                  setSelected={(value) => {
                    let temp = [...segments]
                    temp[idx].teams[index] = value
                    setCurrentProject({
                      ...currentProject,
                      segments: {
                        ...currentProject.segments,
                        [filter] : temp
                      }
                    })
                  }}
                />
              )
            }
            <AddButton
              setOpen={() => {
                let temp = [...segments]
                if(temp[idx].teams) {
                  temp[idx].teams.push('')
                } else {
                  let temp2 = ['']
                  temp[idx].teams = temp2
                }
                setCurrentProject({
                  ...currentProject,
                  segments: {
                    ...currentProject.segments,
                    [filter] : temp
                  }
                })
              }}
            />
          </div>
          <div className={styles.input}>
            <label>Organizations</label>
            {(segment.organizations || []).map((organization, index) =>
                <Select
                  className={styles.select}
                  items={organizationList.map(d => d.name)}
                  key={`${idx}-${organization}`}
                  onClose={() => console.log('close')}
                  selected={organization}
                  setSelected={(value) => {
                    let temp = [...segments]
                    temp[idx].organizations[index] = value
                    setCurrentProject({
                      ...currentProject,
                      segments: {
                        ...currentProject.segments,
                        [filter] : temp
                      }
                    })
                  }}
                />
              )
            }
            <AddButton
              setOpen={() => {
                let temp = [...segments]
                if(temp[idx].organizations) {
                  temp[idx].organizations.push('')
                } else {
                  let temp2 = ['']
                  temp[idx].organizations = temp2
                }
                setCurrentProject({
                  ...currentProject,
                  segments: {
                    ...currentProject.segments,
                    [filter] : temp
                  }
                })
              }}
            />
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
  const { teamList, shgroupList, organizationList } = common;
  return {
    currentProject,
    shgroupList,
    teamList,
    organizationList
  }
}

export default connect(mapStateToProps, {
  setCurrentProject: adminSetCurrentProject,
})(Row);