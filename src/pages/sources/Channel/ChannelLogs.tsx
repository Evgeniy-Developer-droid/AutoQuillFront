import { useEffect, useState } from "react";
import apiRequest from "../../../requests";
import { useParams } from 'react-router-dom';


function ChannelLogs() {
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [total, setTotal] = useState(0);

    const getLogs = () => {
        apiRequest({
            url: `/api/v1/channels/${channelId}/logs`,
            method: "GET",
            params: {
                page,
                limit,
                channel_id: channelId,
            },
        })
            .then((response) => {
                setLogs(response.data.logs);
                setTotal(response.data.total);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch logs");
                console.error(error);
            });
    }

    useEffect(() => {
        getLogs();
    }, []);

    return <>
        {error && <div className="alert alert-error shadow-sm">
            <div>
                <span>{error}</span>
            </div>
        </div>}
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
                <label htmlFor="limit" className="mr-2">Limit:</label>
                <select
                    id="limit"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    className="select select-bordered"
                >
                    {[10, 20, 50, 100].map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary ml-4" onClick={getLogs}>Refresh</button>
        </div>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Post</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{new Date(log.created_at).toLocaleString()}</td>
                            <td><b>{log.post_id}</b></td>
                            <td>{log.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default ChannelLogs;