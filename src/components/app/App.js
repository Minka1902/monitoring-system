import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
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
      <div className="tree-view__container">
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: '100%', flexGrow: 1, maxWidth: 250, overflowY: 'auto' }}
        >
          <TreeItem nodeId="1" label="All files">
            <TreeItem nodeId="2" label="Heletz">
              <TreeItem nodeId="7" label="Lower Cretaceous A">
              </TreeItem>
              <TreeItem nodeId="8" label="Lower Cretaceous B">
              </TreeItem>
            </TreeItem>
            <TreeItem nodeId="3" label="Kochav">
              <TreeItem nodeId="9" label="Lower Cretaceous">
              </TreeItem>
              <TreeItem nodeId="10" label="Upper Jurassic">
              </TreeItem>
            </TreeItem>
            <TreeItem nodeId="4" label="Brur">
              <TreeItem nodeId="11" label="Lower Cretaceous">
              </TreeItem>
            </TreeItem>
            <TreeItem nodeId="5" label="Sifra North">
              <TreeItem nodeId="12" label="Upper Triassic">
              </TreeItem>
              <TreeItem nodeId="13" label="Middle Triassic">
              </TreeItem>
              <TreeItem nodeId="14" label="Upper Permian">
              </TreeItem>
            </TreeItem>
            <TreeItem nodeId="6" label="Sifra West">
              <TreeItem nodeId="15" label="Upper Jurassic">
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
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
