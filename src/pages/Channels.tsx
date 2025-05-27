import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../requests";
import ChannelNewModal from "./sources/Channel/ChannelNewModal";


function Channels() {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState("");
    const [targetChannel, setTargetChannel] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showNewChannelModal, setShowNewChannelModal] = useState(false);

    const getChannels = () => {
        apiRequest({
            url: "/api/v1/channels",
            method: "GET",
            params: {
                page,
                limit,
            },
        })
            .then((response) => {
                setChannels(response.data.channels);
                setTotal(response.data.total);
                setError("");
            })
            .catch((error) => {
                setError(t("Failed to fetch channels"));
                console.error(error);
            });
    }


    useEffect(() => {
        getChannels();
    }, []);

    useEffect(() => {
        if(!page || !limit) return;
        getChannels();
    }, [page, limit]);

    return <>
            {error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{t(error)}</span>
                </div>
            </div>}

            { showNewChannelModal && <ChannelNewModal closeModal={() => {
                setShowNewChannelModal(false)
                getChannels();
            }} /> }

        { showDeleteModal && <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="font-bold text-base">{t("Delete Channel")}</h2>
                <p>{t("Are you sure you want to delete this channel?")}</p>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => {
                        apiRequest({
                            url: `/api/v1/channels/${targetChannel}`,
                            method: "DELETE",
                        })
                            .then(() => {
                                setError("");
                                setTargetChannel(null);
                                setShowDeleteModal(false);
                                getChannels();
                            })
                            .catch((error) => {
                                setError(t("Failed to delete channel"));
                                console.error(error);
                            });
                    }}>{t("Yes")}</button>
                    <button className="btn" onClick={() => setShowDeleteModal(false)}>{t("No")}</button>
                </div>
            </div>
        </div>}

        <div className="flex justify-start items-center mb-4">
            <h1 className="text-lg font-bold mr-2">{t("Channels")}</h1>
            <button className="btn btn-primary btn-sm" onClick={() => setShowNewChannelModal(true)}>
                {t("Create New Channel")}
            </button>
        </div>
        <div className="flex justify-end mb-4">
            <div className="flex items-center mr-2">
                <label htmlFor="limit" className="mr-2">{t("Limit")}:</label>
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
                <label htmlFor="page" className="mr-2">{t("Page")}:</label>
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
        {
            channels.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table bg-base-300 w-full shadow-sm">
                        <thead>
                            <tr>
                                <th>{t("Channel Name")}</th>
                                <th>{t("Channel Type")}</th>
                                <th>{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channels.map((channel) => (
                                <tr key={channel.id}>
                                    <td>
                                        <a href={`/dashboard/channels/${channel.id}`} className="text-lg">
                                            {channel.name}
                                        </a>
                                    </td>
                                    <td>{channel.channel_type}</td>
                                    <td>
                                        <button className="btn btn-secondary btn-xs m-1" onClick={() => {
                                            setTargetChannel(channel.id);
                                            setShowDeleteModal(true);
                                        }}>
                                            {t("Delete")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info shadow-sm">
                    {t("No channels found.")}
                </div>
            )
        }
    </>
}
export default Channels;

