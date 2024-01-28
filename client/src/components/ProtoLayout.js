import { Outlet } from 'react-router-dom'

const ProtoLayout = () => {
    return (
        <>
            <div className='proto-container'>
                <Outlet />
            </div>
        </>
    )
}

export default ProtoLayout
