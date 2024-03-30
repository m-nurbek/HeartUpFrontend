import React, { Suspense } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));


export default function Heart3d() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Spline scene="https://prod.spline.design/uXez4XUxuI5Q5P6U/scene.splinecode" />
            </Suspense>
        </>
    );
}
