import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { formatName } from '../../constants/functions';

export default function MyTreeView({ files, onClick }) {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultEndIcon={<DescriptionIcon />}
            sx={{ height: '100%', flexGrow: 1, maxWidth: 250, overflowY: 'auto' }}
        >
            {files !== undefined ? files.children.map((entry, index) => (
                <TreeItem className={entry.name} key={`${entry.name}${index}`} onClick={onClick} nodeId={entry.name} label={formatName(entry.name)}>
                    <TreeElement key={`${entry.name}${index}`} entry={entry} onClick={onClick} />
                </TreeItem>
            )) : <></>}
        </TreeView>
    );
};

function TreeElement({ entry, onClick }) {
    return (
        entry !== undefined ?
            <div style={{ paddingLeft: `5px` }} >
                {entry.children?.map((entry, index) => (
                    <TreeItem key={`${entry.name}${index}`} onClick={onClick} nodeId={entry.name} className={entry.name} label={formatName(entry.name)}>
                        {entry.type === 'directory' && entry.children.length > 0
                            ? <TreeElement entry={entry} onClick={onClick} />
                            : <></>}
                    </TreeItem>
                ))}
            </div>
            :
            <></>
    )
};
