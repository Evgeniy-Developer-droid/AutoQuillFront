import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiRequest from "../requests";

const Dashboard = () => {
    const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getData = () => {
    apiRequest({
      url: "/api/v1/users/dashboard",
      method: "GET",
    }).then((response) => {
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log(response);
        setError(t("Error fetching data. Please try again."));
      }
    });
  }
    useEffect(() => {
        getData();
    }, []);

  return <>
    <div className="flex flex-col md:flex-row justify-between p-4">
      <div className="bg-blue-100 text-black p-5 m-2 rounded-lg flex-1">
        <div className={"h-full"}>
          <h2 className="text-2xl mb-3">{t("Channels")}</h2>
          <p className="text-3xl text-blue-900 font-bold">{data?.all_channels_count}</p>
        </div>
      </div>
      <div className="bg-green-100 text-black p-5 m-2 rounded-lg flex-1">
        <div className={"h-full"}>
          <h2 className="text-2xl mb-3">{t("Posts")}</h2>
          <p className="text-3xl text-green-900 font-bold">{data?.all_posts_count}</p>
        </div>
      </div>
      <div className="bg-red-100 text-black p-5 m-2 rounded-lg flex-1">
        <div className={"h-full"}>
            <h2 className="text-2xl mb-3">{t("AI Generated Posts")}</h2>
            <p className="text-3xl text-red-900 font-bold">{data?.all_ai_generated_posts_count}</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between p-4">
      <div className="p-4 m-2 rounded-lg flex-1 card bg-base-300 shadow-xl">
        <h2 className="text-sm">{t("Channels")}</h2>
        <ul>
            {data?.last_channels.map((channel, index) => (
                <div key={index} className={"p-2 m-2 bg-base-100 rounded-lg flex flex-row items-center justify-between"}>
                    <h5 className="text-xs">{channel.name}</h5>
                    <div className={"tooltip"} data-tip={t("Posts")}><span className={"badge badge-primary"}>{channel.posts_count}</span></div>
                </div>
            ))}
        </ul>
      </div>
      <div className="p-4 m-2 rounded-lg flex-1 card bg-base-300 shadow-xl">
        <h2 className="text-sm">{t("Last 10 Posts")}</h2>
        <ul>
            {data?.last_posts.map((post, index) => (
                <li key={index} className={"p-2 m-2 bg-base-100 rounded-lg flex flex-col items-center"}>
                    <h5 className={"text-xs"}>{post.content.length > 50 ? post.content.slice(0, 50) + "..." : post.content}</h5>
                </li>
            ))}
        </ul>
      </div>
      <div className="p-4 m-2 rounded-lg flex-1 card bg-base-300 shadow-xl">
        <h2 className="text-sm">{t("Last 10 Logs")}</h2>
        <ul>
            {data?.last_channel_logs.map((log, index) => (
                <li key={index} className={"p-2 m-2 bg-base-100 rounded-lg flex flex-col items-center"}>
                    <h5 className="text-xs">{log.message.length > 50 ? log.message.slice(0, 50) + "..." : log.message}</h5>
                </li>
            ))}
        </ul>
      </div>
    </div>

  </>
};
export default Dashboard;

