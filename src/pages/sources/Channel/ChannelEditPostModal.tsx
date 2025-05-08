import { useEffect, useState } from "react";
import apiRequest from "../../../requests";
import { useParams } from 'react-router-dom';

function ChannelEditPostModal({postId, closeModal}) {

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
                setPost(response.data);
                setIsScheduling(!!response.data.scheduled_time);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch post");
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
                    setError(response.data.detail[0].msg);
                }
            })
            .catch((error) => {
                setError("Failed to update post");
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
                <h2 className="card-title">Edit Post</h2>
                <form>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Post Content</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Post Content"
                            onChange={(e) => {
                                setPost({ ...post, content: e.target.value });
                                setUpdateKeys([...updateKeys, "content"]);
                            }}
                            value={post?.content}
                        ></textarea>
                    </div>
                    <p>Status</p>
                    <select className="select select-bordered w-full"
                            value={post?.status || "draft"}
                        onChange={(e) => {
                            setPost({ ...post, status: e.target.value });
                            setUpdateKeys([...updateKeys, "status"]);
                        }}
                    >
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                    </select>
                    <p>Schedule Post</p>
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
                            <span className="label-text">Scheduled Time</span>
                        </label>
                        <input type="datetime-local" placeholder="Scheduled Time" className="input input-bordered w-full"
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
                    {isScheduling && <p className="text-sm text-gray-500">Your local timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>}
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
                        }}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => {
                            closeModal();
                        }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </>;
}

export default ChannelEditPostModal;