import React, { Fragment, useEffect, useState } from 'react'
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
import Input from 'Components/Input'
import { faTimes, faAsterisk } from '@fortawesome/free-solid-svg-icons'
import Loading from 'Components/Loading'
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
  setProjectField,
  loading
}) => {
  const [crrPage, setCrrPage] = useState(0)
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState(currentProject.title)
  const [shortText, setShortText] = useState(currentProject.shortText)
  const [video, setVideo] = useState(currentProject.video)
  const [pageHeader, setPageHeader] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0)
    }
  }, [loading])

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
      {loading ? <Loading description="" /> :
        <Fragment>
          <div className={styles.basicData}>
            <div className={styles.name}>
              <p className={styles.projectName}>Project Name <FontAwesomeIcon style={{ fontSize: '7px' }} fixedWidth icon={faAsterisk} color="#e30000" size="xs" /></p>
              <Input type="text" value={currentProject.surveyTitle} onChange={(value, e) => setProjectField('surveyTitle', value)} className={styles.input} />
              {currentProject.code && <p className={styles.projectCode}>Project Code:<span>{` ${currentProject.code}`}</span></p>}
            </div>
            <div className={styles.projectManager}>
              <p className={styles.projectName}>Project Manager</p>
              {/* <Select selected={currentProject.manager} setSelected={(item) => setProjectField('manager', item)} items={managers} className={styles.withOutline} /> */}
              <Input value={currentProject.projectManager} onChange={(value, e) => setProjectField('projectManager', value)} className={styles.input} />
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
            <p className={styles.header}>Tour: {((currentProject.tour || [])[0] || {}).tabName}</p>
            <div className={styles.content}>
              <div className={styles.message}>
                <p>Title</p>
                <Input type="text" value={((currentProject.tour || [])[0] || {}).pageName} onChange={(value, e) => {
                  let temp = [...currentProject.tour];
                  ((temp.tour || [])[0] || {}).pageName = value
                  setProjectField('tour', temp)
                }} className={styles.input} />
                <p>Short text</p>
                {<RichTextEditorComponent iframeSettings={{ enable: true }} height={150} toolbarSettings={toolbarSettings} valueTemplate={((currentProject.tour || [])[0] || {}).pageContent} saveInterval={0} change={(e) => {
                  let temp = [...currentProject.tour];
                  ((temp.tour || [])[0] || {}).pageContent = e.value
                  setProjectField('tour', temp)
                }}>
                  <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
                </RichTextEditorComponent>}
                {/* <textarea type="text" value={shortText} rows={7} cols={60} onChange={(e) => setShortText(e.target.value)} className={styles.input}></textarea> */}
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
              {currentProject.moreInfo && currentProject.moreInfo.length > 0 && (currentProject.moreInfo.map((t, index) => <div className={styles.page} key={`${currentProject.code}-${index}`}>
                <a className={index === crrPage ? styles.underline : ''} onClick={(e) => { e.preventDefault(); setCrrPage(index); setShow(true); }}>{t.pageName}</a>
                <span onClick={() => {
                  let temp = [...currentProject.moreInfo];
                  temp.splice(index, 1)
                  if (index <= crrPage) {
                    setCrrPage(crrPage - 1)
                  }
                  setProjectField('moreInfo', temp)
                }}><FontAwesomeIcon icon={faTimes} /></span>
              </div>))}
              <AddButton
                text="new page"
                content={content}
                open={open}
                setOpen={() => setOpen(true)}
                setClose={() => { setOpen(false); setError(''); setPageHeader('') }}
                handleAdd={() => {
                  if ((currentProject.moreInfo || []).filter(t => t.pageName === pageHeader).length > 0) {
                    setError('Already exist')
                  } else {
                    setProjectField('moreInfo',
                      [...(currentProject.moreInfo || []), { pageName: pageHeader, pageContent: '<p>Please type here</p>' }])
                    setPageHeader('')
                    setError('')
                    setOpen(false)
                    setCrrPage((currentProject.moreInfo || []).length)
                  }
                }} />
            </div>
            <div className={styles.richText}>
              {currentProject.moreInfo && currentProject.moreInfo.length > 0 && <RichTextEditorComponent iframeSettings={{ enable: true }} height={570} toolbarSettings={toolbarSettings} valueTemplate={currentProject.moreInfo[crrPage].pageContent} saveInterval={0} change={(e) => {
                let temp = [...currentProject.moreInfo]
                temp[crrPage].pageContent = e.value
                setProjectField('moreInfo', temp)
              }}>
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
              </RichTextEditorComponent>}
            </div>
          </div>
          {currentProject.moreInfo && currentProject.moreInfo.length > 0 && show && <div className={styles.richTextMobile}>
            <h2 className={styles.header}>{currentProject.moreInfo[crrPage].pageName}</h2>
            <span className={styles.brandcrumb}>{`Projects > Edit Project > ${currentProject.moreInfo[crrPage].pageName}`}</span>
            <RichTextEditorComponent iframeSettings={{ enable: true }} height={570} toolbarSettings={toolbarSettings} valueTemplate={currentProject.moreInfo[crrPage].pageContent} saveInterval={0} change={(e) => {
              let temp = [...currentProject.moreInfo]
              temp[crrPage].pageContent = e.value
              setProjectField('moreInfo', temp)
            }}>
              <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]} />
            </RichTextEditorComponent>
            <Button className={styles.btn} onClick={() => setShow(false)}>Save and go back</Button>
          </div>}
        </Fragment>
      }
    </Fragment>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject, loading } = admin
  return {
    currentProject,
    loading
  }
}

export default connect(mapStateToProps, {
  setProjectField: adminSetProjectField
})(ProjectSetup)