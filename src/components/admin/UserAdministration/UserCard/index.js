import React, { useState, useEffect } from 'react'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from 'classnames'
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

const UserCard = ({ user, teamList, shgroupList }) => {
  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [shGroup, setShGroup] = useState(user.shGroup.SHGroupName)
  const [team, setTeam] = useState(user.team.name)
  const [shType, setShType] = useState(user.shType.shTypeName)
  const [firstName, setFirstName] = useState(user.user.first_name)
  const [lastName, setLastName] = useState(user.user.last_name)
  const [email, setEmail] = useState(user.user.email)
  const [jobTitle, setJobTitle] = useState(user.projectUserTitle)
  const [org, setOrg] = useState(user.projectOrganization)
  const [isCGroup1, setIsCGroup1] = useState(user.isCGroup1)
  const [isCGroup2, setIsCGroup2] = useState(user.isCGroup2)
  const [isCGroup3, setIsCGroup3] = useState(user.isCGroup3)
  const [roleDescription, setRoleDescription] = useState('I think...')

  return (
    <Wrapper>
      <Basic onClick={() => setIsActive(!isActive)}>
        <div className="left-part">
          <div className="header">
            <h2>{`${firstName} ${lastName}`}</h2>
            <Tag isActive={isActive}>Self Submited</Tag>
          </div>
          <BasicContent>
            <div>
              <span className="tag">SH Group:&nbsp;</span>
              <Select
                selected={shGroup}
                setSelected={setShGroup}
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
                selected={team}
                setSelected={setTeam}
                items={teamList.map(team => team.name)}
              />
            </div>
            <div>
              <span className="tag">Job Title:&nbsp;</span>
              <Input className="input" value={jobTitle} />
            </div>
            <div>
              <span className="tag">Project Org:&nbsp;</span>
              <Input className="input" value={org} />
            </div>
            <Button onClick={() => setOpen(true)} className="btnViewDetails">View details</Button>
          </BasicContent>
        </div>
        <div className="right-part">
          <Tag isActive={isActive}>Self Submited</Tag>
          <Arrow isActive={isActive}>{`>`}</Arrow>
        </div>
      </Basic>
      {isActive && <Detailed>
        <div>
          <span className="tag">Submitted By</span>
          <span className="bgTag">Ryan Jones</span>
        </div>
        <div>
          <span className="tag">Submitted Date</span>
          <span className="bgTag">15-May-2021</span>
        </div>
        <div>
          <span className="tag">AM Status</span>
          <span className="bgTag">{((user.am_response.length / user.am_total) * 100).toFixed()}%</span>
        </div>
        <div>
          <span className="tag">AO SH Identified</span>
          <span className="bgTag">{user.ao_total}</span>
        </div>
        <div>
          <span className="tag">Mapped by Ohters</span>
          <span className="bgTag">Ryan Jones</span>
        </div>
        <div>
          <span className="tag">Last Login</span>
          <span className="bgTag">2 days ago</span>
        </div>
      </Detailed>}
      {isActive && <EditPart>
        <div>
          <span className="bgTag">First Name</span>
          <Input value={firstName} />
        </div>
        <div>
          <span className="bgTag">Last Name</span>
          <Input value={lastName} />
        </div>
        <div>
          <span className="bgTag">Email</span>
          <Input value={email} />
        </div>
        <div>
          <span className="bgTag">User Org</span>
          <Input value={org} />
        </div>
        <RoleDescription>
          <span className="bgTag">Role Description</span>
          <Input value={roleDescription} />
        </RoleDescription>
        <div className="selectGroup">
          <span className="tag">Select Group</span>
          <TooltipComponent content={user.survey.customGroup1}>
            <input checked={isCGroup1} onChange={(e) => setIsCGroup1(e.target.checked)} type="checkbox" id="cg1" /><label htmlFor="cg1" className="tag">CG1</label>
          </TooltipComponent>
          <TooltipComponent content={user.survey.customGroup2}>
            <input checked={isCGroup2} onChange={(e) => setIsCGroup2(e.target.checked)} type="checkbox" id="cg2" /><label htmlFor="cg2" className="tag">CG2</label>
          </TooltipComponent>
          <TooltipComponent content={user.survey.customGroup3}>
            <input checked={isCGroup3} onChange={(e) => setIsCGroup3(e.target.checked)} type="checkbox" id="cg3" /><label htmlFor="cg3" className="tag">CG3</label>
          </TooltipComponent>
        </div>
      </EditPart>}
      {open && <ModalWrapper onClick={() => setOpen(false)}>
        <DetailModal onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>Ryan Jones</h2>
            <span onClick={() => setOpen(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
          </ModalHeader>
          <div className="detailed">
            <div>
              <span className="tag">Submitted By</span>
              <span className="bgTag">Ryan Jones</span>
            </div>
            <div>
              <span className="tag">Submitted Date</span>
              <span className="bgTag">15-May-2021</span>
            </div>
            <div>
              <span className="tag">AM Status</span>
              <span className="bgTag">{((user.am_response.length / user.am_total) * 100).toFixed()}%</span>
            </div>
            <div>
              <span className="tag">AO SH Identified</span>
              <span className="bgTag">{user.ao_total}</span>
            </div>
            <div>
              <span className="tag">Mapped by Ohters</span>
              <span className="bgTag">Ryan Jones</span>
            </div>
            <div>
              <span className="tag">Last Login</span>
              <span className="bgTag">2 days ago</span>
            </div>
          </div>
          <div className="editPart">
            <div>
              <span className="bgTag">First Name</span>
              <Input value={firstName} />
            </div>
            <div>
              <span className="bgTag">Last Name</span>
              <Input value={lastName} />
            </div>
            <div>
              <span className="bgTag">Email</span>
              <Input value={email} />
            </div>
            <div>
              <span className="bgTag">User Org</span>
              <Input value={org} />
            </div>
            <RoleDescription>
              <span className="bgTag">Role Description</span>
              <Input value={roleDescription} />
            </RoleDescription>
            <div className="selectGroup">
              <span className="tag">Select Group</span>
              <TooltipComponent content={user.survey.customGroup1}>
                <input checked={isCGroup1} type="checkbox" id="cg1" /><label htmlFor="cg1" className="tag">CG1</label>
              </TooltipComponent>
              <TooltipComponent content={user.survey.customGroup2}>
                <input checked={isCGroup1} type="checkbox" id="cg2" /><label htmlFor="cg2" className="tag">CG2</label>
              </TooltipComponent>
              <TooltipComponent content={user.survey.customGroup3}>
                <input checked={isCGroup1} type="checkbox" id="cg3" /><label htmlFor="cg3" className="tag">CG3</label>
              </TooltipComponent>
            </div>
          </div>
          <ModalFooter>
            <span onClick={() => setOpen(false)}>Cancel</span>
            <Button className="btn">Save</Button>
          </ModalFooter>
        </DetailModal>
      </ModalWrapper>}
    </Wrapper>
  )
}

export default UserCard