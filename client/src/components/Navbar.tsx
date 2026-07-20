function Navbar() {
    return (
        <nav
            style = {{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 2rem",
                borderBottom: "1px solid #2A2E38",
            }}
        >
            <h2>Vidkeys</h2>

            <div style = {{
                display: "flex",
                gap: "1rem",
            }}>
                <button>Login</button>
                <button>Register</button>
            </div>
        </nav>
    );
}

export default Navbar;