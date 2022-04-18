const Footer = () => {
  return (
    <footer className="w-screen text-gray-600 bg-gray-200 body-font">
      <div className="container flex flex-col items-center px-5 py-4 mx-auto sm:flex-row">
        {new Date().getFullYear()} Luis Martinez
      </div>
    </footer>
  );
};

export default Footer;
