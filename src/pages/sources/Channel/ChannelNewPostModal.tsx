import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import apiRequest from "../../../requests";


function ChannelNewPostModal({closeModal}) {
    const {t} = useTranslation();
    const [newPostData, setNewPostData] = useState({});
    const [isSchedulingNewPost, setIsSchedulingNewPost] = useState(false);
    const [error, setError] = useState("");
    const { channelId } = useParams();
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

    const createPost = () => {
        const data = {
            content: newPostData.content,
            channel_id: channelId,
            status: newPostData.status || "draft",
            timezone: timezone
        }
        if (isSchedulingNewPost) {
            data.scheduled_time = newPostData.scheduled_time;
        }
        apiRequest({
            url: `/api/v1/posts`,
            method: "POST",
            body: data,
        })
            .then((response) => {
                if (response.status !== 200 && response.status !== 201) {
                    setError(t(response.data.detail[0].msg));
                    return;
                }
                closeModal();
                setNewPostData({});
                setError("");
            })
            .catch((error) => {
                setError(t("Failed to create post"));
                console.error(error);
            });
    }

    useEffect(() => {
        if(!newPostData) return;
        if (newPostData?.status === "scheduled") {
            setIsSchedulingNewPost(true);
        }
        if (newPostData?.status === "draft" && isSchedulingNewPost) {
            // remove scheduled time if status is draft
            setNewPostData({ ...newPostData, scheduled_time: null });
            setIsSchedulingNewPost(false);
        }
    }, [newPostData]);

    return <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="font-bold text-lg">{t("New Post")}</h2>
                {error && <div className="alert alert-error shadow-sm">
                    <div>
                        <span>{error}</span>
                    </div>
                </div>}
                <p>Content</p>
                <textarea className="textarea textarea-bordered w-full h-24" placeholder={t("Post content")}
                    value={newPostData?.content || ""}
                    onChange={(e) => {
                        setNewPostData({ ...newPostData, content: e.target.value });
                    }}
                ></textarea>
                <p>{t("Status")}</p>
                <select className="select select-bordered w-full"
                        value={newPostData?.status || "draft"}
                    onChange={(e) => {
                        setNewPostData({ ...newPostData, status: e.target.value });
                    }}
                >
                    <option value="draft">{t("Draft")}</option>
                    <option value="scheduled">{t("Scheduled")}</option>
                </select>
                <p>{t("Schedule Post")}</p>
                <input type="checkbox" className="toggle toggle-primary"
                    checked={isSchedulingNewPost}
                    onChange={(e) => {
                        setIsSchedulingNewPost(e.target.checked);
                    }}
                />
                {isSchedulingNewPost && <input type="datetime-local" className="input input-bordered w-full"
                    onChange={(e) => {
                        setNewPostData({ ...newPostData, scheduled_time: e.target.value });
                    }}
                />}
                {isSchedulingNewPost && <p className="text-sm text-gray-500">{t("Your local timezone")}: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>}
                {isSchedulingNewPost && <input type="text" className="input input-bordered w-full"
                    value={timezone}
                    onChange={(e) => {
                        setTimezone(e.target.value);
                    }}
                    placeholder={t("Timezone")}
                />}

                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => {
                        if (!newPostData.content) {
                            setError(t("Content is required"));
                            return;
                        }
                        if (isSchedulingNewPost && !newPostData.scheduled_time) {
                            setError(t("Scheduled time is required"));
                            return;
                        }
                        createPost();
                    }}>{t("Create Post")}</button>
                    <button className="btn" onClick={() => closeModal()}>{t("Close")}</button>
                </div>
            </div>
        </div>;
}

export default ChannelNewPostModal;