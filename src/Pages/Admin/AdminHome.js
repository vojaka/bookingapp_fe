import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button"
import { useTranslation } from 'react-i18next';

function AdminHome() {
    const { t } = useTranslation();

    return (
    <div>
        <Link to="/admin/lisa-toode">
            <Button variant="dark" className="admin-button">{t("admin.add-product")}</Button>
        </Link>
        <Link to="/admin/tooted">
            <Button variant="dark" className="admin-button">{t("admin.change-products")}</Button>
        </Link>
        <Link to="/admin/lisa-store">
            <Button variant="dark" className="admin-button">{t("admin.add-stores")}</Button>
        </Link>
        <Link to="/admin/stores">
            <Button variant="dark" className="admin-button">{t("admin.change-stores")}</Button>
        </Link>
        <Link to="/admin/category">
            <Button variant="dark" className="admin-button">{t("admin.view-category")}</Button>
        </Link>
        <Link to="/admin/person">
            <Button variant="dark" className="admin-button">{t("admin.view-person")}</Button>
        </Link>
    </div>)
}

export default AdminHome;