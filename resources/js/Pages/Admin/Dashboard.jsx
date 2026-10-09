import React, { useState, useEffect, useRef } from 'react';
import { useForm, Head, router } from "@inertiajs/react";

export default function AdminDashboard({ 
  homeSetting, 
  projects = [], 
  branches = [], 
  posters = [], 
  milestones = [], 
  companyHistories = [], 
  teamMembers = [], 
  customers = [], 
  products = [], 
  spareParts = [], 
  articles = [], 
  mediaGalleries = [], 
  testimonials = [],
  jobVacancies = [],
  services = [],
  productCatalogPdf = null,
  sparePartCatalogPdf = null,
  explodedImagesMap = {}, 
  explodedPartsDataMap = {} 
}) {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "homepage";
  });

  const [activeProductCategory, setActiveProductCategory] = useState("Excavator");

  const [specRows, setSpecRows] = useState([{ label: "", value: "" }]);
  const [featureRows, setFeatureRows] = useState([""]);

  // STATE UNTUK MODAL EDIT PRODUK
  const [editingProduct, setEditingProduct] = useState(null);
  const [editSpecRows, setEditSpecRows] = useState([{ label: "", value: "" }]);
  const [editFeatureRows, setEditFeatureRows] = useState([""]);

  // STATE UNTUK MODAL EDIT PROYEK
  const [editingProject, setEditingProject] = useState(null);
  const editProjectForm = useForm({
    title: "",
    location: "",
    year: "",
    image: null,
    description: "",
    remove_image: false,
  });

  // STATE UNTUK MODAL EDIT CABANG
  const [editingBranch, setEditingBranch] = useState(null);
  const editBranchForm = useForm({
    category: "Head Office",
    name: "",
    city: "",
    phone: "",
    description: "",
    maps_link: "",
    latitude: -2.5489,
    longitude: 118.0149,
  });

  // STATE UNTUK MODAL EDIT MILESTONE
  const [editingMilestone, setEditingMilestone] = useState(null);
  const editMilestoneForm = useForm({
    year: "",
    title: "",
    description: "",
    image: null,
    remove_image: false,
  });

  // STATE UNTUK MODAL EDIT COMPANY HISTORY (MENDUKUNG TITLE & DESCRIPTION)
  const [editingHistory, setEditingHistory] = useState(null);
  const editHistoryForm = useForm({
    year: "",
    title: "",
    description: "",
  });

  // STATE UNTUK MODAL EDIT CUSTOMER
  const [editingCustomer, setEditingCustomer] = useState(null);
  const editCustomerForm = useForm({
    name: "",
    region: "Central Kalimantan",
    description: "",
    address: "",
    logo: null,
    remove_logo: false,
  });

  // STATE UNTUK MODAL EDIT LOWONGAN KERJA
  const [editingJob, setEditingJob] = useState(null);
  const editJobForm = useForm({
    title: "",
    department: "",
    location: "",
    education: "",
    job_type: "Full-time",
    image: null,
    description: "",
    requirements: "",
    remove_image: false,
  });

  // STATE UNTUK MODAL EDIT TESTIMONI
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const editTestimonialForm = useForm({
    name: "",
    role: "",
    category: "customer",
    quote: "",
    image: null,
    remove_image: false,
  });

  // STATE UNTUK MODAL EDIT SUB-LAYANAN
  const [editingService, setEditingService] = useState(null);
  const editServiceForm = useForm({
    category: "Maintenance & Repair",
    title: "",
    description: "",
    what_we_do: "",
    key_benefits: "",
  });

  // STATE UNTUK MODAL EDIT ARTIKEL KNOWLEDGE
  const [editingArticle, setEditingArticle] = useState(null);
  const editArticleForm = useForm({
    title: "",
    category: "Maintenance Tips",
    read_time: "5 Menit",
    excerpt: "",
    content: "",
    instagram_link: "",
    thumbnail: null,
    is_featured: false,
    remove_thumbnail: false,
  });

  const heroForm = useForm({
    youtube_url: homeSetting?.youtube_url || "",
    video_file: null,
  });

  const projectForm = useForm({
    title: "", 
    location: "", 
    year: "", 
    image: null, 
    description: "",
  });

  const branchForm = useForm({
    category: "Head Office", 
    name: "", 
    city: "", 
    phone: "", 
    description: "", 
    maps_link: "",
    latitude: -2.5489,
    longitude: 118.0149,
  });

  const posterForm = useForm({
    image: null,
  });

  const milestoneForm = useForm({
    year: "",
    title: "",
    description: "",
    image: null,
  });

  // FORM TAMBAH COMPANY HISTORY (MENGISI TITLE DAN DESCRIPTION SEKALIGUS)
  const historyForm = useForm({
    year: "",
    title: "",
    description: "",
  });

  const teamForm = useForm({
    name: "",
    role: "",
    category: "management",
    linkedin: "",
    image: null,
  });

  const customerForm = useForm({
    name: "",
    region: "Central Kalimantan",
    description: "",
    address: "", 
    logo: null,
  });

  const productForm = useForm({
    category: "Excavator",
    name: "",
    image: null,
    brochure: null,
    video_file: null, 
    gallery_images: [], 
    description: "",
  });

  const sparePartForm = useForm({
    category: "Maintenance Tips",
    part_number: "",
    name: "",
    brand: "XCMG",
    image: null,
    gallery_images: [],
    delivery_time: "1-90 DAYS",
    supply_capacity: "10,000 Pieces/Year, Waiting for Your Order in Stock",
    product_origin: "China",
    package_type: "Carton or Wooden Box",
    shipping_methods: "Air Transport, Sea Transport, Express Delivery, Truck Transportation",
  });

  const articleForm = useForm({
    title: "",
    category: "Maintenance Tips",
    read_time: "5 Menit",
    excerpt: "",
    content: "",
    instagram_link: "", 
    thumbnail: null,
    is_featured: false,
  });

  const mediaForm = useForm({
    title: "",
    category: "Photo Gallery",
    media_type: "Foto (Image)",
    file: null,
    description: "",
  });

  const jobVacancyForm = useForm({
    title: "",
    department: "",
    location: "",
    education: "",
    job_type: "Full-time",
    image: null,
    description: "",
    requirements: "",
  });

  const testimonialForm = useForm({
    name: "",
    role: "",
    category: "customer",
    quote: "",
    image: null,
  });

  const serviceForm = useForm({
    category: "Maintenance & Repair",
    title: "",
    description: "",
    what_we_do: "",
    key_benefits: "",
  });

  const productCatalogForm = useForm({
    type: "product",
    catalog_pdf: null,
  });

  const sparePartCatalogForm = useForm({
    type: "spare_part",
    catalog_pdf: null,
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    if (confirm("Apakah Anda yakin ingin keluar dari sistem admin?")) {
      router.post('/logout');
    }
  };

  useEffect(() => {
    if (activeTab === "homepage" && window.L) {
      const mapContainer = document.getElementById("admin-leaflet-map");
      if (mapContainer && !mapContainer._leaflet_id) {
        const map = window.L.map("admin-leaflet-map").setView([branchForm.data.latitude, branchForm.data.longitude], 5);
        mapRef.current = map;

        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        const marker = window.L.marker([branchForm.data.latitude, branchForm.data.longitude], { draggable: true }).addTo(map);
        markerRef.current = marker;

        marker.on("dragend", function (e) {
          const latLng = e.target.getLatLng();
          branchForm.setData((prev) => ({
            ...prev,
            latitude: latLng.lat.toFixed(6),
            longitude: latLng.lng.toFixed(6),
          }));
        });

        map.on("click", function (e) {
          marker.setLatLng(e.latlng);
          branchForm.setData((prev) => ({
            ...prev,
            latitude: e.latlng.lat.toFixed(6),
            longitude: e.latlng.lng.toFixed(6),
          }));
        });
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeTab]);

  const handleMapsLinkChange = (e) => {
    const val = e.target.value;
    branchForm.setData("maps_link", val);

    const coordRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = val.match(coordRegex);

    if (match && match[1] && match[2]) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);

      branchForm.setData((prev) => ({
        ...prev,
        maps_link: val,
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      }));

      if (mapRef.current && markerRef.current) {
        mapRef.current.setView([lat, lng], 15);
        markerRef.current.setLatLng([lat, lng]);
      }
    }
  };

  const handleCityBlur = async () => {
    const city = branchForm.data.city;
    if (!city) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city + ", Indonesia")}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        branchForm.setData((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lon.toFixed(6),
        }));

        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([lat, lon], 12);
          markerRef.current.setLatLng([lat, lon]);
        }
      }
    } catch (error) {
      console.error("Gagal mendeteksi lokasi kota:", error);
    }
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    heroForm.post("/admin/home/hero", {
      forceFormData: true,
      onSuccess: () => {
        alert("Video Hero Banner berhasil diperbarui!");
        heroForm.reset("video_file");
      },
    });
  };

  const handleDeleteVideo = () => {
    if (confirm("Apakah Anda yakin ingin menghapus video hero banner ini?")) {
      router.delete("/admin/home/hero", {
        onSuccess: () => {
          alert("Video Hero berhasil dihapus!");
        },
      });
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", projectForm.data.title);
    formData.append("location", projectForm.data.location);
    formData.append("year", projectForm.data.year);
    if (projectForm.data.image) formData.append("image", projectForm.data.image);
    formData.append("description", projectForm.data.description || "");

    router.post("/admin/projects", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Proyek baru berhasil ditambahkan ke galeri!");
        projectForm.reset();
        router.reload();
      },
    });
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    editProjectForm.setData({
      title: proj.title || "",
      location: proj.location || "",
      year: proj.year || "",
      image: null,
      description: proj.description || "",
      remove_image: false,
    });
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    if (!editingProject) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", editProjectForm.data.title);
    formData.append("location", editProjectForm.data.location);
    formData.append("year", editProjectForm.data.year);
    formData.append("description", editProjectForm.data.description || "");
    formData.append("remove_image", editProjectForm.data.remove_image ? 1 : 0);

    if (editProjectForm.data.image) {
      formData.append("image", editProjectForm.data.image);
    }

    router.post(`/admin/projects/${editingProject.id}`, formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Proyek berhasil diperbarui!");
        setEditingProject(null);
        router.reload();
      },
    });
  };

  const handleDeleteProject = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini dari galeri?")) {
      router.delete(`/admin/projects/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Proyek berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handleBranchSubmit = (e) => {
    e.preventDefault();
    branchForm.post("/admin/branches", {
      preserveState: false,
      onSuccess: () => {
        alert("Cabang / Area Operasional berhasil ditambahkan!");
        branchForm.reset();
        router.reload();
      },
    });
  };

  const handleOpenEditBranch = (b) => {
    setEditingBranch(b);
    editBranchForm.setData({
      category: b.category || "Head Office",
      name: b.name || "",
      city: b.city || "",
      phone: b.phone || "",
      description: b.description || "",
      maps_link: b.maps_link || "",
      latitude: b.latitude || -2.5489,
      longitude: b.longitude || 118.0149,
    });
  };

  const handleUpdateBranch = (e) => {
    e.preventDefault();
    if (!editingBranch) return;

    editBranchForm.put(`/admin/branches/${editingBranch.id}`, {
      preserveState: false,
      onSuccess: () => {
        alert("Cabang berhasil diperbarui!");
        setEditingBranch(null);
        router.reload();
      },
    });
  };

  const handleDeleteBranch = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus cabang ini?")) {
      router.delete(`/admin/branches/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Cabang berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handlePosterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (posterForm.data.image) formData.append("image", posterForm.data.image);

    router.post("/admin/posters", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Poster berhasil diunggah!");
        posterForm.reset();
        router.reload();
      },
    });
  };

  const handleDeletePoster = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus poster ini?")) {
      router.delete(`/admin/posters/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Poster berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("year", milestoneForm.data.year);
    formData.append("title", milestoneForm.data.title);
    formData.append("description", milestoneForm.data.description);
    if (milestoneForm.data.image) formData.append("image", milestoneForm.data.image);

    router.post("/admin/milestones", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Milestone berhasil ditambahkan!");
        milestoneForm.reset();
        router.reload();
      },
    });
  };

  const handleOpenEditMilestone = (m) => {
    setEditingMilestone(m);
    editMilestoneForm.setData({
      year: m.year || "",
      title: m.title || "",
      description: m.description || "",
      image: null,
      remove_image: false,
    });
  };

  const handleUpdateMilestone = (e) => {
    e.preventDefault();
    if (!editingMilestone) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("year", editMilestoneForm.data.year);
    formData.append("title", editMilestoneForm.data.title);
    formData.append("description", editMilestoneForm.data.description);
    formData.append("remove_image", editMilestoneForm.data.remove_image ? 1 : 0);

    if (editMilestoneForm.data.image) {
      formData.append("image", editMilestoneForm.data.image);
    }

    router.post(`/admin/milestones/${editingMilestone.id}`, formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Milestone berhasil diperbarui!");
        setEditingMilestone(null);
        router.reload();
      },
    });
  };

  const handleDeleteMilestone = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus milestone ini?")) {
      router.delete(`/admin/milestones/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Milestone berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  // HANDLER COMPANY HISTORY (MENGISI TITLE DAN DESCRIPTION SEKALIGUS AGAR AMAN DI BACKEND/FRONTEND)
  const handleHistorySubmit = (e) => {
    e.preventDefault();
    router.post("/admin/company-histories", {
      year: historyForm.data.year,
      title: historyForm.data.description,
      description: historyForm.data.description,
    }, {
      preserveState: false,
      onSuccess: () => {
        alert("Company History berhasil ditambahkan!");
        historyForm.reset();
        router.reload();
      },
    });
  };

  const handleOpenEditHistory = (h) => {
    setEditingHistory(h);
    editHistoryForm.setData({
      year: h.year || "",
      title: h.title || h.description || "",
      description: h.description || h.title || "",
    });
  };

  const handleUpdateHistory = (e) => {
    e.preventDefault();
    if (!editingHistory) return;

    router.put(`/admin/company-histories/${editingHistory.id}`, {
      year: editHistoryForm.data.year,
      title: editHistoryForm.data.description,
      description: editHistoryForm.data.description,
    }, {
      preserveState: false,
      onSuccess: () => {
        alert("Company History berhasil diperbarui!");
        setEditingHistory(null);
        router.reload();
      },
    });
  };

  const handleDeleteHistory = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus company history ini?")) {
      router.delete(`/admin/company-histories/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Company History berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teamForm.data.name);
    formData.append("role", teamForm.data.role);
    formData.append("category", teamForm.data.category);
    formData.append("linkedin", teamForm.data.linkedin || "");
    if (teamForm.data.image) formData.append("image", teamForm.data.image);

    router.post("/admin/team-members", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Anggota tim berhasil ditambahkan!");
        teamForm.reset();
        router.reload();
      },
    });
  };

  const handleDeleteTeam = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) {
      router.delete(`/admin/team-members/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Anggota tim berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", customerForm.data.name);
    formData.append("region", customerForm.data.region);
    formData.append("description", customerForm.data.description || "");
    formData.append("address", customerForm.data.address || ""); 
    if (customerForm.data.logo) formData.append("logo", customerForm.data.logo);

    router.post("/admin/customers", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Pelanggan berhasil ditambahkan!");
        customerForm.reset();
        router.reload();
      },
    });
  };

  const handleOpenEditCustomer = (c) => {
    setEditingCustomer(c);
    editCustomerForm.setData({
      name: c.name || "",
      region: c.region || "Central Kalimantan",
      description: c.description || "",
      address: c.address || "",
      logo: null,
      remove_logo: false,
    });
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    if (!editingCustomer) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", editCustomerForm.data.name);
    formData.append("region", editCustomerForm.data.region);
    formData.append("description", editCustomerForm.data.description || "");
    formData.append("address", editCustomerForm.data.address || "");
    formData.append("remove_logo", editCustomerForm.data.remove_logo ? 1 : 0);

    if (editCustomerForm.data.logo) {
      formData.append("logo", editCustomerForm.data.logo);
    }

    router.post(`/admin/customers/${editingCustomer.id}`, formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Pelanggan berhasil diperbarui!");
        setEditingCustomer(null);
        router.reload();
      },
    });
  };

  const handleDeleteCustomer = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) {
      router.delete(`/admin/customers/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Pelanggan berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    serviceForm.post("/admin/services", {
      preserveState: false,
      onSuccess: () => {
        alert("Sub-layanan berhasil ditambahkan ke kategori!");
        serviceForm.reset("title", "description", "what_we_do", "key_benefits");
        router.reload();
      },
    });
  };

  const handleDeleteService = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus sub-layanan ini?")) {
      router.delete(`/admin/services/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Sub-layanan berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handleOpenEditService = (srv) => {
    setEditingService(srv);
    editServiceForm.setData({
      category: srv.category || "Maintenance & Repair",
      title: srv.title || "",
      description: srv.description || "",
      what_we_do: Array.isArray(srv.what_we_do) ? srv.what_we_do.join("\n") : (srv.what_we_do || ""),
      key_benefits: Array.isArray(srv.key_benefits) ? srv.key_benefits.join("\n") : (srv.key_benefits || ""),
    });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    if (!editingService) return;

    editServiceForm.put(`/admin/services/${editingService.id}`, {
      preserveState: false,
      onSuccess: () => {
        alert("Sub-layanan berhasil diperbarui!");
        setEditingService(null);
        router.reload();
      },
    });
  };

  const handleOpenEditArticle = (art) => {
    setEditingArticle(art);
    editArticleForm.setData({
      title: art.title || "",
      category: art.category || "Maintenance Tips",
      read_time: art.read_time || "5 Menit",
      excerpt: art.excerpt || "",
      content: art.content || "",
      instagram_link: art.instagram_link || "",
      thumbnail: null,
      is_featured: !!art.is_featured,
      remove_thumbnail: false,
    });
  };

  const handleUpdateArticle = (e) => {
    e.preventDefault();
    if (!editingArticle) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", editArticleForm.data.title);
    formData.append("category", editArticleForm.data.category);
    formData.append("read_time", editArticleForm.data.read_time);
    formData.append("excerpt", editArticleForm.data.excerpt || "");
    formData.append("content", editArticleForm.data.content);
    formData.append("instagram_link", editArticleForm.data.instagram_link || "");
    formData.append("is_featured", editArticleForm.data.is_featured ? 1 : 0);
    formData.append("remove_thumbnail", editArticleForm.data.remove_thumbnail ? 1 : 0);

    if (editArticleForm.data.thumbnail) {
      formData.append("thumbnail", editArticleForm.data.thumbnail);
    }

    router.post(`/admin/articles/${editingArticle.id}`, formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Artikel Knowledge berhasil diperbarui!");
        setEditingArticle(null);
        router.reload();
      },
    });
  };

  const handleCatalogUpdate = (formInstance, typeName) => {
    formInstance.post("/admin/catalogs/update", {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert(`${typeName} berhasil diperbarui dan disimpan secara permanen!`);
        formInstance.reset("catalog_pdf");
        router.reload();
      },
    });
  };

  const handleCatalogDelete = (type, typeName) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${typeName}?`)) {
      router.delete("/admin/catalogs/delete", {
        data: { type: type },
        preserveState: false,
        onSuccess: () => {
          alert(`${typeName} berhasil dihapus!`);
          router.reload();
        },
      });
    }
  };

  const handleAddSpecRow = () => setSpecRows([...specRows, { label: "", value: "" }]);
  const handleRemoveSpecRow = (index) => setSpecRows(specRows.filter((_, i) => i !== index));

  const handleAddFeatureRow = () => setFeatureRows([...featureRows, ""]);
  const handleRemoveFeatureRow = (index) => setFeatureRows(featureRows.filter((_, i) => i !== index));

  const handleAddEditSpecRow = () => setEditSpecRows([...editSpecRows, { label: "", value: "" }]);
  const handleRemoveEditSpecRow = (index) => setEditSpecRows(editSpecRows.filter((_, i) => i !== index));

  const handleAddEditFeatureRow = () => setEditFeatureRows([...editFeatureRows, ""]);
  const handleRemoveEditFeatureRow = (index) => setEditFeatureRows(editFeatureRows.filter((_, i) => i !== index));

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", activeProductCategory);
    formData.append("name", productForm.data.name);
    if (productForm.data.image) formData.append("image", productForm.data.image);
    if (productForm.data.brochure) formData.append("brochure", productForm.data.brochure);
    if (productForm.data.video_file) formData.append("video_file", productForm.data.video_file);
    if (productForm.data.gallery_images) {
      for (let i = 0; i < productForm.data.gallery_images.length; i++) {
        formData.append("gallery_images[]", productForm.data.gallery_images[i]);
      }
    }
    formData.append("description", productForm.data.description || "");
    formData.append("specifications", JSON.stringify(specRows));
    formData.append("features", JSON.stringify(featureRows));

    router.post("/admin/products", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Produk berhasil ditambahkan!");
        productForm.reset();
        setSpecRows([{ label: "", value: "" }]);
        setFeatureRows([""]);
        router.reload();
      },
    });
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    editProductForm.setData({
      category: prod.category || activeProductCategory,
      name: prod.name || "",
      image: null,
      video_file: null,
      gallery_images: [],
      description: prod.description || "",
      remove_image: false,
      remove_video: false,
    });

    try {
      let parsedSpecs = typeof prod.specifications === 'string' ? JSON.parse(prod.specifications) : prod.specifications;
      setEditSpecRows(Array.isArray(parsedSpecs) && parsedSpecs.length > 0 ? parsedSpecs : [{ label: "", value: "" }]);
    } catch (e) {
      setEditSpecRows([{ label: "", value: "" }]);
    }

    try {
      let parsedFeats = typeof prod.features === 'string' ? JSON.parse(prod.features) : prod.features;
      setEditFeatureRows(Array.isArray(parsedFeats) && parsedFeats.length > 0 ? parsedFeats : [""]);
    } catch (e) {
      setEditFeatureRows([""]);
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("category", editProductForm.data.category);
    formData.append("name", editProductForm.data.name);
    if (editProductForm.data.image) formData.append("image", editProductForm.data.image);
    if (editProductForm.data.video_file) formData.append("video_file", editProductForm.data.video_file);
    formData.append("remove_image", editProductForm.data.remove_image ? 1 : 0);
    formData.append("remove_video", editProductForm.data.remove_video ? 1 : 0);

    if (editProductForm.data.gallery_images && editProductForm.data.gallery_images.length > 0) {
      for (let i = 0; i < editProductForm.data.gallery_images.length; i++) {
        formData.append("gallery_images[]", editProductForm.data.gallery_images[i]);
      }
    }

    formData.append("description", editProductForm.data.description || "");
    formData.append("specifications", JSON.stringify(editSpecRows));
    formData.append("features", JSON.stringify(editFeatureRows));

    router.post(`/admin/products/${editingProduct.id}`, formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Produk berhasil diperbarui!");
        setEditingProduct(null);
        router.reload();
      },
    });
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      router.delete(`/admin/products/${id}`, {
        preserveState: false,
        onSuccess: () => {
          alert("Produk berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const handleSparePartSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", sparePartForm.data.category);
    formData.append("part_number", sparePartForm.data.part_number);
    formData.append("name", sparePartForm.data.name);
    formData.append("brand", sparePartForm.data.brand);
    if (sparePartForm.data.image) formData.append("image", sparePartForm.data.image);
    if (sparePartForm.data.gallery_images) {
      for (let i = 0; i < sparePartForm.data.gallery_images.length; i++) {
        formData.append("gallery_images[]", sparePartForm.data.gallery_images[i]);
      }
    }
    formData.append("delivery_time", sparePartForm.data.delivery_time || "");
    formData.append("supply_capacity", sparePartForm.data.supply_capacity || "");
    formData.append("product_origin", sparePartForm.data.product_origin || "");
    formData.append("package_type", sparePartForm.data.package_type || "");
    formData.append("shipping_methods", sparePartForm.data.shipping_methods || "");

    router.post("/admin/spare-parts", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Spare Part berhasil ditambahkan!");
        sparePartForm.reset();
        router.reload();
      },
    });
  };

  const handleDeleteSparePart = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus spare part ini?")) {
      router.delete(`/admin/spare-parts/${id}`, {
        preserveState: false,
        onSuccess: () => alert("Spare Part berhasil dihapus!"),
      });
    }
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", articleForm.data.title);
    formData.append("category", articleForm.data.category);
    formData.append("read_time", articleForm.data.read_time);
    formData.append("excerpt", articleForm.data.excerpt);
    formData.append("content", articleForm.data.content);
    formData.append("instagram_link", articleForm.data.instagram_link || "");
    if (articleForm.data.thumbnail) formData.append("thumbnail", articleForm.data.thumbnail);
    formData.append("is_featured", articleForm.data.is_featured ? 1 : 0);

    router.post("/admin/articles", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Artikel Knowledge berhasil ditambahkan!");
        articleForm.reset();
        router.reload();
      },
    });
  };

  const handleDeleteArticle = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      router.delete(`/admin/articles/${id}`, {
        preserveState: false,
        onSuccess: () => alert("Artikel berhasil dihapus!"),
      });
    }
  };

  const handleMediaSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", mediaForm.data.title);
    formData.append("category", mediaForm.data.category);
    formData.append("media_type", mediaForm.data.media_type);
    if (mediaForm.data.file) formData.append("file", mediaForm.data.file);
    formData.append("description", mediaForm.data.description || "");

    router.post("/admin/media", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Media berhasil diunggah ke galeri!");
        mediaForm.reset();
        router.reload();
      },
    });
  };

  const handleDeleteMedia = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus media ini dari galeri?")) {
      router.delete(`/admin/media/${id}`, {
        preserveState: false,
        onSuccess: () => alert("Media berhasil dihapus!"),
      });
    }
  };

  const handleJobVacancySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", jobVacancyForm.data.title);
    formData.append("department", jobVacancyForm.data.department);
    formData.append("location", jobVacancyForm.data.location);
    formData.append("education", jobVacancyForm.data.education);
    formData.append("job_type", jobVacancyForm.data.job_type);
    if (jobVacancyForm.data.image) formData.append("image", jobVacancyForm.data.image);
    formData.append("description", jobVacancyForm.data.description || "");
    formData.append("requirements", jobVacancyForm.data.requirements || "");

    router.post("/admin/job-vacancies", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Lowongan pekerjaan berhasil ditambahkan!");
        jobVacancyForm.reset();
        router.reload();
      },
    });
  };

  const handleOpenEditJob = (job) => {
    setEditingJob(job);
    editJobForm.setData({
      title: job.title || "",
      department: job.department || "",
      location: job.location || "",
      education: job.education || "",
      job_type: job.job_type || "Full-time",
      image: null,
      description: job.description || "",
      requirements: job.requirements || "",
      remove_image: false,
    });
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    if (!editingJob) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", editJobForm.data.title);
    formData.append("department", editJobForm.data.department);
    formData.append("location", editJobForm.data.location);
    formData.append("education", editJobForm.data.education);
    formData.append("job_type", editJobForm.data.job_type);
    formData.append("description", editJobForm.data.description || "");
    formData.append("requirements", editJobForm.data.requirements || "");
    formData.append("remove_image", editJobForm.data.remove_image ? 1 : 0);

    if (editJobForm.data.image) {
      formData.append("image", editJobForm.data.image);
    }

    router.post(`/admin/job-vacancies/${editingJob.id}`, formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Lowongan pekerjaan berhasil diperbarui!");
        setEditingJob(null);
        router.reload();
      },
    });
  };

  const handleDeleteJobVacancy = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus lowongan pekerjaan ini?")) {
      router.delete(`/admin/job-vacancies/${id}`, {
        preserveState: false,
        onSuccess: () => alert("Lowongan berhasil dihapus!"),
      });
    }
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", testimonialForm.data.name);
    formData.append("role", testimonialForm.data.role);
    formData.append("category", testimonialForm.data.category);
    formData.append("quote", testimonialForm.data.quote);
    if (testimonialForm.data.image) formData.append("image", testimonialForm.data.image);

    router.post("/admin/testimonials", formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Testimoni berhasil ditambahkan!");
        testimonialForm.reset();
        router.reload();
      },
    });
  };

  const handleOpenEditTestimonial = (item) => {
    setEditingTestimonial(item);
    editTestimonialForm.setData({
      name: item.name || "",
      role: item.role || "",
      category: item.category || "customer",
      quote: item.quote || "",
      image: null,
      remove_image: false,
    });
  };

  const handleUpdateTestimonial = (e) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", editTestimonialForm.data.name);
    formData.append("role", editTestimonialForm.data.role);
    formData.append("category", editTestimonialForm.data.category);
    formData.append("quote", editTestimonialForm.data.quote);
    formData.append("remove_image", editTestimonialForm.data.remove_image ? 1 : 0);

    if (editTestimonialForm.data.image) {
      formData.append("image", editTestimonialForm.data.image);
    }

    router.post(`/admin/testimonials/${editingTestimonial.id}`, formData, {
      forceFormData: true,
      preserveState: false,
      onSuccess: () => {
        alert("Testimoni berhasil diperbarui!");
        setEditingTestimonial(null);
        router.reload();
      },
    });
  };

  const handleDeleteTestimonial = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      router.delete(`/admin/testimonials/${id}`, {
        preserveState: false,
        onSuccess: () => alert("Testimoni berhasil dihapus!"),
      });
    }
  };

  const catalogForm = useForm({
    catalog_pdf: null,
    assembly_name: "Hydraulic System",
    exploded_image: null,
    exploded_parts: [{ no: "01", component: "" }]
  });

  const handleAddExplodedRow = () => {
    catalogForm.setData("exploded_parts", [
      ...catalogForm.data.exploded_parts,
      { no: String(catalogForm.data.exploded_parts.length + 1).padStart(2, '0'), component: "" }
    ]);
  };

  const handleRemoveExplodedRow = (index) => {
    const updated = catalogForm.data.exploded_parts.filter((_, i) => i !== index);
    catalogForm.setData("exploded_parts", updated);
  };

  const handleCatalogSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assembly_name", catalogForm.data.assembly_name);
    if (catalogForm.data.catalog_pdf) formData.append("catalog_pdf", catalogForm.data.catalog_pdf);
    if (catalogForm.data.exploded_image) formData.append("exploded_image", catalogForm.data.exploded_image);
    formData.append("exploded_parts", JSON.stringify(catalogForm.data.exploded_parts));

    router.post("/admin/spare-parts/catalog-config", formData, {
      forceFormData: true,
      onSuccess: () => {
        alert("Konfigurasi Katalog & Exploded View berhasil diperbarui!");
        catalogForm.reset("catalog_pdf", "exploded_image");
        router.reload();
      },
    });
  };

  const ceoList = teamMembers.filter(t => t.role.toLowerCase().includes('ceo') || t.role.toLowerCase().includes('executive'));
  const directorList = teamMembers.filter(t => !t.role.toLowerCase().includes('ceo') && !t.role.toLowerCase().includes('executive') && (t.role.toLowerCase().includes('director') || t.role.toLowerCase().includes('officer')));
  const managerList = teamMembers.filter(t => !t.role.toLowerCase().includes('ceo') && !t.role.toLowerCase().includes('executive') && !t.role.toLowerCase().includes('director') && !t.role.toLowerCase().includes('officer'));

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800">
      <Head title="Admin Dashboard - PT. Servistama Pro Indonesia" />

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-72 bg-[#071b38] text-white flex flex-col shrink-0 min-h-screen sticky top-0 shadow-xl">
        <div className="p-6 border-b border-white/10 space-y-4">
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-[#ffc107]">Servistama Admin</h1>
            <p className="text-[10px] text-slate-400 mt-1">Management & Control Panel</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-2.5 px-4 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-xs font-bold transition border border-red-500/30 cursor-pointer shadow-sm"
          >
            Logout / Keluar
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto text-xs font-bold">
          {[
            { id: "homepage", label: "1. Homepage (Video, Proyek, Cabang)" },
            { id: "about", label: "2. About (Company History, Tim, Klien)" },
            { id: "products", label: "3. Produk & Katalog" },
            { id: "spareparts", label: "4. Spare Parts Katalog" },
            { id: "news", label: "5. Berita / Knowledge" },
            { id: "media", label: "6. Media Gallery" },
            { id: "jobvacancy", label: "7. Job Vacancy (Lowongan Kerja)" },
            { id: "testimonials", label: "8. Testimoni (Client, Karir, Magang)" },
            { id: "services", label: "9. Services (Layanan & Sub-Layanan)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.history.replaceState({}, '', `/admin?tab=${tab.id}`);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer ${
                activeTab === tab.id ? "bg-[#ffc107] text-[#0f2b5c] shadow" : "text-slate-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-w-6xl">
        
        {activeTab === "homepage" && (
          <div className="space-y-10">
            
            <div className="bg-white p-8 rounded-[30px] border border-slate-200/80 shadow-[0_10px_30px_rgba(15,43,92,0.04)]">
              <h2 className="text-xl font-black text-[#071b38] mb-1">Kelola Video Hero Banner Homepage</h2>
              <p className="text-xs text-slate-500 mb-6">Atur video latar belakang atau tautan YouTube untuk halaman utama.</p>

              <form onSubmit={handleHeroSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL Video YouTube (Opsional)</label>
                    <input 
                      type="text" 
                      placeholder="https://www.youtube.com/embed/p1-OePHvTpo" 
                      value={heroForm.data.youtube_url} 
                      onChange={(e) => heroForm.setData("youtube_url", e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs text-[#071b38] outline-none focus:border-[#ffc107]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Upload File Video (MP4)</label>
                    <input 
                      type="file" 
                      accept="video/mp4"
                      onChange={(e) => heroForm.setData("video_file", e.target.files[0])} 
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-[#071b38] hover:file:bg-slate-200 cursor-pointer" 
                    />
                  </div>
                </div>

                {homeSetting?.video_path && (
                  <div className="bg-red-50/80 border border-red-200/80 p-3.5 rounded-2xl flex items-center justify-between text-xs text-red-600">
                    <span className="font-medium">File aktif: {homeSetting.video_path}</span>
                    <button 
                      type="button" 
                      onClick={handleDeleteVideo}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[11px] font-bold transition shadow-sm cursor-pointer"
                    >
                      Hapus Video
                    </button>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={heroForm.processing}
                  className="px-7 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-[#ffc107] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition cursor-pointer"
                >
                  {heroForm.processing ? "Menyimpan..." : "Simpan Perubahan Video"}
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-[30px] border border-slate-200/80 shadow-[0_10px_30px_rgba(15,43,92,0.04)]">
              <h2 className="text-xl font-black text-[#071b38] mb-6">Kelola Galeri Proyek</h2>

              <div className="bg-slate-50/70 p-6 md:p-8 rounded-[24px] border border-slate-200/60 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38] mb-4">+ Tambah Proyek Baru ke Galeri</h3>
                 
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Judul Proyek</label>
                      <input 
                        type="text" 
                        placeholder="Cth: Pembangunan Gedung" 
                        value={projectForm.data.title} 
                        onChange={(e) => projectForm.setData("title", e.target.value)} 
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs text-[#071b38] outline-none focus:border-[#ffc107]" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Foto Proyek</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => projectForm.setData("image", e.target.files[0])} 
                        className="w-full h-11 px-4 pt-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-500 cursor-pointer" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Lokasi</label>
                      <input 
                        type="text" 
                        placeholder="Cth: Jakarta" 
                        value={projectForm.data.location} 
                        onChange={(e) => projectForm.setData("location", e.target.value)} 
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs text-[#071b38] outline-none focus:border-[#ffc107]" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Tahun</label>
                      <input 
                        type="text" 
                        placeholder="Cth: 2026" 
                        value={projectForm.data.year} 
                        onChange={(e) => projectForm.setData("year", e.target.value)} 
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs text-[#071b38] outline-none focus:border-[#ffc107]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
                    <textarea 
                      rows="3" 
                      placeholder="Deskripsi proyek..." 
                      value={projectForm.data.description} 
                      onChange={(e) => projectForm.setData("description", e.target.value)} 
                      className="w-full p-4 rounded-xl border border-slate-200 bg-white text-xs text-[#071b38] outline-none focus:border-[#ffc107]" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={projectForm.processing}
                    className="px-6 py-3 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                  >
                    {projectForm.processing ? "Menyimpan..." : "+ Tambah Proyek"}
                  </button>
                </form>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38] mb-4">Daftar Proyek Tersimpan ({projects.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <img src={`/${proj.image}`} alt={proj.title} className="w-full h-32 object-cover rounded-xl mb-3 border" />
                      <h4 className="font-extrabold text-xs text-[#071b38] line-clamp-1">{proj.title}</h4>
                      <p className="text-[11px] text-slate-500">{proj.location} • {proj.year}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleOpenEditProject(proj)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[30px] border border-slate-200/80 shadow-[0_10px_30px_rgba(15,43,92,0.04)]">
              <h2 className="text-xl font-black text-[#071b38] mb-6">Tambah Cabang / Area Operasional Baru</h2>

              <form onSubmit={handleBranchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Wilayah</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Kalimantan Timur" 
                      value={branchForm.data.name} 
                      onChange={(e) => branchForm.setData("name", e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kategori / Jenis Lokasi</label>
                    <select 
                      value={branchForm.data.category} 
                      onChange={(e) => branchForm.setData("category", e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none bg-white"
                    >
                      <option value="Head Office">Head Office</option>
                      <option value="Branch Office">Branch Office</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kota / Lokasi (Otomatis Cari Peta)</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Balikpapan" 
                      value={branchForm.data.city} 
                      onChange={(e) => branchForm.setData("city", e.target.value)} 
                      onBlur={handleCityBlur}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none" 
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Hotline / No. Telepon Cabang</label>
                    <input 
                      type="text" 
                      placeholder="Cth: +62 811-xxxx-xxxx" 
                      value={branchForm.data.phone} 
                      onChange={(e) => branchForm.setData("phone", e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Link Google Maps (Paste URL untuk Deteksi Titik)</label>
                    <input 
                      type="text" 
                      placeholder="Cth: https://www.google.com/maps/.../@-6.19,106.60" 
                      value={branchForm.data.maps_link} 
                      onChange={handleMapsLinkChange} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Peta Penyesuaian (Titik otomatis menyesuaikan kota/link atau geser pin merah):</label>
                  <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-slate-200 relative z-0">
                    <div id="admin-leaflet-map" className="w-full h-full"></div>
                  </div>
                  <p className="text-[10px] text-amber-600 mt-1 font-medium">📍 Koordinat GPS Terpilih: Lat: {branchForm.data.latitude}, Lng: {branchForm.data.longitude}</p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Cabang</label>
                  <textarea 
                    rows="3" 
                    placeholder="Deskripsi layanan, fasilitas, dll..." 
                    value={branchForm.data.description} 
                    onChange={(e) => branchForm.setData("description", e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs outline-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={branchForm.processing}
                  className="px-7 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition cursor-pointer"
                >
                  {branchForm.processing ? "Menyimpan..." : "+ Tambah Cabang"}
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-[30px] border border-slate-200/80 shadow-[0_10px_30px_rgba(15,43,92,0.04)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38] mb-4">
                Daftar Cabang / Area Operasional Tersimpan ({branches.length})
              </h3>
                 
              {branches.length === 0 ? (
                <p className="text-xs text-slate-400">Belum ada cabang atau area operasional yang ditambahkan.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {branches.map((b) => (
                    <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block mb-1">
                          {b.category}
                        </span>
                        <h4 className="font-extrabold text-xs text-[#071b38] mb-1">{b.name} ({b.city})</h4>
                        <p className="text-[11px] text-slate-500 mb-2">📞 {b.phone || "-"}</p>
                        <p className="text-[11px] text-slate-600 line-clamp-2">{b.description}</p>
                        <p className="text-[10px] text-slate-400 mt-2">📍 Lat: {b.latitude}, Lng: {b.longitude}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <button 
                          type="button"
                          onClick={() => handleOpenEditBranch(b)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteBranch(b.id)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-[30px] border border-slate-200/80 shadow-[0_10px_30px_rgba(15,43,92,0.04)]">
              <h2 className="text-xl font-black text-[#071b38] mb-1">Kelola Popup Poster Homepage</h2>
              <p className="text-xs text-slate-500 mb-6">Poster akan otomatis muncul di halaman utama setelah 3 detik pengunjung membuka website.</p>

              <div className="bg-slate-50/70 p-6 md:p-8 rounded-[24px] border border-slate-200/60 mb-8">
                <form onSubmit={handlePosterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Upload Gambar Poster Baru</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => posterForm.setData("image", e.target.files[0])} 
                      className="w-full h-11 px-4 pt-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-500 cursor-pointer" 
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={posterForm.processing} 
                    className="px-6 py-3 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                  >
                    {posterForm.processing ? "Mengunggah..." : "+ Upload Poster"}
                  </button>
                </form>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38] mb-4">Daftar Poster Tersimpan ({posters?.length || 0})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posters?.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <img src={`/${p.image_path}`} alt="Poster" className="w-full h-40 object-cover rounded-xl mb-3 border" />
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleDeletePoster(p.id)} 
                      className="mt-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start"
                    >
                      Hapus Poster
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB ABOUT (COMPANY HISTORY, MILESTONE, TIM, KLIEN) ================= */}
        {activeTab === "about" && (
          <div className="space-y-10">
            
            {/* 1. KELOLA COMPANY HISTORY (MENGISI TITLE DAN DESCRIPTION SEKALIGUS AGAR AMAN) */}
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Kelola Company History (Timeline Riwayat Perusahaan)</h2>
                <p className="text-xs text-slate-500">Tambah riwayat tahapan tahunan perusahaan yang akan tampil sebagai lini masa interaktif di halaman About.</p>
              </div>

              <form onSubmit={handleHistorySubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c] mb-2">+ Tambah Riwayat History Baru</h3>
                 
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Tahun </label>
                  <input 
                    type="text" 
                    placeholder="Cth: 2026" 
                    value={historyForm.data.year} 
                    onChange={e => historyForm.setData('year', e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi / Keterangan History</label>
                  <textarea 
                    rows="4" 
                    placeholder="Full New ERP System for Operational Efficiency..." 
                    value={historyForm.data.description} 
                    onChange={e => historyForm.setData('description', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={historyForm.processing}
                  className="px-7 py-3.5 bg-[#0f2b5c] hover:bg-[#071b38] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition cursor-pointer"
                >
                  {historyForm.processing ? "Menyimpan..." : "+ Tambah Company History"}
                </button>
              </form>

              {/* DAFTAR COMPANY HISTORY TERSIMPAN */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c] mb-4">
                  Daftar Company History Tersimpan ({companyHistories.length})
                </h3>

                {companyHistories.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada riwayat company history yang ditambahkan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companyHistories.map(h => (
                      <div key={h.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          <span className="inline-block text-xs font-black bg-[#0f2b5c] text-[#ffc107] px-3 py-1 rounded-lg mb-2">
                            Tahun: {h.year}
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line mt-2 font-medium">
                            {h.description || h.title || "-"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/60">
                          <button 
                            type="button"
                            onClick={() => handleOpenEditHistory(h)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteHistory(h.id)} 
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 2. KELOLA MILESTONE */}
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl font-black text-[#071b38] mb-1">Kelola Company Milestone</h2>
                <p className="text-xs text-slate-500">Tambah milestone baru kapan saja dan lihat daftar riwayat yang sudah tersimpan di bawah.</p>
              </div>

              <form onSubmit={handleMilestoneSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38] mb-2">+ Tambah Milestone Baru</h3>
                 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Tahun / Periode</label>
                    <input 
                      type="text" 
                      placeholder="Cth: 2022" 
                      value={milestoneForm.data.year} 
                      onChange={e => milestoneForm.setData('year', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Judul Milestone</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Authorized XCMG" 
                      value={milestoneForm.data.title} 
                      onChange={e => milestoneForm.setData('title', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi</label>
                  <textarea 
                    rows="3" 
                    placeholder="Deskripsi pencapaian..." 
                    value={milestoneForm.data.description} 
                    onChange={e => milestoneForm.setData('description', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Foto / Gambar Dokumentasi (Opsional)</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => milestoneForm.setData('image', e.target.files[0])} 
                    className="w-full text-xs text-slate-500 cursor-pointer" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={milestoneForm.processing}
                  className="px-7 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition cursor-pointer"
                >
                  {milestoneForm.processing ? "Menyimpan..." : "+ Tambah Milestone"}
                </button>
              </form>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38] mb-4">
                  Riwayat Milestone Tersimpan ({milestones.length})
                </h3>

                {milestones.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada riwayat milestone yang ditambahkan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {milestones.map(m => (
                      <div key={m.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          {m.image_path && (
                            <img src={`/${m.image_path}`} alt="" className="w-full h-32 object-cover rounded-xl mb-3 border" />
                          )}
                          <span className="inline-block text-[10px] font-extrabold bg-[#071b38] text-[#ffc107] px-2.5 py-1 rounded-lg mb-2">
                            {m.year}
                          </span>
                          <h4 className="font-extrabold text-xs text-[#071b38] mb-1">{m.title}</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{m.description}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            type="button"
                            onClick={() => handleOpenEditMilestone(m)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteMilestone(m.id)} 
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3. KELOLA TEAM */}
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl font-black text-[#071b38] mb-1">Kelola Management & Operational Team</h2>
                <p className="text-xs text-slate-500">Tambah anggota tim baru. Riwayat akan dikelompokkan otomatis berdasarkan hierarki jabatan.</p>
              </div>

              <form onSubmit={handleTeamSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38] mb-2">+ Tambah Anggota Tim Baru</h3>
                 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Aji Witanto" 
                      value={teamForm.data.name} 
                      onChange={e => teamForm.setData('name', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Jabatan / Role</label>
                    <input 
                      type="text" 
                      placeholder="Cth: CEO / Operation Director / HRGA Manager" 
                      value={teamForm.data.role} 
                      onChange={e => teamForm.setData('role', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kategori Umum</label>
                    <select 
                      value={teamForm.data.category} 
                      onChange={e => teamForm.setData('category', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                    >
                      <option value="management">Management</option>
                      <option value="operational">Operational</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Link LinkedIn (Opsional)</label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/in/username" 
                      value={teamForm.data.linkedin} 
                      onChange={e => teamForm.setData('linkedin', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Foto Profil (Opsional)</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => teamForm.setData('image', e.target.files[0])} 
                    className="w-full text-xs text-slate-500 cursor-pointer" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={teamForm.processing}
                  className="px-7 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition cursor-pointer"
                >
                  {teamForm.processing ? "Menyimpan..." : "+ Tambah Anggota Tim"}
                </button>
              </form>

              <div className="space-y-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38]">
                  Riwayat Anggota Tim Tersimpan ({teamMembers.length})
                </h3>

                {teamMembers.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada data anggota tim yang ditambahkan.</p>
                ) : (
                  <div className="space-y-6">
                    {ceoList.length > 0 && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-black uppercase tracking-wider bg-[#071b38] text-[#ffc107] px-3 py-1 rounded-lg">
                          Level 1: Chief Executive Officer (CEO)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {ceoList.map(t => (
                            <div key={t.id} className="p-4 rounded-2xl border border-amber-300 bg-amber-50/40 flex flex-col justify-between shadow-sm">
                              <div>
                                <img src={t.image_path ? `/${t.image_path}` : 'https://via.placeholder.com/150'} alt="" className="w-full h-36 object-cover object-top rounded-xl mb-3 border bg-white" />
                                <h4 className="font-extrabold text-xs text-[#071b38]">{t.name}</h4>
                                <p className="text-[11px] text-amber-700 font-semibold">{t.role}</p>
                                {t.linkedin && <p className="text-[10px] text-blue-600 truncate mt-1">🔗 {t.linkedin}</p>}
                              </div>
                              <button type="button" onClick={() => handleDeleteTeam(t.id)} className="mt-4 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start">Hapus Tim</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {directorList.length > 0 && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-black uppercase tracking-wider bg-[#0f2b5c] text-white px-3 py-1 rounded-lg">
                          Level 2: Directors & Officers
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {directorList.map(t => (
                            <div key={t.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                              <div>
                                <img src={t.image_path ? `/${t.image_path}` : 'https://via.placeholder.com/150'} alt="" className="w-full h-36 object-cover object-top rounded-xl mb-3 border bg-white" />
                                <h4 className="font-extrabold text-xs text-[#071b38]">{t.name}</h4>
                                <p className="text-[11px] text-slate-500 font-semibold">{t.role}</p>
                                {t.linkedin && <p className="text-[10px] text-blue-600 truncate mt-1">🔗 {t.linkedin}</p>}
                              </div>
                              <button type="button" onClick={() => handleDeleteTeam(t.id)} className="mt-4 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start">Hapus Tim</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {managerList.length > 0 && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-black uppercase tracking-wider bg-slate-700 text-white px-3 py-1 rounded-lg">
                          Level 3 & 4: Managers & Operational
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {managerList.map(t => (
                            <div key={t.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                              <div>
                                <img src={t.image_path ? `/${t.image_path}` : 'https://via.placeholder.com/150'} alt="" className="w-full h-36 object-cover object-top rounded-xl mb-3 border bg-white" />
                                <h4 className="font-extrabold text-xs text-[#071b38]">{t.name}</h4>
                                <p className="text-[11px] text-slate-500 font-semibold">{t.role}</p>
                                {t.linkedin && <p className="text-[10px] text-blue-600 truncate mt-1">🔗 {t.linkedin}</p>}
                              </div>
                              <button type="button" onClick={() => handleDeleteTeam(t.id)} className="mt-4 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start">Hapus Tim</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 4. KELOLA CUSTOMERS */}
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-[#071b38] mb-6">Kelola Nationwide Customers & Partners</h2>
               
              <form onSubmit={handleCustomerSubmit} className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Perusahaan</label>
                    <input 
                      type="text" 
                      placeholder="Cth: PT Adaro Indonesia" 
                      value={customerForm.data.name} 
                      onChange={e => customerForm.setData('name', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Wilayah / Region</label>
                    <select 
                      value={customerForm.data.region} 
                      onChange={e => customerForm.setData('region', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                    >
                      <option value="Central Kalimantan">Central Kalimantan</option>
                      <option value="East & North Kalimantan">East & North Kalimantan</option>
                      <option value="South Sulawesi">South Sulawesi</option>
                      <option value="South-East Sulawesi">South-East Sulawesi</option>
                      <option value="South Kalimantan">South Kalimantan</option>
                      <option value="South Sumatera">South Sumatera</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Sektor / Keterangan</label>
                  <input 
                    type="text" 
                    placeholder="Cth: Mining & Heavy Equipment" 
                    value={customerForm.data.description} 
                    onChange={e => customerForm.setData('description', e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Alamat Lengkap / Link Google Maps</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Jl. Jend. Sudirman No.123, Jakarta atau Link Google Maps" 
                    value={customerForm.data.address} 
                    onChange={e => customerForm.setData('address', e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Logo Perusahaan</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => customerForm.setData('logo', e.target.files[0])} 
                    className="text-xs cursor-pointer" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={customerForm.processing}
                  className="px-6 py-3 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                >
                  {customerForm.processing ? "Menyimpan..." : "+ Tambah Customer"}
                </button>
              </form>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#071b38]">
                  Daftar Customer Tersimpan ({customers.length})
                </h3>

                {customers.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada data customer atau partner yang ditambahkan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customers.map(c => (
                      <div key={c.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          {c.logo_path && (
                            <img src={`/${c.logo_path}`} alt={c.name} className="w-full h-20 object-contain rounded-xl mb-3 bg-white p-2 border" />
                          )}
                          <span className="inline-block text-[10px] font-extrabold bg-amber-500 text-[#071b38] px-2.5 py-0.5 rounded-md mb-1.5 uppercase">
                            {c.region}
                          </span>
                          <h4 className="font-extrabold text-xs text-[#071b38]">{c.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{c.description || "-"}</p>
                          {c.address && <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">📍 {c.address}</p>}
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            type="button"
                            onClick={() => handleOpenEditCustomer(c)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteCustomer(c.id)} 
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: PRODUK & KATALOG ================= */}
        {activeTab === "products" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Kelola & Upload File Katalog Produk Utama (.PDF)</h2>
                <p className="text-xs text-slate-500">Unggah file PDF katalog utama produk yang nantinya akan tampil dan bisa di-download melalui halaman publik produk.</p>
              </div>

              <div className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">Status File Katalog PDF Produk Aktif:</span>
                  {productCatalogPdf ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <a 
                        href={`/${productCatalogPdf.replace(/^\//, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:underline"
                      >
                        📥 Download / Lihat Katalog PDF Produk yang Aktif
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCatalogDelete('product', 'Katalog Produk')}
                        className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[11px] font-bold transition shadow-sm cursor-pointer self-start sm:self-auto"
                      >
                        🗑️ Hapus Katalog Produk
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic block mb-3">Belum ada file PDF katalog produk yang diunggah.</span>
                  )}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleCatalogUpdate(productCatalogForm, 'Katalog Produk'); }} className="space-y-4 pt-3 border-t border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Upload / Ganti File Katalog Produk (.PDF)</label>
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={e => productCatalogForm.setData('catalog_pdf', e.target.files[0])} 
                      className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={productCatalogForm.processing}
                    className="px-6 py-3 bg-[#0f2b5c] hover:bg-[#071b38] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                  >
                    {productCatalogForm.processing ? "Mengunggah..." : "Simpan / Perbarui Katalog Produk"}
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Tambah & Kelola Unit Produk Alat Berat</h2>
                <p className="text-xs text-slate-500">Form ini khusus untuk memasukkan data unit produk, spesifikasi, galeri foto, dan video.</p>
              </div>

              <div className="flex flex-wrap gap-2.5 pb-4 border-b border-slate-100">
                {["Excavator", "Wheel Loader", "Motor Grader", "Crane", "Dump Truck", "Mining Equipment", "Road"].map((cat) => {
                  const isSelected = activeProductCategory === cat;
                  const count = (products || []).filter(p => p.category?.trim().toLowerCase() === cat.trim().toLowerCase()).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveProductCategory(cat);
                        productForm.setData("category", cat);
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm ${
                        isSelected 
                          ? "bg-[#071b38] text-[#ffc107] shadow-md scale-105" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleProductSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#071b38]">
                    FORM TAMBAH PRODUK - KATEGORI: <span className="text-amber-600">{activeProductCategory}</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Produk / Model</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Mining Excavator XE 1250" 
                      value={productForm.data.name} 
                      onChange={e => productForm.setData('name', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Foto Utama Produk</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => productForm.setData('image', e.target.files[0])} 
                        className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                      />
                    </div>
                     
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Galeri Foto Tambahan</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={e => productForm.setData('gallery_images', e.target.files)} 
                        className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Upload Video Produk (MP4 / WebM)</label>
                    <input 
                      type="file" 
                      accept="video/mp4,video/webm,video/mov" 
                      onChange={e => productForm.setData('video_file', e.target.files[0])} 
                      className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Lengkap Produk</label>
                    <textarea 
                      rows="4" 
                      placeholder="Penjelasan lengkap mengenai produk..." 
                      value={productForm.data.description} 
                      onChange={e => productForm.setData('description', e.target.value)} 
                      className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    />
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Spesifikasi Teknis (Label & Nilai)</label>
                      <button type="button" onClick={handleAddSpecRow} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold cursor-pointer hover:bg-emerald-700">+ Tambah Baris</button>
                    </div>
                    {specRows.map((spec, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input type="text" placeholder="Label (Cth: Berat Operasi)" value={spec.label} onChange={e => { const updated = [...specRows]; updated[idx].label = e.target.value; setSpecRows(updated); }} className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-xs bg-white" />
                        <input type="text" placeholder="Nilai (Cth: 115.000 kg)" value={spec.value} onChange={e => { const updated = [...specRows]; updated[idx].value = e.target.value; setSpecRows(updated); }} className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-xs bg-white" />
                        {specRows.length > 1 && <button type="button" onClick={() => handleRemoveSpecRow(idx)} className="px-3 py-2 bg-red-500 text-white rounded-lg text-xs cursor-pointer">✕</button>}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Fitur Unggulan (Poin Keunggulan)</label>
                      <button type="button" onClick={handleAddFeatureRow} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold cursor-pointer hover:bg-emerald-700">+ Tambah Poin</button>
                    </div>
                    {featureRows.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input type="text" placeholder="Deskripsi fitur unggulan..." value={feat} onChange={e => { const updated = [...featureRows]; updated[idx] = e.target.value; setFeatureRows(updated); }} className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-xs bg-white" />
                        {featureRows.length > 1 && <button type="button" onClick={() => handleRemoveFeatureRow(idx)} className="px-3 py-2 bg-red-500 text-white rounded-lg text-xs cursor-pointer">✕</button>}
                      </div>
                    ))}
                  </div>

                </div>

                <button 
                  type="submit" 
                  disabled={productForm.processing}
                  className="w-full py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-[#ffc107] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                >
                  {productForm.processing ? "Menyimpan Produk..." : `+ Simpan Produk ke Kategori ${activeProductCategory}`}
                </button>
              </form>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                  Daftar Produk di Kategori: <span className="text-amber-600">{activeProductCategory}</span>
                </h3>

                {((products || []).filter(p => p.category?.trim().toLowerCase() === activeProductCategory.trim().toLowerCase())).length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada produk pada kategori ini.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {((products || []).filter(p => p.category?.trim().toLowerCase() === activeProductCategory.trim().toLowerCase())).map(prod => (
                      <div key={prod.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          {prod.image && <img src={`/${prod.image}`} alt="" className="w-full h-32 object-cover rounded-xl mb-3 border bg-white" />}
                          <h4 className="font-extrabold text-xs text-[#0f2b5c]">{prod.name}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{prod.overview || prod.description}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            type="button" 
                            onClick={() => handleOpenEditProduct(prod)} 
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteProduct(prod.id)} 
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 4: SPARE PARTS KATALOG ================= */}
        {activeTab === "spareparts" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Kelola & Upload File Katalog Spare Part Utama (.PDF)</h2>
                <p className="text-xs text-slate-500">Unggah file PDF katalog spare part utama yang nantinya akan tampil dan bisa di-download melalui halaman publik spare parts.</p>
              </div>

              <div className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">Status File Katalog PDF Spare Part Aktif:</span>
                  {sparePartCatalogPdf ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <a 
                        href={`/${sparePartCatalogPdf.replace(/^\//, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:underline"
                      >
                        📥 Download / Lihat Katalog PDF Spare Part yang Aktif
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCatalogDelete('spare_part', 'Katalog Spare Part')}
                        className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[11px] font-bold transition shadow-sm cursor-pointer self-start sm:self-auto"
                      >
                        🗑️ Hapus Katalog Spare Part
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic block mb-3">Belum ada file PDF katalog spare part yang diunggah.</span>
                  )}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleCatalogUpdate(sparePartCatalogForm, 'Katalog Spare Part'); }} className="space-y-4 pt-3 border-t border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Upload / Ganti File Katalog Spare Part (.PDF)</label>
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={e => sparePartCatalogForm.setData('catalog_pdf', e.target.files[0])} 
                      className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={sparePartCatalogForm.processing}
                    className="px-6 py-3 bg-[#0f2b5c] hover:bg-[#071b38] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                  >
                    {sparePartCatalogForm.processing ? "Mengunggah..." : "Simpan / Perbarui Katalog Spare Part"}
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Tambah & Kelola Suku Cadang Satuan</h2>
                <p className="text-xs text-slate-500">Tambah, atur, dan hapus suku cadang alat berat beserta spesifikasi lengkap, foto utama, dan galeri fotonya.</p>
              </div>

              <form onSubmit={handleSparePartSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Nomor Part / Part No.</label>
                    <input 
                      type="text" 
                      placeholder="Cth: 800155719" 
                      value={sparePartForm.data.part_number} 
                      onChange={e => sparePartForm.setData('part_number', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Komponen</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Air Filter / Hydraulic Pump" 
                      value={sparePartForm.data.name} 
                      onChange={e => sparePartForm.setData('name', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kategori Sistem</label>
                    <select 
                      value={sparePartForm.data.category} 
                      onChange={e => sparePartForm.setData('category', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                    >
                      <option value="Maintenance Tips">Maintenance Tips</option>
                      <option value="Heavy Equipment Knowledge">Heavy Equipment Knowledge</option>
                      <option value="Mining Technology">Mining Technology</option>
                      <option value="Hydraulic System">Hydraulic System</option>
                      <option value="Engine Maintenance">Engine Maintenance</option>
                      <option value="Lubrication Guide">Lubrication Guide</option>
                      <option value="Predictive Maintenance">Predictive Maintenance</option>
                      <option value="Failure Analysis">Failure Analysis</option>
                      <option value="Safety">Safety</option>
                      <option value="Operator Tips">Operator Tips</option>
                      <option value="Technical Bulletin">Technical Bulletin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Brand</label>
                    <input 
                      type="text" 
                      value={sparePartForm.data.brand} 
                      onChange={e => sparePartForm.setData('brand', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Delivery Time</label>
                    <input 
                      type="text" 
                      value={sparePartForm.data.delivery_time} 
                      onChange={e => sparePartForm.setData('delivery_time', e.target.value)} 
                      placeholder="Cth: 1-90 DAYS"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Supply Capacity</label>
                    <input 
                      type="text" 
                      value={sparePartForm.data.supply_capacity} 
                      onChange={e => sparePartForm.setData('supply_capacity', e.target.value)} 
                      placeholder="Cth: 10,000 Pieces/Year"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Product Origin</label>
                    <input 
                      type="text" 
                      value={sparePartForm.data.product_origin} 
                      onChange={e => sparePartForm.setData('product_origin', e.target.value)} 
                      placeholder="Cth: China"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Package</label>
                    <input 
                      type="text" 
                      value={sparePartForm.data.package_type} 
                      onChange={e => sparePartForm.setData('package_type', e.target.value)} 
                      placeholder="Cth: Carton or Wooden Box"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Shipping Methods</label>
                  <input 
                    type="text" 
                    value={sparePartForm.data.shipping_methods} 
                    onChange={e => sparePartForm.setData('shipping_methods', e.target.value)} 
                    placeholder="Cth: Air Transport, Sea Transport, Express Delivery"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Foto Utama Spare Part</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => sparePartForm.setData('image', e.target.files[0])} 
                      className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Galeri Foto Tambahan</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={e => sparePartForm.setData('gallery_images', e.target.files)} 
                      className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-[#ffc107] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer">
                  + Tambah Spare Part ke Katalog
                </button>
              </form>

              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div>
                  <h3 className="text-sm font-black text-[#0f2b5c] mb-1">Konfigurasi Diagram Exploded View</h3>
                  <p className="text-xs text-slate-500">Atur diagram dan daftar baris komponen interaktif.</p>
                </div>

                <form onSubmit={handleCatalogSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Pilih Kategori Assembly Exploded View</label>
                    <select 
                      value={catalogForm.data.assembly_name} 
                      onChange={e => catalogForm.setData('assembly_name', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none bg-white mb-2 font-medium"
                    >
                      <option value="Hydraulic System">Hydraulic System</option>
                      <option value="Filters & Maintenance">Filters & Maintenance</option>
                      <option value="Undercarriage">Undercarriage</option>
                      <option value="Engine Parts">Engine Parts</option>
                      <option value="Electrical System">Electrical System</option>
                      <option value="Transmission & Brake">Transmission & Brake</option>
                    </select>

                    <label className="block text-[11px] font-bold text-slate-600 mb-1 mt-3">Upload Gambar Diagram (Exploded View Preview)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => catalogForm.setData('exploded_image', e.target.files[0])} 
                      className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                    />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Daftar Baris Komponen Exploded View</label>
                      <button type="button" onClick={handleAddExplodedRow} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-bold cursor-pointer hover:bg-emerald-700">+ Tambah Baris Komponen</button>
                    </div>

                    {catalogForm.data.exploded_parts.map((part, idx) => (
                      <div key={idx} className="flex gap-2 items-center bg-white p-3 rounded-xl border border-slate-200">
                        <input type="text" placeholder="No (Cth: 01)" value={part.no} onChange={e => { const updated = [...catalogForm.data.exploded_parts]; updated[idx].no = e.target.value; catalogForm.setData("exploded_parts", updated); }} className="w-24 h-10 px-3 rounded-lg border border-slate-200 text-xs" />
                        <input type="text" placeholder="Nama Component (Cth: Hydraulic Pump)" value={part.component} onChange={e => { const updated = [...catalogForm.data.exploded_parts]; updated[idx].component = e.target.value; catalogForm.setData("exploded_parts", updated); }} className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-xs" />
                        {catalogForm.data.exploded_parts.length > 1 && (
                          <button type="button" onClick={() => handleRemoveExplodedRow(idx)} className="px-3 py-2 bg-red-500 text-white rounded-lg text-xs cursor-pointer">✕</button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="w-full py-3.5 bg-[#0f2b5c] hover:bg-[#071b38] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer">
                    Simpan Konfigurasi Diagram Exploded View
                  </button>
                </form>

                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                    Daftar Konfigurasi Exploded View Tersimpan
                  </h3>

                  {(!explodedImagesMap || Object.keys(explodedImagesMap).length === 0) ? (
                    <p className="text-xs text-slate-400 italic">Belum ada konfigurasi exploded view yang disimpan.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(explodedImagesMap).map(([assemblyName, imgPath], idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                          <div>
                            <img src={`/${imgPath.replace(/^\//, '')}`} alt={assemblyName} className="w-full h-32 object-contain rounded-xl mb-3 bg-white p-1 border" />
                            <span className="inline-block text-[10px] font-extrabold bg-[#071b38] text-[#ffc107] px-2.5 py-0.5 rounded-md mb-1 uppercase">{assemblyName}</span>
                            <p className="text-[11px] text-slate-500 mt-0.5">Jumlah Komponen: {explodedPartsDataMap?.[assemblyName]?.length || 0} baris</p>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (confirm(`Hapus konfigurasi untuk ${assemblyName}?`)) {
                                router.delete(`/admin/spare-parts/catalog-config/${encodeURIComponent(assemblyName)}`, {
                                  onSuccess: () => alert("Konfigurasi berhasil dihapus!")
                                });
                              }
                            }} 
                            className="mt-4 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start"
                          >
                            Hapus Konfigurasi
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                  Daftar Spare Parts Tersimpan ({spareParts.length})
                </h3>

                {spareParts.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada suku cadang yang ditambahkan ke katalog.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spareParts.map(part => (
                      <div key={part.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          {part.image && <img src={`/${part.image}`} alt="" className="w-full h-28 object-contain rounded-xl mb-3 bg-white p-1 border" />}
                          <span className="inline-block text-[10px] font-extrabold bg-amber-500 text-[#071b38] px-2.5 py-0.5 rounded-md mb-1 uppercase">{part.category}</span>
                          <h4 className="font-extrabold text-xs text-[#0f2b5c]">{part.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 font-mono">No: {part.part_number}</p>
                        </div>
                        <button type="button" onClick={() => handleDeleteSparePart(part.id)} className="mt-4 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start">
                          Hapus Part
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 5: BERITA / KNOWLEDGE ================= */}
        {activeTab === "news" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Tambah Artikel Knowledge Baru</h2>
                <p className="text-xs text-slate-500">Publikasikan informasi, tips perawatan, atau berita perusahaan terbaru lengkap dengan link Instagram.</p>
              </div>

              <form onSubmit={handleArticleSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Judul Artikel</label>
                  <input 
                    type="text" 
                    placeholder="Judul artikel berita / knowledge..." 
                    value={articleForm.data.title} 
                    onChange={e => articleForm.setData('title', e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kategori</label>
                    <select 
                      value={articleForm.data.category} 
                      onChange={e => articleForm.setData('category', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                    >
                      <option value="Maintenance Tips">Maintenance Tips</option>
                      <option value="Heavy Equipment Knowledge">Heavy Equipment Knowledge</option>
                      <option value="Mining Technology">Mining Technology</option>
                      <option value="Hydraulic System">Hydraulic System</option>
                      <option value="Engine Maintenance">Engine Maintenance</option>
                      <option value="Lubrication Guide">Lubrication Guide</option>
                      <option value="Predictive Maintenance">Predictive Maintenance</option>
                      <option value="Failure Analysis">Failure Analysis</option>
                      <option value="Safety">Safety</option>
                      <option value="Operator Tips">Operator Tips</option>
                      <option value="Technical Bulletin">Technical Bulletin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimasi Waktu Baca</label>
                    <input 
                      type="text" 
                      placeholder="5 Menit" 
                      value={articleForm.data.read_time} 
                      onChange={e => articleForm.setData('read_time', e.target.value)} 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Link Instagram (Opsional)</label>
                  <input 
                    type="url" 
                    placeholder="https://www.instagram.com/p/..." 
                    value={articleForm.data.instagram_link} 
                    onChange={e => articleForm.setData('instagram_link', e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Ringkasan (Excerpt)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Ringkasan singkat artikel..." 
                    value={articleForm.data.excerpt} 
                    onChange={e => articleForm.setData('excerpt', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Isi Konten Lengkap</label>
                  <textarea 
                    rows="6" 
                    placeholder="Tulis isi konten artikel di sini..." 
                    value={articleForm.data.content} 
                    onChange={e => articleForm.setData('content', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Upload Foto Thumbnail</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => articleForm.setData('thumbnail', e.target.files[0])} 
                    className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="is_featured"
                    checked={articleForm.data.is_featured}
                    onChange={e => articleForm.setData('is_featured', e.target.checked)}
                    className="w-4 h-4 text-[#0f2b5c] rounded border-slate-300 focus:ring-[#ffc107]"
                  />
                  <label htmlFor="is_featured" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Jadikan Artikel Utama (Featured di Banner Besar)
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={articleForm.processing}
                  className="w-full py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-[#ffc107] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                >
                  {articleForm.processing ? "Menyimpan Artikel..." : "Simpan Artikel"}
                </button>
              </form>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                  Daftar Artikel Tersimpan ({articles.length})
                </h3>

                {articles.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada artikel knowledge yang ditambahkan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.map(art => (
                      <div key={art.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          {art.thumbnail && <img src={`/${art.thumbnail}`} alt="" className="w-full h-28 object-cover rounded-xl mb-3 border bg-white" />}
                          <span className="inline-block text-[10px] font-extrabold bg-[#071b38] text-[#ffc107] px-2.5 py-0.5 rounded-md mb-1 uppercase">{art.category}</span>
                          <h4 className="font-extrabold text-xs text-[#0f2b5c]">{art.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{art.excerpt || art.content}</p>
                          {art.instagram_link && (
                            <a href={art.instagram_link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline block mt-1 truncate">
                              🔗 {art.instagram_link}
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button type="button" onClick={() => handleOpenEditArticle(art)} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer shadow-sm">
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDeleteArticle(art.id)} className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start shadow-sm">
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: MEDIA GALLERY ================= */}
        {activeTab === "media" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Unggah Foto atau Video Baru</h2>
                <p className="text-xs text-slate-500">Kelola galeri foto dan video perusahaan beserta pengaturan tata letak tampilannya.</p>
              </div>

              <form onSubmit={handleMediaSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Judul / Keterangan</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Aktivitas Tambang" 
                      value={mediaForm.data.title} 
                      onChange={e => mediaForm.setData('title', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Pilih Kategori</label>
                    <select 
                      value={mediaForm.data.category} 
                      onChange={e => mediaForm.setData('category', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                    >
                      <option value="Photo Gallery">Photo Gallery</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Mining Site">Mining Site</option>
                      <option value="Customer Visit">Customer Visit</option>
                      <option value="Training">Training</option>
                      <option value="CSR">CSR</option>
                      <option value="Company Event">Company Event</option>
                      <option value="Drone Video">Drone Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Tipe Media</label>
                    <select 
                      value={mediaForm.data.media_type} 
                      onChange={e => mediaForm.setData('media_type', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                    >
                      <option value="Foto (Image)">Foto (Image)</option>
                      <option value="Video (MP4)">Video (MP4)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Pilih File (Foto / Video)</label>
                  <input 
                    type="file" 
                    accept="image/*,video/mp4" 
                    onChange={e => mediaForm.setData('file', e.target.files[0])} 
                    className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Tambahan (Opsional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Keterangan lengkap..." 
                    value={mediaForm.data.description} 
                    onChange={e => mediaForm.setData('description', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={mediaForm.processing}
                  className="px-8 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                >
                  {mediaForm.processing ? "Mengunggah..." : "Unggah Media"}
                </button>
              </form>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                  Daftar Media Tersimpan ({mediaGalleries.length})
                </h3>

                {mediaGalleries.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada foto atau video yang diunggah ke galeri.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaGalleries.map(media => {
                      const isVid = media.media_type?.toLowerCase().includes('video') || media.file_path?.endsWith('.mp4');
                      return (
                        <div key={media.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                          <div>
                            {isVid ? (
                              <video src={`/${media.file_path}`} className="w-full h-32 object-cover rounded-xl mb-3 border bg-slate-900" controls />
                            ) : (
                              <img src={`/${media.file_path}`} alt="" className="w-full h-32 object-cover rounded-xl mb-3 border bg-white" />
                            )}
                            <span className="inline-block text-[10px] font-extrabold bg-[#071b38] text-[#ffc107] px-2.5 py-0.5 rounded-md mb-1 uppercase">
                              {media.category}
                            </span>
                            <h4 className="font-extrabold text-xs text-[#0f2b5c]">{media.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{media.description || "-"}</p>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteMedia(media.id)} 
                            className="mt-4 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start"
                          >
                            Hapus Media
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: JOB VACANCY ================= */}
        {activeTab === "jobvacancy" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Tambah Lowongan Pekerjaan Baru</h2>
                <p className="text-xs text-slate-500">Kelola posisi lowongan kerja yang tersedia di PT. Servistama Pro Indonesia.</p>
              </div>

              <form onSubmit={handleJobVacancySubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Judul Posisi</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Part Analis" 
                      value={jobVacancyForm.data.title} 
                      onChange={e => jobVacancyForm.setData('title', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Departemen</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Engineering / Part Department" 
                      value={jobVacancyForm.data.department} 
                      onChange={e => jobVacancyForm.setData('department', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Lokasi</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Tangerang / On-Site" 
                      value={jobVacancyForm.data.location} 
                      onChange={e => jobVacancyForm.setData('location', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kualifikasi Pendidikan</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Pendidikan min. D3 Teknik" 
                      value={jobVacancyForm.data.education} 
                      onChange={e => jobVacancyForm.setData('education', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Tipe Pekerjaan</label>
                    <select 
                      value={jobVacancyForm.data.job_type} 
                      onChange={e => jobVacancyForm.setData('job_type', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Foto Lowongan (Kiri Card)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => jobVacancyForm.setData('image', e.target.files[0])} 
                      className="w-full text-xs text-slate-500 bg-white p-2 rounded-xl border border-slate-200 cursor-pointer" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Singkat Pekerjaan</label>
                  <textarea 
                    rows="3" 
                    placeholder="Deskripsi singkat lowongan..." 
                    value={jobVacancyForm.data.description} 
                    onChange={e => jobVacancyForm.setData('description', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Persyaratan (Pisahkan dengan koma atau baris baru)</label>
                  <textarea 
                    rows="4" 
                    placeholder="Pengalaman min. 3 tahun, Memahami mesin..." 
                    value={jobVacancyForm.data.requirements} 
                    onChange={e => jobVacancyForm.setData('requirements', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={jobVacancyForm.processing}
                  className="px-8 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                >
                  {jobVacancyForm.processing ? "Menyimpan..." : "Simpan Lowongan"}
                </button>
              </form>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                  Daftar Lowongan Tersimpan ({jobVacancies.length})
                </h3>

                {jobVacancies.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada lowongan pekerjaan yang ditambahkan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobVacancies.map(job => (
                      <div key={job.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          {job.image ? (
                            <img src={`/${job.image}`} alt="" className="w-full h-32 object-cover rounded-xl mb-3 border bg-white" />
                          ) : (
                            <div className="w-full h-32 bg-slate-200 rounded-xl mb-3 flex items-center justify-center text-xs text-slate-400 font-semibold">Tanpa Foto</div>
                          )}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block text-[10px] font-extrabold bg-[#071b38] text-[#ffc107] px-2.5 py-0.5 rounded-md uppercase">
                              {job.job_type}
                            </span>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">
                              {job.department}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-xs text-[#0f2b5c]">{job.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">📍 {job.location}</p>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{job.description || "-"}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            type="button"
                            onClick={() => handleOpenEditJob(job)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteJobVacancy(job.id)} 
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer shadow-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 8: TESTIMONI ================= */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Kelola Testimoni & Ulasan</h2>
                <p className="text-xs text-slate-500">Tambah dan kelola testimoni untuk Customer (Homepage), Employee (Karyawan), dan Mahasiswa Magang (Career).</p>
              </div>

              <form onSubmit={handleTestimonialSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama / Nama Pemberi Testimoni</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Putri / Budi Santoso" 
                      value={testimonialForm.data.name} 
                      onChange={e => testimonialForm.setData('name', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Jabatan / Universitas / Keterangan</label>
                    <input 
                      type="text" 
                      placeholder="Cth: Software Engineer / Universitas Brawijaya" 
                      value={testimonialForm.data.role} 
                      onChange={e => testimonialForm.setData('role', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Kategori Testimoni</label>
                    <select 
                      value={testimonialForm.data.category} 
                      onChange={e => testimonialForm.setData('category', e.target.value)} 
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                    >
                      <option value="customer">Customer Testimonial (Home)</option>
                      <option value="employee">Employee Stories (Career)</option>
                      <option value="intern">Testimoni Magang (Career)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Foto Profil / Logo</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => testimonialForm.setData('image', e.target.files[0])} 
                    className="w-full text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Isi Testimoni / Quote</label>
                  <textarea 
                    rows="4" 
                    placeholder="Tuliskan ulasan atau testimoni di sini..." 
                    value={testimonialForm.data.quote} 
                    onChange={e => testimonialForm.setData('quote', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={testimonialForm.processing}
                  className="px-8 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                >
                  {testimonialForm.processing ? "Menyimpan..." : "Simpan Testimoni"}
                </button>
              </form>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                  Daftar Testimoni Tersimpan ({testimonials.length})
                </h3>

                {testimonials.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada testimoni yang ditambahkan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testimonials.map(item => (
                      <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          {item.image_path ? (
                            <img src={`/${item.image_path}`} alt="" className="w-full h-28 object-cover rounded-xl mb-3 border bg-white" />
                          ) : (
                            <div className="w-full h-24 bg-slate-200 rounded-xl mb-3 flex items-center justify-center text-xs text-slate-400 font-semibold">Tanpa Foto</div>
                          )}
                          <span className="inline-block text-[10px] font-extrabold bg-[#071b38] text-[#ffc107] px-2.5 py-0.5 rounded-md mb-1 uppercase">
                            {item.category}
                          </span>
                          <h4 className="font-extrabold text-xs text-[#0f2b5c]">{item.name}</h4>
                          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">{item.role}</p>
                          <p className="text-[11px] text-slate-500 mt-2 italic line-clamp-3">"{item.quote}"</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            type="button"
                            onClick={() => handleOpenEditTestimonial(item)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteTestimonial(item.id)} 
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer shadow-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 9: SERVICES ================= */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#0f2b5c] mb-1">Kelola Layanan & Sub-Layanan</h2>
                <p className="text-xs text-slate-500">Tambahkan sub-layanan ke dalam 5 kategori utama layanan PT. Servistama Pro Indonesia.</p>
              </div>

              <form onSubmit={handleServiceSubmit} className="bg-slate-50 p-6 md:p-8 rounded-[24px] border border-slate-200/80 space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Pilih Kategori Layanan Utama</label>
                  <select 
                    value={serviceForm.data.category} 
                    onChange={e => serviceForm.setData('category', e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs outline-none bg-white font-bold text-[#0f2b5c]"
                  >
                    <option value="Maintenance & Repair">Maintenance & Repair</option>
                    <option value="Installation & Commissioning">Installation & Commissioning</option>
                    <option value="Overhaul & Rebuild">Overhaul & Rebuild</option>
                    <option value="Inspection & Testing">Inspection & Testing</option>
                    <option value="Contract & Consulting">Contract & Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Sub-Layanan</label>
                  <input 
                    type="text" 
                    placeholder="Cth: Preventive Maintenance / Hydraulic System" 
                    value={serviceForm.data.title} 
                    onChange={e => serviceForm.setData('title', e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Lengkap Sub-Layanan</label>
                  <textarea 
                    rows="3" 
                    placeholder="Penjelasan lengkap mengenai sub-layanan ini..." 
                    value={serviceForm.data.description} 
                    onChange={e => serviceForm.setData('description', e.target.value)} 
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">What We Do (1 baris = 1 poin)</label>
                    <textarea 
                      rows="4" 
                      placeholder="Inspeksi Komponen&#10;Penggantian Fluid & Filter" 
                      value={serviceForm.data.what_we_do} 
                      onChange={e => serviceForm.setData('what_we_do', e.target.value)} 
                      className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Key Benefits (1 baris = 1 poin)</label>
                    <textarea 
                      rows="4" 
                      placeholder="Meningkatkan reliability unit&#10;Memperpanjang usia komponen" 
                      value={serviceForm.data.key_benefits} 
                      onChange={e => serviceForm.setData('key_benefits', e.target.value)} 
                      className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#ffc107]" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={serviceForm.processing}
                  className="px-8 py-3.5 bg-[#071b38] hover:bg-[#0f2b5c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                >
                  {serviceForm.processing ? "Menyimpan..." : "+ Tambah Sub-Layanan ke Kategori Ini"}
                </button>
              </form>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f2b5c]">
                  Daftar Sub-Layanan Tersimpan ({services.length})
                </h3>

                {services.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada data sub-layanan yang ditambahkan.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map(srv => (
                      <div key={srv.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-sm">
                        <div>
                          <span className="inline-block text-[10px] font-extrabold bg-[#071b38] text-[#ffc107] px-2.5 py-0.5 rounded-md mb-1.5 uppercase">
                            {srv.category}
                          </span>
                          <h4 className="font-extrabold text-xs text-[#0f2b5c]">{srv.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{srv.description || "-"}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            type="button" 
                            onClick={() => handleOpenEditService(srv)} 
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer shadow-sm"
                          >
                            Edit
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteService(srv.id)} 
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition cursor-pointer self-start shadow-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL POPUP EDIT COMPANY HISTORY ================= */}
        {editingHistory && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-[30px] border border-slate-200 shadow-2xl w-full max-w-xl p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-[#0f2b5c]">Edit Company History: Tahun {editingHistory.year}</h3>
                <button type="button" onClick={() => setEditingHistory(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleUpdateHistory} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Tahun</label>
                  <input type="text" value={editHistoryForm.data.year} onChange={e => editHistoryForm.setData('year', e.target.value)} className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Detail</label>
                  <textarea rows="4" value={editHistoryForm.data.description} onChange={e => {
                    editHistoryForm.setData({
                      ...editHistoryForm.data,
                      description: e.target.value,
                      title: e.target.value
                    });
                  }} className="w-full p-4 rounded-xl border border-slate-200 text-xs bg-white outline-none" required />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setEditingHistory(null)} className="px-6 py-3 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer">Batal</button>
                  <button type="submit" disabled={editHistoryForm.processing} className="px-8 py-3 bg-[#0f2b5c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}