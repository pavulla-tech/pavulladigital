const BackgroundWithLogo = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 gradient-hero"></div>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 text-secondary text-9xl font-black opacity-20">P</div>
      <div className="absolute bottom-20 right-10 text-secondary text-9xl font-black opacity-20">P</div>
    </div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,237,74,0.1),transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
  </div>
);

export default BackgroundWithLogo;
