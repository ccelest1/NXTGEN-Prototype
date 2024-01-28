import { Link } from 'react-router-dom'

const ProtoHeader = () => {
    const content = (
        <header
            className='proto-header'
        >
            <div
                className='proto-header__container'
            >
                <Link
                    to="/prototype/profile_page"
                >
                    <h1
                        className='proto-header_title'
                        Profile Page
                    >
                    </h1>
                </Link>
                <nav
                    className='proto-header_nav'
                >
                    {/**
                     * nav buttons to be added in this section
                     */}
                </nav>
            </div>
        </header>
    )
}

export default ProtoHeader
