import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../../../requests";
import { useParams } from 'react-router-dom';

function ChannelEditPostModal({postId, closeModal}) {
    const { t } = useTranslation();

    const [post, setPost] = useState({});
    const [error, setError] = useState("");
    const [isScheduling, setIsScheduling] = useState(false);
    const [updateKeys, setUpdateKeys] = useState([]);

    const getPost = () => {
        apiRequest({
            url: `/api/v1/posts/${postId}`,
            method: "GET",
        })
            .then((response) => {
                if (response.status !== 200) {
                    setError(t(response.data.detail[0].msg));
                    return;
                }
                setPost(response.data);
                setIsScheduling(!!response.data.scheduled_time);
                setError("");
            })
            .catch((error) => {
                setError(t("Failed to fetch post"));
                console.error(error);
            });
    }

    const updatePost = () => {
        const data = {}
        if (updateKeys.length === 0) {
            closeModal();
            return;
        }
        updateKeys.forEach((key) => {
            if (post[key]) {
                data[key] = post[key];
            }
        });
        data["timezone"] = post?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        apiRequest({
            url: `/api/v1/posts/${postId}`,
            method: "PUT",
            body: data,
        })
            .then((response) => {
                if(response.status === 200) {
                    setPost(response.data);
                    setIsScheduling(!!response.data.scheduled_time);
                    setError("");
                    closeModal();
                } else {
                    setError(t(response.data.detail[0].msg));
                }
            })
            .catch((error) => {
                setError(t("Failed to update post"));
                console.error(error);
            });
    }

    useEffect(() => {
        getPost();
    }, []);

    useEffect(() => {
        if(!post) return;
        if (post?.status === "scheduled") {
            setIsScheduling(true);
        }
        if (post?.status === "draft" && isScheduling) {
            // remove scheduled time if status is draft
            setPost({ ...post, scheduled_time: null });
            setIsScheduling(false);
        }
    }, [post]);

    return <>
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="card-title">{t("Edit Post")}</h2>
                <form>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">{t("Post Content")}</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-80 w-full" placeholder={t("Post Content")}
                            onChange={(e) => {
                                setPost({ ...post, content: e.target.value });
                                setUpdateKeys([...updateKeys, "content"]);
                            }}
                            value={post?.content}
                        ></textarea>
                    </div>
                    <p>{t("Status")}</p>
                    <select className="select select-bordered w-full"
                            value={post?.status || "draft"}
                        onChange={(e) => {
                            setPost({ ...post, status: e.target.value });
                            setUpdateKeys([...updateKeys, "status"]);
                        }}
                    >
                        <option value="draft">{t("Draft")}</option>
                        <option value="scheduled">{t("Scheduled")}</option>
                    </select>
                    <p>{t("Schedule Post")}</p>
                    <input type="checkbox" className="toggle toggle-primary"
                        onChange={(e) => {
                            setIsScheduling(e.target.checked);
                            console.log(e.target.checked);
                            if(!e.target.checked) {
                                setPost({ ...post, scheduled_time: null });
                                setUpdateKeys([...updateKeys, "scheduled_time"]);
                            }
                        }}
                        checked={isScheduling}
                    />
                    {
                        isScheduling && <div className="form-control w-full max-w-xs mt-4">
                        <label className="label">
                            <span className="label-text">{t("Scheduled Time")}</span>
                        </label>
                        <input type="datetime-local" placeholder={t("Scheduled Time")} className="input input-bordered w-full"
                               value={post?.scheduled_time?.slice(0, 16)}
                            onChange={(e) => {
                                if (post.scheduled_time?.slice(0, 16) === e.target.value) {
                                    return;
                                }
                                setPost({ ...post, scheduled_time: e.target.value });
                                setUpdateKeys([...updateKeys, "scheduled_time"]);
                            }}
                               min={new Date().toISOString().slice(0, 16)}
                        />
                    </div>
                    }
                    {isScheduling && <p className="text-sm text-gray-500">{t("Your local timezone")}: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>}
                    {isScheduling && <input type="text" className="input input-bordered w-full"
                        value={post?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                        onChange={(e) => {
                            setPost({ ...post, timezone: e.target.value });
                            setUpdateKeys([...updateKeys, "timezone"]);
                        }}
                        placeholder="Timezone"
                    />}

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            updatePost();
                        }}>{t("Save")}</button>
                        <button type="button" className="btn" onClick={() => {
                            closeModal();
                        }}>{t("Cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    </>;
}

export default ChannelEditPostModal;