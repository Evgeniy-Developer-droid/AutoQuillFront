import { useEffect, useState } from "react";
import apiRequest from "../requests";
import { useParams } from 'react-router-dom';
import ChannelSettings from "./sources/Channel/ChannelSettings";
import ChannelPosts from "./sources/Channel/ChannelPosts";
import ChannelLogs from "./sources/Channel/ChannelLogs";
import ChannelKBs from "./sources/Channel/ChannelKBs";
import ChannelScheduler from "./sources/Channel/ChannelScheduler";


function Channel( ) {
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [tabs, setTabs] = useState([
        { name: "Details", active: true },
        { name: "Posts", active: false },
        { name: "Knowledge Base", active: false },
        { name: "Scheduler", active: false },
        { name: "Settings", active: false },
        { name: "Logs", active: false },
    ]);

    const [deleteModal, setDeleteModal] = useState(false);

    const [channel, setChannel] = useState(null);

    const getChannel = () => {
        apiRequest({
            url: `/api/v1/channels/${channelId}`,
            method: "GET",
        })
            .then((response) => {
                setChannel(response.data);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch channel");
                console.error(error);
            });
    }

    const updateChannel = (data) => {
        apiRequest({
            url: `/api/v1/channels/${channelId}`,
            method: "PUT",
            body: data,
        })
            .then((response) => {
                setChannel(response.data);
                setError("");
            })
            .catch((error) => {
                setError("Failed to update channel");
                console.error(error);
            });
    }

    useEffect(() => {
        getChannel();
    }, []);

    return <>

            {deleteModal && <div className="modal modal-open">
                <div className="modal-box">
                    <h2 className="text-xl font-bold">Delete Channel</h2>
                    <p>Are you sure you want to delete this channel?</p>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={() => {
                            apiRequest({
                                url: `/api/v1/channels/${channelId}`,
                                method: "DELETE",
                            })
                                .then(() => {
                                    setDeleteModal(false);
                                    window.location.href = "/dashboard/channels";
                                })
                                .catch((error) => {
                                    setError("Failed to delete channel");
                                    console.error(error);
                                });
                        }}>Delete</button>
                        <button className="btn" onClick={() => setDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
                <div className="modal-backdrop" onClick={() => setDeleteModal(false)}></div>
            </div>}

            {error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{error}</span>
                </div>
            </div>}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Channel</h1>
                <div className="flex items-center">
                    <button className="btn btn-secondary"
                        onClick={() => {
                            setDeleteModal(true);
                        }}
                    >Delete</button>
                </div>
            </div>


        <div className="tabs tabs-boxed">
            {tabs.map((tab, index) => (
                <a key={index} className={`tab  text-xl ${tab.active ? "tab-active" : ""}`} onClick={() => {
                    setTabs(tabs.map((t, i) => ({ ...t, active: i === index })));
                }}>
                    {tab.name}
                </a>
            ))}
        </div>

        {
            tabs.map((tab, index) => (
                <div key={index} className={`tab-content ${tab.active ? "block" : "hidden"}`}>
                    {tab.name === "Details" && channel && (
                        <div className={"p-4 bg-base-200"}>
                            <label htmlFor={"channel-name"} className="label">
                                <span className="label-text">Channel Name</span>
                            </label>
                            <input type={"text"} className={"input input-bordered w-full mb-4 text-xl"} placeholder={"Channel Name"} value={channel.name}
                               // on focus out update channel name
                            onBlur={() => {
                                updateChannel({ name: channel.name });
                            }}
                                   onChange={(e) => {
                                        setChannel({ ...channel, name: e.target.value });
                                   }}
                            />
                        </div>
                    )}
                    {tab.name === "Posts" && (
                        <div className={"p-4 bg-base-200"}>
                            <h2 className="text-xl font-bold">Posts</h2>
                            <ChannelPosts/>
                        </div>
                    )}
                    {tab.name === "Scheduler" && (
                        <div className={"p-4 bg-base-200"}>
                            <h2 className="text-xl font-bold">Scheduler</h2>
                            <ChannelScheduler/>
                        </div>
                    )}
                    {tab.name === "Knowledge Base" && (
                        <div className={"p-4 bg-base-200"}>
                            <h2 className="text-xl font-bold">Knowledge Base</h2>
                            <ChannelKBs/>
                        </div>
                    )}
                    {tab.name === "Settings" && (
                        <div className={"p-4 bg-base-200"}>
                            <h2 className="text-xl font-bold">Settings</h2>
                            <ChannelSettings
                                channel_type={channel?.channel_type}
                            />
                        </div>
                    )}
                    {tab.name === "Logs" && (
                        <div className={"p-4 bg-base-200"}>
                            <ChannelLogs/>
                        </div>
                    )}
                </div>
            ))
        }



    </>
}
export default Channel;

