import { useEffect, useState } from "react";
import apiRequest from "../../requests";

function ChannelNewModal({closeModal}) {
    const [name, setName] = useState("");
    const [channelType, setChannelType] = useState("telegram");
    const [error, setError] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!name) {
            setError("Channel name is required");
            return;
        }
        apiRequest({
            url: "/api/v1/channels",
            method: "POST",
            body: {
                name,
                channel_type: channelType,
            },
        })
            .then((response) => {
                closeModal();
                setError("");
            })
            .catch((error) => {
                setError("Failed to create channel");
                console.error(error);
            });
    }


    return <>
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="font-bold text-lg">Create New Channel</h2>
                {error && <div className="alert alert-error shadow-sm">
                    <div>
                        <span>{error}</span>
                    </div>
                </div>}
                <form className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Channel Name</span>
                    </label>
                    <input type="text" placeholder="Enter channel name" className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="label">
                        <span className="label-text">Channel Type</span>
                    </label>
                    <select className="select select-bordered w-full"
                        value={channelType}
                        onChange={(e) => setChannelType(e.target.value)}
                    >
                        <option value="telegram">Telegram</option>
                        <option value="api">API</option>
                    </select>
                    <button type="submit" className="btn btn-primary mt-4"
                        onClick={submit}
                    >Create</button>
                </form>
                <div className="modal-action">
                    <button onClick={closeModal} className="btn">Close</button>
                </div>
            </div>
        </div>
    </>
}

export default ChannelNewModal;