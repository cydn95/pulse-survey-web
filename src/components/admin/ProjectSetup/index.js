import React, { Fragment, useState } from 'react'
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, Table } from '@syncfusion/ej2-react-richtexteditor';
import FileUpload from 'Components/FileUpload'
import Button from 'Components/Button'
import Select from 'Components/Select'
import Input from 'Components/Input'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-icons/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-richtexteditor/styles/material.css';
import styles from './styles.scss'

const managers = ["Christopher Robin", "Mike Smith"]
const toolbarSettings = {
  items: ['Undo', 'Redo', 'Italic', 'Bold', 'OrderedList', 'Underline', 'StrikeThrough', 'UnorderedList', 'Image', 'Formats', 'FontSize']
};

const ProjectSetup = ({
  project
}) => {
  const [crrPage, setCrrPage] = useState(0)
  const [show, setShow] = useState(false)
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
  return (
    <Fragment>
      <div className={styles.basicData}>
        <div className={styles.name}>
          <p className={styles.projectName}>Project Name</p>
          <Input type="text" value={name} onChange={(value, e) => setName(value)} className={styles.input} />
          {Object.keys(project).length > 0 && <p className={styles.projectCode}>Project Code:<span>{` ${project.code}`}</span></p>}
        </div>
        <div className={styles.projectManager}>
          <p className={styles.projectName}>Project Manager</p>
          <Select selected={manager} setSelected={(item) => setManager(item)} items={managers} className={styles.withOutline} />
        </div>
        <div className={styles.logos}>
          <FileUpload
            label="Upload company logo"
            accept="image"
            type="file"
            data={companyLogo}
            updateFilesCb={updateCompanyLogo}
          />
          <FileUpload
            label="Upload project logo"
            accept="image"
            type="file"
            data={projectLogo}
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
            data={video}
            updateFilesCb={updateVideo}
            maxFileSizeInBytes={5000000000000000}
          />
        </div>
        <Button className={styles.viewButton}>View suggested scripts</Button>
      </div>
      <div className={styles.moreInfo}>
        <div className={styles.left}>
          <h3>More Info</h3>
          <p>Provide additional context, links or web pages as required.</p>
          {templates && (templates.map((t, index) => <div className={styles.page} key={`${project.code}-${index}`}>
            <a className={index === crrPage ? styles.underline : ''} onClick={(e) => { e.preventDefault(); setCrrPage(index); setShow(true); }}>{t.title}</a>
            <span onClick={() => console.log('close')}><FontAwesomeIcon icon={faTimes} /></span>
          </div>))}
          <div className={styles.add}>
            <span className={styles.plus}>+</span>
            <span>Add new page</span>
          </div>
        </div>
        <div className={styles.richText}>
          {templates && <RichTextEditorComponent iframeSettings={{ enable: true }} height={570} toolbarSettings={toolbarSettings} valueTemplate={templates[crrPage].content} saveInterval={1000} change={(e) => {
            let temp = [...templates]
            temp[crrPage].content = e.value
            setTemplates(temp)
          }}>
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
          </RichTextEditorComponent>}
        </div>
      </div>
      {show && <div className={styles.richTextMobile}>
        <h2 className={styles.header}>About the project</h2>
        <span className={styles.brandcrumb}>{`Projects > Edit Project > ${templates[crrPage].title}`}</span>
        <RichTextEditorComponent iframeSettings={{ enable: true }} height={570} toolbarSettings={toolbarSettings} valueTemplate={templates[crrPage].content} saveInterval={1000} change={(e) => {
          let temp = [...templates]
          temp[crrPage].content = e.value
          setTemplates(temp)
        }}>
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
        </RichTextEditorComponent>
        <Button className={styles.btn} onClick={() => setShow(false)}>Save and go back</Button>
      </div>}
    </Fragment>
  )
}

export default ProjectSetup