import { useEffect, useState } from "react";
import apiRequest from "../../../requests";
import { useParams } from 'react-router-dom';

function ChannelAiConfig(props) {
    const { channelId } = useParams();
    const [error, setError] = useState("");
    const [config, setConfig] = useState({});

    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    useEffect(() => {
        apiRequest({
            url: `/api/v1/ai/ai/config`,
            method: "GET",
            params: {
                channel_id: channelId,
            },
        })
            .then((response) => {
                setConfig(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const updateConfig = () => {
        apiRequest({
            url: `/api/v1/ai/ai/config`,
            method: "PUT",
            body: config,
            params: {
                channel_id: channelId,
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.detail[0].msg);
                    return;
                }
                setConfig(response.data);
                setToast(true);
                setToastMessage("Config updated successfully");
                setError("");
                setTimeout(() => {
                    setToast(false);
                }, 3000);
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return <>

        <div className="toast toast-top toast-end">
            {toast && <div className="alert alert-success shadow-sm">
                <div>
                    <span>{toastMessage}</span>
                </div>
            </div>}
        </div>

        <div className="container">
            <h2 className={'text-xl font-bold'}>Channel AI Config</h2>
            {
                error && <div className="alert alert-error shadow-sm">
                    <div>
                        <span>{error}</span>
                    </div>
                </div>
            }
            <form onSubmit={(e) => {
                e.preventDefault();
                updateConfig();
            }}>
                <div className="mb-3">
                    <label htmlFor="temperature" className="form-label">Temperature</label>
                    <input type="number" className="input input-bordered w-full" id="temperature" value={config.temperature} onChange={(e) => setConfig({ ...config, temperature: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="max_tokens" className="form-label">Max Tokens</label>
                    <input type="number" className="input input-bordered w-full" id="max_tokens" value={config.max_tokens} onChange={(e) => setConfig({ ...config, max_tokens: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="language" className="form-label">Language</label>
                    <input type="text" className="input input-bordered w-full" id="language" value={config.language} onChange={(e) => setConfig({ ...config, language: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tone" className="form-label">Tone</label>
                    <input type="text" className="input input-bordered w-full" id="tone" value={config.tone} onChange={(e) => setConfig({ ...config, tone: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="writing_style" className="form-label">Writing Style</label>
                    <input type="text" className="input input-bordered w-full" id="writing_style" value={config.writing_style} onChange={(e) => setConfig({ ...config, writing_style: e.target.value })} />
                </div>
                <div className="mb-3">
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                        <label htmlFor="emojis" className="label">
                            <input type="checkbox" className="checkbox checkbox-info" id="emojis" checked={config.emojis}
                               onChange={(e) => setConfig({...config, emojis: e.target.checked})}/>
                            Emojis
                        </label>
                    </fieldset>
                </div>
                <div className="mb-3">
                    <label htmlFor="custom_instructions" className="form-label">Custom Instructions</label>
                    <textarea className="textarea w-full" id="custom_instructions" value={config.custom_instructions} onChange={(e) => setConfig({ ...config, custom_instructions: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>

    </>;
}

export default ChannelAiConfig;