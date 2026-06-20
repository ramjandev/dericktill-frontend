const Footer = () => {
  return (
    <footer className="border-t border-[1.173px] border-black/10 bg-white/20 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-white text-center">
          © 2026 Real Estate Deal Analyzer. Built for fast deal analysis.
        </p>
        <p className="text-xs text-white/70 text-center mt-3 max-w-5xl mx-auto">
          Disclaimer: All calculations and estimates are provided as a
          decision-support tool and should be used as a starting point for
          analysis. Users are responsible for independently verifying all data,
          assumptions, and financial projections with lenders, financial
          professionals, and other relevant advisors before making investment
          decisions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
