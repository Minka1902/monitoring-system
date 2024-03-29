import React from "react";
import DataContext from '../../contexts/DataContext';
import GraphDataContext from '../../contexts/GraphDataContext';
import PageDataContext from "../../contexts/PageDataContext";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { pages } from '../../constants/constants';
import NavOverPage from "../navOverPage/NavOverPage";
import MyTreeView from "../myTreeView/MyTreeView";
import Main from "../main/Main";
import Geology from "../geology/Geology";
// import Production from "../production/Production";
import Production from "../production/TempProduction";
import Drilling from "../drilling/Drilling";
import ProjectPlan from "../projectPlan/ProjectPlan";
import RightClickMenu from '../rightClickMenu/RightClickMenu';
import fieldsApiOBJ from "../../utils/fieldsAPI";
import dataApiOBJ from "../../utils/dataApi";

function App() {
  // const safeDocument = typeof document !== 'undefined' ? document : {};
  // const html = safeDocument.documentElement;
  const [tree, setTree] = React.useState({ name: 'root', type: 'directory', children: [], });
  const [wellsData, setWellsData] = React.useState(undefined);
  const [graphData, setGraphData] = React.useState(undefined);
  const [pageData, setPageData] = React.useState(undefined);
  const [wellNames, setWellNames] = React.useState(["Brur_1", "Brur_10", "Brur_2", "Brur_5", "Heletz_1", "Heletz_9", "Heletz_11", "Heletz_35"]);
  const [polyName, setPolyName] = React.useState('all');
  const pageResourcesNeeded = {
    main: ['polygons', 'prod_300', 'safety', 'return_on_investment', 'seismic', 'reserves'],
    geology: ['polygons'],
    production: ['polygons', 'prod_300', 'well_schemes'],
    drilling: ['polygons', 'las', 'well_testing', 'time_depth'],
    "project-plan": ['polygons'],
  };
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

  function getNodeByPath(nodePath) {
    const pathNodes = nodePath.split('/').filter(node => node !== '');

    function findNode(node, currentIndex) {
      if (currentIndex === pathNodes.length - 1) {
        return node;
      }

      if (node.children) {
        for (const child of node.children) {
          if (child.name === pathNodes[currentIndex + 1]) {
            return findNode(child, currentIndex + 1);
          }
        }
      }

      return null;
    }

    return findNode(tree, 0);
  };

  function getLastBranches(node) {
    // Base case: If the node has no children, it's a last branch
    if (node) {
      if (!node.children || node.children.length === 0) {
        return [node];
      }

      // Recursive case: Traverse the children and collect last branches
      let lastBranches = [];
      for (const child of node.children) {
        const childBranches = getLastBranches(child);
        lastBranches = lastBranches.concat(childBranches);
      }
      return lastBranches;
    }
  }

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!     RESERVOIR handling     !!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const getReservoir = (path, wellName = '') => {
    if (path && path.slice(-4) === '.csv') {
      fieldsApiOBJ.getReservoir({ path: path })
        .then((data) => {
          if (data) {
            if (wellName === '') {
              setWellsData(data);
            } else {
              const result = { drilling: [], production: [], test: [] };
              const key = path.slice(path.lastIndexOf('-') + 1, -4);
              for (let i = 0; i < data[key].length; i++) {
                if (data[key][i].name.toLowerCase() === wellName.toLowerCase()) {
                  result[key].push(data[key][i]);
                  break;
                }
              }
              setWellsData(result);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function mergeObjects(arrayOfObjects) {
    const combinedObject = { drilling: [], test: [], production: [] };
    for (let obj of arrayOfObjects) {
      if (obj) {
        for (let key in obj) {
          if (obj[key] && obj[key].length > 0) {
            for (let i = 0; i < obj[key].length; i++) {
              combinedObject[key].push(obj[key][i]);
            }
          }
        }
      }
    }

    return combinedObject;
  };

  const getWellsData = (folderName = '') => {
    if (folderName !== '') {
      fieldsApiOBJ.getWellsData({ folderName: folderName })
        .then((data) => {
          if (data) {
            if (typeof data === 'object' && data.length > 0) {
              const obj = mergeObjects(data);
              setWellsData(obj);
            } else {
              setWellsData(data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const createNamesArray = (array) => {
    let temp = [];
    for (let i = 0; i < array.length; i++) {
      temp[i] = array[i].name;
    }
    return temp;
  };

  const onTreeItemClick = (event) => {
    const type = event.target.closest('li').classList[2].toLowerCase();
    const name = event.target.closest('li').classList[1].toLowerCase();
    if (event.target.closest('li').childNodes[1]) {
      const listToHide = event.target.closest('li').childNodes[1];
      if (listToHide.style) {
        listToHide.style.display = '';
      }
    }
    if (type === 'well') {
      let id = event.target.closest('li').id;
      var nodePath = id.slice(5, id.indexOf('@'));
    } else {
      var nodePath = event.target.closest('li').id.slice(5);
    }
    if (nodePath.slice(nodePath.indexOf(12, '/') + 1).toLowerCase()) {
      if (nodePath.indexOf('/', 13) === -1 && pageData.polygons[name]) {
        setPolyName(name);
      } else {
        const tempPolyName = nodePath.slice(nodePath.indexOf('/', 2) + 1, nodePath.indexOf('/', 13));
        if (pageData.polygons && pageData.polygons[tempPolyName]) {
          setPolyName(tempPolyName);
        }
      }
    }
    let names;
    if (type !== 'well') {
      names = createNamesArray(getLastBranches(getNodeByPath(nodePath)));
    } else {
      names = [name];
    }
    setWellNames(names);
    if (type !== 'well') {
      if (type === 'file') {
        getReservoir(nodePath);
        getPageData(history.location.pathname.slice(1), names, event.target);
      } else {
        getWellsData(nodePath.slice(nodePath.indexOf('/', 1)));
        getPageData(history.location.pathname.slice(1), names, event.target);
      }
    } else {
      getReservoir(nodePath, name);
      getPageData(history.location.pathname.slice(1), names, event.target);
    }
  };

  const setPolyNameAll = () => {
    setPolyName('all');
  };

  const initWells = () => {
    fieldsApiOBJ.initWells()
      .then((data) => {
        if (data) {
          setWellsData(data);
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     DATA handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const getPageData = (page = 'main', names = undefined, target) => {
    setPageData(null);
    dataApiOBJ.initPage({ dataNames: pageResourcesNeeded[page], wellNames: names === undefined ? wellNames : names })
      .then((data) => {
        // if (target && target.className === "MuiTreeItem-label") {
        //   const listToHide = target.closest('li').childNodes[1];
        //   if (listToHide) {
        //     if (listToHide.style.display === 'none') {
        //       listToHide.style.display = "";
        //     } else {
        //       listToHide.style.display = "none";
        //     }
        //   }
        // }
        if (data) {
          setPageData(data);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ROUTE handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const handleRefreshClicked = () => { };

  const rightClickItems = [
    { buttonText: 'refresh', buttonClicked: handleRefreshClicked, filter: 'canvas', isAllowed: true },
  ];

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     INIT handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  React.useEffect(() => {
    history.push('/main');
    getFileStructure();
    getPageData();
    initWells();
  }, []); //eslint-disable-line

  return (
    <DataContext.Provider value={wellsData}>
      <GraphDataContext.Provider value={graphData}>
        <PageDataContext.Provider value={pageData}>
          <NavOverPage pages={pages} onClick={getPageData} />
          <div className="tree-view__container">
            <MyTreeView files={tree} onClick={onTreeItemClick} allFieldsClick={setPolyNameAll} />
            <div className="tree-view__border" />
          </div>
          <Switch>
            <Route path='/main'>
              <Main polyName={polyName} />
            </Route>

            <Route path='/geology'>
              <Geology />
            </Route>

            <Route path='/production'>
              <Production polyName={polyName} />
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
  );
};
export default withRouter(App);
