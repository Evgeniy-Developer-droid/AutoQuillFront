import { useEffect, useState } from "react";
import apiRequest from "../requests";

const Dashboard = () => {
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
        setError("Error fetching data. Please try again.");
      }
    });
  }
    useEffect(() => {
        getData();
    }, []);

  return <>
    <div className="flex flex-col md:flex-row justify-between p-4">
      <div className="bg-blue-300 text-black p-4 m-2 rounded-lg flex-1">
        <div className={"flex flex-row justify-between items-center h-full"}>
          <h2 className="text-lg font-bold">Channels</h2>
          <p className="text-xl font-bold">{data?.all_channels_count}</p>
        </div>
      </div>
      <div className="bg-green-300 text-black p-4 m-2 rounded-lg flex-1">
        <div className={"flex flex-row justify-between items-center h-full"}>
          <h2 className="text-lg font-bold">Posts</h2>
          <p className="text-xl font-bold">{data?.all_posts_count}</p>
        </div>
      </div>
      <div className="bg-red-300 text-black p-4 m-2 rounded-lg flex-1">
        <div className={"flex flex-row justify-between items-center h-full"}>
            <h2 className="text-lg font-bold">AI Generated Posts</h2>
            <p className="text-xl font-bold">{data?.all_ai_generated_posts_count}</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between p-4">
      <div className="bg-gray-600 p-4 m-2 rounded-lg flex-1">
        <h2 className="text-lg font-bold">Channels</h2>
        <ul>
            {data?.last_channels.map((channel, index) => (
                <div key={index} className={"p-2 m-2 bg-gray-700 rounded-lg flex flex-col items-center"}>
                    <h3 className="font-bold">{channel.name}</h3>
                    <p>Posts <span className={"badge badge-primary"}>{channel.posts_count}</span></p>
                </div>
            ))}
        </ul>
      </div>
      <div className="bg-gray-600 p-4 m-2 rounded-lg flex-1">
        <h2 className="text-lg font-bold">Last 10 Posts</h2>
        <ul>
            {data?.last_posts.map((post, index) => (
                <li key={index} className={"p-2 m-2 bg-gray-700 rounded-lg flex flex-col items-center"}>
                    <h3 className="font-bold">{post.content.length > 50 ? post.content.slice(0, 50) + "..." : post.content}</h3>
                </li>
            ))}
        </ul>
      </div>
      <div className="bg-gray-600 p-4 m-2 rounded-lg flex-1">
        <h2 className="text-lg font-bold">Last 10 Logs</h2>
        <ul>
            {data?.last_channel_logs.map((log, index) => (
                <li key={index} className={"p-2 m-2 bg-gray-700 rounded-lg flex flex-col items-center"}>
                    <h3 className="font-bold">{log.message.length > 50 ? log.message.slice(0, 50) + "..." : log.message}</h3>
                </li>
            ))}
        </ul>
      </div>
    </div>

  </>
};
export default Dashboard;

