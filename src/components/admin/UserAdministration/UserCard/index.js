import React, { useState } from 'react'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import classnames from 'classnames'
import Select from 'Components/Select'
import Input from 'Components/Input'
import { Tag, Basic, BasicContent, Wrapper, Detailed, EditPart, RoleDescription, Arrow } from './usercard.styles'

const UserCard = ({ user }) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <Wrapper>
      <Basic onClick={() => setIsActive(!isActive)}>
        <div>
          <h2>Ryan Jones</h2>
          <BasicContent>
            <span className="tag">SH Group:</span>
            <span className="tag">SH Type:</span>
            <span className="tag">Team:</span>
            <span className="tag">Job Title:</span>
            <span className="tag">Project Org:</span>
          </BasicContent>
        </div>
        <div>
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
          <span className="bgTag">30%</span>
        </div>
        <div>
          <span className="tag">AO SH Identified</span>
          <span className="bgTag">4</span>
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
          <Input />
        </div>
        <div>
          <span className="bgTag">Last Name</span>
          <Input />
        </div>
        <div>
          <span className="bgTag">Email</span>
          <Input />
        </div>
        <div>
          <span className="bgTag">User Org</span>
          <Input />
        </div>
        <RoleDescription>
          <span className="bgTag">Role Description</span>
          <Input />
        </RoleDescription>
        <div className="selectGroup">
          <span className="tag">Select Group</span>
          <TooltipComponent content="Tooltip Content">
            <CheckBoxComponent label="CG1" checked={false} />
          </TooltipComponent>
          <TooltipComponent content="Tooltip Content">
            <CheckBoxComponent label="CG2" checked={false} />
          </TooltipComponent>
          <TooltipComponent content="Tooltip Content">
            <CheckBoxComponent label="CG3" checked={false} />
          </TooltipComponent>
        </div>
      </EditPart>}
    </Wrapper>
  )
}

export default UserCard