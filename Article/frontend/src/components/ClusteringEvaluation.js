import {useEffect, useState} from "react";
import "./ClusteringEvaluation.css";


const ClusteringEvaluation = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/article/clustering_result/"
            );
            const json = await response.json();
            setData(json);
        };
        fetchData();
    }, []);

    return (
        <div className="clustering-results_container">
            <h3 className="clustering-results_title">
                Clustering evaluation results are as shown below:
            </h3>
            {Object.keys(data).map((item) => (
                <span
                    key={item}
                    className="clustering-items"
                >{`${item}: ${data[item]}`}</span>
            ))}
            <div style={{"textAlign": "center"}} class="result-container">
                <img src="PCA-data.png"></img>
                <img src="TSNE-data.png"></img>
                <img src="k-means_result.png"></img>
            </div>
        </div>
    );
};

export default ClusteringEvaluation;
