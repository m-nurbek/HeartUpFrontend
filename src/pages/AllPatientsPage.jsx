import { Spin, Table } from "antd";
import { getAllPatients } from "../api/handlePatients";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";

const columns = [
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
    },
    {
        title: 'State ID',
        dataIndex: 'state_id',
        key: 'state_id',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Date Of Birth',
        dataIndex: 'dob',
        key: 'dob',
    },
    {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
    },
    {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
    }
];

export default function AllPatientsPage() {
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getAllPatients();
                const formattedData = response.map(item => ({
                    key: item.id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    state_id: item.state_id,
                    email: item.email,
                    age: item.age,
                    dob: item.dob,
                    sex: item.sex,
                    height: item.height,
                    weight: item.weight
                }));

                setDataSource(formattedData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading && <Spin fullscreen />}
            <Navbar />

            <div className="allpatients_page">
                <SideMenu activeItem="patients" />
                <div className="allpatients_page__info">
                    <h2>Patients</h2>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    navigate(`${record.key}`);
                                }
                            }
                        }}
                        bordered
                    />
                </div>
            </div>
        </>
    );
}