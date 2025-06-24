import React, { useEffect, useState } from "react";
import { SessionService } from "../services/SessionService";
import axios from "axios";
import Navigation from "../components/Navigation";
import UserCard from "../components/AdminElements/UserCard";
import Button from "../components/FormElements/Button";
import { UserService } from "../services/UserService";
import UserAdd from "../components/AdminElements/UserAdd";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);

    const fetchUsers = async () => {
        const profile = SessionService.getProfile();
        const res = await axios.get(`http://127.0.0.1:8000/show/users/${profile[0].id}`);
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const closeModal = () => setModal(false);

    const displayed = users.map((user, i) => (
        <UserCard key={`${user.id}+${i}`} data={user} />
    ));

    return (
        <div className="relative pt-24 px-6 min-h-screen bg-white">
            <Navigation />

            {/* Tombol Add User */}
            <div className="flex justify-end mb-6">
                <Button onClick={() => setModal(true)}>+ Add User</Button>
            </div>

            {/* Daftar User */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayed}
            </div>

            {/* Modal Add */}
            {modal && (
                <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div onClick={closeModal} className="absolute inset-0 cursor-pointer" />
                    <UserAdd closeM={closeModal} onAdd={fetchUsers} />
                </div>
            )}
        </div>
    );
};

export default Users;
