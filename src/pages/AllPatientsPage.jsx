import {Divider, Spin, Table} from "antd";
import {getAllPatients} from "../api/handlePatients";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LayoutComponent from "../components/Layout.jsx";

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
            {isLoading && <Spin fullscreen/>}
            <LayoutComponent>
                <div className="allpatients_page__info">
                    <h2 style={{
                        fontWeight: '500',
                        margin: '1rem 0'
                    }}>Patients</h2>
                    <Divider/>
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
            </LayoutComponent>
        </>
    );
}