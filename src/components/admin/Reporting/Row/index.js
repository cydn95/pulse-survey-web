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
      setFilter('shgroups')
      setList(shgroupList)
      setSegments((currentProject.segments || {})['shgroups'] || [])
    } else if (type === 1) {
      setFilter('teams')
      setList(teamList.map(t => t.name))
      setSegments((currentProject.segments || {})['teams'] || [])
    } else {
      setFilter('organizations')
      console.log('orgadfdafd', organizationList)
      setList(organizationList)
      setSegments((currentProject.segments || {})['organizations'] || [])
    }
    console.log('currentProject', currentProject)
  }, [type, currentProject])

  const [filter, setFilter] = useState('shgroups')
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
              field_name={type===0?'SHGroupName':''}
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
                  temp[idx] = {...segment, dashboards: segment.dashboards.filter((d, i) => i !== index)}
                  setCurrentProject({
                    ...currentProject,
                    segments: {
                      ...currentProject.segments,
                      [filter] : temp
                    }
                  })
                }}
                items={['Summary', 'Driver Analysis', 'Matrix', 'Key Themes', 'Advisor Insights'].filter(d => !segment.dashboards.includes(d))}
                org_items={['Summary', 'Driver Analysis', 'Matrix', 'Key Themes', 'Advisor Insights']}
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
            {(segment.dashboards || []).length !== 5 && <AddButton
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
            />}
          </div>
          <div className={styles.input}>
            <label>SH Group</label>
            {(segment.shGroups || []).map((shGroup, index) =>
                <Select
                  key={`${idx}-${shGroup}`}
                  selected={shGroup}
                  className={styles.select}
                  onClose={() => {
                    let temp = [...segments]
                    temp[idx] = {...segment, shGroups: segment.shGroups.filter((d, i) => i !== index)}
                    setCurrentProject({
                      ...currentProject,
                      segments: {
                        ...currentProject.segments,
                        [filter] : temp
                      }
                    })
                  }}
                  items={shgroupList.filter(d => !segment.shGroups.includes(d.id))}
                  org_items={shgroupList}
                  field_name="SHGroupName"
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
            {(segment.shGroups || []).length !== shgroupList.length && <AddButton
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
            />}
          </div>
          <div className={styles.input}>
            <label>Teams</label>
            {(segment.teams || []).map((team, index) =>
                <Select
                  className={styles.select}
                  key={`${idx}-${team}`}
                  onClose={() => {
                    let temp = [...segments]
                    temp[idx] = {...segment, teams: segment.teams.filter((d, i) => i !== index)}
                    setCurrentProject({
                      ...currentProject,
                      segments: {
                        ...currentProject.segments,
                        [filter] : temp
                      }
                    })
                  }}
                  selected={team}
                  items={teamList.map(t => t.name).filter(d => !segment.teams.includes(d))}
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
            {(segment.teams || []).length !== teamList.length && <AddButton
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
            />}
          </div>
          <div className={styles.input}>
            <label>Organizations</label>
            {(segment.organizations || []).map((organization, index) =>
                <Select
                  className={styles.select}
                  items={organizationList.filter(d => !segment.organizations.includes(d))}
                  key={`${idx}-${organization}`}
                  onClose={() => {
                    let temp = [...segments]
                    temp[idx] = {...segment, organizations: segment.organizations.filter((d, i) => i !== index)}
                    setCurrentProject({
                      ...currentProject,
                      segments: {
                        ...currentProject.segments,
                        [filter] : [...temp]
                      }
                    })
                  }}
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
            {(segment.organizations || []).length !== organizationList.length && <AddButton
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
            />}
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