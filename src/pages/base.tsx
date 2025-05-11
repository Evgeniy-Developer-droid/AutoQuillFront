
const Base = ({content: Content}) => (
  <>
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Menu
        </label>
          <div className="w-full p-5">{<Content />}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-300 min-h-full w-80 p-4 pt-30 static">
          <li><a className={"text-xl"} href={"/dashboard"}>Dashboard</a></li>
          <li><a className={"text-xl"} href={"/dashboard/profile"}>Profile</a></li>
          <li><a className={"text-xl"} href={"/dashboard/channels"}>Channels</a></li>
            <div className="absolute bottom-0 left-0 p-5 w-full">
                <button className={"logout btn btn-primary w-full"} onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                  }}>Logout</button>
            </div>
        </ul>
      </div>
    </div>
  </>
);
export default Base;

