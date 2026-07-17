import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text-name">Developed by Andrea Kachepa</p>
      <p className="footer__text-year">{new Date().getFullYear()}</p>
    </footer>
  );
};
export default Footer;