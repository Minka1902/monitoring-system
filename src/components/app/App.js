import React from "react";
import MarkersContext from '../../contexts/MarkersContext';
import DataContext from '../../contexts/DataContext';
import GraphDataContext from '../../contexts/GraphDataContext';
import PageDataContext from "../../contexts/PageDataContext";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { pages } from '../../constants/constants'
import { pathFromName, findNodePathByName } from '../../constants/functions';
import NavOverPage from "../navOverPage/NavOverPage";
import MyTreeView from "../myTreeView/MyTreeView";
import Main from "../main/Main";
import Geology from "../geology/Geology";
import Production from "../production/Production";
import Drilling from "../drilling/Drilling";
import ProjectPlan from "../projectPlan/ProjectPlan";
import RightClickMenu from '../rightClickMenu/RightClickMenu';
import fieldsApiOBJ from "../../utils/fieldsAPI";
import dataApiOBJ from "../../utils/dataApi";

function App() {
  // const safeDocument = typeof document !== 'undefined' ? document : {};
  // const html = safeDocument.documentElement;
  const [tree, setTree] = React.useState({ name: 'root', type: 'directory', children: [], });
  const [markers, setMarkers] = React.useState(undefined);
  const [wellsData, setWellsData] = React.useState(undefined);
  const [graphData, setGraphData] = React.useState(undefined);
  const [pageData, setPageData] = React.useState(undefined);
  const history = useHistory();

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!     STRUCTURE handling     !!!!!!!!!!!!
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

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!     RESERVOIR handling     !!!!!!!!!!!!
  // ???????????????????????????????????????????????????
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
    // const pathToNode = findNodePathByName(tree, name.toUpperCase());
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
  // !!!!!!!!!!!!!     GRAPH handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const getGraphData = (name) => {
    if (name) {
      fieldsApiOBJ.getGraphData({ fileName: name })
        .then((data) => {
          if (data) {
            let temp = {};
            temp[data.name] = data.value;
            for (const prop in graphData) {
              if (prop !== data.name) {
                temp[prop] = graphData[prop];
              }
            }
            setGraphData(temp);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        })
    }
  };

  const getPageGraphData = (page, array) => {
    if (page) {
      fieldsApiOBJ.getPageGraphData({ page })
        .then((data) => {
          if (data) {
            setGraphData(data);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        })

      dataApiOBJ.initPage({ dataNames: array, wellNames: ['HELETZ_1', 'heletz1'] })
        .then((data) => {
          if (data) {
            setPageData(data);
          }
        }).catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ROUTE handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const handleRefreshClicked = (item) => {
    if (item.evt.target.parentElement.parentElement.parentElement.classList.length > 0) {
      const fileName = item.evt.target.parentElement.parentElement.parentElement.classList[1];
      getGraphData(`${fileName}.csv`);
    } else {
      if (item.evt.target.parentElement.classList.length > 0) {
        const fileName = item.evt.target.parentElement.classList[1];
        getGraphData(`${fileName}.csv`);
      }
    }
  };

  const rightClickItems = [
    { buttonText: 'refresh', buttonClicked: handleRefreshClicked, filter: 'canvas', isAllowed: true },
  ];

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     INIT handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  React.useEffect(() => {
    history.push('/main');
    getFileStructure();
    getPageGraphData('main');
  }, []); //eslint-disable-line

  React.useEffect(() => {
    dataApiOBJ.initPage({ dataNames: ['polygons'], wellNames: ['HELETZ_1', 'asd_1'] })
      .then((data) => {
        if (data) {
          setPageData(data);
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, []); //eslint-disable-line

  return (
    <MarkersContext.Provider value={markers}>
      <DataContext.Provider value={wellsData}>
        <GraphDataContext.Provider value={graphData}>
          <PageDataContext.Provider value={pageData}>
            <NavOverPage pages={pages} onClick={getPageGraphData} />
            <div className="tree-view__container">
              <MyTreeView files={tree} onClick={onTreeItemClick} />
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
          </PageDataContext.Provider>
        </GraphDataContext.Provider>
      </DataContext.Provider>
    </MarkersContext.Provider>
  );
};
export default withRouter(App);
