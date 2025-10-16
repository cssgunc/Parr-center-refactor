import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-carolina-blue text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column - Branding */}
          <div className="pl-16 space-y-2">
            <Image src="/philosophy_logo_white.png" alt="UNC Philosophy Logo" width={150} height={200} />
          </div>

          {/* Middle Column - Contact Information */}
          <div className="space-y-1 text-sm">
            <div>Philosophy Department • UNC Chapel Hill</div>
            <div>Caldwell Hall • CB# 3125 240 East Cameron Ave.</div>
            <div>Chapel Hill, NC 27599-3125</div>
            <div>phone: (919) 962-7291</div>
            <div>fax: (919) 843-3929</div>
            <div>email: philosophy@unc.edu</div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="space-y-2">
            <div className="font-semibold">
              Quick Links
            </div>
            <div className="space-y-1 text-sm">
              <div>XXXXXXXXXXXXXXXXXXX</div>
              <div>XXXXXXXX</div>
              <div>XXXXXXXXXXXXXXXXXX</div>
              <div>XXXXXX</div>
              <div>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
