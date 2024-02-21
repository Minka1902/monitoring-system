import React from "react";
import MarkersContext from '../../contexts/MarkersContext';
import DataContext from '../../contexts/DataContext';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { pages } from '../../constants/constants'
import { pathFromName } from '../../constants/functions';
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
  const [markers, setMarkers] = React.useState([]);
  const [wellsData, setWellsData] = React.useState();
  const history = useHistory();

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!     RESERVOIR handling     !!!!!!!!!!!!
  // ???????????????????????????????????????????????????

  const getFileStructure = () => {
    fieldsApiOBJ.getStructure()
      .then((data) => {
        if (data.tree) {
          setTree(data.tree);
        }
      })
      .catch((err) => {
        console.log({ message: "Couldn't get structure from server.", err });
      });
  };

  const getReservoir = (event) => {
    if (event.target.innerText) {
      const name = event.target.closest('li').classList[1].toLowerCase();
      const path = pathFromName(name);
      if (path.slice(path.length - 4) === '.csv') {
        fieldsApiOBJ.getReservoir({ path: path })
          .then((data) => {
            if (data) {
              setMarkers(data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const getWellsData = (event) => {
    fieldsApiOBJ.getWellsData({ folderName: "brur" })
      .then((data) => {
        if (data) {
          setWellsData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     INIT handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????

  React.useEffect(() => {
    getWellsData();
    getFileStructure();
  }, []); //eslint-disable-line

  return (
    <MarkersContext.Provider value={markers}>
      <DataContext.Provider value={wellsData}>
        <NavOverPage pages={pages} />
        <div className="tree-view__container">
          <MyTreeView files={tree} onClick={getReservoir} />
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
      </DataContext.Provider>
    </MarkersContext.Provider>
  );
};
export default withRouter(App);
