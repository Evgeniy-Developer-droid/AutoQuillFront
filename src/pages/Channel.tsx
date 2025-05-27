import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import apiRequest from "../requests";
import { useParams } from 'react-router-dom';
import ChannelSettings from "./sources/Channel/ChannelSettings";
import ChannelPosts from "./sources/Channel/ChannelPosts";
import ChannelLogs from "./sources/Channel/ChannelLogs";
import ChannelKBs from "./sources/Channel/ChannelKBs";
import ChannelScheduler from "./sources/Channel/ChannelScheduler";


function Channel( ) {
    const { t } = useTranslation();
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [tabs, setTabs] = useState([
        { name: "Posts", active: true },
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
                setError(t("Failed to fetch channel"));
                console.error(error);
            });
    }

    useEffect(() => {
        getChannel();
    }, []);

    const helpCenterLinks = {
        en: {
            telegram: "https://nutritious-germanium-dd8.notion.site/Telegram-How-to-Add-a-Channel-or-Bot-1fef064a60af81f79b31ce33ddc63952",
        },
        ua: {
            telegram: "https://nutritious-germanium-dd8.notion.site/Telegram-1fef064a60af8044874fd72f249eb2e1",
        },
        ru: {
            telegram: "https://nutritious-germanium-dd8.notion.site/Telegram-1fef064a60af8192b4c8fcb295af0ddb",
        }
    }

    return <>

            {error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{t(error)}</span>
                </div>
            </div>}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">{t("Channel")}</h1>
                <div className="flex items-center">
                    <p className={"text-sm text-gray-500"}>
                        {t("Are you having trouble with setting up your channel?")} <a href={helpCenterLinks[i18n.language][channel?.channel_type]} target="_blank" rel="noopener noreferrer" className="link link-primary ml-1">{t("Read the documentation")}</a>
                    </p>
                </div>
            </div>


        <div className="tabs tabs-boxed">
            {tabs.map((tab, index) => (
                <a key={index} className={`tab  text-lg ${tab.active ? "tab-active" : ""}`} onClick={() => {
                    setTabs(tabs.map((t, i) => ({ ...t, active: i === index })));
                }}>
                    {t(tab.name)}
                </a>
            ))}
        </div>

        {
            tabs.map((tab, index) => (
                <div key={index} className={`tab-content ${tab.active ? "block" : "hidden"}`}>

                    {tab.name === "Posts" && (
                        <div className={"p-4 bg-base-200"}>
                            <ChannelPosts/>
                        </div>
                    )}
                    {tab.name === "Scheduler" && (
                        <div className={"p-4 bg-base-200"}>
                            <ChannelScheduler/>
                        </div>
                    )}
                    {tab.name === "Knowledge Base" && (
                        <div className={"p-4 bg-base-200"}>
                            <ChannelKBs/>
                        </div>
                    )}
                    {tab.name === "Settings" && (
                        <div className={"p-4 bg-base-200"}>
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

