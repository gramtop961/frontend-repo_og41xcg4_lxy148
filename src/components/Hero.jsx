import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">Proton — India’s Manufacturing Revolution</h1>
            <p className="mt-4 text-gray-700 text-lg">Unifying manufacturers, corporate buyers, skilled workers, and investors into one ecosystem to power a self-reliant future.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#join" className="px-5 py-3 rounded-lg bg-gray-900 text-white">Join Proton</a>
              <a href="#learn" className="px-5 py-3 rounded-lg bg-white/80 backdrop-blur border">Learn more</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
    </section>
  );
}
