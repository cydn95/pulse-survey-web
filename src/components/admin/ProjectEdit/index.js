import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import Select from 'Components/Select'
import FileUpload from 'Components/FileUpload'
import Button from 'Components/Button'
import Input from 'Components/Input'
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, Table } from '@syncfusion/ej2-react-richtexteditor';
import styles from './styles.scss'
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-icons/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-richtexteditor/styles/material.css';

const managers = ["Christopher Robin", "James Li"]
const toolbarSettings = {
  items: ['Undo', 'Redo', 'Italic', 'Bold', 'OrderedList', 'Underline', 'StrikeThrough', 'UnorderedList', 'Image', 'Formats']
};

const ProjectEdit = ({ project, currentStep }, ref) => {
  const [name, setName] = useState(project.name)
  const [manager, setManager] = useState(project.manager)
  const [companyLogo, setCompanyLogo] = useState()
  const [projectLogo, setProjectLogo] = useState()
  const [title, setTitle] = useState(project.title)
  const [shortText, setShortText] = useState(project.shortText)
  const [video, setVideo] = useState(project.video)
  const [template, setTemplate] = useState(project.template)

  const updateCompanyLogo = (files) =>
    setCompanyLogo(files[0]);

  const updateProjectLogo = (files) =>
    setProjectLogo(files[0]);

  const uploadVideo = (files) =>
    setVideo(files[0])

  useImperativeHandle(ref, () => ({
    name,
    manager,
    title,
    shortText,
    companyLogo,
    projectLogo,
    video,
  }), [name, manager, title, shortText, companyLogo, projectLogo, video])

  return (
    <div className={styles.wrapper}>
      <div className={styles.basicData}>
        <div className={styles.name}>
          <p className={styles.projectName}>Project Name</p>
          <Input type="text" value={name} onChange={(value, e) => setName(value)} className={styles.input} />
          <p className={styles.projectCode}>Project Code:<span>{` ${project.code}`}</span></p>
        </div>
        <div className={styles.projectManager}>
          <p className={styles.projectName}>Project Manager</p>
          <Select selected={manager} setSelected={(item) => setManager(item)} items={managers} />
        </div>
        <div className={styles.logos}>
          <FileUpload
            label="Upload company logo"
            accept="image"
            type="file"
            updateFilesCb={updateCompanyLogo}
          />
          <FileUpload
            label="Upload project logo"
            accept="image"
            type="file"
            updateFilesCb={updateProjectLogo}
          />
        </div>
      </div>
      <div className={styles.welcome}>
        <p className={styles.header}>Tour: PM Welcome Message</p>
        <div className={styles.content}>
          <div className={styles.message}>
            <p>Title</p>
            <Input type="text" value={title} onChange={(value, e) => setTitle(value)} className={styles.input} />
            <p>Short text</p>
            <textarea type="text" value={shortText} rows={7} cols={60} onChange={(e) => setShortText(e.target.value)} className={styles.input}></textarea>
          </div>
          <FileUpload
            label="Upload Video"
            description="Record a custom video message to welcome new users and encourage their open and honest feedback."
            accept="video"
            updateFilesCb={uploadVideo}
            maxFileSizeInBytes={5000000000000000}
          />
        </div>
        <Button className={styles.viewButton}>View suggested scripts</Button>
      </div>
      <div className={styles.moreInfo}>
        <div className={styles.left}>
          <h3>More Info</h3>
          <p>Provide additional context, links or web pages as required.</p>
          <div className={styles.page}>
            <a>About the project.</a>
            <span onClick={() => console.log('close')}>x</span>
          </div>
          <div className={styles.page}>
            <a>FAQ.</a>
            <span onClick={() => console.log('close')}>x</span>
          </div>
          <div className={styles.add}>
            <span className={styles.plus}>+</span>
            <span>Add new page</span>
          </div>
        </div>
        <div className={styles.richText}>
          <RichTextEditorComponent iframeSettings={{ enable: true }} height={570} toolbarSettings={toolbarSettings} valueTemplate={template}>
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
          </RichTextEditorComponent>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(ProjectEdit);