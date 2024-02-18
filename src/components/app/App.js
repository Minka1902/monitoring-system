import React from "react";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { pages } from '../../constants/constants'
import { findElementByName } from '../../constants/functions';
import NavOverPage from "../navOverPage/NavOverPage";
import MyTreeView from "../myTreeView/MyTreeView";
import Main from "../main/Main";
import Geology from "../geology/Geology";
import Production from "../production/Production";
import Drilling from "../drilling/Drilling";
import ProjectPlan from "../projectPlan/ProjectPlan";
import RightClickMenu from '../rightClickMenu/RightClickMenu';
import fieldsApiOBJ from "../../utils/fieldsAPI";

function App() {
  // const safeDocument = typeof document !== 'undefined' ? document : {};
  // const html = safeDocument.documentElement;
  const [tree, setTree] = React.useState({ name: 'root', type: 'directory', children: [], });
  const history = useHistory();

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!     RESERVOIR handling     !!!!!!!!!!!!
  // ???????????????????????????????????????????????????

  React.useEffect(() => {
    fieldsApiOBJ.getStructure()
      .then((data) => {
        if (data.tree) {
          setTree(data.tree);
        }
      })
      .catch((err) => {
        console.log({ message: "Couldn't get structure from server.", err });
      })
  }, []); //eslint-disable-line

  const getReservoir = (event) => {
    if (event.target.innerText) {
      fieldsApiOBJ.getReservoir({ path: '/brur/lower_cretaceous/drilling.csv' })
        .then((data) => {
          if (data) {

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ROUTE handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const rightClickItems = [
    { buttonText: 'sign out', buttonClicked: () => console.log('Right click'), filter: 'root', isAllowed: true },
  ];

  React.useEffect(() => {
    history.push('/main');
  }, [])  //eslint-disable-line

  return (
    <>
      <NavOverPage pages={pages} />
      <div className="tree-view__container">
        <MyTreeView files={tree} onElementClick={getReservoir} />
        <div className="tree-view__border" />
      </div>

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
