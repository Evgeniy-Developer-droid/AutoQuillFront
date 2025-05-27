import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Base = ({content: Content}) => {
    const {t} = useTranslation();

    const helpCenterLinks = {
        en: "https://nutritious-germanium-dd8.notion.site/AutoQuill-Help-Center-1fef064a60af80ee96bcf5b4bee6b569",
        ru: "https://nutritious-germanium-dd8.notion.site/AutoQuill-Help-Center-RU-1fef064a60af8082b377df42226a9c09",
        ua: "https://nutritious-germanium-dd8.notion.site/AutoQuill-Help-Center-UA-1fef064a60af80f29393d50df4de92cd"
      }

    return <>
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    {t("Menu")}
                </label>
                <div className="w-full p-5">{<Content/>}</div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-100 min-h-full w-80 p-4 pt-30 static shadow-xl border border-gray-200">
                    <li><a className={"text-xl"} href={"/dashboard"}>{t("Dashboard")}</a></li>
                    <li><a className={"text-xl"} href={"/dashboard/profile"}>{t("Profile")}</a></li>
                    <li><a className={"text-xl"} href={"/dashboard/channels"}>{t("Channels")}</a></li>
                    <li><a className={"text-xl"} href={"/dashboard/subscription"}>{t("Subscription")}</a></li>
                    <div className="absolute bottom-0 left-0 p-3 w-full ">
                        <div className={"w-full flex"}>
                            <button className={"logout btn btn-primary w-3/4 m-1"} onClick={() => {
                                localStorage.removeItem("access_token");
                                localStorage.removeItem("refresh_token");
                                window.location.href = "/login";
                            }}>{t("Logout")}
                            </button>
                            <select className={"border rounded-md p-2 bg-base-100 text-gray-700 w-1/4 m-1"}
                                      defaultValue={i18n.language}
                                      onChange={(e) => i18n.changeLanguage(e.target.value)}>
                                <option value="en">EN</option>
                                <option value="ru">RU</option>
                                <option value="ua">UA</option>
                            </select>
                        </div>
                        <div className={"text-center mt-3"}>
                            <a href={helpCenterLinks[i18n.language]} target="_blank" rel="noopener noreferrer">
                                {t("Help Center")}
                            </a>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </>
};
export default Base;

