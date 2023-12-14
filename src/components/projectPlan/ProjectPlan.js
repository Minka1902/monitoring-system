import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function ProjectPlan() {
    return (
        <section id="projectPlan">
            <div className="tree-view__container">
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: '100%', flexGrow: 1, maxWidth: 200, overflowY: 'auto' }}
                >
                    <TreeItem nodeId="13" label="All files">
                        <TreeItem nodeId="1" label="Field 1">
                        </TreeItem>
                        <TreeItem nodeId="2" label="Field 2">
                        </TreeItem>
                        <TreeItem nodeId="3" label="Field 3">
                            <TreeItem nodeId="4" label="res 1">
                            </TreeItem>
                            <TreeItem nodeId="5" label="res 2">
                                <TreeItem nodeId="6" label="Production">
                                </TreeItem>
                                <TreeItem nodeId="7" label="Test">
                                </TreeItem>
                                <TreeItem nodeId="8" label="Drilling">
                                    <TreeItem nodeId="9" label="Well 1">
                                    </TreeItem>
                                    <TreeItem nodeId="10" label="Well 2">
                                    </TreeItem>
                                    <TreeItem nodeId="11" label="Well 3">
                                    </TreeItem>
                                    <TreeItem nodeId="12" label="Well 4">
                                    </TreeItem>
                                </TreeItem>
                            </TreeItem>
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </div>

            <div className="projectPlan__tree-view__border" />
            <div className="projectPlan__content__container">
                <h2>Project plan content</h2>
            </div>
        </section >
    );
};
