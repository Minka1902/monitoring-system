export default function ProgressBar({ minValue = 0, value, maxValue = 100, width = 400, isPercent = false, color = '#ffa600' }) {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    const middle = (maxValue + minValue) / 2;

    return (
        <>
            <div className="progress-bar" title={`${percentage}%`} style={{ width: width, '--filler-color': color }}>
                <div
                    className="progress-bar__fill"
                    style={{ width: `${percentage}%` }}>
                </div>
            </div>
            <div className="progress-bar__scales" style={{ width: width }}>
                <p className="progress-bar__scale">{minValue}</p>
                {
                    value >= 100 ?
                        <p className="progress-bar__scale green" style={{ marginLeft: 0 }}>{value}{isPercent ? '%' : ''}</p>
                        :
                        <p className="progress-bar__scale" style={{ marginLeft: ((isPercent ? 4 : 20) * (value - middle)) }}>{value}{isPercent ? '%' : ''}</p>
                }
                <p className="progress-bar__scale">{maxValue}</p>
            </div>
        </>
    );
};
