const Footer = () => {
    return (
        <footer
            style={{
            position: "sticky",
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 40px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            fontSize: "16px",
            letterSpacing: "1.5px",
            fontFamily: "'Serif-Regular', sans-serif",
            }}
        >
            <span>LIKELION X KWU</span>
            <span>14TH FRONTEND</span>
        </footer>
    )
};

export default Footer;