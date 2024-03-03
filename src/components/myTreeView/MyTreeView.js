import React from 'react';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DescriptionIcon from '@mui/icons-material/Description';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { formatName } from '../../constants/functions';
import DataContext from "../../contexts/DataContext";

export default function MyTreeView({ files, onClick }) {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<IndeterminateCheckBoxIcon />}
            defaultExpandIcon={<IndeterminateCheckBoxIcon />}
            defaultEndIcon={<DescriptionIcon />}
            sx={{ height: '100%', flexGrow: 1, maxWidth: 250, overflowY: 'auto' }}
        >
            <TreeItem nodeId='root-node-item' label='All files'>
                {files !== undefined ? files.children.map((entry, index) => (
                    <TreeItem className={entry.name + " " + entry.type} key={`${entry.name}${index}`} onClick={onClick} nodeId={entry.name} label={formatName(entry.name)}>
                        <TreeElement key={`${entry.name}${index}`} entry={entry} onClick={onClick} />
                    </TreeItem>
                )) : <></>}
            </TreeItem>
        </TreeView>
    );
};

function TreeElement({ entry, onClick }) {
    const wellsData = React.useContext(DataContext);
    return (
        entry !== undefined ?
            <div style={{ paddingLeft: `5px` }} >
                {entry.children?.map((entry, index) => (
                    <TreeItem key={`${entry.name}${index}`} onClick={onClick} nodeId={entry.name} className={entry.name + " " + entry.type} label={formatName(entry.name)}>
                        {entry.type === 'directory' && entry.children.length > 0
                            ? <TreeElement entry={entry} onClick={onClick} />
                            : entry.type === 'file' && wellsData ?
                                wellsData[entry.name.slice(entry.name.lastIndexOf('-') + 1, -4)].map((well) => {
                                    return (
                                        <TreeItem key={well.name} nodeId={well.name} className={well.name + ' well'} label={formatName(well.name)}>
                                        </TreeItem>

                                    );
                                })
                                :
                                <></>}
                    </TreeItem>
                ))
                }
            </div >
            :
            <></>
    )
};
