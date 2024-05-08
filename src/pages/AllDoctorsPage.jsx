import {useEffect, useState} from "react";
import {getAllDoctors} from "../api/handleDoctors";
import {Button, Card, Divider, Form, Input, Select, Spin} from "antd";
import Meta from "antd/es/card/Meta";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";
import LayoutComponent from "../components/Layout.jsx";
import getSpecializationTitle, {specializations} from "../api/constants/specializations.js";


export default function AllDoctorsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [allDoctors, setAllDoctors] = useState([]);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [filter, setFilter] = useState({ name: '', specialization: '' });

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
            {isLoading && <Spin fullscreen/>}
            <LayoutComponent>
                <h2 style={{
                    fontWeight: '500',
                    margin: '1rem 0'
                }}>Our doctors</h2>
                <Divider/>
                <Form
                    layout={'inline'}
                    form={form}
                    initialValues={{
                        layout: 'inline',
                    }}
                    style={{
                        maxWidth: 'none',
                    }}
                >
                    <Form.Item label="Name" style={{minWidth: '300px'}}>
                        <Input placeholder="John Smith"
                               onChange={e => setFilter({...filter, name: e.target.value})}
                        />
                    </Form.Item>
                    <Form.Item label="Specialization" name="specialization" style={{minWidth: '300px'}}>
                        <Select onChange={value => setFilter({ ...filter, specialization: value })}>
                            {specializations.map(specialization => (
                                <Select.Option key={specialization} value={specialization}>
                                    {getSpecializationTitle(specialization)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                            onClick={() => {
                                form.resetFields();
                                setFilter({ name: '', specialization: '' });
                            }}
                        >Clear Filters</Button>
                    </Form.Item>
                </Form>

                <div className="alldoctors_page__doctors">
                    {
                        allDoctors ? allDoctors
                            .filter(doctor =>
                                (!filter.name || `${doctor.first_name} ${doctor.last_name}`.includes(filter.name)) &&
                                (!filter.specialization || doctor.specialization === filter.specialization)
                            )
                            .map((doctor, index) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <Card
                                    key={index}
                                    hoverable
                                    style={{width: 300}}
                                    cover={<img src={doctor.photo ? doctor.photo : '/doctorImage.jpg'}
                                                alt="doctor photo" width="300px" height="300px"
                                                style={{objectFit: 'cover'}}/>}
                                    onClick={() => {
                                        navigate(`${doctor.id}`)
                                    }}
                                >
                                    <Meta title={doctor.first_name + " " + doctor.last_name}
                                          description={
                                              <>
                                                  {doctor.email}
                                                  <br/>
                                                  {getSpecializationTitle(doctor.specialization)}
                                                  <br/>
                                                  {doctor.work_location}
                                              </>
                                          }

                                    />
                                </Card>
                            );
                        }) : []
                    }
                </div>
            </LayoutComponent>
        </>
    );
}