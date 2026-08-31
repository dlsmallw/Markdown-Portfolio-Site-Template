import logo from '../logo.svg';

const Home: React.FC = () => {
    return (
        <div style={CustomStyles.homeContainer}>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main content of the home page.</p>

            <img src={logo} className="App-logo" alt="logo" />
            <p>Dan's Placeholder React App.</p>
        </div>
    );
}

const CustomStyles: Record<string, React.CSSProperties> = {
    homeContainer: {
        textAlign: 'center',
        padding: '20px',
    },
};

export default Home;