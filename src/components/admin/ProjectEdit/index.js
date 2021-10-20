import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import ProjectSetup from '../ProjectSetup'
import UserAdministration from '../UserAdministration'
import ProjectConfiguration from '../ProjectConfiguration'
import SurveyConfiguration from '../SurveyConfiguration'
import Reporting from '../Reporting'
import FlaggedResponses from '../FlaggedResponses'
import styles from './styles.scss'

const ProjectEdit = ({ project, currentStep, setBreadcrumb }, ref) => {
  const [name, setName] = useState(project.name)
  const [manager, setManager] = useState(project.manager)
  const [companyLogo, setCompanyLogo] = useState()
  const [projectLogo, setProjectLogo] = useState()
  const [title, setTitle] = useState(project.title)
  const [shortText, setShortText] = useState(project.shortText)
  const [video, setVideo] = useState(project.video)
  const [templates, setTemplates] = useState(project.templates)

  const updateCompanyLogo = (files) =>
    setCompanyLogo(files[0]);

  const updateProjectLogo = (files) =>
    setProjectLogo(files[0]);

  const updateVideo = (files) =>
    setVideo(files[0])

  useImperativeHandle(ref, () => ({
    name,
    manager,
    title,
    shortText,
    companyLogo,
    projectLogo,
    video,
    templates,
  }), [name, manager, title, shortText, companyLogo, projectLogo, video, templates])

  return (
    <div className={styles.wrapper}>
      {currentStep === 0 && <ProjectSetup
        setBreadcrumb={setBreadcrumb}
        project={project}
        name={name}
        setName={setName}
        manager={manager}
        setManager={setManager}
        title={title}
        setTitle={setTitle}
        shortText={shortText}
        setShortText={setShortText}
        companyLogo={companyLogo}
        updateCompanyLogo={updateCompanyLogo}
        projectLogo={projectLogo}
        updateProjectLogo={updateProjectLogo}
        video={video}
        updateVideo={updateVideo}
        templates={templates}
        setTemplates={setTemplates}
      />}
      {/* {currentStep === 1 && <div>Project Configuration Page</div>} */}
      {currentStep === 1 && <ProjectConfiguration />}
      {currentStep === 2 && <UserAdministration />}
      {/* {currentStep === 2 && <div>UserAdministration Page</div>} */}
      {currentStep === 3 && <SurveyConfiguration />}
      {/* {currentStep === 3 && <div>Survey Configuration Page</div>} */}
      {/* {currentStep === 4 && <div>Reporting Page</div>} */}
      {currentStep === 4 && <Reporting />}
      {/* {currentStep === 5 && <FlaggedResponses />} */}
      {currentStep === 5 && <div>Flagged Responses Page</div>}
    </div>
  )
}

export default forwardRef(ProjectEdit);