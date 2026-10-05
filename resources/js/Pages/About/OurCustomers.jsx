import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet Default Marker Icon Issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Coordinate Center Indonesia View
const INDONESIA_CENTER = [-2.548926, 118.014863];
const DEFAULT_ZOOM = 5;
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80";

// Custom Controller Component untuk Menangani Map FlyTo Animation
function MapViewController({ targetCoords, zoomLevel }) {
  const map = useMap();

  useEffect(() => {
    if (targetCoords) {
      map.flyTo(targetCoords, zoomLevel || 6, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [targetCoords, zoomLevel, map]);

  return null;
}

// Function Generator Custom DivIcon dengan Desain Corporate
const createCustomIcon = (client, isActive) => {
  const activeClass = isActive ? "spi-marker-active" : "spi-marker-default";

  const html = `
    <div class="spi-custom-marker ${activeClass}">
      <div class="spi-marker-badge">
        <span class="spi-marker-title">${client.name}</span>
        <span class="spi-marker-count">${client.region}</span>
      </div>
      <div class="spi-marker-pin-wrapper">
        <div class="spi-marker-glow"></div>
        <div class="spi-marker-dot"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: "spi-leaflet-div-icon",
    iconSize: [140, 60],
    iconAnchor: [70, 52],
    popupAnchor: [0, -50],
  });
};

export default function OurCustomers({ customers = [] }) {
  // Koordinat dasar pusat wilayah (lengkap dengan South Sumatera)
  const baseRegions = {
    "Central Kalimantan": [-1.6815, 113.3824],
    "East & North Kalimantan": [0.5387, 116.4194],
    "South Sulawesi": [-3.6687, 119.9740],
    "South-East Sulawesi": [-4.1449, 122.1746],
    "South Kalimantan": [-2.5920, 115.2692],
    "South Sumatera": [-3.3194, 104.9142],
  };

  // Helper cerdas untuk mengekstrak koordinat lat/lng dari Link Google Maps jika admin menginput URL maps
  const extractCoordsFromMapsLink = (link, regionName) => {
    if (!link) return baseRegions[regionName] || INDONESIA_CENTER;

    const coordRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = link.match(coordRegex);
    if (match && match[1] && match[2]) {
      return [parseFloat(match[1]), parseFloat(match[2])];
    }

    return baseRegions[regionName] || INDONESIA_CENTER;
  };

  // Format data client dari database dengan sebaran marker unik per PT
  const formattedClients = customers.map((c, index) => {
    const regionName = c.region || "Central Kalimantan";
    const coords = extractCoordsFromMapsLink(c.address, regionName);

    // Berikan sedikit offset agar marker yang koordinatnya berdekatan tidak bertumpuk persis
    const offsetLat = coords[0] + (index * 0.006);
    const offsetLng = coords[1] + (index * 0.006);

    return {
      id: c.id || index,
      name: c.name,
      region: regionName,
      sector: c.description || "Mining & Heavy Equipment Services",
      address: c.address || "",
      image: c.logo_path ? `/${c.logo_path}` : PLACEHOLDER_IMAGE,
      coordinates: [offsetLat, offsetLng],
    };
  });

  const regionsList = Object.keys(baseRegions);
  const [activeRegion, setActiveRegion] = useState(regionsList[0]);
  
  // State target peta awal netral menampilkan seluruh Indonesia (Zoom 5)
  const [mapTarget, setMapTarget] = useState({
    coords: INDONESIA_CENTER,
    zoom: DEFAULT_ZOOM,
  });

  const [selectedClientId, setSelectedClientId] = useState(null);
  const mapRef = useRef(null);

  // Filter client berdasarkan tab wilayah aktif
  const filteredClients = formattedClients.filter((c) => {
    const cReg = (c.region || "").trim().toLowerCase();
    const actReg = activeRegion.trim().toLowerCase();
    return cReg === actReg || cReg.includes(actReg) || actReg.includes(cReg);
  });

  const handleResetView = () => {
    setMapTarget({
      coords: INDONESIA_CENTER,
      zoom: DEFAULT_ZOOM,
    });
    setSelectedClientId(null);
  };

  const handleClientClick = (client) => {
    setSelectedClientId(client.id);
    // Saat perusahaan diklik, arahkan ke lokasi perusahaan dengan zoom sedang (tidak terlalu dekat)
    setMapTarget({
      coords: client.coordinates,
      zoom: 8,
    });
  };

  return (
    <section className="mt-12 sm:mt-16 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-sm">
      {/* Inject Custom Style untuk Leaflet UI & Marker */}
      <style>{`
        .spi-leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .spi-custom-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spi-marker-badge {
          background: #0F2B5C;
          border: 2px solid #FFC107;
          border-radius: 8px;
          padding: 4px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 12px rgba(15, 43, 92, 0.35);
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .spi-marker-title {
          font-size: 11px;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: 0.02em;
        }

        .spi-marker-count {
          font-size: 10px;
          font-weight: 700;
          color: #FFC107;
          line-height: 1.2;
        }

        .spi-marker-pin-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 3px;
        }

        .spi-marker-dot {
          width: 12px;
          height: 12px;
          background-color: #FFC107;
          border: 2px solid #0F2B5C;
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .spi-marker-glow {
          position: absolute;
          width: 24px;
          height: 24px;
          background: rgba(255, 193, 7, 0.4);
          border-radius: 50%;
          z-index: 1;
          animation: spi-pulse 2s infinite ease-in-out;
        }

        .spi-marker-active .spi-marker-badge {
          background: #0F2B5C;
          border-color: #FFC107;
          transform: scale(1.15);
          box-shadow: 0 0 16px rgba(255, 193, 7, 0.8);
        }

        .spi-marker-active .spi-marker-dot {
          background-color: #DC2626;
          border-color: #FFFFFF;
          transform: scale(1.3);
        }

        .spi-marker-active .spi-marker-glow {
          background: rgba(220, 38, 38, 0.5);
          width: 36px;
          height: 36px;
        }

        .spi-marker-default:hover .spi-marker-badge {
          transform: translateY(-2px);
          border-color: #FFFFFF;
        }

        @keyframes spi-pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-shadow: 0 10px 25px -5px rgba(15, 43, 92, 0.3) !important;
          border: 1px solid #E2E8F0 !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
          width: 200px !important;
        }

        .leaflet-container {
          font-family: inherit !important;
        }
      `}</style>

      {/* Header Section */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
          Our Nationwide Customers
        </span>
        <h3 className="mt-1 text-xl sm:text-2xl font-black text-[#0F2B5C] md:text-3xl">
          TRUSTED ACROSS INDONESIA
        </h3>
        <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-[#64748B] md:text-sm">
          Klik pada kartu perusahaan di bawah untuk langsung memperbesar lokasi spesifiknya pada peta interaktif.
        </p>
      </div>

      {/* Real Interactive Map Container */}
      <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-300 shadow-md">
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[500] flex items-center gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-white/95 px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-md backdrop-blur-md border border-slate-200">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-bold text-[#0F2B5C]">Live Geographic Map</span>
          </div>

          <button
            onClick={handleResetView}
            className="flex items-center gap-1 rounded-lg bg-[#0F2B5C] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white shadow-md transition-all hover:bg-[#1E3A8A] hover:text-[#FFC107] active:scale-95 cursor-pointer"
          >
            Reset View
          </button>
        </div>

        <div className="h-[260px] sm:h-[360px] md:h-[480px] w-full">
          <MapContainer
            center={INDONESIA_CENTER}
            zoom={DEFAULT_ZOOM}
            scrollWheelZoom={true}
            className="h-full w-full z-10"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapViewController targetCoords={mapTarget?.coords} zoomLevel={mapTarget?.zoom} />

            {/* Render Pin Marker HANYA untuk perusahaan yang diklik */}
            {filteredClients.map((client) => {
              const isActive = selectedClientId === client.id;
              if (!isActive) return null; // Kosong sebelum diklik

              const customIcon = createCustomIcon(client, isActive);

              return (
                <Marker
                  key={client.id}
                  position={client.coordinates}
                  icon={customIcon}
                >
                  <Popup offset={[0, -10]}>
                    <div className="p-2.5">
                      <h5 className="text-[11px] font-black text-[#0F2B5C]">{client.name}</h5>
                      <p className="text-[9px] text-amber-600 font-bold mt-0.5">{client.sector}</p>
                      <p className="text-[9px] text-slate-500 mt-1">📍 {client.region}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Region Selector Tabs */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 border-b border-slate-200 pb-4 sm:grid-cols-3 lg:grid-cols-6">
        {regionsList.map((reg) => {
          const isActive = activeRegion === reg;
          const count = formattedClients.filter(c => c.region.trim().toLowerCase() === reg.trim().toLowerCase()).length;
          return (
            <button
              key={reg}
              onClick={() => {
                setActiveRegion(reg);
                setSelectedClientId(null);
                setMapTarget({ coords: baseRegions[reg], zoom: 6 });
              }}
              className={`flex w-full items-center justify-between gap-1 rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-3 text-[10px] sm:text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#0F2B5C] text-[#FFC107] shadow-lg scale-[1.02]"
                  : "bg-slate-100 text-[#64748B] hover:bg-slate-200 hover:text-[#0F2B5C]"
              }`}
            >
              <span className="truncate">{reg}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] sm:text-[10px] font-bold ${isActive ? "bg-[#FFC107] text-[#0B1220]" : "bg-slate-200 text-[#64748B]"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Region Customer Details */}
      <div className="mt-5 sm:mt-6">
        <div className="mb-3 sm:mb-4 flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm sm:text-lg font-bold text-[#0F2B5C]">
              Pelanggan Wilayah {activeRegion}
            </h4>
            <p className="text-[10px] sm:text-xs text-[#64748B]">Daftar mitra industri dan lokasi operasional.</p>
          </div>
          <span className="w-fit rounded-md bg-[#0F2B5C]/10 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-[#0F2B5C]">
            {filteredClients.length} Total Partner
          </span>
        </div>

        {/* Customer Cards Grid (Kecil-kecil khusus mobile, ukuran normal di desktop) */}
        {filteredClients.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 sm:p-8 text-center">
            <p className="text-xs text-slate-400 italic">
              Belum ada data pelanggan untuk wilayah {activeRegion}. Silakan tambahkan melalui Dashboard Admin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-5">
            {filteredClients.map((client) => {
              const isSelected = selectedClientId === client.id;

              return (
                <div
                  key={client.id}
                  onClick={() => handleClientClick(client)}
                  className={`group relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border flex flex-col justify-between p-2 sm:p-4 cursor-pointer ${isSelected ? "border-2 border-amber-500 ring-2 ring-amber-100" : "border-slate-200 hover:border-amber-400"}`}
                  title="Klik untuk zoom lokasi PT ini di peta"
                >
                  {/* Container Logo Persegi */}
                  <div className="aspect-square w-full bg-slate-50 rounded-lg sm:rounded-xl border border-slate-100 p-1.5 sm:p-3 flex items-center justify-center overflow-hidden mb-1.5 sm:mb-3">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div>
                    <h5 className="text-[10px] sm:text-sm font-extrabold text-[#0F2B5C] truncate">
                      {client.name}
                    </h5>
                    <p className="text-[8px] sm:text-[11px] font-semibold text-amber-600 mt-0.5 truncate">
                      {client.sector}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}