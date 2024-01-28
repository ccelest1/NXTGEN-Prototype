import { Link } from "react-router-dom";
import { Flex } from '@adobe/react-spectrum'
// import { Grid } from '@adobe/react-spectrum'

// going to be public facing page
/*
    Vision for Public Page
            (Platform Title)
        Log In -> Globe -> Sign Up
               (Footer)
*/
const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Prototype!</span></h1>
            </header>
            <main className="public_main">
                <h2>
                    &quot;We&apos;ve Re-engineered Networking For the Future Pioneers&quot;
                </h2>
                <p>
                    A team from NYC and Boston with an eye for craftsmanship has spent the time iterating over what a useful social network looks like for young engineers
                </p>
                <address className="public__addr">
                    prototype incorporated <br />
                </address>
                <p>
                    - Contributors -
                </p>
            </main>
            <footer>
                <Flex
                    direction="row"
                    gap='size-100'
                >
                    <Link
                        className="react-aria-Button"
                        to="/login"
                    >
                        LOGIN
                    </Link>
                    <Link
                        className="react-aria-Button"
                        to="/sign-up"
                    >
                        SIGN UP
                    </Link>
                </Flex>
            </footer>
        </section>
    )
    return content
}

export default Public
