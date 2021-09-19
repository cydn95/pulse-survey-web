import React from "react";
import { connect } from "react-redux";

import { controlType } from "Constants/defaultValues";
import Button from "@material-ui/core/Button";

import AvatarComponent from "Components/avatar/Component";

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  SmartText,
  RangeSlider,
  MultiTopics,
} from "Components/Survey";

import DriverPanel from "Components/driver";

import {
  SURVEY_NOT_STARTED,
  SURVEY_IN_PROGRESS,
  SURVEY_COMPLETED,
  controlTypeText,
} from "Constants/defaultValues";

import { getColorFromValue } from "Util/Utils";

import styles from "./styles.scss";

import { selectPage, stakeholderAnswer, stakeholderList } from "Redux/actions";
import StakeholderUpdateModal from "../StakeholderUpdateModal";
import StakeholderUpdatePanel from "../StakeholderUpdatePanel";

class AoSurvey extends React.Component {
  constructor(props) {
    super(props);

    const {
      questions,
      options,
      drivers,
      pageIndex,
      user,
      currentSurveyUserId,
      lastAddedShCategory,
      myMapES,
      projectMapES,
      mapStyle,
    } = this.props;

    let totalQuestions = 0;
    let totalAnswers = 0;

    for (let i = 0; i < drivers.length; i++) {
      drivers[i] = {
        ...drivers[i],
        questions: [],
      };
    }

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < drivers.length; j++) {
        if (questions[i].driver.id === drivers[j].driverId) {
          drivers[j].questions.push(questions[i]);
          break;
        }
      }
    }

    const orderedDrivers = drivers.filter((item) => {
      return item.questions.length > 0 ? true : false;
    });

    let shCategoryId = currentSurveyUserId.split("_SHC_")[1];
    if (shCategoryId == undefined) {
      shCategoryId = lastAddedShCategory;
    }

    const answers = [];
    for (let i = 0; i < orderedDrivers.length; i++) {
      for (let j = 0; j < orderedDrivers[i].questions.length; j++) {
        totalQuestions++;
        const temp = orderedDrivers[i].questions[j].response.filter(
          (resp) =>
            /*resp.shCategory.toString() === shCategoryId.toString() &&*/
            resp.subProjectUser.toString() === user.projectUserId.toString()
        );

        totalAnswers += temp.length;

        if (temp.length === 0) {
          answers.push({
            pageIndex: i,
            questionIndex: j,
            integerValue: 0,
            topicValue: "",
            commentValue: "",
            skipValue: "",
            topicTags: "",
            commentTags: "",
            user: 0,
            subjectUser: 0,
            survey: orderedDrivers[i].questions[j].survey,
            amQuestion: orderedDrivers[i].questions[j].id,
            type: "other",
            controlType: controlTypeText(
              orderedDrivers[i].questions[j].controlType
            ),
            shCategory: shCategoryId,
          });
        } else {
          answers.push({
            amQuestion: orderedDrivers[i].questions[j].id,
            pageIndex: i,
            questionIndex: j,
            integerValue: temp[0].integerValue,
            topicValue: temp[0].topicValue,
            commentValue: temp[0].commentValue,
            skipValue: temp[0].skipValue,
            topicTags: temp[0].topicValue,
            commentTags: temp[0].commentTags,
            user: temp[0].projectUser,
            subjectUser: temp[0].subProjectUser,
            survey: orderedDrivers[i].questions[j].survey,
            type: "other",
            controlType: controlTypeText(
              orderedDrivers[i].questions[j].controlType
            ),
            shCategory: shCategoryId,
          });
        }
      }
    }

    this.state = {
      questions,
      options,
      drivers: orderedDrivers,
      pageIndex,
      currentUser: user,
      answers,
      totalAnswers,
      totalQuestions,
      editModal: false,
    };
  }

  componentWillReceiveProps(props) {
    const { pageIndex, currentSurveyUserId, user, drivers, questions } = props;

    if (
      currentSurveyUserId.toString() !==
      this.props.currentSurveyUserId.toString()
    ) {
      for (let i = 0; i < drivers.length; i++) {
        drivers[i] = {
          ...drivers[i],
          questions: [],
        };
      }

      for (let i = 0; i < questions.length; i++) {
        for (let j = 0; j < drivers.length; j++) {
          if (questions[i].driver.id === drivers[j].driverId) {
            drivers[j].questions.push(questions[i]);
            break;
          }
        }
      }

      const orderedDrivers = drivers.filter((item) => {
        return item.questions.length > 0 ? true : false;
      });

      console.log('orderedD', orderedDrivers)

      const shCategoryId = currentSurveyUserId.split("_SHC_")[1];

      let totalQuestions = 0;
      let totalAnswers = 0;

      const answers = [];
      for (let i = 0; i < orderedDrivers.length; i++) {
        for (let j = 0; j < orderedDrivers[i].questions.length; j++) {
          totalQuestions++;

          const temp = orderedDrivers[i].questions[j].response.filter(
            (resp) =>
              /*resp.shCategory.toString() === shCategoryId.toString() &&*/
              resp.subProjectUser.toString() === user.projectUserId.toString()
          );

          totalAnswers += temp.length;

          if (temp.length === 0) {
            answers.push({
              pageIndex: i,
              questionIndex: j,
              integerValue: 0,
              topicValue: "",
              commentValue: "",
              skipValue: "",
              topicTags: "",
              commentTags: "",
              user: 0,
              subjectUser: 0,
              survey: orderedDrivers[i].questions[j].survey,
              amQuestion: orderedDrivers[i].questions[j].id,
              type: "other",
              controlType: controlTypeText(orderedDrivers[i].questions[j].controlType),
              shCategory: shCategoryId,
            });
          } else {
            answers.push({
              amQuestion: orderedDrivers[i].questions[j].id,
              pageIndex: i,
              questionIndex: j,
              integerValue: temp[0].integerValue,
              topicValue: temp[0].topicValue,
              commentValue: temp[0].commentValue,
              skipValue: temp[0].skipValue,
              topicTags: temp[0].topicValue,
              commentTags: temp[0].commentTags,
              user: temp[0].projectUser,
              subjectUser: temp[0].subProjectUser,
              survey: orderedDrivers[i].questions[j].survey,
              type: "other",
              controlType: controlTypeText(orderedDrivers[i].questions[j].controlType),
              shCategory: shCategoryId,
            });
          }
        }
      }

      this.setState({
        pageIndex,
        answers,
        totalAnswers,
        totalQuestions,
      });
    } else {
      this.setState({
        pageIndex,
      });
    }
  }

  handleAnswer = async (answer) => {
    const indexOf = this.state.answers.findIndex(
      (a) =>
        a.pageIndex.toString() === answer.pageIndex.toString() &&
        a.questionIndex.toString() === answer.questionIndex.toString()
    );

    await this.setState((state) => {
      state.answers[indexOf] = {
        ...answer,
      };
      return state;
    });

    const totalAnswers = this.state.answers.filter(
      (answer) =>
        parseInt(answer.integerValue, 10) !== 0 ||
        answer.topicValue.toString() !== "" ||
        answer.commentValue.toString() !== "" ||
        answer.skipValue.toString() !== ""
    ).length;

    this.setState({
      totalAnswers,
    }, () => {
      this.props.onSubmit(null, this.state.answers, false);
    });
  };

  handleCancel = (e) => {
    this.props.onCancel(e);
  };

  handleSubmit = (e) => {
    // console.log(this.state.answers);
    this.props.onSubmit(e, this.state.answers);
  };

  handleClickDriver = (driverId) => {
    const { setSurveyPage } = this.props;
    const { drivers } = this.state;
    var pageIndex = drivers.findIndex((element) => {
      return element.driverId.toString() === driverId.toString();
    });
    setSurveyPage(pageIndex);
  };

  handleOpenEditModal = () => {
    const {
      surveyId,
      surveyUserId,
      user,
      currentSurveyUserId,
      actionStakeholderList,
    } = this.props;

    const { editModal } = this.state;
    if (editModal) {
      actionStakeholderList(surveyUserId, surveyId, (shList) => {
        // console.log(currentSurveyUserId);
        // console.log(shList);

        let cUser = null;
        for (let i = 0; i < shList.length; i++) {
          if (currentSurveyUserId.includes(`${shList[i].userId}_`)) {
            cUser = shList[i];
            break;
          }
        }

        this.setState((state) => ({
          currentUser: cUser ? { ...cUser } : { ...user },
        }));
      });
    }

    this.setState((state) => ({
      editModal: !state.editModal,
    }));
  };

  handleCloseEditModal = () => {
    this.setState({
      editModal: false,
    });
  };

  render() {
    const {
      options,
      answers,
      pageIndex,
      totalAnswers,
      totalQuestions,
      editModal,
      currentUser,
    } = this.state;

    const {
      skipQuestionList,
      user,
      projectTitle,
      myMapCategory,
      projectMapCategory,
      submitLoading,
      mapStyle,
      myMapES,
      projectMapES,
      currentSurveyUserId,
    } = this.props;

    // console.log(myMapCategory);
    // console.log(projectMapCategory);
    // console.log(user);

    const drivers = [...this.state.drivers];

    const defaultDrvierId = drivers.length ? drivers[pageIndex].driverId : 0;
    const driver = drivers.filter((d) => d.driverId === defaultDrvierId)[0];

    for (let i = 0; i < drivers.length; i++) {
      const answeredCount = answers.filter(
        (answer) =>
          parseInt(answer.pageIndex, 10) === i &&
          (parseInt(answer.integerValue, 10) !== 0 ||
            answer.topicValue.toString() !== "" ||
            answer.commentValue.toString() !== "" ||
            answer.skipValue.toString() !== "")
      ).length;

      if (answeredCount === 0) {
        drivers[i].progress = SURVEY_NOT_STARTED;
      } else if (answeredCount < drivers[i].questions.length) {
        drivers[i].progress = SURVEY_IN_PROGRESS;
      } else {
        drivers[i].progress = SURVEY_COMPLETED;
      }
    }

    // console.log(driver);
    // console.log('answers', answers);

    // console.log(currentSurveyUserId);
    const mapES = mapStyle === "my-map" ? myMapES : projectMapES;
    let surveyCompletion = 0;
    let surveySentiment = 0;
    for (let i = 0; i < mapES.individuals.length; i++) {
      // console.log(mapES.individuals[i].id, currentSurveyUserId);
      const individualIds = mapES.individuals[i].id.split("_");
      const currents = currentSurveyUserId.split("_");
      if (individualIds.length < 4 || currents.length < 4) {
        continue;
      }
      // if (mapES.individuals[i].id === currentSurveyUserId) {
      if (
        individualIds[1] === currents[1] &&
        individualIds[3] === currents[3]
      ) {
        surveyCompletion = mapES.individuals[i].survey_completion;
        surveySentiment = mapES.individuals[i].survey_sentiment;
      }
    }

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <div className={styles.title}>
            <span>About Others:</span>
            <div role="button" className={styles.edit}>
              <div onClick={(e) => this.handleOpenEditModal()}>Edit</div>
              {editModal && (
                <div className={styles["stakeholder-update-panel-container"]}>
                  <StakeholderUpdatePanel
                    open={editModal}
                    currentUser={currentUser}
                    myMapCategory={myMapCategory}
                    projectMapCategory={projectMapCategory}
                    onClose={(e) => this.handleCloseEditModal()}
                  />
                </div>
              )}
            </div>
          </div>
          <AvatarComponent
            className={styles["avatar-comp"]}
            userId={user.id}
            title={
              user.projectUserTitle === ""
                ? user.userTitle
                : user.projectUserTitle
            }
            username={user.fullName}
            description={
              (user.projectOrganization
                ? user.projectOrganization
                : user.organisation) +
              " / " +
              user.team
            }
            profilePicUrl={user.userAvatar}
            userProgress={Number(surveyCompletion)}
            progressStyle={{
              background: `${getColorFromValue(Number(surveySentiment) / 10)}`,
            }}
            donut={true}
          />
        </div>

        <div className={styles["driver-section"]}>
          <hr />
          {drivers.length > 1 && (
            <React.Fragment>
              <DriverPanel
                defaultDriverId={defaultDrvierId}
                data={drivers}
                color="black"
                onClick={(e, driverId) => this.handleClickDriver(driverId)}
              />
              <hr />
            </React.Fragment>
          )}
        </div>
        <div className={styles.questions}>
          {driver.questions.map((control, index) => {
            const answer = answers.filter(
              (answer) =>
                answer.pageIndex.toString() === pageIndex.toString() &&
                answer.questionIndex.toString() === index.toString()
            )[0];

            switch (control.controlType) {
              case controlType.SLIDER:
                return (
                  <RangeSlider
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.MULTI_OPTIONS:
                return (
                  <MultipleOptions
                    user={user}
                    type="ao"
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    options={options}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.TWO_OPTIONS:
                return (
                  <TwoOptions
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    options={options}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.TEXT:
                return (
                  <FreeText
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.SMART_TEXT:
                return (
                  <SmartText
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.MULTI_TOPICS:
                return (
                  <MultiTopics
                    user={user}
                    type="ao"
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    options={options}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              default:
                return <div key={`${index}`}></div>;
            }
          })}
        </div>
        <div className={styles.footer}>
          <Button
            variant="contained"
            color="default"
            onClick={(e) => this.handleCancel(e)}
          >
            Back
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            className={styles.green}
            onClick={(e) => this.handleSubmit(e)}
            disabled={submitLoading}
          >
            {submitLoading ? "In progress..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, common, authUser }) => {
  const { pageList, pageIndex } = survey;
  const { skipQuestionList } = common;
  const { projectTitle, projectUserId, surveyId, surveyUserId } = authUser;
  return {
    surveyId,
    surveyUserId,
    surveyList: pageList,
    pageIndex,
    skipQuestionList,
    projectUserId,
    projectTitle,
  };
};

export default connect(mapStateToProps, {
  setSurveyPage: selectPage,
  stakeholderAnswer,
  actionStakeholderList: stakeholderList,
})(AoSurvey);
