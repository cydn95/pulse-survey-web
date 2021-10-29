import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
  Table
} from '@syncfusion/ej2-react-richtexteditor';
import FileUpload from 'Components/FileUpload'
import Button from 'Components/Button'
import AddButton from 'Components/AddButton'
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
import { adminSetProjectField } from 'Redux/admin/actions';

const managers = ["Christopher Robin", "Mike Smith"]
const toolbarSettings = {
  items: ['Undo', 'Redo', 'Italic', 'Bold', 'OrderedList', 'Underline', 'StrikeThrough', 'UnorderedList', 'Image', 'Formats', 'FontSize']
};

const ProjectSetup = ({
  currentProject,
  setProjectField
}) => {
  const [crrPage, setCrrPage] = useState(0)
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState(currentProject.title)
  const [shortText, setShortText] = useState(currentProject.shortText)
  const [video, setVideo] = useState(currentProject.video)
  const [pageHeader, setPageHeader] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  const content = () => (
    <div className={styles.modalContent}>
      <Input className={styles.input} value={pageHeader} onChange={(value, e) => setPageHeader(value)} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )

  const updateCompanyLogo = (files) =>
    setProjectField('companyLogo', files[0]);

  const updateProjectLogo = (files) =>
    setProjectField('projectLogo', files[0]);

  const updateVideo = (files) =>
    setProjectField('video', files[0])
  return (
    <Fragment>
      <div className={styles.basicData}>
        <div className={styles.name}>
          <p className={styles.projectName}>Project Name</p>
          <Input type="text" value={currentProject.name} onChange={(value, e) => setProjectField('name', value)} className={styles.input} />
          {currentProject.code && <p className={styles.projectCode}>Project Code:<span>{` ${currentProject.code}`}</span></p>}
        </div>
        <div className={styles.projectManager}>
          <p className={styles.projectName}>Project Manager</p>
          <Select selected={currentProject.manager} setSelected={(item) => setProjectField('manager', item)} items={managers} className={styles.withOutline} />
        </div>
        <div className={styles.logos}>
          <FileUpload
            label="Upload company logo"
            accept="image"
            type="file"
            data={currentProject.companyLogo}
            updateFilesCb={updateCompanyLogo}
          />
          <FileUpload
            label="Upload project logo"
            accept="image"
            type="file"
            data={currentProject.projectLogo}
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
          {currentProject.templates && currentProject.templates.length > 0 && (currentProject.templates.map((t, index) => <div className={styles.page} key={`${currentProject.code}-${index}`}>
            <a className={index === crrPage ? styles.underline : ''} onClick={(e) => { e.preventDefault(); setCrrPage(index); setShow(true); }}>{t.title}</a>
            <span onClick={() => {
              let temp = [...currentProject.templates];
              temp.splice(index, 1)
              if (index <= crrPage) {
                setCrrPage(crrPage - 1)
              }
              setProjectField('templates', temp)
            }}><FontAwesomeIcon icon={faTimes} /></span>
          </div>))}
          <AddButton
            text="new page"
            content={content}
            open={open}
            setOpen={() => setOpen(true)}
            setClose={() => { setOpen(false); setError(''); setPageHeader('') }}
            handleAdd={() => {
              if ((currentProject.templates || []).filter(t => t.title === pageHeader).length > 0) {
                setError('Already exist')
              } else {
                setProjectField('templates',
                  [...(currentProject.templates || []), { title: pageHeader, content: '<p>Please type here</p>' }])
                setPageHeader('')
                setError('')
                setOpen(false)
                setCrrPage((currentProject.templates || []).length)
              }
            }} />
        </div>
        <div className={styles.richText}>
          {currentProject.templates && currentProject.templates.length > 0 && <RichTextEditorComponent iframeSettings={{ enable: true }} height={570} toolbarSettings={toolbarSettings} valueTemplate={currentProject.templates[crrPage].content} saveInterval={0} change={(e) => {
            let temp = [...currentProject.templates]
            temp[crrPage].content = e.value
            setProjectField('templates', temp)
          }}>
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
          </RichTextEditorComponent>}
        </div>
      </div>
      {currentProject.templates && currentProject.templates.length > 0 && show && <div className={styles.richTextMobile}>
        <h2 className={styles.header}>About the project</h2>
        <span className={styles.brandcrumb}>{`Projects > Edit Project > ${currentProject.templates[crrPage].title}`}</span>
        <RichTextEditorComponent iframeSettings={{ enable: true }} height={570} toolbarSettings={toolbarSettings} valueTemplate={currentProject.templates[crrPage].content} saveInterval={0} change={(e) => {
          let temp = [...currentProject.templates]
          temp[crrPage].content = e.value
          setProjectField('templates', temp)
        }}>
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
        </RichTextEditorComponent>
        <Button className={styles.btn} onClick={() => setShow(false)}>Save and go back</Button>
      </div>}
    </Fragment>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject } = admin
  return {
    currentProject
  }
}

export default connect(mapStateToProps, {
  setProjectField: adminSetProjectField
})(ProjectSetup)