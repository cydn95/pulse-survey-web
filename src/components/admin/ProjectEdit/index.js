import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { adminUserList } from 'Redux/actions'
import ProjectSetup from '../ProjectSetup'
import UserAdministration from '../UserAdministration'
import ProjectConfiguration from '../ProjectConfiguration'
import SurveyConfiguration from '../SurveyConfiguration'
import Reporting from '../Reporting'
import FlaggedResponses from '../FlaggedResponses'
import styles from './styles.scss'

const ProjectEdit = ({ project, currentStep, setBreadcrumb, getUserList }, ref) => {
  const [name, setName] = useState(project.name)
  const [manager, setManager] = useState(project.manager)
  const [companyLogo, setCompanyLogo] = useState()
  const [projectLogo, setProjectLogo] = useState()
  const [title, setTitle] = useState(project.title)
  const [shortText, setShortText] = useState(project.shortText)
  const [video, setVideo] = useState(project.video)
  const [templates, setTemplates] = useState(project.templates)

  useEffect(() => {
    getUserList(project.surveyId)
  }, [project])

  const updateCompanyLogo = (files) =>
    setCompanyLogo(files[0]);

  const updateProjectLogo = (files) =>
    setProjectLogo(files[0]);

  const updateVideo = (files) =>
    setVideo(files[0])

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
      {currentStep === 1 && <ProjectConfiguration />}
      {currentStep === 2 && <UserAdministration project={project} />}
      {currentStep === 3 && <SurveyConfiguration />}
      {currentStep === 4 && <Reporting />}
      {currentStep === 5 && <FlaggedResponses />}
    </div>
  )
}

export default connect(null, {
  getUserList: adminUserList
})(ProjectEdit);