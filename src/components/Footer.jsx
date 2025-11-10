const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto text-center space-y-3">
        <h2 className="text-xl font-semibold text-blue-400"> HomeNest</h2>
        <p>Find your dream home easily with our trusted real estate platform.</p>

        <div className="flex justify-center space-x-6">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} HomeNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
