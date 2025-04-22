import { useEffect, useState } from "react";
import apiRequest from "../../requests";
import { useParams } from 'react-router-dom';

function ChannelSettings({ channel_type }) {
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [formConfig, setFormConfig] = useState({});

    const [successToast, setSuccessToast] = useState(false);

    useEffect(() => {
        apiRequest({
            url: `/api/v1/channels/${channelId}`,
            method: "GET",
        })
            .then((response) => {
                setFormConfig(response.data.config_json);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch channel");
                console.error(error);
            });
    }, []);

    const updateChannel = () => {
        apiRequest({
            url: `/api/v1/channels/${channelId}`,
            method: "PUT",
            body: {
                config_json: formConfig,
            },
        })
            .then((response) => {
                setFormConfig(response.data.config_json);
                setSuccessToast(true);
                setError("");
                setTimeout(() => {
                    setSuccessToast(false);
                }, 3000);
            })
            .catch((error) => {
                setError("Failed to update channel");
                console.error(error);
            });
    }


    return <>
        <div className="toast toast-top toast-end">
            {successToast && <div className="alert alert-success shadow-sm">
                <div>
                    <span>Channel settings updated successfully</span>
                </div>
            </div>}
        </div>
        <h3 className={"font-bold mb-4"}>Channel Type: {channel_type}</h3>

        {
            error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{error}</span>
                </div>
            </div>
        }

        {
            channel_type === "telegram" && <div className="flex flex-col gap-4">
                <label className="label">
                    <span className="label-text">Telegram Bot Token</span>
                    <input type="text" placeholder="Telegram Bot Token" className="input input-bordered w-full"
                        value={formConfig?.telegram_bot_token}
                        onChange={(e) => {
                            setFormConfig({ ...formConfig, telegram_bot_token: e.target.value });
                        }}
                       onBlur={updateChannel}
                    />
                </label>
                <label className="label">
                    <span className="label-text">Telegram Channel ID</span>
                    <input type="text" placeholder="Telegram Channel ID" className="input input-bordered w-full"
                        value={formConfig?.telegram_channel_id}
                        onChange={(e) => {
                            setFormConfig({ ...formConfig, telegram_channel_id: e.target.value });
                        }}
                        onBlur={updateChannel}
                    />
                </label>
                <label className="label">
                    <span className="label-text">Telegram Formatting Type</span>
                    <select className="select select-bordered w-full"
                        value={formConfig?.parse_mode}
                        onChange={(e) => {
                            setFormConfig({ ...formConfig, parse_mode: e.target.value });
                        }}
                        onBlur={updateChannel}
                    >
                        <option value="markdown">Markdown</option>
                        <option value="html">HTML</option>
                    </select>
                </label>
            </div>
        }

    </>;
}

export default ChannelSettings;