import {Card, Descriptions, Typography} from "antd";

function formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toDateString(undefined, options);
}

export default function DoctorTimeSlot({date, start_time, end_time}) {
    return (
        <>
            <Card
                title={date ? formatDate(`${date}`) : 'No Date'}
                hoverable
                style={{width: 180, height: 120}}
                styles={{body: {padding: 0}}}
            >
                <Descriptions layout={"horizontal"} style={{margin: '0', padding: '0'}}>
                    <Descriptions.Item label="Start Time" style={{display: "block", padding:'0.4rem 1rem 0.2rem'}}>
                        <Typography.Text>{start_time ? `${start_time}` : 'No Start Time'}</Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="End Time" style={{display: "block", padding:'0 1rem 0.4rem'}}>
                        <Typography.Text>{end_time ? `${end_time}` : 'No End Time'}</Typography.Text>
                    </Descriptions.Item>
                </Descriptions>

            </Card>
        </>
    );
}