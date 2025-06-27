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

            {/* Modal Add User */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Background overlay */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 z-10"
                        onClick={closeModal}
                    />

                    {/* Form Add User */}
                    <div className="relative z-20 bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
                        <UserAdd closeM={closeModal} onAdd={fetchUsers} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
