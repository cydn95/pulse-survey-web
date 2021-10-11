import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import ProjectSetup from '../ProjectSetup'
import UserAdministration from '../UserAdministration'
import styles from './styles.scss'

const ProjectEdit = ({ project, currentStep }, ref) => {
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
      {currentStep === 1 && <div>Project Configuration Page</div>}
      {/* {currentStep === 2 && <UserAdministration />} */}
      {currentStep === 2 && <div>UserAdministration Page</div>}
      {currentStep === 3 && <div>Survey Configuration Page</div>}
      {currentStep === 4 && <div>Reporting Page</div>}
      {currentStep === 5 && <div>Flagged Responses Page</div>}
    </div>
  )
}

export default forwardRef(ProjectEdit);