import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'Components/Select'
import Input from 'Components/Input'
import Button from 'Components/Button'
import {
  Wrapper,
  Detailed,
  EditPart,
  RoleDescription,
  DetailModal,
  ModalWrapper,
  ModalHeader,
  ModalFooter,
} from './usercard.styles'

const UserCard = ({ user, teamList, shgroupList, setUserField, idx, open, setOpen, shTypes }) => {
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
          <Input 
            value={((user.user || {}).organization || {}).name}
            onChange={(value, e) =>
              setUserField(idx, 'user', { ...user.user, organization: {...user.organization, name: value} })
            } 
          />
        </div>
        <div className="full">
          <RoleDescription>
            <span className="bgTag">Role Description</span>
            <Input value={user.projectUserRoleDesc} onChange={(value) => setUserField(idx, 'projectUserRoleDesc', value)} />
          </RoleDescription>
          <div className="selectGroup">
              {<TooltipComponent content="Invite a user">
                <input checked={user.sendInvite} onChange={(e) => setUserField(idx, 'sendInvite', e.target.checked)} type="checkbox" id="invite" /><label htmlFor="invite" className="tag">Invite</label>
              </TooltipComponent>}
          </div>
          {((user.survey || {}).customGroup1 || (user.survey || {}).customGroup2 || (user.survey || {}).customGroup3) &&
            <div className="selectGroup" style={{borderLeft: '1px solid', paddingLeft: '10px'}}>
              <span className="tag">Select Group</span>
              {(user.survey || {}).customGroup1 && <TooltipComponent content={(user.survey || {}).customGroup1}>
                <input checked={user.isCGroup1} onChange={(e) => setUserField(idx, 'isCGroup1', e.target.checked)} type="checkbox" id="cg1" /><label htmlFor="cg1" className="tag">{(user.survey || {}).customGroup1}</label>
              </TooltipComponent>}
              {(user.survey || {}).customGroup2 && <TooltipComponent content={(user.survey || {}).customGroup2}>
                <input checked={user.isCGroup2} onChange={(e) => setUserField(idx, 'isCGroup2', e.target.checked)} type="checkbox" id="cg2" /><label htmlFor="cg2" className="tag">{(user.survey || {}).customGroup2}</label>
              </TooltipComponent>}
              {(user.survey || {}).customGroup3 && <TooltipComponent content={(user.survey || {}).customGroup3}>
                <input checked={user.isCGroup3} onChange={(e) => setUserField(idx, 'isCGroup3', e.target.checked)} type="checkbox" id="cg3" /><label htmlFor="cg3" className="tag">{(user.survey || {}).customGroup3}</label>
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
                value={((user.user || {}).organization || {}).name}
                onChange={(value, e) =>
                  setUserField(idx, 'user', { ...user.user, organization: {...user.organization, name: value} })
                }
              />
            </div>
            <RoleDescription>
              <span className="bgTag">Role Description</span>
              <Input value={user.projectUserRoleDesc} onChange={(value) => setUserField(idx, 'projectUserRoleDesc', value)} />
            </RoleDescription>
            {((user.survey || {}).customGroup1 || (user.survey || {}).customGroup2 || (user.survey || {}).customGroup3) &&
            <div className="selectGroup">
              <span className="tag">Select Group</span>
              {(user.survey || {}).customGroup1 && <TooltipComponent content={(user.survey || {}).customGroup1}>
                <input checked={user.isCGroup1} onChange={(e) => setUserField(idx, 'isCGroup1', e.target.checked)} type="checkbox" id="cg1" /><label htmlFor="cg1" className="tag">{(user.survey || {}).customGroup1}</label>
              </TooltipComponent>}
              {(user.survey || {}).customGroup2 && <TooltipComponent content={(user.survey || {}).customGroup2}>
                <input checked={user.isCGroup2} onChange={(e) => setUserField(idx, 'isCGroup2', e.target.checked)} type="checkbox" id="cg2" /><label htmlFor="cg2" className="tag">{(user.survey || {}).customGroup2}</label>
              </TooltipComponent>}
              {(user.survey || {}).customGroup3 && <TooltipComponent content={(user.survey || {}).customGroup3}>
                <input checked={user.isCGroup3} onChange={(e) => setUserField(idx, 'isCGroup3', e.target.checked)} type="checkbox" id="cg3" /><label htmlFor="cg3" className="tag">{(user.survey || {}).customGroup3}</label>
              </TooltipComponent>}
            </div>}
            <TooltipComponent content="Invite a user">
              <input checked={user.sendInvite} onChange={(e) => setUserField(idx, 'sendInvite', e.target.checked)} type="checkbox" id="cg3" /><label htmlFor="cg3" className="tag">Invite</label>
            </TooltipComponent>
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