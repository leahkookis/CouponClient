import { Link } from "react-router-dom";

function Menu() {



    return (
        <div>Menu
            <Link className="header-menu-links" to="/admin/users">
                <button>
                  User
                </button>
              </Link>

        </div>
    );
}
export default Menu;