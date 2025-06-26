export default function Footer() {
  return (
    <footer className="border-t-2 border-yellow-400 bg-gray-900/25 text-gray-300 px-4 py-6 mt-16 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Left: Brand Info */}
        <div>
          <h2 className="text-lg font-bold text-white">Musical Monsters</h2>
          <p className="mt-1">Helping to boost Tulsa &apos;s independent music scene with open mics, showcases, and artist support.</p>
        </div>

        {/* Middle: Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-1">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/events" className="hover:underline">Events</a></li>
            <li><a href="/#monsters" className="hover:underline">Monsters</a></li>
          </ul>
        </div>

        {/* Right: Contact / CTA */}
        <div>
          <h3 className="text-white font-semibold mb-1">Stay Connected</h3>
          <p>Booking: <a href="mailto:musicalmonsterstulsa@gmail.com" className="hover:underline">MusicalMonstersTulsa@gmail.com</a></p>
          <p className="mt-1">Support us: <a href="https://ko-fi.com/musicalmonsters" target="_blank" rel="noreferrer" className="hover:underline">The Pizza Fund</a></p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-gray-700 mt-6 pt-3 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Musical Monsters. All rights reserved.</p>
        <p>Site by Ethan Cantrell</p>
      </div>
    </footer>
  );
}
