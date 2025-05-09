import { useEffect, useState } from "react";
import apiRequest from "../../../requests";
import { useParams } from 'react-router-dom';
import {kbIcons} from "../../tools";

function ChannelScheduler(props) {
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [targetSchedule, setTargetSchedule] = useState(null);
    const [schedules, setSchedules] = useState([]);

    const [createWeekdays, setCreateWeekdays] = useState([0, 1, 2, 3, 4, 5, 6]);
    const [createTimes, setCreateTimes] = useState([]);

    const weekdays = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday",
    }

    const getSchedules = () => {
        apiRequest({
            url: `/api/v1/ai/scheduled-posts`,
            method: "GET",
            params: {
                channel_id: channelId,
            },
        })
            .then((response) => {
                setSchedules(response.data);
                setError("");
            })
            .catch((error) => {
                setError("Failed to fetch schedules");
                console.error(error);
            });
    }

    const deleteSchedule = () => {
        apiRequest({
            url: `/api/v1/ai/scheduled-posts/${targetSchedule}`,
            method: "DELETE",
            params: {
                channel_id: channelId,
            }
        })
            .then((response) => {
                setToast(true)
                setToastMessage("Schedule deleted successfully")
                getSchedules()
                setError("");
                setTimeout(() => {
                    setToast(false)
                }, 3000)
            })
            .catch((error) => {
                setError("Failed to delete schedule");
                console.error(error);
            });
    }

    const createSchedule = () => {
        const data = {
            weekdays: createWeekdays,
            times: createTimes.map((time => {return time.time})),
            is_active: true,
        }
        apiRequest({
            url: `/api/v1/ai/scheduled-posts`,
            method: "POST",
            body: data,
            params: {
                channel_id: channelId,
            }
        })
            .then((response) => {
                setToast(true)
                setToastMessage("Schedule created successfully")
                getSchedules()
                setError("");
                setTimeout(() => {
                    setToast(false)
                }, 3000)
            })
            .catch((error) => {
                setError("Failed to create schedule");
                console.error(error);
            });
    }

    const updateSchedule = (action, id) => {
        const url = action === "activate" ? `/api/v1/ai/scheduled-posts/${id}/activate` : `/api/v1/ai/scheduled-posts/${id}/deactivate`;
        apiRequest({
            url: url,
            method: "POST",
            body: {},
            params: {
                channel_id: channelId,
            }
        })
            .then((response) => {
                setToast(true)
                setToastMessage("Schedule updated successfully")
                getSchedules()
                setError("");
                setTimeout(() => {
                    setToast(false)
                }, 3000)
            })
            .catch((error) => {
                setError("Failed to update schedule");
                console.error(error);
            });
    }

    useEffect(() => {
        getSchedules();
    }, []);

    return <>

        <div className="toast toast-top toast-end">
            {toast && <div className="alert alert-success shadow-sm">
                <div>
                    <span>{toastMessage}</span>
                </div>
            </div>}
        </div>

        {
            error && <div className="alert alert-error shadow-sm">
                <div>
                    <span>{error}</span>
                </div>
            </div>
        }

        {deleteModal && <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold">Delete Schedule</h2>
                <p>Are you sure you want to delete this schedule?</p>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => {
                        deleteSchedule();
                        setDeleteModal(false);
                    }}>Delete</button>
                    <button className="btn" onClick={() => setDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>}

        {createModal && <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl font-bold">Create Schedule</h2>
                <form>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Weekdays</span>
                        </label>
                        {Object.keys(weekdays).map((key) => (
                            <div key={key} className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-primary m-1"
                                       defaultChecked={createWeekdays.includes(parseInt(key))}
                                       value={key}
                                       onClick={(e) => {
                                           if (e.target.checked) {
                                               setCreateWeekdays([...createWeekdays, parseInt(key)]);
                                           } else {
                                               setCreateWeekdays(createWeekdays.filter((day) => day !== parseInt(key)));
                                           }
                                       }}
                                />
                                <span>{weekdays[key]}</span>
                            </div>
                        ))}
                    </div>

                    <div className={"form-control mt-4"}>
                        <label className="label">
                            <span className="label-text">Times</span>
                        </label>
                        {createTimes.map((time, index) => (
                            <div key={index} className="flex items-center">
                                <input type="time" name="times" value={time.time} className="input input-bordered w-full max-w-xs mr-2"
                                    onChange={(e) => {
                                        const newTimes = [...createTimes];
                                        newTimes[index].time = e.target.value;
                                        setCreateTimes(newTimes);
                                    }}
                                />
                                <button type="button" className="btn btn-error btn-xs"
                                    onClick={() => {
                                        setCreateTimes(createTimes.filter((_, i) => i !== index));
                                    }}
                                >Remove</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary mt-2 block"
                            onClick={() => {
                                setCreateTimes([...createTimes, { time: "" }]);
                            }}
                        >Add Time</button>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" onClick={() => {
                            if (createWeekdays.length === 0 || createTimes.length === 0) {
                                setError("Please select at least one weekday and one time.");
                                return;
                            }
                            setError("");
                            createSchedule();
                            setCreateModal(false);
                        }}>Create</button>
                        <button type="button" className="btn" onClick={() => setCreateModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>}

        <div className="flex justify-between items-center mb-4">
            <button className="btn btn-primary"
                onClick={() => {
                    setCreateModal(true);
                }}
            >Create Schedule</button>
        </div>

        {schedules.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Weekdays</th>
                            <th>Times</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.id}>
                                <td>
                                    <div className="flex items-center flex-wrap">
                                        {schedule.weekdays.map((weekday, index) => (
                                                <div key={index} className="badge badge-soft badge-accent m-1">{weekdays[weekday]}</div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center flex-wrap">
                                        {schedule.times.map((time, index) => (
                                                <span key={index} className={"badge badge-soft badge-accent m-1"}>
                                                    {time}
                                                </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${schedule.is_active ? "badge-success" : "badge-error"}`}>
                                        {schedule.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-secondary btn-xs m-1" onClick={() => {
                                        updateSchedule(schedule.is_active ? "deactivate" : "activate", schedule.id);
                                    }}>
                                        {schedule.is_active ? "Deactivate" : "Activate"}
                                    </button>
                                    <button className="btn btn-error btn-xs m-1" onClick={() => {
                                        setTargetSchedule(schedule.id);
                                        setDeleteModal(true);
                                    }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p>No schedules found.</p>
        )}


    </>;
}

export default ChannelScheduler;