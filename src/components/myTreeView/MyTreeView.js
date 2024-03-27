import React from 'react';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DescriptionIcon from '@mui/icons-material/Description';
import { styled } from '@mui/material/styles';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { formatName } from '../../constants/functions';

const StyledTreeItem = styled(TreeItem)(() => ({
    [`& .${treeItemClasses.content}`]: {
        [`& .${treeItemClasses.label}`]: {
            fontSize: '24px',
            fontFamily: 'SLBSans, Arial, Helvetica',
        },
    },
}));

export default function MyTreeView({ files, onClick, allFieldsClick }) {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<IndeterminateCheckBoxIcon />}
            defaultExpandIcon={<IndeterminateCheckBoxIcon />}
            defaultEndIcon={<DescriptionIcon />}
            sx={{ height: '100%', flexGrow: 1, maxWidth: 350, overflowY: 'auto' }}
        >
            <StyledTreeItem nodeId="/forTreeView" className='forTreeView directory' label='All fields' onClick={allFieldsClick}>
                {files !== undefined ? files.children.map((entry, index) => (
                    <StyledTreeItem className={entry.name + " " + entry.type} key={`${entry.name}${index}`} onClick={onClick} nodeId={entry.path} label={formatName(entry.name)}>
                        <TreeElement key={`${entry.name}${index}`} entry={entry} onClick={onClick} />
                    </StyledTreeItem>
                )) : <></>}
            </StyledTreeItem>
        </TreeView>
    );
};

function TreeElement({ entry, onClick }) {
    const onBlurEvent = (event) => { };

    return (
        entry !== undefined ?
            <div style={{ paddingLeft: `5px` }} >
                {entry.children?.map((entry, index) => (
                    <StyledTreeItem key={`${entry.name}${index}`} onBlur={onBlurEvent} onClick={onClick} nodeId={entry.path && !entry.parentPath ? entry.path : entry.parentPath + '@' + entry.name} className={entry.name + " " + entry.type} label={formatName(entry.name)}>
                        {entry.children?.map((entry, index) => (
                            <StyledTreeItem key={`${entry.name}${index}`} onBlur={onBlurEvent} onClick={onClick} nodeId={entry.path && !entry.parentPath ? entry.path : entry.parentPath + '@' + entry.name} className={entry.name + " " + entry.type} label={formatName(entry.name)}>
                                {entry.children && entry.children.length > 0
                                    ? <TreeElement entry={entry} onClick={onClick} />
                                    : <></>}
                            </StyledTreeItem>
                        ))}
                    </StyledTreeItem>
                ))}
            </div>
            :
            <></>
    )
};
