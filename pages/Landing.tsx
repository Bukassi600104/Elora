import React from 'react';

export const Landing: React.FC = () => {
  const navigateToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/login';
  };

  return (
    <div className="font-display bg-white text-slate-600 antialiased selection:bg-primary selection:text-white overflow-x-hidden">
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
          <a className="flex items-center gap-3 group" href="#">
            <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <span className="material-symbols-outlined text-xl">shield_lock</span>
            </div>
            <span className="self-center text-xl font-bold whitespace-nowrap text-slate-900 tracking-tight">Basic Security</span>
          </a>
          <div className="hidden md:block w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li><a className="block py-2 px-3 text-slate-500 hover:text-primary transition-colors text-sm" href="#">Solutions</a></li>
              <li><a className="block py-2 px-3 text-slate-500 hover:text-primary transition-colors text-sm" href="#">Features</a></li>
              <li><a className="block py-2 px-3 text-slate-500 hover:text-primary transition-colors text-sm" href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a onClick={navigateToLogin} className="text-slate-600 hover:text-primary font-bold text-sm transition-colors flex items-center gap-1 group cursor-pointer">
              Admin Login
              <span className="material-symbols-outlined text-[16px] opacity-0 -ml-2 group-hover:ml-0 group-hover:opacity-100 transition-all">arrow_forward</span>
            </a>
            <a onClick={navigateToLogin} className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-sm px-6 py-2.5 text-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer">
                Request Demo
            </a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-[128px]"></div>
          <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVnzlb7ib_VosEZDRiRQFypjuzquD08ATedHeVJOdNJegKgeylzK66L8g2cKl7ODpDQ0uD06X04jR-iTGfWdbQcnaj_qITieUgPPK0hyBFGKU9EtkascFjev5_CDlPCusa9xQEISpDMIZ0Md5zrpnJzbEr2u_yJEW2b1qPB7zN2GNEt5uMqMYZ5gRYxcQ5E7HWukDiVBPN6VMUpeczVGTAjHOsMsQnj7IKEme2v-bYxRrO1s7FvbMu8jxAf_YwLR6JVqfzZhNX3IM')] bg-cover bg-center opacity-5 mix-blend-multiply grayscale"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.6, maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 mb-8 animate-fade-in-up backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">New Standard in Estate Safety</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-tight">
            Intelligent Access for<br className="hidden md:block"/>
            <span className="text-gradient">Modern Estates.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Streamline guest entry, enhance resident experience, and empower security teams with a unified, cloud-based platform designed for humans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={navigateToLogin} className="px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-full shadow-xl shadow-slate-200 transition-all flex items-center gap-2 group">
              Request Demo
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold rounded-full shadow-sm transition-all flex items-center gap-2">
              Learn More
            </button>
          </div>
          <div className="mt-20 -mb-48 relative mx-auto max-w-5xl rounded-xl bg-white border border-slate-200 shadow-2xl overflow-hidden group">
            <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="flex-1 text-center text-xs text-slate-400 font-mono">dashboard.basicsecurity.com</div>
            </div>
            <div className="relative bg-slate-100 aspect-[16/9] overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-700 ease-out" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVnzlb7ib_VosEZDRiRQFypjuzquD08ATedHeVJOdNJegKgeylzK66L8g2cKl7ODpDQ0uD06X04jR-iTGfWdbQcnaj_qITieUgPPK0hyBFGKU9EtkascFjev5_CDlPCusa9xQEISpDMIZ0Md5zrpnJzbEr2u_yJEW2b1qPB7zN2GNEt5uMqMYZ5gRYxcQ5E7HWukDiVBPN6VMUpeczVGTAjHOsMsQnj7IKEme2v-bYxRrO1s7FvbMu8jxAf_YwLR6JVqfzZhNX3IM")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <span className="material-symbols-outlined text-green-600">check_circle</span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">System Status</div>
                    <div className="text-sm text-slate-900 font-bold">All Perimeters Secure</div>
                  </div>
                </div>
                <div className="hidden md:flex glass-panel px-4 py-2 rounded-lg items-center gap-3">
                  <span className="block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-slate-600 font-mono">Live Feed • Gate 01</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-slate-50 pt-56 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Security for Everyone</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">A complete ecosystem designed to serve every stakeholder in your estate community with elegance and efficiency.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-default">
              <div className="size-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Administrators</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Gain total oversight with real-time logs, user management, and automated reporting tools.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group cursor-default">
              <div className="size-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-2xl">smartphone</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Residents</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Generate guest codes instantly via the app and receive notifications upon arrival.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group cursor-default">
              <div className="size-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Security Guards</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Process visitors faster with ruggedized scanning tools and instant verification feedback.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group cursor-default">
              <div className="size-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-2xl">domain</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">The Estate</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Enhance property value and community safety with a modern, data-driven security infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 order-2 lg:order-1 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group transform hover:scale-[1.02] transition-transform duration-500">
                <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVnzlb7ib_VosEZDRiRQFypjuzquD08ATedHeVJOdNJegKgeylzK66L8g2cKl7ODpDQ0uD06X04jR-iTGfWdbQcnaj_qITieUgPPK0hyBFGKU9EtkascFjev5_CDlPCusa9xQEISpDMIZ0Md5zrpnJzbEr2u_yJEW2b1qPB7zN2GNEt5uMqMYZ5gRYxcQ5E7HWukDiVBPN6VMUpeczVGTAjHOsMsQnj7IKEme2v-bYxRrO1s7FvbMu8jxAf_YwLR6JVqfzZhNX3IM")' }}></div>
                <div className="absolute inset-0 bg-blue-900/10"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl flex items-center gap-4 shadow-lg">
                  <div className="p-3 bg-green-500 rounded-lg text-white shadow-lg shadow-green-500/30">
                    <span className="material-symbols-outlined">sync_saved_locally</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Seamless Integration</p>
                    <p className="text-xs text-slate-500">Works with your existing barriers & cameras</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 text-blue-600 font-bold uppercase tracking-widest text-xs">
                <span className="w-12 h-px bg-blue-600"></span>
                Smart Workflow
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">Technology that adapts to <span className="text-blue-600">your workflow.</span></h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light">
                Basic Security doesn't just replace your clipboard; it transforms your gatehouse into an intelligent security hub. From license plate recognition to pre-authorized QR codes, we handle the complexity so you don't have to.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold text-sm">Cloud-based Reliability</h4>
                    <p className="text-slate-500 text-sm mt-1">Logs stored securely for 12 months with 99.9% uptime.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold text-sm">Offline Capability</h4>
                    <p className="text-slate-500 text-sm mt-1">Ensures zero downtime during internet or power outages.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold text-sm">Data Compliance</h4>
                    <p className="text-slate-500 text-sm mt-1">Full GDPR & POPIA compliant data handling protocols.</p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <a className="text-slate-800 hover:text-blue-600 font-semibold flex items-center gap-2 group transition-colors" href="#">
                  Explore Features
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-slate-50 border-t border-slate-200">
        <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xl">
              <span className="material-symbols-outlined text-5xl text-blue-600">lock_person</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Ready to secure your estate?</h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">Join hundreds of forward-thinking estates using Basic Security to protect their residents and streamline operations with cutting-edge technology.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={navigateToLogin} className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all">
              Request a Demo
            </button>
            <button className="px-8 py-4 bg-white border border-slate-300 text-slate-700 font-semibold rounded-full hover:bg-slate-50 hover:border-slate-400 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-slate-900">
                <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-lg">shield_lock</span>
                </div>
                <span className="font-bold text-lg">Basic Security</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed pr-4">
                The modern standard for estate access control and visitor management. Designed for safety, built for speed, trusted by communities.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-blue-600 transition-colors" href="#">Features</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Hardware Integration</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Resident App</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-blue-600 transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Security Blog</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold mb-6">Access</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-blue-600 transition-colors" href="#">Help Center</a></li>
                <li><a className="hover:text-blue-600 transition-colors" href="#">System Status</a></li>
                <li>
                  <a onClick={navigateToLogin} className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-2 cursor-pointer">
                    Admin Login <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2024 Basic Security Systems. All rights reserved.</p>
            <div className="flex gap-8">
              <a className="hover:text-slate-800 transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-slate-800 transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-slate-800 transition-colors" href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};