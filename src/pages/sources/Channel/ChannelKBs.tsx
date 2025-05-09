import {useEffect, useState} from 'react';
import apiRequest, {apiRequestFormData} from "../../../requests";
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
    const [createModal, setCreateModal] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [createType, setCreateType] = useState("file");
    const [createFile, setCreateFile] = useState(null);
    const [createDocument, setCreateDocument] = useState(null);

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

    const CreateKbFile = () => {
        const formData = new FormData();
        formData.append("file", createFile);
        apiRequestFormData({
            url: `/api/v1/ai/files`,
            method: "POST",
            body: formData,
            params: {
                channel_id: channelId,
            }
        })
            .then((response) => {
                setToastMessage(response.data.message);
                setSuccessSentToast(true);
                setCreateModal(false);
                getKbs();
                setError("");
            })
            .catch((error) => {
                setError("Failed to create kb");
                console.error(error);
            });
    }

    const CreateKbDocument = () => {
        apiRequest({
            url: `/api/v1/ai/documents`,
            method: "POST",
            params: {
                channel_id: channelId,
            },
            body: {
                text: createDocument,
            }
        })
            .then((response) => {
                setToastMessage(response.data.message);
                setSuccessSentToast(true);
                setCreateModal(false);
                getKbs();
                setError("");
            })
            .catch((error) => {
                setError("Failed to create kb");
                console.error(error);
            });
    }

    useEffect(() => {
        getKbs();
    }, []);

    useEffect(() => {
        if(!page || !limit) return;
        getKbs();
    }, [page, limit]);

    useEffect(() => {
        if (!successSentToast){
            const timeout = setTimeout(() => {
                setSuccessSentToast(false);
                clearTimeout(timeout);
            }, 3000);
        }
    }, [successSentToast]);



    return <>

        <div className="toast toast-top toast-end">
            {successSentToast && <div className="alert alert-success shadow-sm">
                <div>
                    <span>{toastMessage}</span>
                </div>
            </div>}
        </div>

        {createModal && <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold">Create Knowledge Base</h2>
                <div className="form-control">
                    <label className="label cursor-pointer m-2">
                        <span className="label-text">File</span>
                        <input type="radio" name="createType" value="file" checked={createType === "file"} onChange={() => setCreateType("file")} className="radio" />
                    </label>
                    <label className="label cursor-pointer m-2">
                        <span className="label-text">Document</span>
                        <input type="radio" name="createType" value="document" checked={createType === "document"} onChange={() => setCreateType("document")} className="radio" />
                    </label>
                    {createType === "file" && <div className={"flex flex-col items-center"}>
                        <input type="file" onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setCreateFile(e.target.files[0]);
                            }
                        }} />
                        <span className="text-sm text-gray-500">File size limit: 10MB</span>
                        <span className="text-sm text-gray-500">Supported formats: pdf, txt, md</span>
                    </div>}
                    {createType === "document" && <div className={"flex flex-col items-center"}>
                        <textarea className="textarea textarea-bordered w-full h-32" placeholder="Enter document text" onChange={(e) => {
                            setCreateDocument(e.target.value);
                        }}></textarea>
                        <span className="text-sm text-gray-500">Max 5000 characters</span>
                    </div>}
                </div>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => {
                        if (createType === "file") {
                            CreateKbFile();
                        } else {
                            CreateKbDocument();
                        }
                    }}>Create</button>
                    <button className="btn" onClick={() => {
                        setCreateModal(false);
                        setTargetKbId(null);
                    }}>Cancel</button>
                </div>
            </div>
        </div>}

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
            <button className="btn btn-primary"
                onClick={() => {
                    setCreateModal(true);
                }}
            >Create New Source</button>
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