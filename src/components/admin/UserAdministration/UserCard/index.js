import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { faTimes, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'Components/Select'
import Input from 'Components/Input'
import Button from 'Components/Button'
import {
  Tag,
  Basic,
  BasicContent,
  Wrapper,
  Detailed,
  EditPart,
  RoleDescription,
  Arrow,
  DetailModal,
  ModalWrapper,
  ModalHeader,
  ModalFooter,
} from './usercard.styles'

const UserCard = ({ user, teamList, shgroupList, setUserField, idx, open, setOpen, shTypes }) => {
  // const [isActive, setIsActive] = useState(false)
  // const [shGroup, setShGroup] = useState(user.shGroup.SHGroupName)
  // const [team, setTeam] = useState(user.team.name)
  // const [shType, setShType] = useState((user.shType || {}).shTypeName)
  // const [firstName, setFirstName] = useState(user.user.first_name)
  // const [lastName, setLastName] = useState(user.user.last_name)
  // const [email, setEmail] = useState(user.user.email)
  // const [jobTitle, setJobTitle] = useState(user.projectUserTitle)
  // const [org, setOrg] = useState(user.projectOrganization)
  const last_login = useMemo(() => {
    let now = new Date().getTime();
    const diffTime = Math.abs(now - Date.parse(user.user.last_login));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [user])
  const submittedDate = useMemo(() => {
    const date = new Date(user.created_at);
    return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`
  }, [user])
  return (
    <Wrapper>
      {/* <Basic onClick={() => setIsActive(!isActive)}>
        <div className="left-part">
          <div className="header">
            <h2>{`${user.user.first_name} ${user.user.last_name}`}</h2>
            <Tag isActive={isActive}>Self Submited</Tag>
          </div>
          <BasicContent>
            <div>
              <span className="tag">SH Group:&nbsp;</span>
              <Select
                selected={(user.shGroup || {}).SHGroupName}
                setSelected={(item) => setUserField(idx, 'shGroup', shgroupList.filter(sh => sh.SHGroupName === item)[0])}
                items={shgroupList.map(sh => sh.SHGroupName)}
              />
            </div>
            <div>
              <span className="tag">SH Type:&nbsp;</span>
              <Select
                selected={shType}
                setSelected={setShType}
                items={['Team member', 'Stakeholder']}
              />
            </div>
            <div>
              <span className="tag">Team:&nbsp;</span>
              <Select
                selected={(user.team || {}).name}
                setSelected={(item) => setUserField(idx, 'team', teamList.filter(team => team === item)[0])}
                items={teamList.map(team => team.name)}
              />
            </div>
            <div>
              <span className="tag">Job Title:&nbsp;</span>
              <Input
                className="input"
                value={user.projectUserTitle}
                onChange={(value, e) =>
                  setUserField(idx, 'projectUserTitle', value)
                }
              />
            </div>
            <div>
              <span className="tag">Project Org:&nbsp;</span>
              <Input
                className="input"
                value={user.projectOrganization}
                onChange={(value, e) =>
                  setUserField(idx, 'projectOrganization', value)
                }
              />
            </div>
            <Button onClick={() => setOpen(true)} className="btnViewDetails">View details</Button>
          </BasicContent>
        </div>
        <div className="right-part">
          <Tag isActive={isActive}>Self Submited</Tag>
          <FontAwesomeIcon icon={isActive ? faAngleUp : faAngleDown} color="#6d6f94" />
        </div>
      </Basic> */}
      {<EditPart>
        <div className="quatar">
          <span className="bgTag">First Name</span>
          <Input
            value={user.user.first_name}
            onChange={(value, e) =>
              setUserField(idx, 'user', { ...user.user, first_name: value })
            }
          />
        </div>
        <div className="quatar">
          <span className="bgTag">Last Name</span>
          <Input
            value={user.user.last_name}
            onChange={(value, e) =>
              setUserField(idx, 'user', { ...user.user, last_name: value })
            }
          />
        </div>
        <div className="quatar">
          <span className="bgTag">Email</span>
          <Input
            value={user.user.email}
            onChange={(value, e) =>
              setUserField(idx, 'user', { ...user.user, email: value })
            }
          />
        </div>
        <div className="quatar">
          <span className="bgTag">User Org</span>
          <Input value={user.user.organization.name} />
        </div>
        <div className="full">
          <RoleDescription>
            <span className="bgTag">Role Description</span>
            <Input value={user.projectUserRoleDesc} onChange={(value) => setUserField(idx, 'projectUserRoleDesc', value)} />
          </RoleDescription>
          {((user.survey || {}).customGroup1 || (user.survey || {}).customGroup2 || (user.survey || {}).customGroup3) &&
            <div className="selectGroup">
              <span className="tag">Select Group</span>
              {(user.survey || {}).customGroup1 && <TooltipComponent content={(user.survey || {}).customGroup1}>
                <input checked={user.isCGroup1} onChange={(e) => setUserField(idx, 'isCGroup1', e.target.checked)} type="checkbox" id="cg1" /><label htmlFor="cg1" className="tag">CG1</label>
              </TooltipComponent>}
              {(user.survey || {}).customGroup2 && <TooltipComponent content={(user.survey || {}).customGroup2}>
                <input checked={user.isCGroup2} onChange={(e) => setUserField(idx, 'isCGroup2', e.target.checked)} type="checkbox" id="cg2" /><label htmlFor="cg2" className="tag">CG2</label>
              </TooltipComponent>}
              {(user.survey || {}).customGroup3 && <TooltipComponent content={(user.survey || {}).customGroup3}>
                <input checked={user.isCGroup3} onChange={(e) => setUserField(idx, 'isCGroup3', e.target.checked)} type="checkbox" id="cg3" /><label htmlFor="cg3" className="tag">CG3</label>
              </TooltipComponent>}
            </div>}
        </div>
      </EditPart>}
      {<Detailed>
        <div>
          <span className="tag">Submitted By</span>
          <span className="bgTag">{`${((user.addByProjectUser || {}).user || {}).first_name} ${((user.addByProjectUser || {}).user || {}).last_name}`}</span>
        </div>
        <div>
          <span className="tag">Submitted Date</span>
          <span className="bgTag">{submittedDate}</span>
        </div>
        <div>
          <span className="tag">AM Status</span>
          <span className="bgTag">{(((user.am_response || []).length / (user.am_total ? user.am_total : 1)) * 100).toFixed()}%</span>
        </div>
        <div>
          <span className="tag">AO SH Identified</span>
          <span className="bgTag">{user.ao_total}</span>
        </div>
        <div>
          <span className="tag">Mapped by Others</span>
          <span className="bgTag">{user.mappedByOthers}</span>
        </div>
        <div>
          <span className="tag">Last Login</span>
          <span className="bgTag">{last_login ? last_login + (last_login < 1 ? ' day ago' : ' days ago') : 'Have not logged in yet'}</span>
        </div>
      </Detailed>}
      {open !== null && <ModalWrapper onClick={() => setOpen(null)} className="detail">
        <DetailModal onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>{user.user.first_name} {user.user.last_name}</h2>
            <span onClick={() => setOpen(null)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
          </ModalHeader>
          <div className="detailed">
            <div>
              <span className="tag">Submitted By</span>
              <span className="bgTag">{`${user.addByProjectUser.user.first_name} ${user.addByProjectUser.user.last_name}`}</span>
            </div>
            <div>
              <span className="tag">Submitted Date</span>
              <span className="bgTag">{submittedDate}</span>
            </div>
            <div>
              <span className="tag">AM Status</span>
              <span className="bgTag">{(((user.am_response || []).length / (user.am_total ? user.am_total : 1)) * 100).toFixed()}%</span>
            </div>
            <div>
              <span className="tag">AO SH Identified</span>
              <span className="bgTag">{user.ao_total ? user.ao_total : 0}</span>
            </div>
            <div>
              <span className="tag">Mapped by Others</span>
              <span className="bgTag">{user.mappedByOthers}</span>
            </div>
            <div>
              <span className="tag">Last Login</span>
              <span className="bgTag">{last_login ? last_login + (last_login === 1 ? ' day ago' : ' days ago') : 'Have not logged in yet'}</span>
            </div>
          </div>
          <div className="editPart">
            <div style={{ marginTop: '15px' }}>
              <span className="bgTag">First Name</span>
              <Input
                value={user.user.first_name}
                onChange={(value, e) =>
                  setUserField(idx, 'user', { ...user.user, first_name: value })
                }
              />
            </div>
            <div>
              <span className="bgTag">Last Name</span>
              <Input
                value={user.user.last_name}
                onChange={(value, e) =>
                  setUserField(idx, 'user', { ...user.user, last_name: value })
                }
              />
            </div>
            <div>
              <span className="bgTag">Email</span>
              <Input
                value={user.user.email}
                onChange={(value, e) =>
                  setUserField(idx, 'user', { ...user.user, email: value })
                }
              />
            </div>
            <div>
              <span className="bgTag">Project Title</span>
              <Input
                value={user.projectUserTitle}
                onChange={(value, e) =>
                  setUserField(idx, 'projectUserTitle', value)
                }
              />
            </div>
            <div>
              <span className="bgTag">SH Group:&nbsp;</span>
              <Select
                selected={(user.shGroup || {}).SHGroupName}
                setSelected={(item) => setUserField(idx, 'shGroup', shgroupList.filter(sh => sh.SHGroupName === item)[0])}
                items={shgroupList.map(sh => sh.SHGroupName)}
                className="select"
              />
            </div>
            <div>
              <span className="bgTag">SH Type</span>
              <Select
                selected={(user.shType || {}).shTypeName}
                setSelected={(value) => setUserField(idx, 'shType', shTypes.filter(sh => value === sh.shTypeName)[0])}
                className="select"
                items={shTypes.map(sh => sh.shTypeName)}
              />
            </div>
            <div>
              <span className="bgTag">Team</span>
              <Select
                selected={(user.team || {}).name}
                setSelected={(item) => setUserField(idx, 'team', teamList.filter(team => team === item)[0])}
                className="select"
                items={teamList.map(team => team.name)}
              />
            </div>
            <div>
              <span className="bgTag">User Org</span>
              <Input
                value={user.user.organization.name}
              />
            </div>
            <RoleDescription>
              <span className="bgTag">Role Description</span>
              <Input value={user.projectUserRoleDesc} onChange={(value) => setUserField(idx, 'projectUserRoleDesc', value)} />
            </RoleDescription>
            <div className="selectGroup">
              <span className="tag">Select Group</span>
              <TooltipComponent content={(user.survey || {}).customGroup1}>
                <input checked={user.isCGroup1} onChange={(e) => setUserField(idx, 'isCGroup1', e.target.checked)} type="checkbox" id="cg1" /><label htmlFor="cg1" className="tag">CG1</label>
              </TooltipComponent>
              <TooltipComponent content={(user.survey || {}).customGroup2}>
                <input checked={user.isCGroup2} onChange={(e) => setUserField(idx, 'isCGroup2', e.target.checked)} type="checkbox" id="cg2" /><label htmlFor="cg2" className="tag">CG2</label>
              </TooltipComponent>
              <TooltipComponent content={(user.survey || {}).customGroup3}>
                <input checked={user.isCGroup3} onChange={(e) => setUserField(idx, 'isCGroup3', e.target.checked)} type="checkbox" id="cg3" /><label htmlFor="cg3" className="tag">CG3</label>
              </TooltipComponent>
            </div>
          </div>
          <ModalFooter>
            <span onClick={() => setOpen(null)}>Cancel</span>
            <Button className="btn">Save</Button>
          </ModalFooter>
        </DetailModal>
      </ModalWrapper>}
    </Wrapper>
  )
}

const mapStateToProps = ({ common }) => {
  const { shgroupList, teamList } = common;
  return {
    shgroupList,
    teamList,
  }
}

export default connect(mapStateToProps, null)(UserCard)