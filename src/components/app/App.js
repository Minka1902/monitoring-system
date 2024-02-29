import React from "react";
import MarkersContext from '../../contexts/MarkersContext';
import DataContext from '../../contexts/DataContext';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import faker from "faker";
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
  const [markers, setMarkers] = React.useState(undefined);
  const [wellsData, setWellsData] = React.useState(undefined);
  const [rOIData, setROIData] = React.useState(undefined);
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

  const getReservoir = (path) => {
    if (path && path.slice(-4) === '.csv') {
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
  };

  const mergeObjects = (object1, object2) => {
    if (typeof object1 === 'object' && typeof object1 === 'object') {
      const mergedObject = {};
      for (const key in object1) {
        if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
          mergedObject[key] = object1[key].concat(object2[key]);
        }
      }
      return mergedObject;
    }
  };

  const getWellsData = (folderName = 'brur') => {
    if (folderName !== '') {
      fieldsApiOBJ.getWellsData({ folderName: folderName })
        .then((data) => {
          if (data) {
            if (typeof data === 'object' && data.length > 0) {
              const obj = mergeObjects(data[0], data[1]);
              setWellsData(obj);
            } else {
              setWellsData(data);
            }
            setMarkers(undefined);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onTreeItemClick = (event) => {
    const type = event.target.closest('li').classList[2].toLowerCase();
    const name = event.target.closest('li').classList[1].toLowerCase();
    const parentName = event.target.closest('li').closest('ul').parentElement.classList[1];
    if (type === 'file') {
      getReservoir(pathFromName(name));
    } else {
      if (parentName !== "css-16alkdk-MuiTreeItem-root") {
        getWellsData(parentName !== undefined ? `${parentName}/${name}` : name);
      } else {
        getWellsData(parentName !== undefined ? name : '');
      }
    }
  };


  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!     RESERVOIR handling     !!!!!!!!!!!!
  // ???????????????????????????????????????????????????

  const getGraphData = (name) => {
    if (name) {
      fieldsApiOBJ.getGraphData({ fileName: name })
        .then((data) => {
          if (data) {
            setROIData(data);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        })
    }
  };

  const createGraphData = (howMuchData) => {
    let data = [];
    for (let i = 0; i < howMuchData; i++) {
      let obj = {};
      obj.gas = faker.datatype.number(1500, 10000);
      obj.oil = faker.datatype.number(900, 8000);
      obj.water = faker.datatype.number(600, 6500);
      obj.year = 2000 + i;
      data[i] = obj;
    }
    return data;
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
    getFileStructure();
    getGraphData('return_on_investment.csv')
  }, []); //eslint-disable-line

  return (
    <MarkersContext.Provider value={markers}>
      <DataContext.Provider value={wellsData}>
        <NavOverPage pages={pages} />
        <div className="tree-view__container">
          <MyTreeView files={tree} onClick={onTreeItemClick} />
          <div className="tree-view__border" />
        </div>

        <Switch>
          <Route path='/main'>
            <Main rOIData={rOIData} mainGraphData={createGraphData(25)} />
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
