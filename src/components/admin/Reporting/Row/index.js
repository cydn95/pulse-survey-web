import React, { useState } from 'react'
import Select from 'Components/Select'
import AddButton from 'Components/AddButton'
import styles from './styles.scss'

const Row = ({ title, avatar, project }) => {
  const [segmentName, setSegmentName] = useState('Internal')
  const [permissionType, setPermissionType] = useState('All Exception')
  const [dashboards, setDashboards] = useState(['Summary', 'Timeline'])
  const [shGroups, setSHGroups] = useState([])
  const [teams, setTeams] = useState([])
  const [organizations, setOrganizations] = useState([])

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
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label>Segment name</label>
          <Select
            selected={segmentName}
            setSelected={setSegmentName}
            items={['Internal', 'External']}
            className={styles.select}
          />
        </div>
        <div className={styles.input}>
          <label>Permission Type</label>
          <Select
            selected={permissionType}
            setSelected={setPermissionType}
            className={styles.select}
            items={['All Exception']}
          />
        </div>
        <div className={styles.input}>
          <label>Dashbaords</label>
          {dashboards.map((dashboard, idx) =>
            <Select
              key={`${idx}-${dashboard}`}
              className={styles.select}
              selected={dashboard}
              setSelected={(d) => {
                let temp = [...dashboards];
                temp[idx] = d;
                setDashboards(temp);
              }}
              onClose={() => console.log('close')}
              items={['Summary', 'Timeline']}
            />
          )}
          <AddButton />
        </div>
        <div className={styles.input}>
          <label>SH Group</label>
          {shGroups.length === 0 ?
            <Select
              key={`${-1}-shGroup`}
              setSelected={setSelected(shGroups, setSHGroups.length)}
              className={styles.select}
              onClose={() => console.log('close')}
              items={['Internal', 'External']}
            /> :
            shGroups.map((shGroup, idx) =>
              <Select
                key={`${idx}-${shGroup}`}
                selected={shGroup}
                className={styles.select}
                onClose={() => console.log('close')}
                items={['Internal', 'External']}
                setSelected={setSelected(shGroups, setSHGroups.length, idx)}
              />
            )}
          <AddButton />
        </div>
        <div className={styles.input}>
          <label>Teams</label>
          {teams.length === 0 ?
            <Select
              className={styles.select}
              key={`${-1}-team`}
              onClose={() => console.log('close')}
              setSelected={setSelected(teams, setTeams)}
            /> :
            teams.map((team, idx) =>
              <Select
                className={styles.select}
                key={`${idx}-${team}`}
                onClose={() => console.log('close')}
                selected={team}
                setSelected={setSelected(teams, setTeams, idx)}
              />
            )
          }
          <AddButton />
        </div>
        <div className={styles.input}>
          <label>Organizations</label>
          {organizations.length === 0 ?
            <Select
              className={styles.select}
              onClose={() => console.log('close')}
              key={`${-1}-organization`}
              setSelected={setSelected(organizations, setOrganizations)}
            /> :
            organizations.map((organization, idx) =>
              <Select
                className={styles.select}
                key={`${idx}-${organization}`}
                onClose={() => console.log('close')}
                selected={organization}
                setSelected={setSelected(organizations, setOrganizations, idx)}
              />
            )
          }
          <AddButton />
        </div>
      </div>
      <AddButton className={styles.add} />
    </div>
  )
}

export default Row;