<script lang="ts">
  import { onMount } from 'svelte';

  // Define interfaces for type checking
  interface Project {
    title: string;
    category: string;
    image: string;
    secondaryImage?: string;
    description: string;
    type: 'image' | 'video';
  }
  
  interface TeamMember {
    name: string;
    role: string;
    image: string;
  }
  
  interface Service {
    icon: string;
    title: string;
    description: string;
  }

  let isMenuOpen = false;
  let scrollY = 0;
  let activeProject: Project | null = null;
  let isModalOpen = false;
  let isConfirmModalOpen = false;
  let isGalleryModalOpen = false;
  let currentProjectIndex = 0;
  
  // Contact form fields
  let name = '';
  let email = '';
  let subject = '';
  let message = '';

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  function openProjectModal(project: Project) {
    activeProject = project;
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  const closeProjectModal = () => {
    isModalOpen = false;
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      activeProject = null;
    }, 300);
  };
  
  const openGalleryModal = () => {
    currentProjectIndex = 0;
    activeProject = projects[currentProjectIndex];
    isGalleryModalOpen = true;
    document.body.style.overflow = 'hidden';
  };
  
  const closeGalleryModal = () => {
    isGalleryModalOpen = false;
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      activeProject = null;
    }, 300);
  };
  
  const nextProject = () => {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    activeProject = projects[currentProjectIndex];
  };
  
  const prevProject = () => {
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    activeProject = projects[currentProjectIndex];
  };
  
  const openConfirmModal = () => {
    // Check if all fields are filled
    if (name && email && subject && message) {
      isConfirmModalOpen = true;
      document.body.style.overflow = 'hidden';
    }
  };
  
  const closeConfirmModal = () => {
    isConfirmModalOpen = false;
    document.body.style.overflow = 'auto';
  };
  
  const sendEmail = () => {
    const mailtoLink = `mailto:neonbytegapo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    closeConfirmModal();
  };

  const services: Service[] = [
    { 
      icon: 'fa-code', 
      title: 'Web Development', 
      description: 'Custom web applications tailored to your business needs with cutting-edge technology.'
    },
    { 
      icon: 'fa-mobile-screen', 
      title: 'Mobile Development', 
      description: 'Cross-platform mobile applications that provide seamless user experiences across all devices.'
    },
    { 
      icon: 'fa-palette', 
      title: 'UI/UX Design', 
      description: 'Intuitive user interfaces and exceptional user experiences that captivate and engage your audience.'
    },
    { 
      icon: 'fa-image', 
      title: 'Graphic Design', 
      description: 'Eye-catching visual elements that strengthen your brand identity and communication.'
    },
    { 
      icon: 'fa-video', 
      title: 'Video Editing', 
      description: 'Professional video production and editing services to showcase your products and services.'
    },
    { 
      icon: 'fa-headset', 
      title: 'IT Assistance', 
      description: 'Reliable technical support and problem-solving to keep your technology running smoothly.'
    },
    { 
      icon: 'fa-windows', 
      title: 'Microsoft Services', 
      description: 'Expert implementation and management of Microsoft products and solutions for your business.'
    },
    { 
      icon: 'fa-screwdriver-wrench', 
      title: 'Hardware Maintenance', 
      description: 'RAM upgrades, hardware cleaning, and laptop reformatting to optimize performance and extend device lifespan.'
    }
  ];

  const projects: Project[] = [
    {
      title: 'Advanced Calculator',
      category: 'Web Application',
      image: '/calcu (1).png',
      description: 'A comprehensive calculator application built with Java Netbeans, perfect for students and professionals alike.',
      type: 'image'
    },
    {
      title: 'Credify',
      category: 'Website/Mobile Application',
      image: '/credify (1).mp4',
      description: 'A versatile platform for managing credentials and digital identity verification across multiple devices. Also includes a comprehensive system designed to track faculty activities, qualifications, and performance metrics for educational institutions.',
      type: 'video'
    },
    {
      title: 'Event Scheduling',
      category: 'Web/Mobile Application',
      image: '/Event Schedule 1.png',
      secondaryImage: '/Event schedule.png',
      description: 'An intuitive event management platform that simplifies scheduling, reminders, and participant coordination.',
      type: 'image'
    },
    {
      title: 'Weathering App',
      category: 'Web/Mobile Application',
      image: '/weather (1).png',
      description: 'A real-time weather application providing accurate forecasts, alerts, and climate data visualization.',
      type: 'image'
    },
    {
      title: 'Quickrent Apartment Booking',
      category: 'Website/Mobile Application',
      image: '/quickrent.mp4',
      description: 'A streamlined platform for browsing, comparing, and booking apartment rentals with a user-friendly interface.',
      type: 'video'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Justine Marzan',
      role: 'FullStack Developer/Video Editor',
      image: '/Justine.png'
    },
    {
      name: 'Marron Jeremy Flores',
      role: 'Hardware Expert/UI/UX',
      image: '/images/team2.jpg'
    }
  ];
</script>

<header class="fixed w-full z-50 transition-all duration-300" class:bg-black={scrollY > 50} class:bg-opacity-80={scrollY > 50}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="flex items-center">
            <div class="w-10 h-10 relative overflow-hidden">
              <img src="/neonbyte.png" alt="NeonByte Logo" class="w-full h-full object-contain" />
            </div>
            <span class="ml-3 text-xl font-bold text-white">NEONBYTE</span>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a href="#home" class="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#about" class="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#services" class="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Services</a>
            <a href="#projects" class="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
            <a href="#team" class="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Team</a>
            <a href="#contact" class="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
        </div>
      </div>
      <div class="-mr-2 flex md:hidden">
        <button on:click={toggleMenu} type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <i class="fa-solid {isMenuOpen ? 'fa-xmark' : 'fa-bars'} w-6 h-6"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if isMenuOpen}
    <div class="md:hidden bg-black bg-opacity-95">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#home" class="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Home</a>
        <a href="#about" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">About</a>
        <a href="#services" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Services</a>
        <a href="#projects" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Projects</a>
        <a href="#team" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Team</a>
        <a href="#contact" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
      </div>
    </div>
  {/if}
</header>

<main>
  <!-- Hero Section -->
  <section id="home" class="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
    <div class="particles-container absolute inset-0 overflow-hidden">
      <div class="particle yellow"></div>
      <div class="particle blue"></div>
      <div class="particle purple"></div>
      <div class="particle yellow small"></div>
      <div class="particle blue small"></div>
      <div class="particle purple small"></div>
      <div class="particle yellow tiny"></div>
      <div class="particle blue tiny"></div>
      <div class="particle purple tiny"></div>
      <div class="particle yellow"></div>
      <div class="particle blue"></div>
      <div class="particle purple"></div>
      <div class="particle yellow small"></div>
      <div class="particle blue small"></div>
      <div class="particle purple small"></div>
      <div class="particle yellow tiny"></div>
      <div class="particle blue tiny"></div>
      <div class="particle purple tiny"></div>
      <div class="particle yellow"></div>
      <div class="particle blue"></div>
    </div>
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
        <div class="absolute w-full h-full rounded-full border-[40px] border-yellow-400 animate-pulse"></div>
        <div class="absolute w-3/4 h-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[30px] border-yellow-400 animate-ping" style="animation-duration: 5s;"></div>
        <div class="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-yellow-400 animate-ping" style="animation-duration: 3s;"></div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div class="mb-8">
        <div class="inline-block w-32 h-32 mb-6 relative overflow-hidden">
          <img src="/neonbyte.png" alt="NeonByte Logo" class="w-full h-full object-contain" />
        </div>
      </div>
      <h1 class="text-4xl sm:text-6xl font-bold text-white mb-4">
        <span class="text-yellow-400">NEON</span>BYTE
      </h1>
      <div class="mb-10 max-w-3xl mx-auto">
        <p class="tagline relative inline-block text-xl sm:text-2xl font-bold">
          <span class="text-yellow-400">Design.</span> 
          <span class="text-blue-400">Develop.</span> 
          <span class="text-purple-400">Dominate.</span>
        </p>
      </div>
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <a href="#contact" class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 transition">
          Get Started
          <i class="fa-solid fa-arrow-right ml-2"></i>
        </a>
        <a href="#projects" class="inline-flex items-center justify-center px-8 py-3 border border-yellow-400 text-base font-medium rounded-md text-yellow-400 bg-transparent hover:bg-yellow-400 hover:bg-opacity-10 transition">
          View Projects
          <i class="fa-solid fa-folder-open ml-2"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-20 bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">About <span class="text-yellow-400">NeonByte</span></h2>
        <div class="w-20 h-1 bg-yellow-400 mx-auto"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-2xl font-bold text-white mb-6">Student Tech Expertise</h3>
          <p class="text-gray-300 mb-6">NeonByte is a technology initiative by two knowledgeable students who offer their expertise in digital solutions. While we may not yet be industry professionals, we bring solid knowledge and practical experience to every project we undertake.</p>
          <p class="text-gray-300 mb-8">As technology students with hands-on experience, we apply our technical skills and creative problem-solving abilities to help clients achieve their goals through effective digital solutions.</p>
          <div class="grid grid-cols-2 gap-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-12 w-12 relative">
                <!-- Outer circle -->
                <div class="absolute inset-0 border-3 border-yellow-400 rounded-full"></div>
                <!-- Inner element (small solid circle) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-yellow-400 rounded-full"></div>
                <!-- Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-rocket text-black text-xl"></i>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-white font-medium">Innovation</h4>
                <p class="text-gray-400">Cutting-edge solutions</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex-shrink-0 h-12 w-12 relative">
                <!-- Outer circle -->
                <div class="absolute inset-0 border-3 border-yellow-400 rounded-full"></div>
                <!-- Inner element (small solid circle) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-yellow-400 rounded-full"></div>
                <!-- Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-users text-black text-xl"></i>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-white font-medium">Client-Focused</h4>
                <p class="text-gray-400">Tailored to your needs</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex-shrink-0 h-12 w-12 relative">
                <!-- Outer circle -->
                <div class="absolute inset-0 border-3 border-yellow-400 rounded-full"></div>
                <!-- Inner element (small solid circle) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-yellow-400 rounded-full"></div>
                <!-- Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-shield-halved text-black text-xl"></i>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-white font-medium">Security</h4>
                <p class="text-gray-400">Protection built-in</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex-shrink-0 h-12 w-12 relative">
                <!-- Outer circle -->
                <div class="absolute inset-0 border-3 border-yellow-400 rounded-full"></div>
                <!-- Inner element (small solid circle) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-yellow-400 rounded-full"></div>
                <!-- Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-gauge-high text-black text-xl"></i>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-white font-medium">Performance</h4>
                <p class="text-gray-400">Optimized for speed</p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="w-full h-96 bg-gray-800 rounded-lg overflow-hidden relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-80 h-80 relative overflow-hidden">
                <img src="/neonbyte.png" alt="NeonByte Logo" class="w-full h-full object-contain" />
              </div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent"></div>
          </div>
          <div class="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
          <div class="absolute -top-8 -left-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Our <span class="text-yellow-400">Services</span></h2>
        <div class="w-20 h-1 bg-yellow-400 mx-auto"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each services as service, index}
          <div id="service-{service.title.toLowerCase().replace(/\s+/g, '-')}" class="bg-black p-8 rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300 group relative overflow-hidden">
            <!-- Background shape elements -->
            <div class="absolute -right-10 -top-10 w-32 h-32 border-4 border-yellow-400 opacity-10 rotate-12"></div>
            <div class="absolute -left-10 -bottom-10 w-28 h-28 border-4 border-yellow-400 opacity-10 rounded-lg -rotate-12"></div>
            
            <!-- Icon container with full circle design -->
            <div class="relative h-16 w-16 mb-6">
              <!-- Outer circle -->
              <div class="absolute inset-0 border-4 border-yellow-400 rounded-full"></div>
              <!-- Inner element (small solid circle) -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-yellow-400 rounded-full"></div>
              <!-- Icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <i class="fa-solid {service.icon} text-black text-2xl"></i>
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
            <p class="text-gray-400 relative z-10">{service.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Featured Projects Section -->
  <section id="projects" class="py-20 bg-black relative overflow-hidden">
    <div class="particles-container-alt absolute inset-0 overflow-hidden">
      <div class="particle-alt yellow"></div>
      <div class="particle-alt blue"></div>
      <div class="particle-alt purple"></div>
      <div class="particle-alt yellow small"></div>
      <div class="particle-alt blue small"></div>
      <div class="particle-alt purple small"></div>
      <div class="particle-alt yellow tiny"></div>
      <div class="particle-alt blue tiny"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Featured <span class="text-yellow-400">Projects</span></h2>
        <div class="w-20 h-1 bg-yellow-400 mx-auto"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each projects as project}
          <div class="group relative overflow-hidden rounded-lg h-72 cursor-pointer" on:click={() => openProjectModal(project)}>
            <div class="absolute inset-0 bg-gray-800 flex items-center justify-center">
              {#if project.type === 'image'}
                <img src={project.image} alt={project.title} class="object-cover w-full h-full" />
              {:else if project.type === 'video'}
                <div class="w-full h-full relative">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                      <i class="fa-solid fa-play text-black text-2xl"></i>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-all duration-300">
              <span class="inline-block text-yellow-400 text-sm font-medium mb-2">{project.category}</span>
              <h3 class="text-xl font-bold text-white mb-1">{project.title}</h3>
              <span class="inline-flex items-center text-sm text-yellow-400 hover:text-yellow-300">
                View Details
                <i class="fa-solid fa-arrow-right ml-2"></i>
              </span>
            </div>
          </div>
        {/each}
      </div>
      <div class="text-center mt-12">
        <a href="#" on:click|preventDefault={openGalleryModal} class="inline-flex items-center justify-center px-6 py-3 border border-yellow-400 text-base font-medium rounded-md text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black transition">
          View All Projects
          <i class="fa-solid fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section id="team" class="py-20 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Our <span class="text-yellow-400">Team</span></h2>
        <div class="w-20 h-1 bg-yellow-400 mx-auto"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {#each teamMembers as member, index}
          <div class="bg-black rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
            {#if index === 0}
              <!-- Justine's card with photo -->
              <div class="relative h-80 bg-black">
                <div class="w-full h-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    class="h-full" 
                  />
                </div>
                <!-- Yellow bar -->
                <div class="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400"></div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p class="text-yellow-400 mb-4">{member.role}</p>
                <div class="flex space-x-3">
                  <a href="https://www.facebook.com/kevin.go.1614" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-yellow-400 transition">
                    <i class="fa-brands fa-facebook text-lg"></i>
                  </a>
                  <a href="https://jus1ine.github.io/home" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-yellow-400 transition">
                    <i class="fa-solid fa-globe text-lg"></i>
                  </a>
                  <a href="mailto:202211378@gordoncollege.edu.ph" class="text-gray-400 hover:text-yellow-400 transition">
                    <i class="fa-solid fa-envelope text-lg"></i>
                  </a>
                </div>
              </div>
            {:else}
              <!-- Other team member card -->
              <div class="h-80 relative bg-gray-800 flex items-center justify-center">
                <div class="w-32 h-32 bg-yellow-400 rounded-full relative overflow-hidden">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-32 h-32 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                <!-- Yellow bar -->
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"></div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p class="text-yellow-400 mb-4">{member.role}</p>
                <div class="flex space-x-3">
                  <a href="https://www.facebook.com/profile.php?id=100010845429232" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-yellow-400 transition">
                    <i class="fa-brands fa-facebook text-lg"></i>
                  </a>
                  <a href="https://marron15.github.io/home" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-yellow-400 transition">
                    <i class="fa-solid fa-globe text-lg"></i>
                  </a>
                  <a href="#" class="text-gray-400 hover:text-yellow-400 transition">
                    <i class="fa-solid fa-envelope text-lg"></i>
                  </a>
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20 bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Get In <span class="text-yellow-400">Touch</span></h2>
        <div class="w-20 h-1 bg-yellow-400 mx-auto"></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-2xl font-bold text-white mb-6">Contact Information</h3>
          <p class="text-gray-300 mb-8">Ready to start your next project with us? Send us a message and we'll get back to you as soon as possible!</p>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="flex-shrink-0 h-12 w-12 relative">
                <!-- Outer circle -->
                <div class="absolute inset-0 border-3 border-yellow-400 rounded-full"></div>
                <!-- Inner element (small solid circle) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-yellow-400 rounded-full"></div>
                <!-- Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-location-dot text-black text-xl"></i>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-white font-medium">Location</h4>
                <p class="text-gray-400">Olongapo, Philippines</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 h-12 w-12 relative">
                <!-- Outer circle -->
                <div class="absolute inset-0 border-3 border-yellow-400 rounded-full"></div>
                <!-- Inner element (small solid circle) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-yellow-400 rounded-full"></div>
                <!-- Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-envelope text-black text-xl"></i>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-white font-medium">Email</h4>
                <p class="text-gray-400">neonbytegapo@gmail.com</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 h-12 w-12 relative">
                <!-- Outer circle -->
                <div class="absolute inset-0 border-3 border-yellow-400 rounded-full"></div>
                <!-- Inner element (small solid circle) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-yellow-400 rounded-full"></div>
                <!-- Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="fa-solid fa-phone text-black text-xl"></i>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-white font-medium">Phone</h4>
                <p class="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12">
            <h4 class="text-white font-medium mb-4">Follow Us</h4>
            <div class="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61573746630734" class="h-10 w-10 relative flex items-center justify-center group">
                <div class="absolute inset-0 border-2 border-yellow-400 rounded-full transition-all group-hover:border-0 group-hover:bg-yellow-400"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-yellow-400 rounded-full group-hover:bg-transparent"></div>
                <i class="fa-brands fa-facebook-f text-black relative z-10 group-hover:text-black"></i>
              </a>
              <a href="#" class="h-10 w-10 relative flex items-center justify-center group">
                <div class="absolute inset-0 border-2 border-yellow-400 rounded-full transition-all group-hover:border-0 group-hover:bg-yellow-400"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-yellow-400 rounded-full group-hover:bg-transparent"></div>
                <i class="fa-brands fa-linkedin-in text-black relative z-10 group-hover:text-black"></i>
              </a>
              <a href="#" class="h-10 w-10 relative flex items-center justify-center group">
                <div class="absolute inset-0 border-2 border-yellow-400 rounded-full transition-all group-hover:border-0 group-hover:bg-yellow-400"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-yellow-400 rounded-full group-hover:bg-transparent"></div>
                <i class="fa-brands fa-instagram text-black relative z-10 group-hover:text-black"></i>
              </a>
              <a href="#" class="h-10 w-10 relative flex items-center justify-center group">
                <div class="absolute inset-0 border-2 border-yellow-400 rounded-full transition-all group-hover:border-0 group-hover:bg-yellow-400"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-yellow-400 rounded-full group-hover:bg-transparent"></div>
                <i class="fa-brands fa-github text-black relative z-10 group-hover:text-black"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div>
          <form class="space-y-6" on:submit|preventDefault={openConfirmModal}>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-400">Name</label>
                <input type="text" id="name" bind:value={name} required class="mt-1 block w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-400">Email</label>
                <input type="email" id="email" bind:value={email} required class="mt-1 block w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white">
              </div>
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-400">Subject</label>
              <input type="text" id="subject" bind:value={subject} required class="mt-1 block w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white">
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-400">Message</label>
              <textarea id="message" bind:value={message} rows="5" required class="mt-1 block w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"></textarea>
            </div>
            <div>
              <button type="submit" class="inline-flex items-center justify-center w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 transition">
                Send Message
                <i class="fa-solid fa-paper-plane ml-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- Project Modal -->
{#if isModalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-90 p-4" on:click={closeProjectModal}>
    <div 
      class="bg-gray-900 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative transform transition-all duration-300 scale-100 opacity-100" 
      on:click|stopPropagation={() => {}}
    >
      <!-- Close button -->
      <button class="absolute top-4 right-4 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white" on:click={closeProjectModal}>
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      
      <!-- Content container -->
      <div class="flex flex-col md:flex-row">
        <!-- Media container -->
        <div class="w-full md:w-3/5 bg-black relative overflow-hidden">
          {#if activeProject && activeProject.type === 'image'}
            <img src={activeProject.image} alt={activeProject.title} class="w-full object-contain max-h-[70vh]" />
            {#if activeProject.secondaryImage}
              <img src={activeProject.secondaryImage} alt={activeProject.title} class="w-full object-contain max-h-[70vh] mt-2" />
            {/if}
          {:else if activeProject && activeProject.type === 'video'}
            <video controls autoplay class="w-full h-full object-contain max-h-[70vh]">
              <source src={activeProject.image} type="video/mp4">
              Your browser does not support the video tag.
            </video>
          {/if}
        </div>
        
        <!-- Details container -->
        <div class="w-full md:w-2/5 p-8">
          {#if activeProject}
            <div class="mb-4">
              <span class="text-yellow-400 font-medium">{activeProject.category}</span>
            </div>
            <h3 class="text-3xl font-bold text-white mb-4">{activeProject.title}</h3>
            <div class="w-16 h-1 bg-yellow-400 mb-6"></div>
            <p class="text-gray-300 mb-8">{activeProject.description}</p>
            
            <!-- Project details -->
            <div class="space-y-4">
              <div class="flex flex-col">
                <span class="text-yellow-400 font-medium mb-1">Technology</span>
                <div class="flex flex-wrap gap-2">
                  {#if activeProject.title === 'Advanced Calculator'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Java</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Netbeans</span>
                  {:else if activeProject.title === 'Credify'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Angular</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else if activeProject.title === 'Event Scheduling'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Svelte</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else if activeProject.title === 'Weathering App'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Angular</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else if activeProject.title === 'Quickrent Apartment Booking'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Angular</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">JavaScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Svelte</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Tailwind CSS</span>
                  {/if}
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Confirmation Modal -->
{#if isConfirmModalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-90 p-4" on:click={closeConfirmModal}>
    <div 
      class="bg-gray-900 rounded-lg shadow-2xl max-w-md w-full overflow-auto relative transform transition-all duration-300 scale-100 opacity-100" 
      on:click|stopPropagation={() => {}}
    >
      <!-- Close button -->
      <button class="absolute top-4 right-4 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white" on:click={closeConfirmModal}>
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      
      <!-- Content container -->
      <div class="p-8">
        <h3 class="text-2xl font-bold text-white mb-4">Confirm Send</h3>
        <div class="w-16 h-1 bg-yellow-400 mb-6"></div>
        <p class="text-gray-300 mb-8">Are you sure you want to send this message?</p>
        
        <div class="grid grid-cols-2 gap-4">
          <button on:click={closeConfirmModal} class="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800 transition">
            Cancel
          </button>
          <button on:click={sendEmail} class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 transition">
            Send
            <i class="fa-solid fa-paper-plane ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Gallery Modal (for View All Projects) -->
{#if isGalleryModalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-90 p-4" on:click={closeGalleryModal}>
    <div 
      class="bg-gray-900 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative transform transition-all duration-300 scale-100 opacity-100" 
      on:click|stopPropagation={() => {}}
    >
      <!-- Close button -->
      <button class="absolute top-4 right-4 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white" on:click={closeGalleryModal}>
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      
      <!-- Navigation buttons -->
      <button class="absolute top-1/2 left-4 z-50 h-12 w-12 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white -translate-y-1/2" on:click|stopPropagation={prevProject}>
        <i class="fa-solid fa-chevron-left text-xl"></i>
      </button>
      
      <button class="absolute top-1/2 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white -translate-y-1/2" on:click|stopPropagation={nextProject}>
        <i class="fa-solid fa-chevron-right text-xl"></i>
      </button>
      
      <!-- Content container -->
      <div class="flex flex-col md:flex-row">
        <!-- Media container -->
        <div class="w-full md:w-3/5 bg-black relative overflow-hidden">
          {#if activeProject && activeProject.type === 'image'}
            <img src={activeProject.image} alt={activeProject.title} class="w-full object-contain max-h-[70vh]" />
            {#if activeProject.secondaryImage}
              <img src={activeProject.secondaryImage} alt={activeProject.title} class="w-full object-contain max-h-[70vh] mt-2" />
            {/if}
          {:else if activeProject && activeProject.type === 'video'}
            <video controls autoplay class="w-full h-full object-contain max-h-[70vh]">
              <source src={activeProject.image} type="video/mp4">
              Your browser does not support the video tag.
            </video>
          {/if}
        </div>
        
        <!-- Details container -->
        <div class="w-full md:w-2/5 p-8">
          {#if activeProject}
            <div class="mb-4">
              <span class="text-yellow-400 font-medium">{activeProject.category}</span>
            </div>
            <h3 class="text-3xl font-bold text-white mb-4">{activeProject.title}</h3>
            <div class="w-16 h-1 bg-yellow-400 mb-6"></div>
            <p class="text-gray-300 mb-8">{activeProject.description}</p>
            
            <!-- Project details -->
            <div class="space-y-4">
              <div class="flex flex-col">
                <span class="text-yellow-400 font-medium mb-1">Technology</span>
                <div class="flex flex-wrap gap-2">
                  {#if activeProject.title === 'Advanced Calculator'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Java</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Netbeans</span>
                  {:else if activeProject.title === 'Credify'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Angular</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else if activeProject.title === 'Event Scheduling'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Svelte</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else if activeProject.title === 'Weathering App'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Angular</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else if activeProject.title === 'Quickrent Apartment Booking'}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Angular</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">TypeScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                  {:else}
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">HTML/CSS</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">JavaScript</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Svelte</span>
                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">Tailwind CSS</span>
                  {/if}
                </div>
              </div>
            </div>
            
            <!-- Project navigation indicator -->
            <div class="mt-8 flex items-center justify-center">
              <div class="flex space-x-2">
                {#each projects as _, index}
                  <button 
                    class="w-3 h-3 rounded-full {index === currentProjectIndex ? 'bg-yellow-400' : 'bg-gray-600'}"
                    on:click|stopPropagation={() => {
                      currentProjectIndex = index;
                      activeProject = projects[index];
                    }}
                  ></button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<footer class="bg-gray-900 border-t border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="col-span-1 md:col-span-2">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 relative overflow-hidden">
            <img src="/neonbyte.png" alt="NeonByte Logo" class="w-full h-full object-contain" />
          </div>
          <span class="ml-3 text-xl font-bold text-white">NEONBYTE</span>
        </div>
        <p class="text-gray-400 mb-6">Transforming ideas into digital reality with innovative technology solutions</p>
        <p class="text-gray-500">© 2024 NeonByte. All rights reserved.</p>
      </div>
      
      <div>
        <h3 class="text-lg font-medium text-white mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><a href="#home" class="text-gray-400 hover:text-yellow-400 transition">Home</a></li>
          <li><a href="#about" class="text-gray-400 hover:text-yellow-400 transition">About</a></li>
          <li><a href="#services" class="text-gray-400 hover:text-yellow-400 transition">Services</a></li>
          <li><a href="#projects" class="text-gray-400 hover:text-yellow-400 transition">Projects</a></li>
          <li><a href="#team" class="text-gray-400 hover:text-yellow-400 transition">Team</a></li>
          <li><a href="#contact" class="text-gray-400 hover:text-yellow-400 transition">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-lg font-medium text-white mb-4">Services</h3>
        <ul class="space-y-2">
          <li><a href="#service-web-development" class="text-gray-400 hover:text-yellow-400 transition">Web Development</a></li>
          <li><a href="#service-mobile-development" class="text-gray-400 hover:text-yellow-400 transition">Mobile Development</a></li>
          <li><a href="#service-ui/ux-design" class="text-gray-400 hover:text-yellow-400 transition">UI/UX Design</a></li>
          <li><a href="#service-graphic-design" class="text-gray-400 hover:text-yellow-400 transition">Graphic Design</a></li>
          <li><a href="#service-video-editing" class="text-gray-400 hover:text-yellow-400 transition">Video Editing</a></li>
          <li><a href="#service-it-assistance" class="text-gray-400 hover:text-yellow-400 transition">IT Assistance</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(body) {
    background-color: black;
    color: white;
  }
  
  .tagline span {
    display: inline-block;
    position: relative;
    animation: glow 3s ease-in-out infinite alternate;
  }
  
  .tagline span:nth-child(1) {
    animation-delay: 0s;
  }
  
  .tagline span:nth-child(2) {
    animation-delay: 1s;
  }
  
  .tagline span:nth-child(3) {
    animation-delay: 2s;
  }
  
  @keyframes glow {
    0% {
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
      transform: scale(1);
    }
    50% {
      text-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
      transform: scale(1.05);
    }
    100% {
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
      transform: scale(1);
    }
  }

  /* Particles Animation */
  .particles-container {
    z-index: 0;
    opacity: 0.5;
  }
  
  .particle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
    pointer-events: none;
  }
  
  .particle.yellow {
    background-color: #EAB308;
    box-shadow: 0 0 15px 5px rgba(234, 179, 8, 0.3);
    width: 12px;
    height: 12px;
    animation: float-slow 15s linear infinite;
  }
  
  .particle.blue {
    background-color: #38BDF8;
    box-shadow: 0 0 15px 5px rgba(56, 189, 248, 0.3);
    width: 10px;
    height: 10px;
    animation: float-medium 20s linear infinite;
  }
  
  .particle.purple {
    background-color: #A855F7;
    box-shadow: 0 0 15px 5px rgba(168, 85, 247, 0.3);
    width: 8px;
    height: 8px;
    animation: float-fast 18s linear infinite;
  }
  
  .particle.small {
    transform: scale(0.7);
    opacity: 0.5;
  }
  
  .particle.tiny {
    transform: scale(0.4);
    opacity: 0.4;
  }
  
  .particle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
  .particle:nth-child(2) { top: 40%; left: 40%; animation-delay: 1s; }
  .particle:nth-child(3) { top: 20%; left: 65%; animation-delay: 2s; }
  .particle:nth-child(4) { top: 70%; left: 50%; animation-delay: 3s; }
  .particle:nth-child(5) { top: 30%; left: 30%; animation-delay: 4s; }
  .particle:nth-child(6) { top: 80%; left: 20%; animation-delay: 5s; }
  .particle:nth-child(7) { top: 60%; left: 10%; animation-delay: 6s; }
  .particle:nth-child(8) { top: 45%; left: 85%; animation-delay: 7s; }
  .particle:nth-child(9) { top: 15%; left: 70%; animation-delay: 8s; }
  .particle:nth-child(10) { top: 90%; left: 30%; animation-delay: 9s; }
  .particle:nth-child(11) { top: 50%; left: 60%; animation-delay: 10s; }
  .particle:nth-child(12) { top: 25%; left: 15%; animation-delay: 11s; }
  .particle:nth-child(13) { top: 75%; left: 75%; animation-delay: 12s; }
  .particle:nth-child(14) { top: 35%; left: 25%; animation-delay: 13s; }
  .particle:nth-child(15) { top: 85%; left: 55%; animation-delay: 14s; }
  .particle:nth-child(16) { top: 20%; left: 80%; animation-delay: 15s; }
  .particle:nth-child(17) { top: 65%; left: 35%; animation-delay: 16s; }
  .particle:nth-child(18) { top: 5%; left: 45%; animation-delay: 17s; }
  .particle:nth-child(19) { top: 55%; left: 5%; animation-delay: 18s; }
  .particle:nth-child(20) { top: 40%; left: 90%; animation-delay: 19s; }
  
  @keyframes float-slow {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
    }
    33% {
      transform: translateY(-100px) translateX(100px) rotate(120deg);
    }
    66% {
      transform: translateY(100px) translateX(-100px) rotate(240deg);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(360deg);
    }
  }
  
  @keyframes float-medium {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
    }
    33% {
      transform: translateY(80px) translateX(-80px) rotate(-120deg);
    }
    66% {
      transform: translateY(-80px) translateX(80px) rotate(-240deg);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(-360deg);
    }
  }
  
  @keyframes float-fast {
    0% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-60px) translateX(60px);
    }
    50% {
      transform: translateY(0) translateX(120px);
    }
    75% {
      transform: translateY(60px) translateX(60px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }

  /* Projects Section Particles */
  .particles-container-alt {
    z-index: 0;
    opacity: 0.3;
  }
  
  .particle-alt {
    position: absolute;
    border-radius: 50%;
    opacity: 0.4;
    pointer-events: none;
  }
  
  .particle-alt.yellow {
    background-color: #EAB308;
    box-shadow: 0 0 10px 3px rgba(234, 179, 8, 0.2);
    width: 8px;
    height: 8px;
    animation: float-slow-alt 25s linear infinite;
  }
  
  .particle-alt.blue {
    background-color: #38BDF8;
    box-shadow: 0 0 10px 3px rgba(56, 189, 248, 0.2);
    width: 6px;
    height: 6px;
    animation: float-medium-alt 30s linear infinite;
  }
  
  .particle-alt.purple {
    background-color: #A855F7;
    box-shadow: 0 0 10px 3px rgba(168, 85, 247, 0.2);
    width: 5px;
    height: 5px;
    animation: float-fast-alt 28s linear infinite;
  }
  
  .particle-alt.small {
    transform: scale(0.7);
    opacity: 0.3;
  }
  
  .particle-alt.tiny {
    transform: scale(0.4);
    opacity: 0.2;
  }
  
  .particle-alt:nth-child(1) { top: 15%; left: 15%; animation-delay: 0s; }
  .particle-alt:nth-child(2) { top: 45%; left: 35%; animation-delay: 3s; }
  .particle-alt:nth-child(3) { top: 25%; left: 60%; animation-delay: 6s; }
  .particle-alt:nth-child(4) { top: 75%; left: 45%; animation-delay: 9s; }
  .particle-alt:nth-child(5) { top: 35%; left: 25%; animation-delay: 12s; }
  .particle-alt:nth-child(6) { top: 85%; left: 15%; animation-delay: 15s; }
  .particle-alt:nth-child(7) { top: 65%; left: 5%; animation-delay: 18s; }
  .particle-alt:nth-child(8) { top: 40%; left: 80%; animation-delay: 21s; }
  
  @keyframes float-slow-alt {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-50px) translateX(50px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }
  
  @keyframes float-medium-alt {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(40px) translateX(-40px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }
  
  @keyframes float-fast-alt {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-30px) translateX(30px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }

  /* Modal animation */
  .modal-enter {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .modal-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  
  .modal-exit {
    opacity: 1;
    transform: scale(1);
  }
  
  .modal-exit-active {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 300ms, transform 300ms;
  }
</style>
