import React from "react";
import ProgressBar from "../progressBar/ProgressBar";
import { Minimize } from "@mui/icons-material";

export function TableStandard(props) {
    const { tableHeaders, data, color = '#f2f2f2' } = props;
    return (
        <div className="table-container">
            <table style={{ '--bg-color': color }}>
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => {
                            return <th key={index}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.fieldName}</td>
                            <td>{item.object.objectName}</td>
                            <td>{item.object.minBbl}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>TOTAL Object 1</td>
                        <td></td>
                        <td>67</td>
                    </tr>
                    <tr>
                        <td>TOTAL Object 2</td>
                        <td></td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td>TOTAL</td>
                        <td></td>
                        <td>123</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export function TableProgress(props) {
    const { data, color = '#f2f2f2' } = props;
    return (
        <div className="table-container">
            <table style={{ '--bg-color': color }}>
                <thead>
                    <tr>
                        <td style={{ width: '100px' }}>Stage</td>
                        <td style={{ width: '150px' }}>Name</td>
                        <td style={{ width: '100px' }}>Commitment</td>
                        <td style={{ width: '50px' }}>Actual</td>
                        <td style={{ width: '250px' }}>Progress</td>
                    </tr>
                </thead>
                <tbody>

                    {data.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.stage}</td>
                            <td>{item.name}</td>
                            <td>{item.commitment}</td>
                            <td>{item.actual}</td>
                            <td>
                                <ProgressBar width='100%' value={item.value} isPercent={true} color="green" />
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};
