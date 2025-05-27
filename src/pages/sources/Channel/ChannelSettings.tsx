import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../../../requests";
import { useParams } from 'react-router-dom';
import ChannelAiConfig from "./ChannelAIConfig";

function ChannelSettings({ channel_type }) {
    const { t } = useTranslation();
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
                if (response.status !== 200) {
                    setError(t(response.data.detail[0].msg));
                    return;
                }
                setFormConfig(response.data.config_json);
                setError("");
            })
            .catch((error) => {
                setError(t("Failed to fetch channel"));
                console.error(error);
            });
    }, []);

    const updateChannel = () => {
        // validate by start with @ or -
        if (channel_type === "telegram" && !formConfig.telegram_channel_id) {
            setError(t("Telegram Channel ID is required"));
            return;
        }
        if (channel_type === "telegram"){
            if(!formConfig.telegram_channel_id.startsWith("@") && !formConfig.telegram_channel_id.startsWith("-")){
                setError(t("Telegram Channel ID must start with @ or -"));
                return;
            }
        }
        if (channel_type === "telegram" && !formConfig.telegram_bot_token) {
            setError(t("Telegram Bot Token is required"));
            return;
        }
        apiRequest({
            url: `/api/v1/channels/${channelId}`,
            method: "PUT",
            body: {
                config_json: formConfig,
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                        setError(t(response.data.detail[0].msg));
                        return;
                }
                setFormConfig(response.data.config_json);
                setSuccessToast(true);
                setError("");
                setTimeout(() => {
                    setSuccessToast(false);
                }, 3000);
            })
            .catch((error) => {
                setError(t("Failed to update channel"));
                console.error(error);
            });
    }


    return <>
        <div className="toast toast-top toast-end">
            {successToast && <div className="alert alert-success shadow-sm">
                <div>
                    <span>{t("Channel settings updated successfully")}</span>
                </div>
            </div>}
        </div>
        <h3 className={"my-4"}>{t("Channel Type")}: {channel_type}</h3>

        {
            error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{error}</span>
                </div>
            </div>
        }

        {
            channel_type === "telegram" && <div className="p-4 card bg-base-300 shadow-sm mb-4">
                <label className="label mb-2">
                    <span className="label-text">{t("Telegram Bot Token")}</span>
                    <input type="text" placeholder="1234567890:ABCdefGhIjKlmnopQRsTUVwXyZ"
                           className="input input-bordered w-full"
                        value={formConfig?.telegram_bot_token}
                        onChange={(e) => {
                            setFormConfig({ ...formConfig, telegram_bot_token: e.target.value });
                        }}
                    />
                </label>
                <label className="label mb-2">
                    <span className="label-text">{t("Telegram Channel ID")}</span>
                    <input type="text" placeholder="@your_channel_id or -1001234567890"
                           className="input input-bordered w-full"
                        value={formConfig?.telegram_channel_id}
                        onChange={(e) => {
                            setFormConfig({ ...formConfig, telegram_channel_id: e.target.value });
                        }}
                    />
                </label>
                <label className="label mb-2">
                    <span className="label-text">{t("Telegram Formatting Type")}</span>
                    <select className="select select-bordered w-full"
                        value={formConfig?.parse_mode}
                        onChange={(e) => {
                            setFormConfig({ ...formConfig, parse_mode: e.target.value });
                        }}
                    >
                        <option value="markdown">{t("Markdown")}</option>
                        <option value="html">{t("HTML")}</option>
                    </select>
                </label>
                <button className="btn btn-primary mt-4 w-min btn-sm" onClick={updateChannel}>
                    {t("Save")}
                </button>
            </div>
        }

        <ChannelAiConfig/>

    </>;
}

export default ChannelSettings;