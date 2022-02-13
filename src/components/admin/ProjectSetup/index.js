import React, { Fragment, useEffect, useState, useRef } from 'react'
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
import { adminSetProjectField, deleteMoreInfoPage } from 'Redux/admin/actions';

const managers = ["Christopher Robin", "Mike Smith"]
const toolbarSettings = {
  items: ['Undo', 'Redo', 'Italic', 'Bold', 'OrderedList', 'Underline', 'StrikeThrough', 'UnorderedList', 'Image', 'Formats', 'FontSize']
};

const ProjectSetup = ({
  currentProject,
  setProjectField,
  loading,
  validateError,
  setValidateError,
  editing,
  deleteMoreInfoPage
}) => {
  const tourTitle = useRef(null)
  const spanRef = useRef(null)
  const [crrPage, setCrrPage] = useState(0)
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)
  const [width, setWidth] = useState()
  const [video, setVideo] = useState(currentProject.video)
  const [pageHeader, setPageHeader] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [newCG, setNewCG] = useState('')
  
  const [openCG, setOpenCG] = useState(false)

  useEffect(() => {
    if (spanRef.current) {
      console.log(spanRef.current.offsetWidth)
      setWidth(spanRef.current.offsetWidth)
    }
  }, [currentProject])

  const callbackDel = (isDel, index) => {
    if(isDel)
    {
      let temp = [...currentProject.moreInfo];
      temp.splice(index, 1)
      console.log('here', temp)
      if (index <= crrPage && crrPage > 0) {
        setCrrPage(crrPage - 1)
      }
      setProjectField('moreInfo', temp)
    }
  }

  const content = () => (
    <div className={styles.modalContent}>
      <Input className={styles.input} value={pageHeader} onChange={(value, e) => setPageHeader(value)} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )

  const addNewCG = () => {
    if (newCG) {
      let keys = Object.keys(currentProject).filter((key, idx) => key.includes('customGroup') && currentProject[key] === '')
      let field = 'customGroup1'
      if (keys.length > 0) {
        field = keys[0]
      } else {
        setProjectField('customGroup2', '')
        setProjectField('customGroup3', '')
      }
      setProjectField(field, newCG)
      setNewCG('')
      setOpenCG(false)
    }
  }
  const newCGContent = () =>
    <div className={styles.column}>
      <Input
        className={styles.customGroup}
        value={newCG}
        onChange={(value, e) => setNewCG(value)}
      />
    </div>

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
          <div className={`${styles.basicData} ${editing === -1 && styles.marginTop}`}>
            <div className={styles.name}>
              <p className={styles.projectName}>Project Name <FontAwesomeIcon style={{ fontSize: '7px' }} fixedWidth icon={faAsterisk} color="#e30000" size="xs" /></p>
              <Input
                type="text"
                value={currentProject.surveyTitle || ''}
                onChange={(value, e) => {
                  setProjectField('surveyTitle', value)
                  if (e.target.value.length < 2 || e.target.value.length > 200) {
                    setValidateError({
                      ...validateError,
                      pname: 'Project Name must be a minimum of 2 characters and a maximum of 200 charactres.'
                    })
                  } else {
                    setValidateError({
                      ...validateError,
                      pname: ''
                    })
                  }
                }}
                className={styles.input}
                onBlur={(e) => {
                  if (e.target.value.length < 2 || e.target.value.length > 200) {
                    setValidateError({
                      ...validateError,
                      pname: 'Project Name must be a minimum of 2 characters and a maximum of 200 charactres.'
                    })
                  } else {
                    setValidateError({
                      ...validateError,
                      pname: ''
                    })
                  }
                }}
              />
              {validateError.pname !== '' && <p style={{ color: 'red', fontSize: '10px' }}>{validateError.pname}</p>}
              {currentProject.code && <p className={styles.projectCode}>Project Code:<span>{` ${currentProject.code}`}</span></p>}
              {editing === -1 && <div>
                <p className={styles.projectName}>Project Code</p>
                <Input
                  type="text"
                  value={currentProject.projectCode || ''}
                  onChange={(value, e) => setProjectField('projectCode', value)} className={styles.input}
                />
              </div>}
            </div>
            <div className={styles.projectManager}>
              <p className={styles.projectName}>Project Manager</p>
              {/* <Select selected={currentProject.manager} setSelected={(item) => setProjectField('manager', item)} items={managers} className={styles.withOutline} /> */}
              <Input
                value={currentProject.projectManager || ''}
                onChange={(value, e) => {
                  if ((e.target.value.length > 0) && (e.target.value.length < 2 || e.target.value.length > 50)) {
                    setValidateError({
                      ...validateError,
                      pmanager: 'Project Manager must be a minimum of 2 characters and a maximum of 50 charactres.'
                    })
                  } else {
                    setValidateError({
                      ...validateError,
                      pmanager: ''
                    })
                  }
                  setProjectField('projectManager', value)
                }}
                className={styles.input}
                onBlur={(e) => {
                  if ((e.target.value.length > 0) && (e.target.value.length < 2 || e.target.value.length > 50)) {
                    setValidateError({
                      ...validateError,
                      pmanager: 'Project Manager must be a minimum of 2 characters and a maximum of 50 charactres.'
                    })
                  } else {
                    setValidateError({
                      ...validateError,
                      pmanager: ''
                    })
                  }
                }}
              />
              {validateError.pmanager !== '' && <p style={{ color: 'red', fontSize: '10px' }}>{validateError.pmanager}</p>}
              {editing === -1 && <div style={{display: 'flex', width: 'calc(100% - 10px)'}}>
                <div style={{width: '50%'}}>
                  <p className={styles.projectName}>Anonymity Threshold</p>
                  <Input
                    type="number"
                    value={currentProject.anonymityThreshold  || ''}
                    onChange={(value, e) => setProjectField('anonymityThreshold', value)} className={styles.input}
                  />
                </div>
                <div style={{marginLeft: '10px', width: '50%'}}>
                  <p className={styles.projectName}>Seats Purchased</p>
                  <Input
                    type="number"
                    value={currentProject.seatsPurchased || ''}
                    onChange={(value, e) => setProjectField('seatsPurchased', value)} className={styles.input}
                  />
                </div>
              </div>}
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
            {editing === -1 && <div className={styles.column}>
                <span className={styles.header}>Custom Groups</span>
                <span className={styles.description}>Create up to three custom groups</span>
                {Object.keys(currentProject).length > 0 &&
                  Object.keys(currentProject).filter(key => key.includes('customGroup')).map((key, idx) =>
                    currentProject[key] !== '' && <Input
                      type="text"
                      key={`shGroup-${idx}`}
                      className={styles.customGroup}
                      value={currentProject[key]}
                      onChange={(value, e) => {
                        setProjectField(`customGroup${idx + 1}`, value)
                      }}
                      onClickClose={() => {
                        setProjectField(`customGroup${idx + 1}`, '')
                      }} />
                  )}
                {Object.keys(currentProject || {}).filter(key => key.includes('customGroup') && currentProject[key] !== '').length < 3 &&
                  <AddButton content={newCGContent} handleAdd={addNewCG} open={openCG} setOpen={() => setOpenCG(true)} setClose={() => setOpenCG(false)} />
                }
              </div>}
          </div>
          {editing !== -1 && <div className={styles.welcome}>
            <div className={styles.tourHeader}>
              <span className={styles.header}>Tour:&nbsp;</span>
              <Input
                refVal={tourTitle}
                className={styles.input}
                type="text"
                value={((currentProject.tour || [])[0] || {}).tabName || ''}
                onBlur={() => setEdit(false)}
                onChange={(value) => {
                  let temp
                  if (currentProject.tour) {
                    temp = [...currentProject.tour];
                  } else {
                    temp = { tour: [] }
                  }
                  if (!temp[0]) {
                    temp[0] = {}
                  }
                  temp[0].tabName = value
                  setWidth(spanRef.current.offsetWidth)
                  setProjectField('tour', temp)
                }}
                style={{ width }}
              />
              <span style={{ opacity: 0, position: 'absolute' }} className={styles.header} ref={spanRef}>{((currentProject.tour || [])[0] || {}).tabName}</span>
              {!edit && <span onClick={(e) => { e.stopPropagation(); tourTitle.current.focus(); setEdit(true); }} style={{ cursor: 'pointer' }}>&nbsp;Edit</span>}
            </div>
            <div className={styles.content}>
              <div className={styles.message}>
                <p>Title</p>
                <Input
                  type="text"
                  value={((currentProject.tour || [])[0] || {}).pageName || ''}
                  onChange={(value, e) => {
                    let temp = [...(currentProject.tour || [])];
                    if (!temp[0]) {
                      temp[0] = {}
                    }
                    temp[0].pageName = value
                    setProjectField('tour', temp)
                  }}
                  className={styles.input}
                />
                <p>Short text</p>
                {<RichTextEditorComponent iframeSettings={{ enable: true }} height={150} toolbarSettings={toolbarSettings} valueTemplate={((currentProject.tour || [])[0] || {}).pageContent} saveInterval={0} change={(e) => {
                  let temp = [...currentProject.tour];
                  if (!temp[0]) {
                    temp[0] = {}
                  }
                  temp[0].pageContent = e.value
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
          </div>}
          {editing !== -1 && <div className={styles.moreInfo}>
            <div className={styles.left}>
              <h3>More Info</h3>
              <p>Provide additional context, links or web pages as required.</p>
              {currentProject.moreInfo && currentProject.moreInfo.length > 0 && (currentProject.moreInfo.map((t, index) => <div className={styles.page} key={`${currentProject.code}-${index}`}>
                <a className={index === crrPage ? styles.underline : ''} onClick={(e) => { e.preventDefault(); setCrrPage(index); setShow(true); }}>{t.pageName}</a>
                <span onClick={() => {
                  deleteMoreInfoPage(currentProject.moreInfo[index].id, index, callbackDel)
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
          </div>}
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
  setProjectField: adminSetProjectField,
  deleteMoreInfoPage: deleteMoreInfoPage
})(ProjectSetup)