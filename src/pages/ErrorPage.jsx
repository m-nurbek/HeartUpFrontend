

export default function ErrorPage() {
    return (
        <>
            <div style={{
                display: "grid",
                placeItems: "center",
                minHeight: "100vh"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.4em",
                }}>
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occured</p>
                    <p style={{ color: "grey" }}>Not Found</p>
                </div>

            </div>
        </>
    );
}