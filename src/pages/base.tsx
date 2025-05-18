import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Base = ({content: Content}) => {
    const {t} = useTranslation();
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
                <ul className="menu bg-base-300 min-h-full w-80 p-4 pt-30 static">
                    <li><a className={"text-xl"} href={"/dashboard"}>{t("Dashboard")}</a></li>
                    <li><a className={"text-xl"} href={"/dashboard/profile"}>{t("Profile")}</a></li>
                    <li><a className={"text-xl"} href={"/dashboard/channels"}>{t("Channels")}</a></li>
                    <li><a className={"text-xl"} href={"/dashboard/subscription"}>{t("Subscription")}</a></li>
                    <div className="absolute bottom-0 left-0 p-5 w-full">
                        <select className={"border rounded-md p-2 bg-white text-gray-700 w-full mb-5"}
                                  defaultValue={i18n.language}
                                  onChange={(e) => i18n.changeLanguage(e.target.value)}>
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                            <option value="ua">UA</option>
                        </select>
                        <button className={"logout btn btn-primary w-full"} onClick={() => {
                            localStorage.removeItem("access_token");
                            localStorage.removeItem("refresh_token");
                            window.location.href = "/login";
                        }}>{t("Logout")}
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    </>
};
export default Base;

