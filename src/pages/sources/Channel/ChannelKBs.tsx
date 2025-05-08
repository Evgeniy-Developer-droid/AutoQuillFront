import {useEffect, useState} from 'react';
import apiRequest from "../../../requests";
import {useParams} from "react-router-dom";
import {kbIcons} from "../../tools";

function ChannelKBs(props) {
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [kbs, setKbs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [targetKbId, setTargetKbId] = useState(null);
    const [successSentToast, setSuccessSentToast] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const getKbs = () => {
        apiRequest({
            url: `/api/v1/ai/sources`,
            method: "GET",
            params: {
                page,
                limit,
                channel_id: channelId,
            },
        })
            .then((response) => {
                setKbs(response.data.sources);
                setTotal(response.data.total);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch kbs");
                console.error(error);
            });
    }

    const deleteKb = () => {
        apiRequest({
            url: `/api/v1/ai/sources`,
            method: "DELETE",
            params: {
                source_id: targetKbId,
            },
        })
            .then((response) => {
                setToastMessage(response.data.message);
                setSuccessSentToast(true);
                setDeleteModal(false);
                getKbs();
                setError("");
            })
            .catch((error) => {
                setError("Failed to delete kb");
                console.error(error);
            });
    }

    useEffect(() => {
        getKbs();
    }, []);



    return <>

        <div className="toast toast-top toast-end">
            {successSentToast && <div className="alert alert-success shadow-sm">
                <div>
                    <span>{toastMessage}</span>
                </div>
            </div>}
        </div>

        {deleteModal && <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold">Delete Knowledge Base</h2>
                <p>Are you sure you want to delete this knowledge base?</p>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => {
                        deleteKb();
                    }}>Delete</button>
                    <button className="btn" onClick={() => {
                        setDeleteModal(false);
                        setTargetKbId(null);
                    }}>Cancel</button>
                </div>
            </div>
        </div>}

        <div className="flex justify-between items-center mb-4">
            <button className="btn btn-primary">Create New Source</button>
            <button className="btn btn-secondary" onClick={() => {
                setPage(1);
                setLimit(10);
            }}>Reset Filters</button>
        </div>

        <div className="flex justify-between items-center mb-4">
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
            <div className="flex items-center">
                <label htmlFor="page" className="mr-2">Page:</label>
                <input
                    type="number"
                    id="page"
                    value={page}
                    onChange={(e) => setPage(parseInt(e.target.value))}
                    className="input input-bordered w-16"
                    min={1}
                    max={Math.ceil(total / limit)}
                />
            </div>
        </div>

        {error && <div className="alert alert-error shadow-sm">
            <div>
                <span>{error}</span>
            </div>
        </div>}

        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {kbs.map((kb) => (
                        <tr key={kb.id}>
                            <td>
                                <div className="flex items-center">
                                    <div
                                        className="w-8 h-8 mr-2"
                                        dangerouslySetInnerHTML={{ __html: kbIcons[kb.source_metadata.file_type] }}
                                    />
                                    <span className="font-bold">{kb.source_metadata.file_name}</span>
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-secondary btn-xs m-1" onClick={() => {
                                    setTargetKbId(kb.id);
                                    setDeleteModal(true);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </>
}

export default ChannelKBs;