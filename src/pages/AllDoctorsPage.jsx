import { useEffect, useState } from "react";
import { getAllDoctors } from "../api/handleDoctors";
import { Card, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../components/Layout.jsx";


export default function AllDoctorsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [allDoctors, setAllDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getAllDoctors();
                console.log(response);
                setAllDoctors(response);
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
            <LayoutComponent>
                <h1 className="alldoctors_page__title">Our doctors</h1>
                <div className="alldoctors_page__doctors">
                    {
                        allDoctors.map((doctor) => {
                            return (
                                <Card
                                    hoverable
                                    style={{ width: 300 }}
                                    cover={<img src={doctor.photo ? doctor.photo : '/doctorImage.jpg'} alt="doctor photo" width="300px" height="300px" style={{ objectFit: 'cover' }} />}
                                    onClick={() => {
                                        navigate(`${doctor.id}`)
                                    }}
                                >
                                    <Meta title={doctor.first_name + " " + doctor.last_name}
                                        description={
                                            <>
                                                {doctor.email}
                                                <br />
                                                {doctor.specialization}
                                                <br />
                                                {doctor.work_location}
                                            </>
                                        }

                                    />
                                </Card>
                            );
                        })
                    }
                </div>
            </LayoutComponent>
        </>
    );
}