import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function MyTreeView({ files }) {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultEndIcon={<DescriptionIcon />}
            sx={{ height: '100%', flexGrow: 1, maxWidth: 250, overflowY: 'auto' }}
        >
            {files !== undefined ? files.children.map((entry, index) => (
                <TreeItem nodeId={entry.name} label={entry.name}>
                    <TreeElement key={`${entry.name}${index}`} entry={entry} />
                </TreeItem>
            )) : <></>}
        </TreeView>
    );
}

function TreeElement({ entry }) {
    return (
        entry !== undefined ?
            <div style={{ paddingLeft: `5px` }} >
                {entry.children?.map((entry, index) => (
                    entry.type === 'directory' && entry.children.length > 0 ?
                        <TreeItem nodeId={entry.name} label={entry.name}>
                            <TreeElement key={`${entry.name}${index}`} entry={entry} />
                        </TreeItem>
                        :
                        <TreeItem nodeId={`${entry.name}${index}`} label={entry.name}>
                        </TreeItem>
                ))}
            </div>
            :
            <></>
    )
}
