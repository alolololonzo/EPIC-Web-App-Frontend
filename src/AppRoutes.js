import React from "react";
import {Route, Switch} from "react-router-dom";
import {HiddenRoutes} from "./HiddenRoutes";

import AppHomePage from './webpublic/AppHome';
import UserProfilePage from './webpublic/UserProfile';
import ChangePassword from "./webpublic/ChangePassword";

import WebAdminLoginForm from './webadmin/WebAdminLogin';
import WebAdminHomePage from './webadmin/WebAdminHome';
import AddNewUserPage from './webadmin/Users/AddNewUser';
import DeleteUserPage from './webadmin/Users/DeleteUser';

import StaffLoginForm from './staff/StaffLogin';
import StaffHomePage from './staff/StaffHome';
import ResourceEditorPage from './staff/Resources/ResourceEditor';
import CreateResourcePage from './staff/Resources/CreateResource';
import SPQEditorPage from './staff/SPQ/SPQEditor';
import CreateSurveyPage from './staff/SPQ/CreateSurvey';
import CreatePollPage from './staff/SPQ/CreatePoll';
import CreateQuizPage from './staff/SPQ/CreateQuiz';
import CreateAnnouncementPage from './staff//Announcements/CreateAnnouncement';
import AnnouncementEditorPage from './staff/Announcements/AnnouncementEditor';
import ProgressTrackingPage from './staff/Students/ProgressTracking';
import AddResultPage from './staff/Students/AddResult';
import FeedbackPage from './staff/Students/Feedback';
import ViewAllModulesPage from './staff/Modules/AllModules';
import AddModulePage from './staff/Modules/AddModule';
import RegisterStudentPage from './staff/Modules/RegisterStudent';

import StudentLoginForm from './student/StudentLogin';
import StudentHomePage from './student/StudentHome';
import ProgressPage from './student/Course/Progress';
import ViewModulesPage from "./student/Course/ViewModules";
import ResourcesPage from './student/Resources';
import ResourceTemplatePage from "./templates/ResourceTemplate";
import SPQsPage from './student/SPQs';
import SurveyTemplatePage from "./templates/SurveyTemplate";
import PollTemplatePage from "./templates/PollTemplate";
import QuizTemplatePage from "./templates/QuizTemplate";

/**
 * The application routes.
 *
 * @author Lucy Williams
 * @version 1.0
 */

export default function Routes() {
  return (
    <Switch>
      <Route exact path={["/", "/public/home"]} component={AppHomePage}/>

      <Route exact path="/admin-login" component={WebAdminLoginForm}/>
      <Route exact path="/staff-login" component={StaffLoginForm}/>
      <Route exact path="/student-login" component={StudentLoginForm}/>

      <HiddenRoutes exact path={["/admin/profile", "/staff/profile", "/student/profile"]} component={UserProfilePage}/>
      <HiddenRoutes exact path={["/admin/profile/change-password", "/staff/profile/change-password", "/student/profile/change-password"]} component={ChangePassword}/>

      <HiddenRoutes exact path="/admin/home" component={WebAdminHomePage}/>
      <HiddenRoutes exact path="/admin/users/add-user" component={AddNewUserPage}/>
      <HiddenRoutes exact path="/admin/users/delete-user" component={DeleteUserPage}/>

      <HiddenRoutes exact path="/staff/home" component={StaffHomePage}/>
      <HiddenRoutes exact path="/staff/resources" component={ResourceEditorPage}/>
      <HiddenRoutes exact path="/staff/resources/create-resource" component={CreateResourcePage}/>
      <HiddenRoutes exact path="/staff/spq" component={SPQEditorPage}/>
      <HiddenRoutes exact path="/staff/spq/create-survey" component={CreateSurveyPage}/>
      <HiddenRoutes exact path="/staff/spq/create-poll" component={CreatePollPage}/>
      <HiddenRoutes exact path="/staff/spq/create-quiz" component={CreateQuizPage}/>
      <HiddenRoutes exact path="/staff/announcements/create-announcement" component={CreateAnnouncementPage}/>
      <HiddenRoutes exact path="/staff/announcements" component={AnnouncementEditorPage}/>
      <HiddenRoutes exact path="/staff/students/progress-tracking" component={ProgressTrackingPage}/>
      <HiddenRoutes exact path="/staff/students/feedback" component={FeedbackPage}/>
      <HiddenRoutes exact path="/staff/students/add-results" component={AddResultPage}/>
      <HiddenRoutes exact path="/staff/modules/view-modules" component={ViewAllModulesPage}/>
      <HiddenRoutes exact path="/staff/modules/add-module" component={AddModulePage}/>
      <HiddenRoutes exact path="/staff/modules/register-student" component={RegisterStudentPage}/>

      <HiddenRoutes exact path="/student/home" component={StudentHomePage}/>
      <HiddenRoutes exact path="/student/course/progress-tracking" component={ProgressPage}/>
      <HiddenRoutes exact path="/student/course/view-modules" component={ViewModulesPage}/>
      <HiddenRoutes exact path="/student/resources" component={ResourcesPage}/>
      <HiddenRoutes path="/student/resources/:resourcename" component={ResourceTemplatePage}/>
      <HiddenRoutes exact path="/student/spq" component={SPQsPage}/>
      <HiddenRoutes path="/student/spq/surveys/:surveyname" component={SurveyTemplatePage}/>
      <HiddenRoutes path="/student/spq/polls/:pollname" component={PollTemplatePage}/>
      <HiddenRoutes path="/student/spq/quizzes/:quizname" component={QuizTemplatePage}/>
    </Switch>
  );
}