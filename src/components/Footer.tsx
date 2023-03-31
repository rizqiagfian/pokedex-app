const Footer = () => {
    return (
        <>
            <footer className="font-montserrat" style={{ color: '#1b1b1b', padding: '0', textAlign: 'center', letterSpacing: '1px' }}>
                <svg style={{ bottom: '0', left: '0', zIndex: '-1', marginBottom: '-4rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fill-opacity="1" d="M0,192L60,165.3C120,139,240,85,360,96C480,107,600,181,720,208C840,235,960,213,1080,186.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <strong>Copyright &copy; {new Date().getFullYear()} <a style={{ color: 'darkblue', textDecoration: 'none' }} href="https://github.com/rizqiagfian" rel="noreferrer" target={"_blank"}>Rizqi Agfian</a> </strong>
                All rights reserved.
                <div style={{ marginTop: '0.5rem' }}>
                    <b>Version</b> 1.0.0
                </div>
            </footer>
        </>
    )
}

export default Footer