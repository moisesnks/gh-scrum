// Path: src/Components/PlanningTable/RenderResults.jsx
import CircleProgress from "./CircleProgress";

function RenderResults({ results }) {
    if (!results) {
        return null;
    }

    return (
        <div className="results">
            <div className="results-wrapper">
                <div className="results-container">
                    <div className="results-title">
                        Resultados
                    </div>
                    <div className="results-content">
                        <div className="results-content-item">
                            <div className="results-content-item-title">
                                Max
                            </div>
                            <div className="results-content-item-value">
                                {results.max}
                            </div>
                        </div>
                        <div className="results-content-item">
                            <div className="results-content-item-title">
                                Min
                            </div>
                            <div className="results-content-item-value">
                                {results.min}
                            </div>
                        </div>
                        <div className="results-content-item">
                            <div className="results-content-item-title">
                                Avg
                            </div>
                            <div className="results-content-item-value">
                                {results.avg}
                            </div>
                        </div>
                        <div className="results-content-item">
                            <div className="results-content-item-title">
                                Agreed rate
                            </div>
                            <div className="results-content-item-value">
                                <CircleProgress value={results.agreedRate} size={70} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderResults;