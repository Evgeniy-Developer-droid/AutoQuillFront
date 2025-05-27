import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../../../requests";
import { useParams } from 'react-router-dom';
import ChannelEditPostModal from "./ChannelEditPostModal";
import ChannelNewPostModal from "./ChannelNewPostModal";


function ChannelPosts(props) {
    const { t } = useTranslation();
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const [newPostModal, setNewPostModal] = useState(false);

    const [isEditingPost, setIsEditingPost] = useState(false);
    const [targetPostId, setTargetPostId] = useState(null);

    const [isDeletingPost, setIsDeletingPost] = useState(false);
    const [successSentToast, setSuccessSentToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [generateAiPostModal, setGenerateAiPostModal] = useState(false);
    const [generateAiPostTopic, setGenerateAiPostTopic] = useState("");

    const getPosts = () => {
        apiRequest({
            url: `/api/v1/posts`,
            method: "GET",
            params: {
                page,
                limit,
                channel_id: channelId,
            },
        })
            .then((response) => {
                setPosts(response.data.posts);
                setTotal(response.data.total);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch posts");
                console.error(error);
            });
    }

    const generateAiPost = () => {
        apiRequest({
            url: `/api/v1/ai/generate/posts`,
            method: "POST",
            body: {
                topic: generateAiPostTopic,
            },
            params: {
                channel_id: channelId,
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    setError(t(response.data.detail));
                    return;
                }
                setToastMessage(t(response.data.message));
                setSuccessSentToast(true);
                setTimeout(() => {
                    setSuccessSentToast(false);
                    setToastMessage("")
                }, 3000);
                setError("");
            })
            .catch((error) => {
                setError(t("Failed to generate post"));
                console.error(error);
            });
    }

    const postStatuses = {
        "draft": `bg-yellow-200 text-yellow-800`,
        "published": `bg-green-200 text-green-800`,
        "scheduled": `bg-blue-200 text-blue-800`,
        "failed": `bg-red-200 text-red-800`
    }

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        if(!page || !limit) return;
        getPosts();
    }, [page, limit]);

    useEffect(() => {
        if (!isEditingPost) {
            getPosts();
        }
    }, [isEditingPost]);

    useEffect(() => {
        if (!newPostModal) {
            getPosts();
        }
    }, [newPostModal]);

    return <>

        <div className="toast toast-top toast-end">
            {successSentToast && <div className="alert alert-success shadow-sm">
                <div>
                    <span>{toastMessage}</span>
                </div>
            </div>}
        </div>

        {isDeletingPost && <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-lg font-bold">{t("Delete Post")}</h2>
                <p>{t("Are you sure you want to delete this post?")}</p>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => {
                        apiRequest({
                            url: `/api/v1/posts/${targetPostId}`,
                            method: "DELETE",
                        })
                            .then(() => {
                                setPosts(posts.filter(p => p.id !== targetPostId));
                                setIsDeletingPost(false);
                                setTargetPostId(null);
                                setError("");
                            })
                            .catch((error) => {
                                setError(t("Failed to delete post"));
                                console.error(error);
                            });
                    }}>{t("Delete")}</button>
                    <button className="btn" onClick={() => {
                        setIsDeletingPost(false);
                        setTargetPostId(null);
                    }}>{t("Cancel")}</button>
                </div>
            </div>
        </div>}

        {generateAiPostModal && <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-lg font-bold">{t("Generate AI Post")}</h2>
                <input
                    type="text"
                    placeholder={t("Enter topic")}
                    value={generateAiPostTopic}
                    onChange={(e) => setGenerateAiPostTopic(e.target.value)}
                    className="input input-bordered w-full mb-2"
                />
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => {
                        generateAiPost();
                        setGenerateAiPostModal(false);
                    }}>{t("Generate")}</button>
                    <button className="btn" onClick={() => {
                        setGenerateAiPostModal(false);
                    }}>{t("Cancel")}</button>
                </div>
            </div>
        </div>}

        {isEditingPost && <ChannelEditPostModal postId={targetPostId} closeModal={() => {
            setIsEditingPost(false);
            setTargetPostId(null);
        }} />}

        {newPostModal && <ChannelNewPostModal closeModal={() => {
            setNewPostModal(false);
        }} />}

        <div className="flex justify-between items-center mb-4">
            <div className={"flex items-center"}>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => setNewPostModal(true)}>{t("Create New Post")}</button>
                <button className="btn btn-primary btn-sm" onClick={() => setGenerateAiPostModal(true)}>{t("Generate AI Post")}</button>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => {
                setPage(1);
                setLimit(10);
            }}>{t("Reset Filters")}</button>
        </div>

        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
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
        {error && <div className="alert alert-error shadow-sm">
            <div>
                <span>{error}</span>
            </div>
        </div>}

        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>{t("Post ID")}</th>
                        <th>{t("Content")}</th>
                        <th>{t("Status")}</th>
                        <th>{t("AI Generated")}</th>
                        <th>{t("Scheduled time")}</th>
                        <th>{t("Created At")}</th>
                        <th>{t("Actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.content.length > 50 ? post.content.substring(0, 50) + "..." : post.content}</td>
                            <td>
                                <span className={`badge ${postStatuses[post.status]}`}>
                                    {t(post.status)}
                                </span>
                            </td>
                            <td>
                                <span className={`badge ${post.ai_generated ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                    {post.ai_generated ? t("Yes") : t("No")}
                                </span>
                            </td>
                            <td>
                                {post.scheduled_time ? new Date(post.scheduled_time).toLocaleString() : t("N/A")}
                            </td>
                            <td>{new Date(post.created_at).toLocaleString()}</td>
                            <td>
                                <button className="btn btn-accent btn-xs m-1" onClick={() => {
                                    apiRequest({
                                        url: `/api/v1/posts/${post.id}/send`,
                                        method: "POST",
                                    })
                                        .then((response) => {
                                            if (response.status !== 200) {
                                                setError(t(response.data.detail));
                                                return;
                                            }
                                            setSuccessSentToast(true);
                                            setTimeout(() => {
                                                setSuccessSentToast(false);
                                                getPosts();
                                            }, 3000);
                                        })
                                        .catch((error) => {
                                            setError(t("Failed to publish post"));
                                            console.error(error);
                                        });
                                }}>{t("Publish")}</button>
                                <button className="btn btn-warning btn-xs m-1" onClick={() => {
                                    setTargetPostId(post.id);
                                    setIsEditingPost(true);
                                }}>{t("Edit")}</button>
                                <button className="btn btn-secondary btn-xs m-1" onClick={() => {
                                    setTargetPostId(post.id);
                                    setIsDeletingPost(true);
                                }}>{t("Delete")}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>;
}

export default ChannelPosts;