import React from "react";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { pages } from '../../constants/constants'
import NavOverPage from "../navOverPage/NavOverPage";
import Main from "../main/Main";
import Geology from "../geology/Geology";
import Production from "../production/Production";
import Drilling from "../drilling/Drilling";
import ProjectPlan from "../projectPlan/ProjectPlan";
import RightClickMenu from '../rightClickMenu/RightClickMenu';

function App() {
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ROUTE handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const rightClickItems = [
    { buttonText: 'sign out', buttonClicked: () => console.log('Right click'), filter: 'root', isAllowed: true },
  ];

  React.useEffect(() => {
    history.push('/main');
  }, [])

  return (
    <>
      <NavOverPage pages={pages} />

      <Switch>
        <Route path='/main'>
          <Main />
        </Route>

        <Route path='/geology'>
          <Geology />
        </Route>

        <Route path='/production'>
          <Production />
        </Route>

        <Route path='/drilling'>
          <Drilling />
        </Route>

        <Route path='/project-plan'>
          <ProjectPlan />
        </Route>
      </Switch>
      <RightClickMenu items={rightClickItems} isLoggedIn={true} />
    </>
  );
};
export default withRouter(App);
