import { Link } from "react-router-dom";

function Footer () {
    return (
        <footer className="border-t border-[#2A2E38] mt-24">
            <div className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        {/* Branding */}
                        <Link to="/">
                            <h2 className="text-3xl font-extrabold">
                                <span className="text-cyan-400">Vid</span>
                                <span className="text-white">Keys</span>
                            </h2>
                        </Link>

                        <p className="mt-4 text-slate-400 leading-relaxed">
                            Your place to connect with those who matter most.
                        </p>
                    </div>

                    <div>
                        {/* Product */}
                        <h3 className="font-semibold text-white mb-4">
                            Product
                        </h3>

                        {/* Links */}

                        <div className="flex flex-col gap-3 text-slate-400">
                            <Link to="/features" className="hover:text-cyan-400 transition">
                                Features
                            </Link>
                            <Link to="/download" className="hover:text-cyan-400 transition">
                                Download
                            </Link>
                            <Link to="/coming-soon" className="hover:text-cyan-400 transition">
                                Roadmap
                            </Link>
                        </div>
                    </div>

                    <div>   
                        {/* Company */}
                        <h3 className="font-semibold text-white mb-4">
                            Company
                        </h3>

                        <div className="flex flex-col gap-3 text-slate-400">
                            <Link to="/about" className="hover:text-cyan-400 transition">
                                About
                            </Link>
                            <Link to="/contact" className="hover:text-cyan-400 transition">
                                Contact
                            </Link>
                            <Link to="/coming-soon" className="hover:text-cyan-400 transition">
                                Careers
                            </Link>
                        </div>
                    </div>

                    <div>
                        {/* Legal */}
                        <h3 className="font-semibold text-white mb-4">
                            Legal
                        </h3>

                        <div className="flex flex-col gap-3 text-slate-400">
                            <Link to="/coming-soon" className="hover:text-cyan-400 transition">
                                Privacy Policy
                            </Link>
                            <Link to="/coming-soon" className="hover:text-cyan-400 transition">
                                Terms of Service
                            </Link>
                            <Link to="/coming-soon" className="hover:text-cyan-400 transition">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[#2A2E38] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400">
                        &copy; 2026 VidKeys. All rights reserved.
                    </p>

                    <p className="text-slate-500">
                        Built for meaningful connections.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;